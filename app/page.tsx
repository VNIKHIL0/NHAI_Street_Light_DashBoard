"use client"

import { StatsCard } from "@/components/dashboard/StatsCard"
import { HighwayMap } from "@/components/map/HighwayMap"
import { EnergyGraph } from "@/components/dashboard/EnergyGraph"
import { CarbonFootprint } from "@/components/dashboard/CarbonFootprint"
import { Activity, Zap, AlertTriangle, Leaf } from "lucide-react"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Total Lights"
            value="12,450"
            icon={Zap}
            description="Deployed across NH-44, NH-48"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Active Now"
            value="11,200"
            icon={Activity}
            description="90% Operational Efficiency"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Faults Detected"
            value="45"
            icon={AlertTriangle}
            description="Requires immediate attention"
            className="border-red-500/50"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Energy Saved"
            value="1.8 MWh"
            icon={Leaf}
            description="Carbon footprint reduced by 12%"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="col-span-4 border rounded-xl overflow-hidden min-h-[400px] bg-muted/50 relative">
          <HighwayMap />
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div className="h-[200px]">
            <CarbonFootprint />
          </div>
          <div className="flex-1">
            <EnergyGraph />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
