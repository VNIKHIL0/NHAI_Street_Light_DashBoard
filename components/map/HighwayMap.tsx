"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"


// Dynamically import MapComponent with SSR disabled
const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse">Loading Map...</div>
})

export function HighwayMap() {
    // Generate mock data along a path (e.g., NH-44 near Delhi)
    const lights: any[] = useMemo(() => {
        const baseLat = 28.6139
        const baseLng = 77.2090
        const items = []
        for (let i = 0; i < 50; i++) {
            items.push({
                id: `NHAI-L-${1000 + i}`,
                lat: baseLat + (i * 0.005) + (Math.random() * 0.001),
                lng: baseLng + (i * 0.002) + (Math.random() * 0.001),
                status: Math.random() > 0.9 ? "faulty" : (Math.random() > 0.8 ? "maintenance" : "active"),
                intensity: Math.random() > 0.9 ? 0 : 80 + Math.floor(Math.random() * 20),
                highwayCode: "NH-44",
                highwayId: "nh-44",
                cityId: "new-delhi",
                stateId: "delhi",
                kmMarker: 10 + i,
                zoneId: "zone-1"
            })
        }
        return items
    }, [])

    return (
        <div className="h-[500px] w-full border rounded-xl overflow-hidden relative z-0">
            <MapComponent lights={lights} highways={[]} />
        </div>
    )
}
