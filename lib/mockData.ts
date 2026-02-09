import type { Highway, Zone, StreetLight, HighwayPerformanceData, EnergyData, FaultRecord } from "./types"
import { cities } from "./geoData"

// National Highways Data
export const highways: Highway[] = [
    {
        id: "nh-44",
        name: "National Highway 44",
        code: "NH-44",
        length: 3745,
        totalLights: 4200,
        startPoint: "Srinagar",
        endPoint: "Kanyakumari",
        states: ["Jammu & Kashmir", "Punjab", "Haryana", "Delhi", "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Telangana", "Karnataka", "Tamil Nadu"],
        cities: ["new-delhi", "faridabad", "agra", "nagpur", "hyderabad", "bangalore", "chennai", "madurai", "salem"],
        zones: []
    },
    {
        id: "nh-48",
        name: "National Highway 48",
        code: "NH-48",
        length: 2807,
        totalLights: 3150,
        startPoint: "Delhi",
        endPoint: "Chennai",
        states: ["Delhi", "Haryana", "Rajasthan", "Gujarat", "Maharashtra", "Karnataka", "Tamil Nadu"],
        cities: ["new-delhi", "dwarka", "gurgaon", "jaipur", "ahmedabad", "mumbai", "pune", "bangalore", "chennai"],
        zones: []
    },
    {
        id: "nh-1",
        name: "National Highway 1",
        code: "NH-1",
        length: 456,
        totalLights: 1850,
        startPoint: "Delhi",
        endPoint: "Attari",
        states: ["Delhi", "Haryana", "Punjab"],
        cities: ["new-delhi", "rohini", "panipat", "ambala", "chandigarh", "ludhiana", "amritsar"],
        zones: []
    },
    {
        id: "nh-2",
        name: "National Highway 2",
        code: "NH-2",
        length: 1465,
        totalLights: 2400,
        startPoint: "Delhi",
        endPoint: "Kolkata",
        states: ["Delhi", "Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal"],
        cities: ["new-delhi", "agra", "kanpur", "varanasi", "durgapur", "kolkata"],
        zones: []
    },
    {
        id: "nh-8",
        name: "National Highway 8",
        code: "NH-8",
        length: 1428,
        totalLights: 1980,
        startPoint: "Delhi",
        endPoint: "Mumbai",
        states: ["Delhi", "Haryana", "Rajasthan", "Gujarat", "Maharashtra"],
        cities: ["new-delhi", "gurgaon", "jaipur", "ahmedabad", "vadodara", "surat", "mumbai"],
        zones: []
    },
    {
        id: "sh-1-tn",
        name: "State Highway 1 (Tamil Nadu)",
        code: "SH-1",
        length: 220,
        totalLights: 850,
        startPoint: "Chennai",
        endPoint: "Tuticorin",
        states: ["Tamil Nadu"],
        cities: ["chennai", "trichy", "madurai", "tuticorin"],
        zones: []
    },
    {
        id: "sh-25-tn",
        name: "State Highway 25 (Tamil Nadu)",
        code: "SH-25",
        length: 180,
        totalLights: 620,
        startPoint: "Trichy",
        endPoint: "Namakkal",
        states: ["Tamil Nadu"],
        cities: ["trichy", "namakkal", "salem"],
        zones: []
    },
    {
        id: "nh-38-tn",
        name: "National Highway 38",
        code: "NH-38",
        length: 604,
        totalLights: 1500,
        startPoint: "Vellore",
        endPoint: "Tuticorin",
        states: ["Tamil Nadu"],
        cities: ["chennai", "trichy", "madurai", "tuticorin"], // Approximated cities for path
        zones: []
    },
    {
        id: "nh-81-tn",
        name: "National Highway 81",
        code: "NH-81",
        length: 340,
        totalLights: 950,
        startPoint: "Coimbatore",
        endPoint: "Chidambaram",
        states: ["Tamil Nadu"],
        cities: ["coimbatore", "trichy"],
        zones: []
    },
    {
        id: "sh-49-tn",
        name: "East Coast Road (ECR)",
        code: "SH-49",
        length: 690,
        totalLights: 2100,
        startPoint: "Chennai",
        endPoint: "Kanyakumari",
        states: ["Tamil Nadu"],
        cities: ["chennai", "tuticorin"], // Simplified path for OSRM
        zones: []
    },
    {
        id: "sh-15-tn",
        name: "State Highway 15 (Tamil Nadu)",
        code: "SH-15",
        length: 160,
        totalLights: 580,
        startPoint: "Erode",
        endPoint: "Ooty",
        states: ["Tamil Nadu"],
        cities: ["coimbatore", "mysore"], // Connects near these
        zones: []
    },
    // Delhi State Highways / Major Roads
    {
        id: "sh-del-ring",
        name: "Ring Road (Delhi)",
        code: "Ring Road",
        length: 87,
        totalLights: 3500,
        startPoint: "AIIMS",
        endPoint: "AIIMS",
        states: ["Delhi"],
        cities: ["new-delhi", "dwarka", "rohini", "noida"],
        zones: []
    },
    // Maharashtra State Highways
    {
        id: "sh-10-mh",
        name: "State Highway 10 (Maharashtra)",
        code: "SH-10",
        length: 240,
        totalLights: 950,
        startPoint: "Pune",
        endPoint: "Nashik",
        states: ["Maharashtra"],
        cities: ["pune", "nashik", "sangamner"],
        zones: []
    },
    {
        id: "sh-60-mh",
        name: "State Highway 60 (Maharashtra)",
        code: "SH-60",
        length: 160,
        totalLights: 720,
        startPoint: "Pune",
        endPoint: "Ahmednagar",
        states: ["Maharashtra"],
        cities: ["pune", "ahmednagar"],
        zones: []
    },
    {
        id: "sh-27-mh",
        name: "State Highway 27 (Maharashtra)",
        code: "SH-27",
        length: 120,
        totalLights: 550,
        startPoint: "Pune",
        endPoint: "Baramati",
        states: ["Maharashtra"],
        cities: ["pune", "baramati"],
        zones: []
    },
    // Karnataka State Highways
    {
        id: "sh-17-ka",
        name: "State Highway 17 (Karnataka)",
        code: "SH-17",
        length: 145,
        totalLights: 800,
        startPoint: "Bangalore",
        endPoint: "Mysore",
        states: ["Karnataka"],
        cities: ["bangalore", "mysore", "mandya", "ramanagara"],
        zones: []
    },
    {
        id: "sh-19-ka",
        name: "State Highway 19 (Karnataka)",
        code: "SH-19",
        length: 130,
        totalLights: 600,
        startPoint: "Gulbarga",
        endPoint: "Bidar",
        states: ["Karnataka"],
        cities: ["gulbarga", "bidar"],
        zones: []
    },
    {
        id: "sh-33-ka",
        name: "State Highway 33 (Karnataka)",
        code: "SH-33",
        length: 110,
        totalLights: 450,
        startPoint: "Mysore",
        endPoint: "HD Kote",
        states: ["Karnataka"],
        cities: ["mysore", "hd-kote"],
        zones: []
    },
    // Gujarat State Highways
    {
        id: "sh-41-gj",
        name: "State Highway 41 (Gujarat)",
        code: "SH-41",
        length: 110,
        totalLights: 450,
        startPoint: "Ahmedabad",
        endPoint: "Mehsana",
        states: ["Gujarat"],
        cities: ["ahmedabad", "mehsana"],
        zones: []
    },
    {
        id: "sh-5-gj",
        name: "State Highway 5 (Gujarat)",
        code: "SH-5",
        length: 180,
        totalLights: 700,
        startPoint: "Rajkot",
        endPoint: "Jamnagar",
        states: ["Gujarat"],
        cities: ["rajkot", "jamnagar"],
        zones: []
    },
    {
        id: "sh-160-gj",
        name: "State Highway 160 (Gujarat)",
        code: "SH-160",
        length: 95,
        totalLights: 380,
        startPoint: "Vadodara",
        endPoint: "Padra",
        states: ["Gujarat"],
        cities: ["vadodara", "padra"],
        zones: []
    },
    // Rajasthan State Highways
    {
        id: "sh-12-rj",
        name: "State Highway 12 (Rajasthan)",
        code: "SH-12",
        length: 185,
        totalLights: 550,
        startPoint: "Jaipur",
        endPoint: "Bhilwara",
        states: ["Rajasthan"],
        cities: ["jaipur", "bhilwara", "kishangarh"],
        zones: []
    },
    {
        id: "sh-19-rj",
        name: "State Highway 19 (Rajasthan)",
        code: "SH-19",
        length: 160,
        totalLights: 620,
        startPoint: "Jodhpur",
        endPoint: "Pokhran",
        states: ["Rajasthan"],
        cities: ["jodhpur", "pokhran"],
        zones: []
    },
    {
        id: "sh-28-rj",
        name: "State Highway 28 (Rajasthan)",
        code: "SH-28",
        length: 120,
        totalLights: 480,
        startPoint: "Udaipur",
        endPoint: "Chittorgarh",
        states: ["Rajasthan"],
        cities: ["udaipur", "chittorgarh"],
        zones: []
    },
    // Uttar Pradesh State Highways
    {
        id: "sh-5-up",
        name: "State Highway 5 (Uttar Pradesh)",
        code: "SH-5",
        length: 156,
        totalLights: 680,
        startPoint: "Lucknow",
        endPoint: "Unnao",
        states: ["Uttar Pradesh"],
        cities: ["lucknow", "unnao", "kanpur"],
        zones: []
    },
    {
        id: "sh-33-up",
        name: "State Highway 33 (Uttar Pradesh)",
        code: "SH-33",
        length: 140,
        totalLights: 520,
        startPoint: "Agra",
        endPoint: "Mathura",
        states: ["Uttar Pradesh"],
        cities: ["agra", "mathura"],
        zones: []
    },
    {
        id: "sh-40-up",
        name: "State Highway 40 (Uttar Pradesh)",
        code: "SH-40",
        length: 110,
        totalLights: 400,
        startPoint: "Varanasi",
        endPoint: "Jaunpur",
        states: ["Uttar Pradesh"],
        cities: ["varanasi", "jaunpur"],
        zones: []
    },
    // Punjab State Highways
    {
        id: "sh-11-pb",
        name: "State Highway 11 (Punjab)",
        code: "SH-11",
        length: 112,
        totalLights: 420,
        startPoint: "Ludhiana",
        endPoint: "Malerkotla",
        states: ["Punjab"],
        cities: ["ludhiana", "malerkotla"],
        zones: []
    },
    {
        id: "sh-24-pb",
        name: "State Highway 24 (Punjab)",
        code: "SH-24",
        length: 90,
        totalLights: 350,
        startPoint: "Amritsar",
        endPoint: "Tarn Taran",
        states: ["Punjab"],
        cities: ["amritsar", "tarn-taran"],
        zones: []
    },
    // Haryana State Highways
    {
        id: "sh-13-hr",
        name: "State Highway 13 (Haryana)",
        code: "SH-13",
        length: 85,
        totalLights: 380,
        startPoint: "Gurgaon",
        endPoint: "Jhajjar",
        states: ["Haryana"],
        cities: ["gurgaon", "jhajjar"],
        zones: []
    },
    {
        id: "sh-6-hr",
        name: "State Highway 6 (Haryana)",
        code: "SH-6",
        length: 70,
        totalLights: 290,
        startPoint: "Panipat",
        endPoint: "Assandh",
        states: ["Haryana"],
        cities: ["panipat", "assandh"],
        zones: []
    },
    // West Bengal State Highways
    {
        id: "sh-2-wb",
        name: "State Highway 2 (West Bengal)",
        code: "SH-2",
        length: 95,
        totalLights: 400,
        startPoint: "Kolkata",
        endPoint: "Barasat",
        states: ["West Bengal"],
        cities: ["kolkata", "barasat"],
        zones: []
    },
    {
        id: "sh-1-wb",
        name: "State Highway 1 (West Bengal)",
        code: "SH-1",
        length: 120,
        totalLights: 500,
        startPoint: "Bongaon",
        endPoint: "Chakdaha",
        states: ["West Bengal"],
        cities: ["bongaon", "chakdaha"],
        zones: []
    },
    // Telangana State Highways
    {
        id: "sh-1-tg",
        name: "State Highway 1 (Telangana)",
        code: "SH-1",
        length: 130,
        totalLights: 520,
        startPoint: "Hyderabad",
        endPoint: "Karimnagar",
        states: ["Telangana"],
        cities: ["hyderabad", "karimnagar"],
        zones: []
    },
    {
        id: "sh-19-tg",
        name: "State Highway 19 (Telangana)",
        code: "SH-19",
        length: 160,
        totalLights: 610,
        startPoint: "Warangal",
        endPoint: "Khammam",
        states: ["Telangana"],
        cities: ["warangal", "khammam"],
        zones: []
    },
    // Andhra Pradesh State Highways
    {
        id: "sh-30-ap",
        name: "State Highway 30 (Andhra Pradesh)",
        code: "SH-30",
        length: 160,
        totalLights: 580,
        startPoint: "Vijayawada",
        endPoint: "Guntur",
        states: ["Andhra Pradesh"],
        cities: ["vijayawada", "guntur"],
        zones: []
    },
    {
        id: "sh-38-ap",
        name: "State Highway 38 (Andhra Pradesh)",
        code: "SH-38",
        length: 115,
        totalLights: 460,
        startPoint: "Visakhapatnam",
        endPoint: "Araku",
        states: ["Andhra Pradesh"],
        cities: ["visakhapatnam", "araku"],
        zones: []
    }
]

// Zones for NH-44 (Delhi region)
export const zones: Zone[] = [
    {
        id: "nh44-z1",
        name: "Delhi South Zone",
        highwayId: "nh-44",
        startKm: 0,
        endKm: 50,
        totalLights: 450,
        activeLights: 420,
        faultyLights: 15,
        maintenanceLights: 15
    },
    {
        id: "nh44-z2",
        name: "Faridabad Zone",
        highwayId: "nh-44",
        startKm: 50,
        endKm: 100,
        totalLights: 380,
        activeLights: 360,
        faultyLights: 10,
        maintenanceLights: 10
    },
    {
        id: "nh44-z3",
        name: "Mathura Zone",
        highwayId: "nh-44",
        startKm: 100,
        endKm: 200,
        totalLights: 520,
        activeLights: 485,
        faultyLights: 20,
        maintenanceLights: 15
    },
    {
        id: "nh48-z1",
        name: "Delhi West Zone",
        highwayId: "nh-48",
        startKm: 0,
        endKm: 60,
        totalLights: 420,
        activeLights: 395,
        faultyLights: 12,
        maintenanceLights: 13
    },
    {
        id: "nh48-z2",
        name: "Gurgaon Zone",
        highwayId: "nh-48",
        startKm: 60,
        endKm: 120,
        totalLights: 480,
        activeLights: 450,
        faultyLights: 18,
        maintenanceLights: 12
    }
]

// Generate street lights along highways with city/state mapping
export const generateStreetLights = (count: number = 500): StreetLight[] => {
    const lights: StreetLight[] = []
    const faultTypes = ["power_failure", "bulb_failure", "sensor_malfunction", "wiring_issue"]

    // Distribute lights across all cities
    cities.forEach((city, cityIndex) => {
        // Cap lights per city to ensure we have distribution across all cities within the total count
        const lightsPerCity = 1000 // Increased from 20 to allow more density

        for (let i = 0; i < lightsPerCity; i++) {
            // Get a random highway that passes through this city
            const cityHighways = highways.filter(h => city.highways.some(ch => h.code === ch))
            if (cityHighways.length === 0) continue

            const highway = cityHighways[Math.floor(Math.random() * cityHighways.length)]
            const zoneIndex = Math.floor(Math.random() * zones.length)
            const zone = zones[zoneIndex]

            const status = Math.random() > 0.92 ? "faulty" : (Math.random() > 0.85 ? "maintenance" : "active")

            // Distribute lights around city coordinates - Increased spread for highway simulation
            const latOffset = (Math.random() - 0.5) * 0.15 // ±0.075 degrees (~8km)
            const lngOffset = (Math.random() - 0.5) * 0.15

            lights.push({
                id: `NHAI-${highway.code}-${city.id}-${1000 + i}`,
                lat: city.coordinates.lat + latOffset,
                lng: city.coordinates.lng + lngOffset,
                status,
                intensity: status === "faulty" ? 0 : 75 + Math.floor(Math.random() * 25),
                highwayId: highway.id,
                highwayCode: highway.code,
                zoneId: zone.id,
                cityId: city.id,
                stateId: city.stateId,
                kmMarker: Math.floor(Math.random() * 200),
                lastMaintenance: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
                installationDate: new Date(Date.now() - Math.random() * 730 * 24 * 60 * 60 * 1000),
                powerConsumption: 150 + Math.floor(Math.random() * 100),
                faultType: status === "faulty" ? faultTypes[Math.floor(Math.random() * faultTypes.length)] : undefined
            })

            if (lights.length >= count) break
        }

        if (lights.length >= count) return
    })

    return lights.slice(0, count)
}

// Highway Performance Data
export const highwayPerformanceData: HighwayPerformanceData[] = [
    {
        highwayId: "nh-44",
        highwayCode: "NH-44",
        operationalEfficiency: 92.5,
        energyConsumption: 1250.5,
        faultRate: 2.8,
        avgRepairTime: 4.5,
        costSavings: 125000
    },
    {
        highwayId: "nh-48",
        highwayCode: "NH-48",
        operationalEfficiency: 89.3,
        energyConsumption: 980.2,
        faultRate: 3.2,
        avgRepairTime: 5.2,
        costSavings: 98000
    },
    {
        highwayId: "nh-1",
        highwayCode: "NH-1",
        operationalEfficiency: 94.1,
        energyConsumption: 620.8,
        faultRate: 2.1,
        avgRepairTime: 3.8,
        costSavings: 75000
    },
    {
        highwayId: "nh-2",
        highwayCode: "NH-2",
        operationalEfficiency: 87.6,
        energyConsumption: 850.3,
        faultRate: 3.8,
        avgRepairTime: 6.1,
        costSavings: 82000
    },
    {
        highwayId: "nh-8",
        highwayCode: "NH-8",
        operationalEfficiency: 90.8,
        energyConsumption: 720.5,
        faultRate: 2.9,
        avgRepairTime: 4.8,
        costSavings: 88000
    }
]

// Energy consumption data (last 24 hours)
export const generateEnergyData = (): EnergyData[] => {
    const data: EnergyData[] = []
    const now = new Date()

    highways.forEach(highway => {
        for (let i = 23; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)
            const baseConsumption = highway.totalLights * 0.2 // kWh
            const variation = Math.random() * 0.3 - 0.15 // ±15% variation
            const consumption = baseConsumption * (1 + variation)

            data.push({
                timestamp,
                highwayId: highway.id,
                consumption,
                cost: consumption * 6.5, // ₹6.5 per kWh
                carbonEmission: consumption * 0.82 // 0.82 kg CO2 per kWh
            })
        }
    })

    return data
}

// Fault records
export const generateFaultRecords = (count: number = 50): FaultRecord[] => {
    const faults: FaultRecord[] = []
    const faultTypes: FaultRecord["faultType"][] = ["power_failure", "bulb_failure", "sensor_malfunction", "wiring_issue", "other"]
    const severities: FaultRecord["severity"][] = ["low", "medium", "high", "critical"]
    const statuses: FaultRecord["status"][] = ["open", "in_progress", "resolved", "closed"]

    for (let i = 0; i < count; i++) {
        const reportedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const resolvedAt = status === "resolved" || status === "closed"
            ? new Date(reportedAt.getTime() + Math.random() * 48 * 60 * 60 * 1000)
            : undefined

        const highway = highways[Math.floor(Math.random() * highways.length)]
        const zone = zones[Math.floor(Math.random() * zones.length)]

        faults.push({
            id: `FLT-${1000 + i}`,
            lightId: `NHAI-${highway.code}-${1000 + Math.floor(Math.random() * 200)}`,
            highwayId: highway.id,
            zoneId: zone.id,
            faultType: faultTypes[Math.floor(Math.random() * faultTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            reportedAt,
            resolvedAt,
            assignedTo: Math.random() > 0.3 ? `Tech-${Math.floor(Math.random() * 20) + 1}` : undefined,
            status,
            description: "Automated fault detection triggered"
        })
    }

    return faults.sort((a, b) => b.reportedAt.getTime() - a.reportedAt.getTime())
}

// Export generated data
export const streetLights = generateStreetLights(2000)
export const energyData = generateEnergyData()
export const faultRecords = generateFaultRecords(50)
