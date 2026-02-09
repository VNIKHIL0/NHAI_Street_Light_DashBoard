"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Highway } from "@/lib/types"
import { streetLights, zones } from "@/lib/mockData"
import { X, MapPin, Route, Zap, Activity, AlertTriangle, Wrench } from "lucide-react"
import { useMemo } from "react"

interface HighwayDetailsCardProps {
    highway: Highway
    onClose: () => void
}

export function HighwayDetailsCard({ highway, onClose }: HighwayDetailsCardProps) {
    // Calculate statistics for this highway
    const stats = useMemo(() => {
        const highwayLights = streetLights.filter(l => l.highwayId === highway.id)
        const active = highwayLights.filter(l => l.status === "active").length
        const faulty = highwayLights.filter(l => l.status === "faulty").length
        const maintenance = highwayLights.filter(l => l.status === "maintenance").length
        const avgIntensity = highwayLights.reduce((sum, l) => sum + l.intensity, 0) / highwayLights.length || 0

        return {
            total: highwayLights.length,
            active,
            faulty,
            maintenance,
            avgIntensity: Math.round(avgIntensity),
            efficiency: Math.round((active / highwayLights.length) * 100) || 0
        }
    }, [highway.id])

    const highwayZones = zones.filter(z => z.highwayId === highway.id)

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-xl">{highway.code}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{highway.name}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto space-y-6 pt-6">
                {/* Route Information */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Route className="h-4 w-4 text-primary" />
                        Route Details
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Point:</span>
                            <span className="font-medium">{highway.startPoint}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">End Point:</span>
                            <span className="font-medium">{highway.endPoint}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Length:</span>
                            <span className="font-medium">{highway.length} km</span>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Statistics */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Zap className="h-4 w-4 text-primary" />
                        Light Statistics
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <div className="text-xs text-muted-foreground">Total Lights</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 space-y-1">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
                            <div className="text-xs text-muted-foreground">Active</div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 space-y-1">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.faulty}</div>
                            <div className="text-xs text-muted-foreground">Faulty</div>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 space-y-1">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.maintenance}</div>
                            <div className="text-xs text-muted-foreground">Maintenance</div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Performance Metrics */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Activity className="h-4 w-4 text-primary" />
                        Performance
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Operational Efficiency</span>
                            <Badge variant={stats.efficiency > 90 ? "default" : "secondary"}>
                                {stats.efficiency}%
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Avg. Intensity</span>
                            <Badge variant="outline">{stats.avgIntensity}%</Badge>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Zones */}
                {highwayZones.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-primary" />
                            Zones ({highwayZones.length})
                        </div>
                        <div className="space-y-2">
                            {highwayZones.map(zone => (
                                <div key={zone.id} className="p-3 rounded-lg border bg-card space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{zone.name}</span>
                                        <Badge variant="outline" className="text-xs">
                                            {zone.startKm}-{zone.endKm} km
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                        <div className="text-center">
                                            <div className="font-semibold text-green-600 dark:text-green-400">{zone.activeLights}</div>
                                            <div className="text-muted-foreground">Active</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-red-600 dark:text-red-400">{zone.faultyLights}</div>
                                            <div className="text-muted-foreground">Faulty</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-orange-600 dark:text-orange-400">{zone.maintenanceLights}</div>
                                            <div className="text-muted-foreground">Maint.</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* States Covered */}
                <Separator />
                <div className="space-y-3">
                    <div className="text-sm font-medium">States Covered</div>
                    <div className="flex flex-wrap gap-2">
                        {highway.states.map(state => (
                            <Badge key={state} variant="secondary" className="text-xs">
                                {state}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
