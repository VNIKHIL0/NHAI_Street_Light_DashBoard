"use client"

import { ZoneControl } from "@/components/controls/ZoneControl"
import { ScheduleManager } from "@/components/controls/ScheduleManager"

export default function ControlsPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Control Center</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <ZoneControl
                            id="zone-1"
                            name="Zone A: NH-44 (North)"
                            location="Km 20-35"
                            initialBrightness={80}
                            initialStatus={true}
                        />
                        <ZoneControl
                            id="zone-2"
                            name="Zone B: NH-44 (South)"
                            location="Km 35-50"
                            initialBrightness={60}
                            initialStatus={true}
                        />
                        <ZoneControl
                            id="zone-3"
                            name="Zone C: NH-48 (East)"
                            location="Km 10-25"
                            initialBrightness={100}
                            initialStatus={false}
                        />
                        <ZoneControl
                            id="zone-4"
                            name="Zone D: Plaza Access"
                            location="Toll Plaza 1"
                            initialBrightness={90}
                            initialStatus={true}
                        />
                    </div>
                </div>

                <div>
                    <ScheduleManager />
                </div>
            </div>
        </div>
    )
}
