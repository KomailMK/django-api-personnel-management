"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { PersonnelForm } from "@/components/personnel-form"
import { DatabaseView } from "@/components/database-view"
import { Users, Settings, Activity, Database } from "lucide-react"

interface Statistics {
  total_personnel: number
  personnel_this_month: number
  personnel_yesterday: number
  month_change_percentage: number
  database_status: string
  department_breakdown: Array<{ department: string; count: number }>
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("add-personnel")
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchStatistics()
    }
  }, [activeTab])

  const fetchStatistics = async () => {
    setIsLoadingStats(true)
    try {
      const response = await fetch("http://localhost:8000/api/statistics/")
      if (response.ok) {
        const data = await response.json()
        setStatistics(data)
      } else {
        console.error("Failed to fetch statistics")
      }
    } catch (error) {
      console.error("Error fetching statistics:", error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "add-personnel" && "Add New Personnel"}
              {activeTab === "database" && "Database Management"}
              {activeTab === "settings" && "System Settings"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {activeTab === "dashboard" && "Monitor biometric system status and recent entries."}
              {activeTab === "add-personnel" && "Register new employees and biometric data."}
              {activeTab === "database" && "View and manage registered personnel records."}
              {activeTab === "settings" && "Configure database connections and security protocols."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-emerald-500 border border-border">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </div>
          </div>
        </header>

        {activeTab === "add-personnel" && (
          <div className="mx-auto max-w-2xl">
            <PersonnelForm />
          </div>
        )}

        {activeTab === "database" && (
          <div className="mx-auto max-w-5xl">
            <DatabaseView />
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="grid gap-6 md:grid-cols-3">
            {isLoadingStats ? (
              <div className="col-span-3 flex items-center justify-center py-12 text-muted-foreground">
                Loading statistics...
              </div>
            ) : statistics ? (
              <>
                <DashboardCard
                  title="Total Personnel"
                  value={statistics.total_personnel.toString()}
                  icon={<Users className="h-5 w-5 text-primary" />}
                  trend={`${statistics.month_change_percentage >= 0 ? "+" : ""}${statistics.month_change_percentage}% this month`}
                />
                <DashboardCard
                  title="This Month"
                  value={statistics.personnel_this_month.toString()}
                  icon={<Activity className="h-5 w-5 text-emerald-500" />}
                  trend={`${statistics.personnel_yesterday} added yesterday`}
                />
                <DashboardCard
                  title="Database Status"
                  value={statistics.database_status}
                  icon={<Database className="h-5 w-5 text-blue-500" />}
                  trend="MySQL v8.0"
                />
              </>
            ) : (
              <div className="col-span-3 flex items-center justify-center py-12 text-muted-foreground">
                Unable to load statistics
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
            <Settings className="mx-auto h-12 w-12 opacity-20" />
            <h3 className="mt-4 text-lg font-medium text-foreground">Settings Configuration</h3>
            <p className="mt-2">System configuration options would appear here.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  icon,
  trend,
}: { title: string; value: string; icon: React.ReactNode; trend: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="rounded-full bg-secondary p-2">{icon}</div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
      </div>
    </div>
  )
}
