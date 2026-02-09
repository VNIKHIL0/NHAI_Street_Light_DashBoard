"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MapPin, X } from "lucide-react"
import { FilterState, Highway } from "@/lib/types"
import { LocationSelector } from "./LocationSelector"

interface FilterPanelProps {
    highways: Highway[]
    filterState: FilterState
    onFilterChange: (newState: FilterState) => void
    totalLights: number
    filteredLightsCount: number
}

export function FilterPanel({
    highways,
    filterState,
    onFilterChange,
    totalLights,
    filteredLightsCount,
}: FilterPanelProps) {
    const handleHighwayToggle = (highwayId: string) => {
        const current = filterState.highways
        const updated = current.includes(highwayId)
            ? current.filter((id) => id !== highwayId)
            : [...current, highwayId]
        onFilterChange({ ...filterState, highways: updated })
    }

    const handleStatusToggle = (status: "active" | "faulty" | "maintenance") => {
        const current = filterState.statuses
        const updated = current.includes(status)
            ? current.filter((s) => s !== status)
            : [...current, status]
        onFilterChange({ ...filterState, statuses: updated })
    }

    const handleStateChange = (stateId: string | undefined) => {
        console.log("FilterPanel handleStateChange:", stateId)
        onFilterChange({ ...filterState, stateId, cityId: undefined })
    }

    const handleCityChange = (cityId: string | undefined) => {
        onFilterChange({ ...filterState, cityId })
    }

    const handleReset = () => {
        onFilterChange({
            highways: [],
            statuses: ["active", "faulty", "maintenance"],
            intensityRange: [0, 100],
            zones: [],
            searchQuery: "",
            stateId: undefined,
            cityId: undefined
        })
    }

    return (
        <div className="h-full flex flex-col bg-card border-r">
            <div className="p-4 border-b">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Filters
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Showing {filteredLightsCount} of {totalLights} lights
                </p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {/* Search */}
                    <div className="space-y-2">
                        <Label>Search Light ID</Label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="NHAI-NH-44-..."
                                className="pl-8"
                                value={filterState.searchQuery}
                                onChange={(e) =>
                                    onFilterChange({ ...filterState, searchQuery: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Location Selector */}
                    <div className="space-y-4">
                        <LocationSelector
                            onStateChange={handleStateChange}
                            onCityChange={handleCityChange}
                            selectedStateId={filterState.stateId}
                            selectedCityId={filterState.cityId}
                        />
                    </div>

                    {/* Highways */}
                    <div className="space-y-2">
                        <Label>Highways</Label>
                        <div className="grid grid-cols-1 gap-2">
                            {highways.map((highway) => (
                                <div key={highway.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`highway-${highway.id}`}
                                        checked={filterState.highways.includes(highway.id)}
                                        onCheckedChange={(checked: boolean) => handleHighwayToggle(highway.id)}
                                    />
                                    <Label
                                        htmlFor={`highway-${highway.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {highway.code}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="status-active"
                                    checked={filterState.statuses.includes("active")}
                                    onCheckedChange={(checked: boolean) => handleStatusToggle("active")}
                                />
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <Label htmlFor="status-active" className="text-sm font-medium">
                                        Active
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="status-faulty"
                                    checked={filterState.statuses.includes("faulty")}
                                    onCheckedChange={(checked: boolean) => handleStatusToggle("faulty")}
                                />
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <Label htmlFor="status-faulty" className="text-sm font-medium">
                                        Faulty
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="status-maintenance"
                                    checked={filterState.statuses.includes("maintenance")}
                                    onCheckedChange={(checked: boolean) => handleStatusToggle("maintenance")}
                                />
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                                    <Label htmlFor="status-maintenance" className="text-sm font-medium">
                                        Maintenance
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Intensity Range */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Intensity Range</Label>
                            <span className="text-sm text-muted-foreground">
                                {filterState.intensityRange[0]}% - {filterState.intensityRange[1]}%
                            </span>
                        </div>
                        <Slider
                            defaultValue={[0, 100]}
                            max={100}
                            step={1}
                            value={filterState.intensityRange}
                            onValueChange={(value) =>
                                onFilterChange({
                                    ...filterState,
                                    intensityRange: value as [number, number],
                                })
                            }
                        />
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleReset}>
                        <X className="mr-2 h-4 w-4" />
                        Reset Filters
                    </Button>
                </div>
            </ScrollArea>
        </div>
    )
}
