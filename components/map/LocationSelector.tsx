"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { states, getCitiesByState } from "@/lib/geoData"
import type { City, State } from "@/lib/types"

interface LocationSelectorProps {
    onStateChange: (stateId: string | undefined) => void
    onCityChange: (cityId: string | undefined) => void
    selectedStateId?: string
    selectedCityId?: string
    className?: string
}

export function LocationSelector({
    onStateChange,
    onCityChange,
    selectedStateId,
    selectedCityId,
    className,
}: LocationSelectorProps) {
    const [openState, setOpenState] = React.useState(false)
    const [openCity, setOpenCity] = React.useState(false)

    const selectedState = states.find((s) => s.id === selectedStateId)
    const availableCities = selectedStateId ? getCitiesByState(selectedStateId) : []
    const selectedCity = availableCities.find((c) => c.id === selectedCityId)

    const handleStateSelect = (currentValue: string) => {
        onStateChange(currentValue || undefined)
        setOpenState(false)
    }

    const handleCitySelect = (currentValue: string) => {
        onCityChange(currentValue || undefined)
        setOpenCity(false)
    }

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">State</label>
                <Popover open={openState} onOpenChange={setOpenState}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openState}
                            className="w-full justify-between"
                        >
                            {selectedState ? (
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    {selectedState.name}
                                </span>
                            ) : (
                                <span className="text-muted-foreground">Select State (All India)</span>
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                        <Command>
                            <CommandInput placeholder="Search state..." />
                            <CommandList>
                                <CommandEmpty>No state found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandItem
                                        value="all-india"
                                        keywords={["all", "india", "entire", "country"]}
                                        onSelect={() => handleStateSelect("")}
                                        disabled={false}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                !selectedStateId ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        All India
                                    </CommandItem>
                                    {states.map((state) => (
                                        <CommandItem
                                            key={state.id}
                                            value={state.id}
                                            keywords={[state.name, state.code, state.id]}
                                            onSelect={() => handleStateSelect(state.id)}
                                            disabled={false}
                                            className="cursor-pointer"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedStateId === state.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {state.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">City</label>
                <Popover open={openCity} onOpenChange={setOpenCity}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCity}
                            className="w-full justify-between"
                            disabled={!selectedStateId}
                        >
                            {selectedCity ? (
                                selectedCity.name
                            ) : (
                                <span className="text-muted-foreground">
                                    {!selectedStateId ? "Select State First" : "Select City (All Cities)"}
                                </span>
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0">
                        <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                                <CommandEmpty>No city found.</CommandEmpty>
                                <CommandGroup>
                                    <CommandItem
                                        value="all-cities"
                                        keywords={["all", "cities", "entire", "state"]}
                                        onSelect={() => handleCitySelect("")}
                                        disabled={false}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                !selectedCityId ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        All Cities in {selectedState?.name}
                                    </CommandItem>
                                    {availableCities.map((city) => (
                                        <CommandItem
                                            key={city.id}
                                            value={city.id}
                                            keywords={[city.name, city.id]}
                                            onSelect={() => handleCitySelect(city.id)}
                                            disabled={false}
                                            className="cursor-pointer"
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedCityId === city.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {city.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
