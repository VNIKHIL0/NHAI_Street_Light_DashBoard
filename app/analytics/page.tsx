"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HighwayPerformance } from "@/components/analytics/HighwayPerformance"
import { FaultAnalysis } from "@/components/analytics/FaultAnalysis"
import { EnergyMetrics } from "@/components/analytics/EnergyMetrics"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, AlertTriangle, Zap } from "lucide-react"

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "90d">("7d")

    return (
        <div className="flex flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                    <p className="text-muted-foreground">
                        Performance metrics and insights across national highways
                    </p>
                </div>
                <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                        <SelectItem value="90d">Last 90 Days</SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Tabs defaultValue="performance" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="performance" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Performance
                        </TabsTrigger>
                        <TabsTrigger value="faults" className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Fault Analysis
                        </TabsTrigger>
                        <TabsTrigger value="energy" className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Energy Metrics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="performance" className="space-y-4">
                        <HighwayPerformance timeRange={timeRange} />
                    </TabsContent>

                    <TabsContent value="faults" className="space-y-4">
                        <FaultAnalysis timeRange={timeRange} />
                    </TabsContent>

                    <TabsContent value="energy" className="space-y-4">
                        <EnergyMetrics timeRange={timeRange} />
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}
