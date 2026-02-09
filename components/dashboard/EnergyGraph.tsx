"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
    { time: "00:00", usage: 3.2 },
    { time: "04:00", usage: 2.8 },
    { time: "08:00", usage: 1.5 },
    { time: "12:00", usage: 1.2 },
    { time: "16:00", usage: 1.8 },
    { time: "20:00", usage: 4.5 },
    { time: "23:59", usage: 3.8 },
]

export function EnergyGraph() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Energy Consumption (MW)</CardTitle>
                <CardDescription>Real-time usage across all zones</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}MW`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="usage" stroke="#adfa1d" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
