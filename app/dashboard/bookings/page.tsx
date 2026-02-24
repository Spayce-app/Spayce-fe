"use client"

import { useState } from "react"
import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Plus,
  Search,
  Calendar,
  Filter,
  ChevronUp,
  MoreHorizontal,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const statusTabs = [
  { value: "all", label: "All Bookings" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const

const bookings = [
  {
    renterName: "Adewale Coker",
    renterInitials: "AC",
    spaceName: "Executive Boardroom",
    dateTime: "Oct 24, 2023 10:00 AM",
    duration: "4 Hours",
    amount: "N45,000",
    status: "Confirmed" as const,
  },
  {
    renterName: "Chinelo Okoro",
    renterInitials: "CO",
    spaceName: "Creative Studio",
    dateTime: "Oct 25, 2023 02:00 PM",
    duration: "2 Hours",
    amount: "N20,000",
    status: "Pending" as const,
  },
  {
    renterName: "Tunde Bakare",
    renterInitials: "TB",
    spaceName: "Private Office",
    dateTime: "Oct 22, 2023 09:00 AM",
    duration: "8 Hours",
    amount: "N60,000",
    status: "Completed" as const,
  },
  {
    renterName: "Sarah J.",
    renterInitials: "SJ",
    spaceName: "Rooftop Lounge",
    dateTime: "Oct 20, 2023 06:00 PM",
    duration: "5 Hours",
    amount: "N120,000",
    status: "Cancelled" as const,
  },
]

function StatusBadge({ status }: { status: (typeof bookings)[0]["status"] }) {
  const config = {
    Confirmed: { dot: "bg-green-500", pill: "bg-green-50 text-green-700" },
    Pending: { dot: "bg-amber-500", pill: "bg-amber-50 text-amber-700" },
    Completed: { dot: "bg-blue-400", pill: "bg-blue-50 text-blue-700" },
    Cancelled: { dot: "bg-red-500", pill: "bg-red-50 text-red-700" },
  }[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.pill} shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  )
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const revenueProgress = (842500 / 1200000) * 100

  return (
    <>
      <DashboardHeader
        title="Bookings"
        description="Manage and track all your space reservations, verify payments, and handle check-ins from one central place."
        showSearch={false}
        customActions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all">
              <Plus className="h-4 w-4 mr-2" />
              New Manual Booking
            </Button>
          </div>
        }
      />
      <main className="flex-1 overflow-y-auto bg-[#F7F8FC]">
        <div className="p-6 md:p-8 max-w-[1440px] mx-auto space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(0,0,0,0.08)]">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-foreground mt-2">128</p>
                <p className="text-xs text-green-600 font-medium mt-1.5 flex items-center gap-1">
                  <ChevronUp className="h-4 w-4" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(0,0,0,0.08)]">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Active Today
                </p>
                <p className="text-2xl font-bold text-foreground mt-2">6</p>
                <p className="text-xs text-gray-600 mt-1.5">2 check-ins pending</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(0,0,0,0.08)]">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Revenue (MTD)
                </p>
                <p className="text-2xl font-bold text-foreground mt-2">N842,500</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <Progress value={revenueProgress} className="h-2 flex-1 rounded-full" />
                  <span className="text-xs text-gray-600 shrink-0">Target: N1.2M</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1),0_8px_24px_-4px_rgba(0,0,0,0.08)]">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Avg. Rating
                </p>
                <p className="text-2xl font-bold text-foreground mt-2">4.9</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">From 42 reviews</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="flex-1"
                >
                  <TabsList className="bg-gray-100/80 p-1.5 rounded-xl h-auto flex-wrap gap-1">
                    {statusTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative flex-1 lg:flex-initial lg:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search renter or space"
                      className="pl-9 h-10 rounded-xl border-gray-200/80 shadow-sm focus:shadow-md transition-shadow"
                    />
                  </div>
                  <Select defaultValue="oct2023">
                    <SelectTrigger className="w-[130px] h-10 rounded-xl border-gray-200/80 shadow-sm">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oct2023">Oct 2023</SelectItem>
                      <SelectItem value="sep2023">Sep 2023</SelectItem>
                      <SelectItem value="aug2023">Aug 2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                    <Filter className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings - Card-based layout for flair */}
          <div className="space-y-4">
            <div className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground font-medium bg-gray-50/60">
                    <th scope="col" className="py-4 px-6 font-medium first:rounded-tl-2xl">
                      Renter Name
                    </th>
                    <th scope="col" className="py-4 px-6 font-medium">
                      Space Name
                    </th>
                    <th scope="col" className="py-4 px-6 font-medium">
                      Date/Time
                    </th>
                    <th scope="col" className="py-4 px-6 font-medium">
                      Duration
                    </th>
                    <th scope="col" className="py-4 px-6 font-medium">
                      Total Amount
                    </th>
                    <th scope="col" className="py-4 px-6 font-medium">
                      Status
                    </th>
                    <th scope="col" className="py-4 px-6 font-medium text-right pr-6 last:rounded-tr-2xl">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.renterName + booking.spaceName}
                      className="border-b border-gray-100/80 last:border-0 hover:bg-primary/[0.02] transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shrink-0 shadow-sm">
                            <span className="text-xs font-semibold text-foreground">
                              {booking.renterInitials}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {booking.renterInitials} {booking.renterName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {booking.spaceName}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {booking.dateTime}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {booking.duration}
                      </td>
                      <td className="py-4 px-6 font-semibold text-foreground">
                        {booking.amount}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="py-4 px-6 text-right pr-6">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
                          aria-label="More actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
{/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100/80 bg-gray-50/40">
              <p className="text-sm text-muted-foreground">
                Showing 1-4 of 24 results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-gray-200/80 shadow-sm"
                  disabled
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl bg-primary text-primary-foreground h-9 w-9 p-0 shadow-md shadow-primary/20"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl border-gray-200/80 shadow-sm">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl border-gray-200/80 shadow-sm">
                  3
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl border-gray-200/80 shadow-sm">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  )
}
