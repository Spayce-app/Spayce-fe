"use client"

import { Bell, Search, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface DashboardHeaderProps {
  title?: string
  description?: string
  showSearch?: boolean
  searchPlaceholder?: string
  showHelpIcon?: boolean
  customActions?: React.ReactNode
  userName?: string
  badge?: React.ReactNode
}

export default function DashboardHeader({
  title,
  description = "Manage your spaces and track performance",
  showSearch = true,
  searchPlaceholder = "Search bookings, spaces...",
  showHelpIcon = false,
  customActions,
  userName = "Chidi",
  badge,
}: DashboardHeaderProps) {
  return (
      <header className="bg-[#F7F8FC] border-b border-gray-100 px-8 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 min-w-0">
          <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            {title ?? `Welcome back, ${userName}`}
          </h1>
          {title && description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
          {badge && <div className="mt-2 sm:mt-0 shrink-0">{badge}</div>}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {customActions ?? (
            <>
          {showSearch && (
            <div className="relative flex-1 sm:flex-initial sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                aria-label="Search"
                className="pl-10 h-10 bg-white border-gray-200/80 rounded-xl shadow-sm"
              />
            </div>
          )}

          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-lg hover:bg-white transition-colors duration-200"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
          {showHelpIcon && (
            <Link
              href="/help"
              aria-label="Help"
              className="p-2 rounded-lg hover:bg-white transition-colors duration-200"
            >
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
            </Link>
          )}
            </>
          )}

          <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                CB
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">Chidi Benson</p>
              <p className="text-xs text-primary font-medium">Verified Host</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
