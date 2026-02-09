import { Highway, Location } from "@/lib/types"

// Types for Overpass API Response
interface OverpassElement {
    type: "way"
    id: number
    lat?: number
    lon?: number
    tags?: {
        [key: string]: string
    }
    nodes: number[]
    geometry?: { lat: number; lon: number }[]
}

interface OverpassResponse {
    version: number
    generator: string
    osm3s: {
        timestamp_osm_base: string
        copyright: string
    }
    elements: OverpassElement[]
}

const CACHE_KEY_PREFIX = "osm_highways_"

export const osmService = {
    /**
     * Fetches real highway data for a given state from OpenStreetMap using Overpass API
     */
    fetchHighwaysForState: async (stateName: string): Promise<Highway[]> => {
        // Check local storage / session storage cache first
        if (typeof window !== "undefined") {
            const cached = sessionStorage.getItem(CACHE_KEY_PREFIX + stateName)
            if (cached) {
                try {
                    console.log(`Using cached OSM data for ${stateName}`)
                    return JSON.parse(cached)
                } catch (e) {
                    console.error("Failed to parse cached OSM data", e)
                }
            }
        }

        // Overpass QL Query
        // 1. Get area for member state
        // 2. Fetch ways with highway tags (motorway, trunk, primary)
        // 3. Ensure they have a 'ref' or 'name' (to identify specific highways)
        const query = `
      [out:json][timeout:120];
      area[name="${stateName}"]->.searchArea;
      (
        way["highway"~"motorway|trunk|primary"](area.searchArea);
      );
      out geom;
    `

        try {
            console.log(`Fetching OSM data for ${stateName}...`)
            const response = await fetch("https://overpass-api.de/api/interpreter", {
                method: "POST",
                body: query,
            })

            if (!response.ok) {
                throw new Error(`Overpass API Error: ${response.statusText}`)
            }

            const data: OverpassResponse = await response.json()
            const highways = processOverpassData(data, stateName)

            // Cache the result
            if (typeof window !== "undefined" && highways.length > 0) {
                try {
                    sessionStorage.setItem(CACHE_KEY_PREFIX + stateName, JSON.stringify(highways))
                } catch (e) {
                    console.warn("Quota exceeded for session storage", e)
                }
            }

            return highways
        } catch (error) {
            console.error("Failed to fetch OSM highways:", error)
            return [] // Return empty on failure (UI should handle no data)
        }
    },
}

/**
 * Process raw Overpass elements into consolidated Highway objects
 */
function processOverpassData(data: OverpassResponse, stateName: string): Highway[] {
    const elements = data.elements
    const groupedHighways: Record<string, {
        name: string
        ref: string
        segments: { lat: number; lon: number }[][]
    }> = {}

    // 1. Group ways by 'ref' (e.g., "NH44") or 'name' if ref missing
    for (const element of elements) {
        if (element.type === "way" && element.tags) {
            const ref = element.tags["ref"]
            const name = element.tags["name"] || ref || "Unknown Highway"
            // Use ref as primary key if available (e.g., NH44), else name
            const key = ref ? ref.replace(/\s/g, "").toUpperCase() : name.replace(/\s/g, "").toUpperCase()

            // Normalize Highway Codes (e.g., "NH 44" -> "NH-44")
            let displayCode = ref || name
            if (ref && !ref.includes("-") && (ref.startsWith("NH") || ref.startsWith("SH"))) {
                displayCode = ref.replace(/(\D+)(\d+)/, "$1-$2")
            }

            if (!groupedHighways[key]) {
                groupedHighways[key] = {
                    name: name,
                    ref: displayCode,
                    segments: []
                }
            }

            if (element.geometry) {
                groupedHighways[key].segments.push(element.geometry)
            }
        }
    }

    // 2. Convert groups to Highway objects
    const highways: Highway[] = Object.values(groupedHighways).map((group, index) => {
        // Flatten segments to calculate approximate length and extract path
        // In a real app with turf.js, we would merge geometry.
        // Here, we'll pick the longest segment for display representation or just use the first 'path'
        // For sensor simulation, we might want to keep all segments, but our Highway type assumes a single path context?
        // Actually, Highway type mocks a single 'route'. We will take the longest continuous segment for visualization simplicity.

        // Sort segments by length to find the most significant stretch
        const sortedSegments = group.segments.sort((a, b) => b.length - a.length)
        const mainSegment = sortedSegments[0] || []

        // Calculate Length (Haversine approx)
        let lengthKm = 0
        for (let i = 0; i < mainSegment.length - 1; i++) {
            lengthKm += getDistanceFromLatLonInKm(
                mainSegment[i].lat, mainSegment[i].lon,
                mainSegment[i + 1].lat, mainSegment[i + 1].lon
            )
        }

        // Determine Start/End points (Reverse Geocoding is too expensive here, so use mock or empty)
        const startLat = mainSegment[0]?.lat
        const startLon = mainSegment[0]?.lon
        const endLat = mainSegment[mainSegment.length - 1]?.lat
        const endLon = mainSegment[mainSegment.length - 1]?.lon

        return {
            id: `${group.ref.toLowerCase().replace(/\s/g, "-")}-${stateName.toLowerCase().replace(/\s/g, "-")}`,
            name: group.name,
            code: group.ref,
            length: Math.round(lengthKm) || 10, // Min 10km
            totalLights: Math.round(lengthKm * 15) || 150, // Approx 15 lights per km
            startPoint: `Lat: ${startLat?.toFixed(2)}`,
            endPoint: `Lat: ${endLat?.toFixed(2)}`,
            states: [stateName], // It's fetched for this state
            cities: [], // We don't have city data easily
            zones: [],
            // Extra property to hold real geometry for the map to render
            // We'll augment the Highway type or handle it in the component
            tempPath: mainSegment.map(p => [p.lat, p.lon] as [number, number]),
            allSegments: sortedSegments.map(seg => seg.map(p => [p.lat, p.lon] as [number, number]))
        } as any // using 'any' to bypass strict type check for the new temp props for now
    })

    // Filter out tiny segments (e.g. link roads)
    return highways.filter(h => h.length > 5).slice(0, 50) // Limit to top 50 significant highways
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}
