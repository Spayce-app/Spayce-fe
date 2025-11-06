"use client"

import { Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  title: string
  description?: string
}

export default function DashboardHeader({ title, description = "Manage your spaces and track performance" }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10 backdrop-blur-sm bg-background/95">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            <Link href="/list-space">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus className="h-4 w-4" />
                List New Space
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

