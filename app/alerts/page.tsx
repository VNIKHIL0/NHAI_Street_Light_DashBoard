"use client"

import { FaultLog } from "@/components/alerts/FaultLog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlertsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Alerts & Maintenance</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fault Detection Log</CardTitle>
                    <CardDescription>Real-time system alerts and automated diagnostics</CardDescription>
                </CardHeader>
                <CardContent>
                    <FaultLog />
                </CardContent>
            </Card>
        </div>
    )
}
