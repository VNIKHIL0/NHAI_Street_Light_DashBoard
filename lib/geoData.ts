import type { State, City } from "./types"

// Comprehensive Indian States and Cities Data
export const states: State[] = [
    {
        id: "delhi",
        name: "Delhi",
        code: "DL",
        region: "North",
        totalHighways: 8,
        totalLights: 12450,
        coordinates: { lat: 28.7041, lng: 77.1025 },
        cities: []
    },
    {
        id: "maharashtra",
        name: "Maharashtra",
        code: "MH",
        region: "West",
        totalHighways: 15,
        totalLights: 28500,
        coordinates: { lat: 19.7515, lng: 75.7139 },
        cities: []
    },
    {
        id: "karnataka",
        name: "Karnataka",
        code: "KA",
        region: "South",
        totalHighways: 12,
        totalLights: 22300,
        coordinates: { lat: 15.3173, lng: 75.7139 },
        cities: []
    },
    {
        id: "tamil-nadu",
        name: "Tamil Nadu",
        code: "TN",
        region: "South",
        totalHighways: 14,
        totalLights: 25600,
        coordinates: { lat: 11.1271, lng: 78.6569 },
        cities: []
    },
    {
        id: "gujarat",
        name: "Gujarat",
        code: "GJ",
        region: "West",
        totalHighways: 11,
        totalLights: 19800,
        coordinates: { lat: 22.2587, lng: 71.1924 },
        cities: []
    },
    {
        id: "rajasthan",
        name: "Rajasthan",
        code: "RJ",
        region: "North",
        totalHighways: 13,
        totalLights: 21400,
        coordinates: { lat: 27.0238, lng: 74.2179 },
        cities: []
    },
    {
        id: "uttar-pradesh",
        name: "Uttar Pradesh",
        code: "UP",
        region: "North",
        totalHighways: 16,
        totalLights: 31200,
        coordinates: { lat: 26.8467, lng: 80.9462 },
        cities: []
    },
    {
        id: "punjab",
        name: "Punjab",
        code: "PB",
        region: "North",
        totalHighways: 9,
        totalLights: 15600,
        coordinates: { lat: 31.1471, lng: 75.3412 },
        cities: []
    },
    {
        id: "haryana",
        name: "Haryana",
        code: "HR",
        region: "North",
        totalHighways: 10,
        totalLights: 17800,
        coordinates: { lat: 29.0588, lng: 76.0856 },
        cities: []
    },
    {
        id: "west-bengal",
        name: "West Bengal",
        code: "WB",
        region: "East",
        totalHighways: 11,
        totalLights: 19500,
        coordinates: { lat: 22.9868, lng: 87.8550 },
        cities: []
    },
    {
        id: "telangana",
        name: "Telangana",
        code: "TG",
        region: "South",
        totalHighways: 10,
        totalLights: 18200,
        coordinates: { lat: 18.1124, lng: 79.0193 },
        cities: []
    },
    {
        id: "andhra-pradesh",
        name: "Andhra Pradesh",
        code: "AP",
        region: "South",
        totalHighways: 12,
        totalLights: 20800,
        coordinates: { lat: 15.9129, lng: 79.7400 },
        cities: []
    }
]

// Cities data
export const cities: City[] = [
    // Delhi
    { id: "new-delhi", name: "New Delhi", stateId: "delhi", coordinates: { lat: 28.6139, lng: 77.2090 }, highways: ["NH-44", "NH-48", "NH-1", "NH-2", "NH-8"], totalLights: 5200, population: 25700000 },
    { id: "dwarka", name: "Dwarka", stateId: "delhi", coordinates: { lat: 28.5921, lng: 77.0460 }, highways: ["NH-48"], totalLights: 2800 },
    { id: "rohini", name: "Rohini", stateId: "delhi", coordinates: { lat: 28.7495, lng: 77.0736 }, highways: ["NH-1"], totalLights: 2400 },
    { id: "noida", name: "Noida", stateId: "delhi", coordinates: { lat: 28.5355, lng: 77.3910 }, highways: ["NH-24"], totalLights: 2050 },

    // Maharashtra
    { id: "mumbai", name: "Mumbai", stateId: "maharashtra", coordinates: { lat: 19.0760, lng: 72.8777 }, highways: ["NH-48", "NH-66"], totalLights: 8500, population: 20400000 },
    { id: "pune", name: "Pune", stateId: "maharashtra", coordinates: { lat: 18.5204, lng: 73.8567 }, highways: ["NH-48", "NH-65"], totalLights: 5200, population: 6400000 },
    { id: "nagpur", name: "Nagpur", stateId: "maharashtra", coordinates: { lat: 21.1458, lng: 79.0882 }, highways: ["NH-44", "NH-53"], totalLights: 3800, population: 2400000 },
    { id: "nashik", name: "Nashik", stateId: "maharashtra", coordinates: { lat: 19.9975, lng: 73.7898 }, highways: ["NH-60"], totalLights: 2600 },
    { id: "aurangabad", name: "Aurangabad", stateId: "maharashtra", coordinates: { lat: 19.8762, lng: 75.3433 }, highways: ["NH-52"], totalLights: 2200 },
    { id: "thane", name: "Thane", stateId: "maharashtra", coordinates: { lat: 19.2183, lng: 72.9781 }, highways: ["NH-48"], totalLights: 3100 },

    // Karnataka
    { id: "bangalore", name: "Bangalore", stateId: "karnataka", coordinates: { lat: 12.9716, lng: 77.5946 }, highways: ["NH-44", "NH-48", "NH-75"], totalLights: 7800, population: 12300000 },
    { id: "mysore", name: "Mysore", stateId: "karnataka", coordinates: { lat: 12.2958, lng: 76.6394 }, highways: ["NH-275"], totalLights: 2800, population: 920000 },
    { id: "mangalore", name: "Mangalore", stateId: "karnataka", coordinates: { lat: 12.9141, lng: 74.8560 }, highways: ["NH-66", "NH-75"], totalLights: 2400 },
    { id: "hubli", name: "Hubli", stateId: "karnataka", coordinates: { lat: 15.3647, lng: 75.1240 }, highways: ["NH-63"], totalLights: 1900 },
    { id: "belgaum", name: "Belgaum", stateId: "karnataka", coordinates: { lat: 15.8497, lng: 74.4977 }, highways: ["NH-4"], totalLights: 1600 },

    // Tamil Nadu
    { id: "chennai", name: "Chennai", stateId: "tamil-nadu", coordinates: { lat: 13.0827, lng: 80.2707 }, highways: ["NH-44", "NH-48", "NH-16"], totalLights: 7200, population: 10700000 },
    { id: "coimbatore", name: "Coimbatore", stateId: "tamil-nadu", coordinates: { lat: 11.0168, lng: 76.9558 }, highways: ["NH-544"], totalLights: 3400, population: 2100000 },
    { id: "madurai", name: "Madurai", stateId: "tamil-nadu", coordinates: { lat: 9.9252, lng: 78.1198 }, highways: ["NH-44", "NH-85"], totalLights: 2800 },
    { id: "trichy", name: "Tiruchirappalli", stateId: "tamil-nadu", coordinates: { lat: 10.7905, lng: 78.7047 }, highways: ["NH-83"], totalLights: 2200 },
    { id: "salem", name: "Salem", stateId: "tamil-nadu", coordinates: { lat: 11.6643, lng: 78.1460 }, highways: ["NH-44"], totalLights: 1900 },

    // Gujarat
    { id: "ahmedabad", name: "Ahmedabad", stateId: "gujarat", coordinates: { lat: 23.0225, lng: 72.5714 }, highways: ["NH-48", "NH-147"], totalLights: 6200, population: 7700000 },
    { id: "surat", name: "Surat", stateId: "gujarat", coordinates: { lat: 21.1702, lng: 72.8311 }, highways: ["NH-48"], totalLights: 4800, population: 6100000 },
    { id: "vadodara", name: "Vadodara", stateId: "gujarat", coordinates: { lat: 22.3072, lng: 73.1812 }, highways: ["NH-48", "NH-64"], totalLights: 2900 },
    { id: "rajkot", name: "Rajkot", stateId: "gujarat", coordinates: { lat: 22.3039, lng: 70.8022 }, highways: ["NH-27"], totalLights: 2400 },

    // Rajasthan
    { id: "jaipur", name: "Jaipur", stateId: "rajasthan", coordinates: { lat: 26.9124, lng: 75.7873 }, highways: ["NH-48", "NH-52"], totalLights: 5600, population: 3900000 },
    { id: "jodhpur", name: "Jodhpur", stateId: "rajasthan", coordinates: { lat: 26.2389, lng: 73.0243 }, highways: ["NH-62"], totalLights: 2800 },
    { id: "udaipur", name: "Udaipur", stateId: "rajasthan", coordinates: { lat: 24.5854, lng: 73.7125 }, highways: ["NH-58"], totalLights: 2200 },
    { id: "kota", name: "Kota", stateId: "rajasthan", coordinates: { lat: 25.2138, lng: 75.8648 }, highways: ["NH-52"], totalLights: 1900 },

    // Uttar Pradesh
    { id: "lucknow", name: "Lucknow", stateId: "uttar-pradesh", coordinates: { lat: 26.8467, lng: 80.9462 }, highways: ["NH-27", "NH-30"], totalLights: 5800, population: 3400000 },
    { id: "kanpur", name: "Kanpur", stateId: "uttar-pradesh", coordinates: { lat: 26.4499, lng: 80.3319 }, highways: ["NH-2", "NH-25"], totalLights: 4200 },
    { id: "agra", name: "Agra", stateId: "uttar-pradesh", coordinates: { lat: 27.1767, lng: 78.0081 }, highways: ["NH-44", "NH-2"], totalLights: 3600 },
    { id: "varanasi", name: "Varanasi", stateId: "uttar-pradesh", coordinates: { lat: 25.3176, lng: 82.9739 }, highways: ["NH-2"], totalLights: 2900 },
    { id: "noida-up", name: "Greater Noida", stateId: "uttar-pradesh", coordinates: { lat: 28.4744, lng: 77.5040 }, highways: ["NH-24"], totalLights: 2800 },

    // Punjab
    { id: "chandigarh", name: "Chandigarh", stateId: "punjab", coordinates: { lat: 30.7333, lng: 76.7794 }, highways: ["NH-1", "NH-5"], totalLights: 3200, population: 1050000 },
    { id: "ludhiana", name: "Ludhiana", stateId: "punjab", coordinates: { lat: 30.9010, lng: 75.8573 }, highways: ["NH-1", "NH-95"], totalLights: 3800 },
    { id: "amritsar", name: "Amritsar", stateId: "punjab", coordinates: { lat: 31.6340, lng: 74.8723 }, highways: ["NH-1"], totalLights: 2900 },
    { id: "jalandhar", name: "Jalandhar", stateId: "punjab", coordinates: { lat: 31.3260, lng: 75.5762 }, highways: ["NH-1"], totalLights: 2400 },

    // Haryana
    { id: "gurgaon", name: "Gurgaon", stateId: "haryana", coordinates: { lat: 28.4595, lng: 77.0266 }, highways: ["NH-48", "NH-8"], totalLights: 4800, population: 1200000 },
    { id: "faridabad", name: "Faridabad", stateId: "haryana", coordinates: { lat: 28.4089, lng: 77.3178 }, highways: ["NH-44"], totalLights: 3600 },
    { id: "panipat", name: "Panipat", stateId: "haryana", coordinates: { lat: 29.3909, lng: 76.9635 }, highways: ["NH-1"], totalLights: 2200 },
    { id: "ambala", name: "Ambala", stateId: "haryana", coordinates: { lat: 30.3782, lng: 76.7767 }, highways: ["NH-1"], totalLights: 1800 },

    // West Bengal
    { id: "kolkata", name: "Kolkata", stateId: "west-bengal", coordinates: { lat: 22.5726, lng: 88.3639 }, highways: ["NH-2", "NH-6", "NH-12"], totalLights: 7400, population: 14700000 },
    { id: "howrah", name: "Howrah", stateId: "west-bengal", coordinates: { lat: 22.5958, lng: 88.2636 }, highways: ["NH-6"], totalLights: 3200 },
    { id: "durgapur", name: "Durgapur", stateId: "west-bengal", coordinates: { lat: 23.5204, lng: 87.3119 }, highways: ["NH-2"], totalLights: 2400 },
    { id: "siliguri", name: "Siliguri", stateId: "west-bengal", coordinates: { lat: 26.7271, lng: 88.3953 }, highways: ["NH-31"], totalLights: 2200 },

    // Telangana
    { id: "hyderabad", name: "Hyderabad", stateId: "telangana", coordinates: { lat: 17.3850, lng: 78.4867 }, highways: ["NH-44", "NH-65"], totalLights: 6800, population: 10000000 },
    { id: "warangal", name: "Warangal", stateId: "telangana", coordinates: { lat: 17.9689, lng: 79.5941 }, highways: ["NH-163"], totalLights: 2600 },
    { id: "nizamabad", name: "Nizamabad", stateId: "telangana", coordinates: { lat: 18.6725, lng: 78.0941 }, highways: ["NH-44"], totalLights: 1800 },

    // Andhra Pradesh
    { id: "visakhapatnam", name: "Visakhapatnam", stateId: "andhra-pradesh", coordinates: { lat: 17.6868, lng: 83.2185 }, highways: ["NH-16"], totalLights: 4200, population: 2000000 },
    { id: "vijayawada", name: "Vijayawada", stateId: "andhra-pradesh", coordinates: { lat: 16.5062, lng: 80.6480 }, highways: ["NH-16", "NH-65"], totalLights: 3400 },
    { id: "tirupati", name: "Tirupati", stateId: "andhra-pradesh", coordinates: { lat: 13.6288, lng: 79.4192 }, highways: ["NH-71"], totalLights: 2200 },
    { id: "guntur", name: "Guntur", stateId: "andhra-pradesh", coordinates: { lat: 16.3067, lng: 80.4365 }, highways: ["NH-16"], totalLights: 2400 }
]

// Map cities to their states
states.forEach(state => {
    state.cities = cities.filter(city => city.stateId === state.id)
})

// Helper function to get cities by state
export const getCitiesByState = (stateId: string): City[] => {
    return cities.filter(city => city.stateId === stateId)
}

// Helper function to get state by ID
export const getStateById = (stateId: string): State | undefined => {
    return states.find(state => state.id === stateId)
}

// Helper function to get city by ID
export const getCityById = (cityId: string): City | undefined => {
    return cities.filter(city => city.id === cityId)[0]
}
