"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { highways } from "@/lib/mockData"
import type { UserPreferences as UserPreferencesType } from "@/lib/types"
import { Save, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const defaultPreferences: UserPreferencesType = {
    defaultView: "dashboard",
    language: "en",
    timezone: "Asia/Kolkata",
    autoRefresh: true,
    refreshInterval: 30
}

export function UserPreferences() {
    const [preferences, setPreferences] = useState<UserPreferencesType>(defaultPreferences)
    const { toast } = useToast()

    // Load preferences from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("userPreferences")
        if (saved) {
            setPreferences(JSON.parse(saved))
        }
    }, [])

    const handleSave = () => {
        localStorage.setItem("userPreferences", JSON.stringify(preferences))
        toast({
            title: "Preferences saved",
            description: "Your preferences have been updated successfully.",
        })
    }

    const handleReset = () => {
        setPreferences(defaultPreferences)
        localStorage.removeItem("userPreferences")
        toast({
            title: "Preferences reset",
            description: "Your preferences have been reset to defaults.",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Default Highway */}
                <div className="space-y-2">
                    <Label htmlFor="default-highway">Default Highway</Label>
                    <Select
                        value={preferences.defaultHighway || "none"}
                        onValueChange={(value) => setPreferences({ ...preferences, defaultHighway: value === "none" ? undefined : value })}
                    >
                        <SelectTrigger id="default-highway">
                            <SelectValue placeholder="Select default highway" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None (Show All)</SelectItem>
                            {highways.map(highway => (
                                <SelectItem key={highway.id} value={highway.id}>
                                    {highway.code} - {highway.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Highway to display by default when opening the map view
                    </p>
                </div>

                {/* Default View */}
                <div className="space-y-2">
                    <Label htmlFor="default-view">Default View</Label>
                    <Select
                        value={preferences.defaultView}
                        onValueChange={(value: any) => setPreferences({ ...preferences, defaultView: value })}
                    >
                        <SelectTrigger id="default-view">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="map">Map View</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Page to display when you first log in
                    </p>
                </div>

                {/* Language */}
                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                        value={preferences.language}
                        onValueChange={(value: any) => setPreferences({ ...preferences, language: value })}
                    >
                        <SelectTrigger id="language">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                    >
                        <SelectTrigger id="timezone">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Asia/Kolkata">IST (Asia/Kolkata)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">EST (America/New_York)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Auto Refresh */}
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="auto-refresh">Auto Refresh</Label>
                        <p className="text-xs text-muted-foreground">
                            Automatically refresh data at regular intervals
                        </p>
                    </div>
                    <Switch
                        id="auto-refresh"
                        checked={preferences.autoRefresh}
                        onCheckedChange={(checked) => setPreferences({ ...preferences, autoRefresh: checked })}
                    />
                </div>

                {/* Refresh Interval */}
                {preferences.autoRefresh && (
                    <div className="space-y-2">
                        <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                        <Input
                            id="refresh-interval"
                            type="number"
                            min="10"
                            max="300"
                            value={preferences.refreshInterval}
                            onChange={(e) => setPreferences({ ...preferences, refreshInterval: parseInt(e.target.value) || 30 })}
                        />
                        <p className="text-xs text-muted-foreground">
                            How often to refresh data (10-300 seconds)
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Preferences
                    </Button>
                    <Button onClick={handleReset} variant="outline">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
