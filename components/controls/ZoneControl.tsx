"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { BatteryCharging, Lightbulb, Power } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface ZoneControlProps {
    id: string
    name: string
    location: string
    initialBrightness?: number
    initialStatus?: boolean
}

export function ZoneControl({ id, name, location, initialBrightness = 80, initialStatus = true }: ZoneControlProps) {
    const [brightness, setBrightness] = useState([initialBrightness])
    const [isOn, setIsOn] = useState(initialStatus)

    return (
        <Card className={!isOn ? "opacity-75" : ""}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">{name}</CardTitle>
                        <CardDescription>{location}</CardDescription>
                    </div>
                    <Switch checked={isOn} onCheckedChange={setIsOn} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor={`brightness-${id}`} className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Brightness
                        </Label>
                        <span className="text-sm font-medium">{isOn ? `${brightness}%` : "OFF"}</span>
                    </div>
                    <Slider
                        id={`brightness-${id}`}
                        defaultValue={[initialBrightness]}
                        max={100}
                        step={1}
                        value={brightness}
                        onValueChange={setBrightness}
                        disabled={!isOn}
                        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                            <Power className={`h-3 w-3 ${isOn ? "text-green-500" : "text-muted-foreground"}`} />
                            Status: {isOn ? "Active" : "Standby"}
                        </div>
                        <div className="flex items-center gap-1">
                            <BatteryCharging className="h-3 w-3" />
                            {isOn ? Math.round(brightness[0] * 1.2) : 0}W Consumption
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
