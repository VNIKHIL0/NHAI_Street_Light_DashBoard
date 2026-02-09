"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { NotificationSettings as NotificationSettingsType } from "@/lib/types"
import { Save, RotateCcw, Mail, MessageSquare, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const defaultSettings: NotificationSettingsType = {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    faultAlerts: true,
    maintenanceReminders: true,
    energyReports: false,
    severityThreshold: "medium"
}

export function NotificationSettings() {
    const [settings, setSettings] = useState<NotificationSettingsType>(defaultSettings)
    const { toast } = useToast()

    useEffect(() => {
        const saved = localStorage.getItem("notificationSettings")
        if (saved) {
            setSettings(JSON.parse(saved))
        }
    }, [])

    const handleSave = () => {
        localStorage.setItem("notificationSettings", JSON.stringify(settings))
        toast({
            title: "Settings saved",
            description: "Your notification preferences have been updated.",
        })
    }

    const handleReset = () => {
        setSettings(defaultSettings)
        localStorage.removeItem("notificationSettings")
        toast({
            title: "Settings reset",
            description: "Notification settings have been reset to defaults.",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Notification Channels */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Channels</h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <div className="space-y-0.5">
                                <Label htmlFor="email-enabled">Email Notifications</Label>
                                <p className="text-xs text-muted-foreground">
                                    Receive alerts via email
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="email-enabled"
                            checked={settings.emailEnabled}
                            onCheckedChange={(checked) => setSettings({ ...settings, emailEnabled: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <div className="space-y-0.5">
                                <Label htmlFor="sms-enabled">SMS Notifications</Label>
                                <p className="text-xs text-muted-foreground">
                                    Receive alerts via SMS
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="sms-enabled"
                            checked={settings.smsEnabled}
                            onCheckedChange={(checked) => setSettings({ ...settings, smsEnabled: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            <div className="space-y-0.5">
                                <Label htmlFor="push-enabled">Push Notifications</Label>
                                <p className="text-xs text-muted-foreground">
                                    Receive browser push notifications
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="push-enabled"
                            checked={settings.pushEnabled}
                            onCheckedChange={(checked) => setSettings({ ...settings, pushEnabled: checked })}
                        />
                    </div>
                </div>

                {/* Alert Types */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">Alert Types</h3>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="fault-alerts">Fault Alerts</Label>
                            <p className="text-xs text-muted-foreground">
                                Get notified when faults are detected
                            </p>
                        </div>
                        <Switch
                            id="fault-alerts"
                            checked={settings.faultAlerts}
                            onCheckedChange={(checked) => setSettings({ ...settings, faultAlerts: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="maintenance-reminders">Maintenance Reminders</Label>
                            <p className="text-xs text-muted-foreground">
                                Reminders for scheduled maintenance
                            </p>
                        </div>
                        <Switch
                            id="maintenance-reminders"
                            checked={settings.maintenanceReminders}
                            onCheckedChange={(checked) => setSettings({ ...settings, maintenanceReminders: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="energy-reports">Energy Reports</Label>
                            <p className="text-xs text-muted-foreground">
                                Daily/weekly energy consumption reports
                            </p>
                        </div>
                        <Switch
                            id="energy-reports"
                            checked={settings.energyReports}
                            onCheckedChange={(checked) => setSettings({ ...settings, energyReports: checked })}
                        />
                    </div>
                </div>

                {/* Severity Threshold */}
                <div className="space-y-2">
                    <Label htmlFor="severity-threshold">Minimum Severity Level</Label>
                    <Select
                        value={settings.severityThreshold}
                        onValueChange={(value: any) => setSettings({ ...settings, severityThreshold: value })}
                    >
                        <SelectTrigger id="severity-threshold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low (All alerts)</SelectItem>
                            <SelectItem value="medium">Medium (Important alerts)</SelectItem>
                            <SelectItem value="high">High (Critical only)</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Only receive notifications for faults at or above this severity level
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
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
