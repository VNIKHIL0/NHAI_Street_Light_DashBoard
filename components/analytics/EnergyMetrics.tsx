"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { energyData, highways } from "@/lib/mockData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Zap, TrendingDown, Leaf, DollarSign } from "lucide-react"
import { useMemo } from "react"

interface EnergyMetricsProps {
    timeRange: string
}

export function EnergyMetrics({ timeRange }: EnergyMetricsProps) {
    // Aggregate energy data by hour
    const hourlyData = useMemo(() => {
        const aggregated: Record<string, any> = {}

        energyData.forEach(entry => {
            const hour = entry.timestamp.getHours()
            const key = `${hour}:00`

            if (!aggregated[key]) {
                aggregated[key] = {
                    time: key,
                    consumption: 0,
                    cost: 0,
                    carbon: 0,
                    count: 0
                }
            }

            aggregated[key].consumption += entry.consumption
            aggregated[key].cost += entry.cost
            aggregated[key].carbon += entry.carbonEmission
            aggregated[key].count++
        })

        return Object.values(aggregated).map(item => ({
            time: item.time,
            consumption: Math.round(item.consumption),
            cost: Math.round(item.cost),
            carbon: Math.round(item.carbon)
        })).sort((a, b) => {
            const aHour = parseInt(a.time.split(':')[0])
            const bHour = parseInt(b.time.split(':')[0])
            return aHour - bHour
        })
    }, [])

    // Calculate totals
    const totals = useMemo(() => {
        const totalConsumption = energyData.reduce((sum, e) => sum + e.consumption, 0)
        const totalCost = energyData.reduce((sum, e) => sum + e.cost, 0)
        const totalCarbon = energyData.reduce((sum, e) => sum + e.carbonEmission, 0)
        const avgConsumption = totalConsumption / energyData.length

        return {
            consumption: Math.round(totalConsumption),
            cost: Math.round(totalCost),
            carbon: Math.round(totalCarbon),
            avgConsumption: Math.round(avgConsumption)
        }
    }, [])

    // Per-highway consumption
    const highwayConsumption = useMemo(() => {
        const byHighway: Record<string, { consumption: number, cost: number }> = {}

        energyData.forEach(entry => {
            if (!byHighway[entry.highwayId]) {
                byHighway[entry.highwayId] = { consumption: 0, cost: 0 }
            }
            byHighway[entry.highwayId].consumption += entry.consumption
            byHighway[entry.highwayId].cost += entry.cost
        })

        return highways.map(h => ({
            highway: h.code,
            consumption: Math.round(byHighway[h.id]?.consumption || 0),
            cost: Math.round(byHighway[h.id]?.cost || 0)
        }))
    }, [])

    return (
        <div className="grid gap-4">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totals.consumption.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">kWh in last {timeRange}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Energy Cost</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totals.cost.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Total expenditure</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Carbon Emission</CardTitle>
                        <Leaf className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totals.carbon.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">kg CO₂ emitted</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Consumption</CardTitle>
                        <TrendingDown className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totals.avgConsumption}</div>
                        <p className="text-xs text-muted-foreground">kWh per reading</p>
                    </CardContent>
                </Card>
            </div>

            {/* Hourly Consumption Trend */}
            <Card className="col-span-full">
                <CardHeader>
                    <CardTitle>Hourly Energy Consumption</CardTitle>
                    <CardDescription>Energy usage pattern over 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={hourlyData}>
                            <defs>
                                <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="time" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="consumption"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorConsumption)"
                                name="Consumption (kWh)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Cost Trend */}
            <Card className="col-span-full">
                <CardHeader>
                    <CardTitle>Energy Cost Trend</CardTitle>
                    <CardDescription>Hourly energy expenditure in rupees</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={hourlyData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="time" className="text-xs" />
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
                                dataKey="cost"
                                stroke="#22c55e"
                                strokeWidth={2}
                                name="Cost (₹)"
                                dot={{ fill: '#22c55e', r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Highway-wise Consumption */}
            <Card className="col-span-full">
                <CardHeader>
                    <CardTitle>Highway-wise Energy Consumption</CardTitle>
                    <CardDescription>Consumption and cost breakdown by highway</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {highwayConsumption.map(item => (
                            <div key={item.highway} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline">{item.highway}</Badge>
                                    <div>
                                        <div className="text-sm font-medium">{item.consumption.toLocaleString()} kWh</div>
                                        <div className="text-xs text-muted-foreground">Total consumption</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                        ₹{item.cost.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Energy cost</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
