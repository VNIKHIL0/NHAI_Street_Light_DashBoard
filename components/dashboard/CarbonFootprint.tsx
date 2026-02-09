"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TreeDeciduous, Leaf } from "lucide-react"

export function CarbonFootprint() {
    return (
        <Card className="h-full border-green-500/20 bg-green-500/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    Environmental Impact
                </CardTitle>
                <CardDescription>Estimated carbon reduction this month</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">CO2 Saved</span>
                        <span className="text-2xl font-bold text-green-500">24.5 tons</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[75%]" />
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                        Equivalent to planting <span className="font-bold text-foreground">1,200 trees</span>
                        <TreeDeciduous className="inline h-3 w-3 ml-1" />
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
