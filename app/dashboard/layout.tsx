import { DashboardProvider } from "@/contexts/DashboardContext"
import DashboardLayoutClient from "./DashboardLayoutClient"
import { ReactNode } from "react"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </DashboardProvider>
  )
}

