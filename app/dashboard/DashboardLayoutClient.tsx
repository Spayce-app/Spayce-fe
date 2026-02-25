"use client"

import DashboardSidebar from "@/components/DashboardSidebar"
import { ReactNode } from "react"

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#F7F8F9] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
