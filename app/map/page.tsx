"use client"

import { useState, useMemo, useEffect } from "react"
import dynamic from "next/dynamic"
import { FilterPanel } from "@/components/map/FilterPanel"
import { HighwayDetailsCard } from "@/components/map/HighwayDetailsCard"
import { StateDetailsCard } from "@/components/map/StateDetailsCard"
import { highways, streetLights } from "@/lib/mockData"
import { FilterState, Location } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, X } from "lucide-react"
import { getStateById, getCityById, cities } from "@/lib/geoData"

// Dynamically import MapComponent with no SSR
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-muted/20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    ),
})

export default function MapPage() {
    const [filterState, setFilterState] = useState<FilterState>({
        highways: [],
        statuses: ["active", "faulty", "maintenance"],
        intensityRange: [0, 100],
        zones: [],
        searchQuery: "",
    })

    console.log("MapPage render. filterState:", filterState)

    const [selectedHighwayId, setSelectedHighwayId] = useState<string | null>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // State for dynamic data
    const [realHighways, setRealHighways] = useState<any[]>(highways) // Use 'any' to allow tempPath
    const [realLights, setRealLights] = useState<any[]>(streetLights)
    const [isLoading, setIsLoading] = useState(false)

    // Dynamic Data Fetching
    useEffect(() => {
        const fetchRealData = async () => {
            if (filterState.stateId) {
                const state = getStateById(filterState.stateId)
                if (state) {
                    setIsLoading(true)
                    try {
                        const { osmService } = await import("@/lib/osmService")
                        const { sensorSimulation } = await import("@/lib/sensorSimulation")

                        // 1. Fetch Real Highways
                        const fetchedHighways = await osmService.fetchHighwaysForState(state.name)

                        // 2. Generate Simulated Lights on Real Paths
                        let newLights: any[] = []
                        fetchedHighways.forEach(h => {
                            const lights = sensorSimulation.generateLightsForHighway(h)
                            newLights = [...newLights, ...lights]
                        })

                        setRealHighways(fetchedHighways)
                        setRealLights(newLights)
                    } catch (err) {
                        console.error("Failed to fetch real data:", err)
                        // Fallback to mock data if error, or just show empty
                    } finally {
                        setIsLoading(false)
                    }
                }
            } else {
                // Reset to default mock data (India View)
                setRealHighways(highways)
                setRealLights(streetLights)
            }
        }

        fetchRealData()
    }, [filterState.stateId])


    // 1. Calculate lights matching Status/Intensity/Search (Ignoring specific highway selection)
    const validLightsForHighways = useMemo(() => {
        return realLights.filter((light) => {
            if (filterState.stateId && light.stateId !== filterState.stateId && light.stateId !== 'auto-state') {
                // Relax check
            }
            if (filterState.cityId && light.cityId !== filterState.cityId && light.cityId !== 'auto-city') return false
            if (!filterState.statuses.includes(light.status)) return false
            if (light.intensity < filterState.intensityRange[0] || light.intensity > filterState.intensityRange[1]) return false
            if (filterState.searchQuery && !light.id.toLowerCase().includes(filterState.searchQuery.toLowerCase())) return false
            return true
        })
    }, [filterState.stateId, filterState.cityId, filterState.statuses, filterState.intensityRange, filterState.searchQuery, realLights])

    // 2. Filter highways based on location AND if they have valid lights
    const filteredHighways = useMemo(() => {
        let result = realHighways

        if (filterState.cityId) {
            const city = getCityById(filterState.cityId)
            if (city) {
                result = result.filter(h => city.highways.includes(h.code))
            }
        }

        // Filter out highways that don't have any matching lights
        // This ensures if user selects "Faulty", only Highways with faulty lights are shown in the list
        const validHighwayIds = new Set(validLightsForHighways.map(l => l.highwayId))
        result = result.filter(h => validHighwayIds.has(h.id))

        return result
    }, [filterState.cityId, realHighways, validLightsForHighways])

    // 3. Filter lights for the Map (Including specific highway selection from the filtered list)
    const filteredLights = useMemo(() => {
        return validLightsForHighways.filter((light) => {
            // Apply Highway Selection Filter
            if (
                filterState.highways.length > 0 &&
                !filterState.highways.includes(light.highwayId)
            ) {
                return false
            }
            return true
        })
    }, [validLightsForHighways, filterState.highways])

    const selectedHighway = useMemo(
        () => realHighways.find((h) => h.id === selectedHighwayId),
        [selectedHighwayId, realHighways]
    )

    const handleHighwaySelect = (highwayId: string) => {
        setSelectedHighwayId(highwayId)
    }

    // Determine Map Center and Zoom
    const mapView = useMemo(() => {
        let center: Location = { lat: 20.5937, lng: 78.9629 } // Default India Center
        let zoom = 5

        if (filterState.cityId) {
            const city = getCityById(filterState.cityId)
            if (city) {
                center = city.coordinates
                zoom = 12
            }
        } else if (filterState.stateId) {
            const state = getStateById(filterState.stateId)
            if (state) {
                // Use explicit state coordinates
                center = state.coordinates
                zoom = 7 // Zoom out slightly to see whole state network
            }
        }

        return { center, zoom }
    }, [filterState.stateId, filterState.cityId])

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden relative">
            {/* Filter Panel */}
            <div className={`w-full md:w-80 flex-shrink-0 z-10 transition-all duration-300 ${isFullscreen ? '-ml-80 absolute' : ''}`}>
                <FilterPanel
                    highways={filteredHighways} // Pass filtered highways
                    filterState={filterState}
                    onFilterChange={setFilterState}
                    totalLights={realLights.length}
                    filteredLightsCount={filteredLights.length}
                />
            </div>

            {/* Map Area */}
            <div className="flex-1 relative h-full">
                {isLoading && (
                    <div className="absolute inset-0 z-[500] bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <div className="text-lg font-semibold animate-pulse">Fetching Real Highway Network...</div>
                        <div className="text-sm text-muted-foreground">Connecting to OpenStreetMap</div>
                    </div>
                )}

                <MapComponent
                    lights={filteredLights}
                    highways={filteredHighways} // Show only relevant highways
                    onHighwaySelect={handleHighwaySelect}
                    center={mapView.center}
                    zoom={mapView.zoom}
                />

                {/* Fullscreen Toggle */}
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 z-[400] shadow-md"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>

                {/* Selected Highway Details Card */}
                {selectedHighway && (
                    <div className="absolute bottom-4 right-4 z-[400] w-full max-w-sm px-4 md:px-0 h-[60vh] md:h-[500px]">
                        <div className="relative h-full">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 z-10 h-6 w-6 rounded-full bg-background/80 hover:bg-background shadow-sm border backdrop-blur-sm"
                                onClick={() => setSelectedHighwayId(null)}
                            >
                                <span className="sr-only">Close</span>
                                <X className="h-3 w-3" />
                            </Button>
                            <HighwayDetailsCard
                                highway={selectedHighway}
                                onClose={() => setSelectedHighwayId(null)}
                            />
                        </div>
                    </div>
                )}

                {/* State Overview Card (Show when state selected but no highway selected) */}
                {!selectedHighway && filterState.stateId && !isLoading && (
                    <div className="absolute bottom-4 right-4 z-[400] w-full max-w-sm px-4 md:px-0 h-[60vh] md:h-[500px]">
                        <div className="relative h-full">
                            <StateDetailsCard
                                stateName={getStateById(filterState.stateId)?.name || "Unknown State"}
                                highways={filteredHighways}
                                lights={filteredLights}
                                onHighwaySelect={handleHighwaySelect}
                                onClose={() => setFilterState({ ...filterState, stateId: undefined })}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
