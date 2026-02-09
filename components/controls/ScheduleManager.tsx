"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const schedules = [
    { id: 1, time: "18:30", action: "Turn On", intensity: "100%", days: "Daily" },
    { id: 2, time: "23:00", action: "Dim", intensity: "70%", days: "Daily" },
    { id: 3, time: "02:00", action: "Dim", intensity: "50%", days: "Daily" },
    { id: 4, time: "05:30", action: "Turn Off", intensity: "0%", days: "Daily" },
]

export function ScheduleManager() {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Automation Schedule
                        </CardTitle>
                        <CardDescription>Manage automated lighting profiles</CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Rule
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {schedules.map((schedule) => (
                        <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/40">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-2 rounded text-primary font-bold text-sm min-w-[60px] text-center">
                                    {schedule.time}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{schedule.action} ({schedule.intensity})</p>
                                    <p className="text-xs text-muted-foreground">{schedule.days}</p>
                                </div>
                            </div>
                            <Badge variant="secondary">Active</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
