"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  Building2,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/overview" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "bookings", label: "Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { id: "spaces", label: "Spaces", icon: Building2, href: "/dashboard/spaces" },
  { id: "reviews", label: "Reviews", icon: MessageSquare, href: "/dashboard/reviews" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100/80">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Spayce - Home">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
            <Image
              src="/spaycelogo.png"
              alt=""
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-base font-bold text-gray-800 block">Spayce Host</span>
            <span className="text-xs font-medium text-primary">Premium Tier</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? "text-primary" : "text-gray-500"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4">
        <div className="rounded-2xl bg-gray-50/80 p-4 space-y-4 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-full border-2 border-white shadow-sm">
              <AvatarFallback className="bg-orange-100 text-orange-400 text-sm font-semibold">
                AM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                Alex Morgan
              </p>
              <p className="text-xs text-gray-500">Host Member</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full rounded-xl bg-primary/10 text-primary hover:bg-primary/15 font-medium text-sm h-10 shadow-sm"
            onClick={() => router.push("/signin")}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}
