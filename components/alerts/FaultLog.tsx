"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, AlertTriangle, CheckCircle, Wrench } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialFaults = [
    { id: "WRN-001", location: "NH-44 Km 24.5", issue: "Light Flickering", severity: "medium", time: "10 mins ago", status: "Open" },
    { id: "ERR-002", location: "NH-44 Km 24.8", issue: "No Power / Offline", severity: "high", time: "25 mins ago", status: "Open" },
    { id: "WRN-003", location: "NH-48 Km 12.0", issue: "High Temp Warning", severity: "medium", time: "1 hour ago", status: "Pending" },
    { id: "INF-004", location: "Plaza 1", issue: "Schedule Mismatch", severity: "low", time: "2 hours ago", status: "Resolved" },
]

export function FaultLog() {
    const [faults, setFaults] = useState(initialFaults)
    const [selectedFault, setSelectedFault] = useState<typeof initialFaults[0] | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleCreateTicket = (fault: typeof initialFaults[0]) => {
        setSelectedFault(fault)
        setIsDialogOpen(true)
    }

    const submitTicket = () => {
        if (selectedFault) {
            setFaults(faults.map(f => f.id === selectedFault.id ? { ...f, status: "Ticket Created" } : f))
            setIsDialogOpen(false)
        }
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Severity</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faults.map((fault) => (
                            <TableRow key={fault.id}>
                                <TableCell>
                                    {fault.severity === "high" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                                    {fault.severity === "medium" && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                                    {fault.severity === "low" && <AlertCircle className="h-5 w-5 text-blue-500" />}
                                </TableCell>
                                <TableCell className="font-medium">{fault.id}</TableCell>
                                <TableCell>{fault.location}</TableCell>
                                <TableCell>{fault.issue}</TableCell>
                                <TableCell>{fault.time}</TableCell>
                                <TableCell>
                                    <Badge variant={fault.status === "Ticket Created" ? "default" : (fault.status === "Resolved" ? "secondary" : "destructive")}>
                                        {fault.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {fault.status !== "Resolved" && fault.status !== "Ticket Created" && (
                                        <Button size="sm" variant="outline" onClick={() => handleCreateTicket(fault)}>
                                            <Wrench className="h-4 w-4 mr-2" />
                                            Fix
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Maintenance Ticket</DialogTitle>
                        <DialogDescription>
                            Assign a technician to inspect the faulty unit.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">Fault ID</Label>
                            <Input id="id" value={selectedFault?.id} disabled className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">Location</Label>
                            <Input id="location" value={selectedFault?.location} disabled className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="technician" className="text-right">Assignee</Label>
                            <Input id="technician" placeholder="Technician Name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">Notes</Label>
                            <Textarea id="notes" placeholder="Additional instructions..." className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={submitTicket}>Generate Ticket</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
