"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { faultRecords } from "@/lib/mockData"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { AlertTriangle, Clock, CheckCircle2, XCircle } from "lucide-react"
import { useMemo } from "react"

interface FaultAnalysisProps {
    timeRange: string
}

const COLORS = {
    power_failure: '#ef4444',
    bulb_failure: '#f97316',
    sensor_malfunction: '#eab308',
    wiring_issue: '#8b5cf6',
    other: '#6b7280'
}

const SEVERITY_COLORS = {
    low: '#22c55e',
    medium: '#eab308',
    high: '#f97316',
    critical: '#ef4444'
}

export function FaultAnalysis({ timeRange }: FaultAnalysisProps) {
    // Calculate fault statistics
    const stats = useMemo(() => {
        const total = faultRecords.length
        const open = faultRecords.filter(f => f.status === "open").length
        const inProgress = faultRecords.filter(f => f.status === "in_progress").length
        const resolved = faultRecords.filter(f => f.status === "resolved" || f.status === "closed").length

        // Calculate average resolution time
        const resolvedFaults = faultRecords.filter(f => f.resolvedAt)
        const avgResolutionTime = resolvedFaults.length > 0
            ? resolvedFaults.reduce((sum, f) => {
                const diff = f.resolvedAt!.getTime() - f.reportedAt.getTime()
                return sum + (diff / (1000 * 60 * 60)) // Convert to hours
            }, 0) / resolvedFaults.length
            : 0

        return { total, open, inProgress, resolved, avgResolutionTime }
    }, [])

    // Fault type distribution
    const faultTypeData = useMemo(() => {
        const types: Record<string, number> = {}
        faultRecords.forEach(f => {
            types[f.faultType] = (types[f.faultType] || 0) + 1
        })
        return Object.entries(types).map(([name, value]) => ({
            name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            value,
            color: COLORS[name as keyof typeof COLORS]
        }))
    }, [])

    // Severity distribution
    const severityData = useMemo(() => {
        const severities: Record<string, number> = {}
        faultRecords.forEach(f => {
            severities[f.severity] = (severities[f.severity] || 0) + 1
        })
        return Object.entries(severities).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
            fill: SEVERITY_COLORS[name as keyof typeof SEVERITY_COLORS]
        }))
    }, [])

    return (
        <div className="grid gap-4">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Faults</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">Last {timeRange}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Faults</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.open}</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.inProgress}</div>
                        <p className="text-xs text-muted-foreground">Being worked on</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgResolutionTime.toFixed(1)}h</div>
                        <p className="text-xs text-muted-foreground">{stats.resolved} resolved</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Fault Type Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fault Type Distribution</CardTitle>
                        <CardDescription>Breakdown by fault category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={faultTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }: { name?: string, percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {faultTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Severity Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fault Severity Levels</CardTitle>
                        <CardDescription>Distribution by severity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={severityData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="name" className="text-xs" />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {severityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Faults Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Faults</CardTitle>
                    <CardDescription>Latest fault reports and their status</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {faultRecords.slice(0, 10).map(fault => (
                            <div key={fault.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{fault.lightId}</span>
                                        <Badge variant="outline" className="text-xs">
                                            {fault.faultType.replace(/_/g, ' ')}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Reported: {fault.reportedAt.toLocaleDateString()} {fault.reportedAt.toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={fault.severity === "critical" ? "destructive" : "secondary"}
                                        className="text-xs"
                                    >
                                        {fault.severity}
                                    </Badge>
                                    <Badge
                                        variant={fault.status === "resolved" ? "default" : "outline"}
                                        className="text-xs"
                                    >
                                        {fault.status.replace(/_/g, ' ')}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
