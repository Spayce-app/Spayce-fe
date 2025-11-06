"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Building2,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { id: "overview", label: "Overview", icon: Home, href: "/dashboard/overview" },
  { id: "spaces", label: "My Spaces", icon: Building2, href: "/dashboard/spaces" },
  { id: "bookings", label: "Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "reviews", label: "Reviews", icon: MessageSquare, href: "/dashboard/reviews" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col shadow-lg h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Image 
              src="/sapaycelogo.png" 
              alt="Spayce Logo" 
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>
          <div>
            <span className="text-2xl font-bold text-sidebar-foreground">Spayce</span>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1.5">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      className={cn(
                        "h-5 w-5 transition-transform",
                        isActive ? "scale-110" : "group-hover:scale-105"
                      )} 
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30">
        <div className="flex items-center space-x-3 mb-3 p-3 rounded-xl bg-sidebar/50 hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
          <Avatar className="h-10 w-10 ring-2 ring-sidebar-border">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Space Owner
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}

