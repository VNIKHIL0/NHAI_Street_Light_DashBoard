"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Highway, StreetLight } from "@/lib/types"
// Removed streetLights import to avoid confusion
import { X, MapPin, Zap, AlertTriangle, ArrowRight } from "lucide-react"
import { useMemo } from "react"

interface StateDetailsCardProps {
    stateName: string
    highways: Highway[]
    lights: StreetLight[]
    onHighwaySelect: (highwayId: string) => void
    onClose: () => void
}

export function StateDetailsCard({
    stateName,
    highways,
    lights,
    onHighwaySelect,
    onClose
}: StateDetailsCardProps) {

    // Calculate aggregate statistics for the state
    const stats = useMemo(() => {
        // Get all lights for these highways
        const highwayIds = new Set(highways.map(h => h.id))
        const stateLights = lights.filter(l => highwayIds.has(l.highwayId))

        const active = stateLights.filter(l => l.status === "active").length
        const faulty = stateLights.filter(l => l.status === "faulty").length
        const maintenance = stateLights.filter(l => l.status === "maintenance").length

        return {
            totalLights: stateLights.length,
            active,
            faulty,
            maintenance,
            totalHighways: highways.length
        }
    }, [highways, lights])

    return (
        <Card className="h-full flex flex-col shadow-lg border-primary/20">
            <CardHeader className="border-b bg-muted/40 pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <CardTitle className="text-xl">{stateName}</CardTitle>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">State Overview</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Highways</span>
                        <div className="text-2xl font-bold">{stats.totalHighways}</div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Lights</span>
                        <div className="text-2xl font-bold">{stats.totalLights}</div>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200">
                        {stats.active} Active
                    </Badge>
                    <Badge variant="outline" className="bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-200">
                        {stats.faulty} Faulty
                    </Badge>
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-700 hover:bg-orange-500/20 border-orange-200">
                        {stats.maintenance} Maint.
                    </Badge>
                </div>
            </CardHeader>

            <div className="p-4 border-b bg-muted/20">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Highways List
                </h3>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-2">
                    {highways.map(highway => {
                        // Get quick stats for this highway using DYNAMIC lights
                        const hLights = lights.filter(l => l.highwayId === highway.id)
                        const hFaulty = hLights.filter(l => l.status === "faulty").length

                        return (
                            <button
                                key={highway.id}
                                onClick={() => onHighwaySelect(highway.id)}
                                className="w-full text-left p-3 rounded-lg border hover:bg-accent/50 transition-colors group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-semibold text-primary">{highway.code}</div>
                                    {hFaulty > 0 && (
                                        <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
                                            {hFaulty} Faults
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-xs font-medium text-foreground/80 mb-1 line-clamp-1">
                                    {highway.name}
                                </div>
                                <div className="text-[10px] text-muted-foreground flex justify-between items-center mt-2">
                                    <span>{highway.length} km</span>
                                    <span className="flex items-center gap-1 text-primary/80 group-hover:translate-x-1 transition-transform">
                                        View Details <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </button>
                        )
                    })}

                    {highways.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            No highways found based on current filters.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </Card>
    )
}
