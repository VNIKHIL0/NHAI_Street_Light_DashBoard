"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { SystemConfig as SystemConfigType } from "@/lib/types"
import { Save, RotateCcw, Server, Database, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const defaultConfig: SystemConfigType = {
    apiEndpoint: "https://api.nhai-lighting.gov.in",
    dataRetentionDays: 90,
    autoBackup: true,
    backupInterval: 24,
    maxConcurrentUsers: 100
}

export function SystemConfig() {
    const [config, setConfig] = useState<SystemConfigType>(defaultConfig)
    const { toast } = useToast()

    useEffect(() => {
        const saved = localStorage.getItem("systemConfig")
        if (saved) {
            setConfig(JSON.parse(saved))
        }
    }, [])

    const handleSave = () => {
        localStorage.setItem("systemConfig", JSON.stringify(config))
        toast({
            title: "Configuration saved",
            description: "System configuration has been updated.",
        })
    }

    const handleReset = () => {
        setConfig(defaultConfig)
        localStorage.removeItem("systemConfig")
        toast({
            title: "Configuration reset",
            description: "System configuration has been reset to defaults.",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Advanced system settings and data management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* API Endpoint */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="api-endpoint">API Endpoint</Label>
                    </div>
                    <Input
                        id="api-endpoint"
                        type="url"
                        value={config.apiEndpoint}
                        onChange={(e) => setConfig({ ...config, apiEndpoint: e.target.value })}
                        placeholder="https://api.example.com"
                    />
                    <p className="text-xs text-muted-foreground">
                        Base URL for the backend API server
                    </p>
                </div>

                {/* Data Retention */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                    </div>
                    <Input
                        id="data-retention"
                        type="number"
                        min="30"
                        max="365"
                        value={config.dataRetentionDays}
                        onChange={(e) => setConfig({ ...config, dataRetentionDays: parseInt(e.target.value) || 90 })}
                    />
                    <p className="text-xs text-muted-foreground">
                        How long to keep historical data before archiving (30-365 days)
                    </p>
                </div>

                {/* Auto Backup */}
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label htmlFor="auto-backup">Automatic Backup</Label>
                        <p className="text-xs text-muted-foreground">
                            Enable automated database backups
                        </p>
                    </div>
                    <Switch
                        id="auto-backup"
                        checked={config.autoBackup}
                        onCheckedChange={(checked) => setConfig({ ...config, autoBackup: checked })}
                    />
                </div>

                {/* Backup Interval */}
                {config.autoBackup && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <Label htmlFor="backup-interval">Backup Interval (hours)</Label>
                        </div>
                        <Input
                            id="backup-interval"
                            type="number"
                            min="1"
                            max="168"
                            value={config.backupInterval}
                            onChange={(e) => setConfig({ ...config, backupInterval: parseInt(e.target.value) || 24 })}
                        />
                        <p className="text-xs text-muted-foreground">
                            How often to perform automatic backups (1-168 hours)
                        </p>
                    </div>
                )}

                {/* Max Concurrent Users */}
                <div className="space-y-2">
                    <Label htmlFor="max-users">Maximum Concurrent Users</Label>
                    <Input
                        id="max-users"
                        type="number"
                        min="10"
                        max="1000"
                        value={config.maxConcurrentUsers}
                        onChange={(e) => setConfig({ ...config, maxConcurrentUsers: parseInt(e.target.value) || 100 })}
                    />
                    <p className="text-xs text-muted-foreground">
                        Maximum number of users that can access the system simultaneously
                    </p>
                </div>

                {/* System Info */}
                <div className="pt-4 border-t space-y-3">
                    <h3 className="text-sm font-medium">System Information</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-muted-foreground">Version:</span>
                            <span className="ml-2 font-medium">1.0.0</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Build:</span>
                            <span className="ml-2 font-medium">2026.02.09</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Environment:</span>
                            <span className="ml-2 font-medium">Production</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Region:</span>
                            <span className="ml-2 font-medium">Asia/India</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
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
