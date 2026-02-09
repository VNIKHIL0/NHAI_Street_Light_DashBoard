"use client"

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import { StreetLight, Highway, Location } from "@/lib/types"
import { getCityById } from "@/lib/geoData"

// Fix for default marker icon in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface MapComponentProps {
    lights: StreetLight[]
    highways: Highway[]
    onHighwaySelect?: (highwayId: string) => void
    center?: Location
    zoom?: number
}

// Map Controller Component to handle view updates
function MapController({ center, zoom }: { center: Location, zoom: number }) {
    const map = useMap()

    useEffect(() => {
        console.log("MapController flying to:", center, zoom)
        map.flyTo([center.lat, center.lng], zoom, {
            duration: 1.5,
            easeLinearity: 0.25
        })
    }, [center, zoom, map])

    return null
}

const statusColor = {
    active: "#22c55e",
    faulty: "#ef4444",
    maintenance: "#f97316",
}

const createCustomIcon = (status: "active" | "faulty" | "maintenance") => {
    const color = statusColor[status]

    return new L.DivIcon({
        className: "custom-icon",
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
    })
}

// Define highway paths (mock coordinates for fallback)
const getHighwayPath = (highway: Highway): [number, number][] => {
    // Mock path generation based on start/end points + randomness
    // In a real app, this would be actual GeoJSON data
    const paths: Record<string, [number, number][]> = {
        "nh-44": [[34.0837, 74.7973], [32.7266, 74.8570], [30.9010, 75.8573], [28.6139, 77.2090], [21.1458, 79.0882], [17.3850, 78.4867], [12.9716, 77.5946], [8.0883, 77.5385]],
        "nh-48": [[28.6139, 77.2090], [26.9124, 75.7873], [23.0225, 72.5714], [19.0760, 72.8777], [12.9716, 77.5946], [13.0827, 80.2707]],
        "nh-1": [[28.6139, 77.2090], [29.3909, 76.9635], [30.3782, 76.7767], [31.6340, 74.8723]],
        "nh-2": [[28.6139, 77.2090], [27.1767, 78.0081], [26.4499, 80.3319], [25.3176, 82.9739], [22.5726, 88.3639]],
        "nh-8": [[28.6139, 77.2090], [28.4595, 77.0266], [26.9124, 75.7873], [22.3072, 73.1812], [19.0760, 72.8777]]
    }

    if (paths[highway.id]) return paths[highway.id]

    // Fallback: Straight line between first and last city
    if (highway.cities && highway.cities.length >= 2) {
        const startCity = getCityById(highway.cities[0])
        const endCity = getCityById(highway.cities[highway.cities.length - 1])
        if (startCity && endCity) {
            return [
                [startCity.coordinates.lat, startCity.coordinates.lng],
                [endCity.coordinates.lat, endCity.coordinates.lng]
            ]
        }
    }

    // Fallback for single city or undefined (just a dot or empty)
    if (highway.cities && highway.cities.length === 1) {
        const city = getCityById(highway.cities[0])
        if (city) return [[city.coordinates.lat, city.coordinates.lng]]
    }

    return []
}

export default function MapComponent({
    lights,
    highways,
    onHighwaySelect,
    center = { lat: 20.5937, lng: 78.9629 }, // Default Center of India
    zoom = 5
}: MapComponentProps) {
    const [realPaths, setRealPaths] = useState<Record<string, [number, number][]>>({})

    useEffect(() => {
        const fetchRoutes = async () => {
            const newPaths: Record<string, [number, number][]> = {}

            for (const highway of highways) {
                // If we already have the path, skip
                if (realPaths[highway.id]) continue

                // construct waypoints from cities
                const waypoints = highway.cities
                    .map(cityId => getCityById(cityId))
                    .filter(c => c !== undefined)
                    .map(c => c!.coordinates)

                if (waypoints.length < 2) continue

                // OSRM requires "lon,lat" format separated by ";"
                const coordinatesString = waypoints
                    .map(wp => `${wp.lng},${wp.lat}`)
                    .join(";")

                try {
                    const response = await fetch(
                        `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson`
                    )
                    const data = await response.json()

                    if (data.code === "Ok" && data.routes && data.routes.length > 0) {
                        // OSRM returns [lon, lat], Leaflet needs [lat, lon]
                        const coordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number])
                        newPaths[highway.id] = coordinates
                    }
                } catch (error) {
                    console.error(`Failed to fetch route for ${highway.code}`, error)
                }
            }

            if (Object.keys(newPaths).length > 0) {
                setRealPaths(prev => ({ ...prev, ...newPaths }))
            }
        }

        fetchRoutes()
    }, [highways])

    return (
        <MapContainer
            center={[center.lat, center.lng]}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
        >
            <MapController center={center} zoom={zoom} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Highway Routes */}
            {highways.map(highway => {
                const path = realPaths[highway.id] || getHighwayPath(highway)
                if (!path || path.length < 2) return null

                return (
                    <Polyline
                        key={highway.id}
                        positions={path}
                        color="#3b82f6"
                        weight={4}
                        opacity={0.7}
                        eventHandlers={{
                            click: () => onHighwaySelect?.(highway.id)
                        }}
                    >
                        <Tooltip sticky permanent direction="center" className="bg-transparent border-0 shadow-none">
                            <div className="bg-white/90 border border-blue-500 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap">
                                {highway.code}
                            </div>
                        </Tooltip>
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{highway.code}</h3>
                                <p className="text-sm">{highway.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {highway.startPoint} ➝ {highway.endPoint}
                                </p>
                                <p className="text-xs font-semibold mt-1">
                                    Length: {highway.length} km
                                </p>
                            </div>
                        </Popup>
                    </Polyline>
                )
            })}

            {/* Street Light Markers */}
            {lights.map((light) => (
                <Marker
                    key={light.id}
                    position={[light.lat, light.lng]}
                    icon={createCustomIcon(light.status)}
                >
                    <Popup>
                        <div className="p-2 min-w-[200px]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-sm">{light.id}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize text-white ${light.status === 'active' ? 'bg-green-500' :
                                    light.status === 'faulty' ? 'bg-red-500' : 'bg-orange-500'
                                    }`}>
                                    {light.status}
                                </span>
                            </div>
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Highway:</span>
                                    <span className="font-medium">{light.highwayCode}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Location:</span>
                                    <span className="font-medium">KM {light.kmMarker}</span>
                                </div>
                                {light.cityId && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">City:</span>
                                        <span className="font-medium capitalize">{light.cityId.replace('-', ' ')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Intensity:</span>
                                    <span className="font-medium">{light.intensity}%</span>
                                </div>
                                {light.faultType && (
                                    <div className="flex justify-between text-red-500 mt-2 pt-2 border-t">
                                        <span className="font-semibold">Fault:</span>
                                        <span className="font-medium capitalize">{light.faultType.replace('_', ' ')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
