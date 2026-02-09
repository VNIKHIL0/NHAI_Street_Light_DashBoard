// Geographic Types
export interface Location {
    lat: number
    lng: number
}

export interface City {
    id: string
    name: string
    stateId: string
    coordinates: Location
    highways: string[] // Highway codes passing through this city
    totalLights: number
    population?: number
}

export interface State {
    id: string
    name: string
    code: string // e.g., "MH" for Maharashtra
    cities: City[]
    totalHighways: number
    totalLights: number
    region: "North" | "South" | "East" | "West" | "Central" | "Northeast"
    coordinates: Location
}

// Highway and Street Light Types
export interface Highway {
    id: string
    name: string
    code: string // e.g., "NH-44"
    length: number // in kilometers
    totalLights: number
    zones: Zone[]
    startPoint: string
    endPoint: string
    states: string[]
    cities: string[] // City IDs this highway passes through
}

export interface Zone {
    id: string
    name: string
    highwayId: string
    startKm: number
    endKm: number
    totalLights: number
    activeLights: number
    faultyLights: number
    maintenanceLights: number
}

export interface StreetLight {
    id: string
    lat: number
    lng: number
    status: "active" | "faulty" | "maintenance"
    intensity: number // 0-100
    highwayId: string
    highwayCode: string
    zoneId: string
    cityId: string
    stateId: string
    kmMarker: number // kilometer marker on highway
    lastMaintenance?: Date
    installationDate: Date
    powerConsumption: number // in watts
    faultType?: string
    assignedTechnician?: string
}

// Filter Types
export interface FilterState {
    highways: string[] // highway IDs
    statuses: ("active" | "faulty" | "maintenance")[]
    intensityRange: [number, number]
    zones: string[]
    searchQuery: string
    stateId?: string
    cityId?: string
}

// Analytics Types
export interface HighwayPerformanceData {
    highwayId: string
    highwayCode: string
    operationalEfficiency: number // percentage
    energyConsumption: number // kWh
    faultRate: number // faults per 100 lights
    avgRepairTime: number // hours
    costSavings: number // in rupees
}

export interface EnergyData {
    timestamp: Date
    highwayId: string
    consumption: number // kWh
    cost: number // rupees
    carbonEmission: number // kg CO2
}

export interface FaultRecord {
    id: string
    lightId: string
    highwayId: string
    zoneId: string
    faultType: "power_failure" | "bulb_failure" | "sensor_malfunction" | "wiring_issue" | "other"
    severity: "low" | "medium" | "high" | "critical"
    reportedAt: Date
    resolvedAt?: Date
    assignedTo?: string
    status: "open" | "in_progress" | "resolved" | "closed"
    description: string
}

export interface MaintenanceRecord {
    id: string
    lightId: string
    highwayId: string
    type: "routine" | "repair" | "replacement" | "upgrade"
    scheduledDate: Date
    completedDate?: Date
    technician: string
    cost: number
    notes: string
}

// Settings Types
export interface UserPreferences {
    defaultHighway?: string
    defaultView: "dashboard" | "map" | "analytics"
    language: "en" | "hi"
    timezone: string
    autoRefresh: boolean
    refreshInterval: number // seconds
}

export interface NotificationSettings {
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
    faultAlerts: boolean
    maintenanceReminders: boolean
    energyReports: boolean
    severityThreshold: "low" | "medium" | "high"
}

export interface SystemConfig {
    apiEndpoint: string
    dataRetentionDays: number
    autoBackup: boolean
    backupInterval: number // hours
    maxConcurrentUsers: number
}
