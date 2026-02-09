"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/layout/ModeToggle" // Placeholder for now, or I'll implement it inline if needed

export function AppHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex-1">
                <h1 className="text-sm font-medium text-muted-foreground">National Highways Authority of India</h1>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                    AD
                </div>
            </div>
        </header>
    )
}
