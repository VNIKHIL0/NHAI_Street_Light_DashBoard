import { Highway, StreetLight } from "@/lib/types"

export const sensorSimulation = {
    /**
     * Generates realistic street light data along the real path of a highway
     * @param highway The highway object with real geometry (tempPath)
     */
    generateLightsForHighway: (highway: any): StreetLight[] => {
        // We expect the highway object to have 'tempPath' or 'allSegments' from osmService
        // tempPath is [lat, lon][]
        const path = highway.tempPath as [number, number][]
        if (!path || path.length < 2) return []

        const lights: StreetLight[] = []

        // Config: Distance between lights (approx 50 meters for high density view)
        // For performance on large maps, we might increase this spacing
        const spacingKm = 0.5 // 500 meters

        let totalDist = 0
        let nextLightDist = 0

        // Iterate through the path segments
        for (let i = 0; i < path.length - 1; i++) {
            const start = path[i]
            const end = path[i + 1]
            const segmentDist = getDistanceFromLatLonInKm(start[0], start[1], end[0], end[1])

            // Check if we should place lights on this segment
            while (nextLightDist <= totalDist + segmentDist) {
                // Calculate position
                const fraction = (nextLightDist - totalDist) / segmentDist
                const lightLat = start[0] + (end[0] - start[0]) * fraction
                const lightLng = start[1] + (end[1] - start[1]) * fraction

                // Generate status based on random probability
                const rand = Math.random()
                let status: "active" | "faulty" | "maintenance" = "active"
                if (rand > 0.96) status = "faulty"      // 2% chance
                else if (rand > 0.93) status = "maintenance" // 3% chance

                // Generate ID
                const lightId = `NHL-${highway.code}-${Math.floor(nextLightDist * 10)}`

                lights.push({
                    id: lightId,
                    lat: lightLat,
                    lng: lightLng,
                    status: status,
                    intensity: status === "active" ? 70 + Math.floor(Math.random() * 30) : 0,
                    highwayId: highway.id,
                    highwayCode: highway.code,
                    zoneId: "zone-auto",
                    cityId: "auto-city", // dynamic city lookup expensive, simplify
                    stateId: highway.states[0] || "unknown",
                    kmMarker: parseFloat(nextLightDist.toFixed(1)),
                    installationDate: new Date(),
                    powerConsumption: 150
                })

                nextLightDist += spacingKm
            }

            totalDist += segmentDist
        }

        return lights
    }
}

// Helper (duplicated from osmService to avoid circular dependency or extract to utils)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}
