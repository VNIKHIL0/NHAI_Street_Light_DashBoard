"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPreferences } from "@/components/settings/UserPreferences"
import { NotificationSettings } from "@/components/settings/NotificationSettings"
import { SystemConfig } from "@/components/settings/SystemConfig"
import { motion } from "framer-motion"
import { User, Bell, Settings as SettingsIcon, Database } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your preferences and system configuration
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Tabs defaultValue="preferences" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preferences" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            User Preferences
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="system" className="flex items-center gap-2">
                            <SettingsIcon className="h-4 w-4" />
                            System Config
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="preferences">
                        <UserPreferences />
                    </TabsContent>

                    <TabsContent value="notifications">
                        <NotificationSettings />
                    </TabsContent>

                    <TabsContent value="system">
                        <SystemConfig />
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}
