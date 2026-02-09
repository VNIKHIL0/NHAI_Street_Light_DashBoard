"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { highwayPerformanceData } from "@/lib/mockData"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface HighwayPerformanceProps {
    timeRange: string
}

export function HighwayPerformance({ timeRange }: HighwayPerformanceProps) {
    // Prepare data for charts
    const efficiencyData = highwayPerformanceData.map(h => ({
        highway: h.highwayCode,
        efficiency: h.operationalEfficiency,
        faultRate: h.faultRate
    }))

    const energyData = highwayPerformanceData.map(h => ({
        highway: h.highwayCode,
        consumption: h.energyConsumption,
        savings: h.costSavings / 1000 // Convert to thousands
    }))

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Summary Cards */}
            {highwayPerformanceData.map(highway => (
                <Card key={highway.highwayId}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{highway.highwayCode}</CardTitle>
                        <CardDescription>Performance Overview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Efficiency</span>
                            <Badge variant={highway.operationalEfficiency > 90 ? "default" : "secondary"}>
                                {highway.operationalEfficiency}%
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Fault Rate</span>
                            <span className="text-sm font-medium">{highway.faultRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Avg Repair</span>
                            <span className="text-sm font-medium">{highway.avgRepairTime}h</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Savings</span>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                ₹{(highway.costSavings / 1000).toFixed(0)}K
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Operational Efficiency Chart */}
            <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                    <CardTitle>Operational Efficiency by Highway</CardTitle>
                    <CardDescription>Percentage of active lights vs total lights</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={efficiencyData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="highway" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="efficiency" fill="#22c55e" name="Efficiency %" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Fault Rate Comparison */}
            <Card className="col-span-full lg:col-span-2">
                <CardHeader>
                    <CardTitle>Fault Rate Comparison</CardTitle>
                    <CardDescription>Faults per 100 lights across highways</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={efficiencyData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="highway" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="faultRate"
                                stroke="#ef4444"
                                strokeWidth={2}
                                name="Fault Rate %"
                                dot={{ fill: '#ef4444', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Energy Consumption & Savings */}
            <Card className="col-span-full">
                <CardHeader>
                    <CardTitle>Energy Consumption & Cost Savings</CardTitle>
                    <CardDescription>kWh consumed vs rupees saved per highway</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={energyData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="highway" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="consumption" fill="#3b82f6" name="Energy (kWh)" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="savings" fill="#22c55e" name="Savings (₹K)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
