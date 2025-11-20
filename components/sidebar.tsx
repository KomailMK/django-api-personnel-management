"use client"

import { LayoutDashboard, UserPlus, Settings, Fingerprint, Database } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "add-personnel", label: "Add Personnel", icon: UserPlus },
    { id: "database", label: "Database", icon: Database },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Fingerprint className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold tracking-tight text-foreground">BioSecure</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">Admin User</p>
            <p className="truncate text-xs text-muted-foreground">admin@biosecure.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
