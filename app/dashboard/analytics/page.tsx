"use client"

import { useState } from "react"
import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  TrendingUp,
  CalendarCheck,
  Users,
  Calendar,
  Download,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const periodOptions = ["7D", "30D", "90D", "1Y"] as const

const kpiCards = [
  {
    title: "Total Revenue",
    value: "₦24,850,000",
    change: "+12.4%",
    positive: true,
    icon: Wallet,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Conversion Rate",
    value: "4.2%",
    change: "+0.8%",
    positive: true,
    icon: TrendingUp,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Total Bookings",
    value: "142",
    change: "-2.4%",
    positive: false,
    icon: CalendarCheck,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Unique Visitors",
    value: "12.5k",
    change: "+18.2%",
    positive: true,
    icon: Users,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
]

const revenueData = [
  { label: "01", current: 3200, previous: 2800 },
  { label: "04", current: 4100, previous: 3500 },
  { label: "08", current: 2800, previous: 3200 },
  { label: "12", current: 5200, previous: 4500 },
  { label: "16", current: 3900, previous: 3800 },
  { label: "20", current: 4800, previous: 4200 },
  { label: "24", current: 3500, previous: 3600 },
  { label: "28", current: 6100, previous: 5100 },
  { label: "31", current: 4200, previous: 4000 },
]

const trafficSources = [
  { name: "Direct Search", value: 45, color: "bg-primary" },
  { name: "Social Media", value: 28, color: "bg-orange-400" },
  { name: "Referrals", value: 18, color: "bg-gray-300" },
  { name: "Other", value: 9, color: "bg-gray-300" },
]

const topSpaces = [
  { name: "Greenhouse Loft A", bookings: 42, revenue: "₦4,200,000" },
  { name: "Summit Executive", bookings: 38, revenue: "₦3,850,000" },
  { name: "Creative Studio 4", bookings: 25, revenue: "₦2,100,000" },
]

const spaceTypes = ["Coworking", "Private Office", "Meeting Room", "Event Space"]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<typeof periodOptions[number]>("30D")

  return (
    <>
      <DashboardHeader
        title="Analytics Dashboard"
        showSearch={true}
        searchPlaceholder="Search analytics..."
        showHelpIcon={true}
      />
      <main className="flex-1 min-h-0 overflow-y-auto bg-[#F4F5F7]">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1440px] mx-auto space-y-8 md:space-y-10">
          <section className="space-y-8">
            <div className="hidden">
              <h2 className="text-xl font-bold text-foreground">
                Performance Insights
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Deep dive into your property performance and user behavior.
              </p>
            </div>

            {/* Period Selector & Date Range */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {periodOptions.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      period === p
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-white border border-gray-200/80 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <div className="flex items-center gap-2 ml-2 px-4 py-2.5 bg-white border border-gray-200/80 rounded-xl shadow-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    Oct 01 - Oct 31, 2023
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Download data"
                  className="p-2.5 rounded-xl hover:bg-white border border-gray-200/80 transition-all shadow-sm"
                >
                  <Download className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiCards.map((card) => {
                const Icon = card.icon
                return (
                  <Card
                    key={card.title}
                    className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.05)] rounded-2xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-5">{card.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-2">
                        {card.value}
                      </p>
                      <p
                        className={`text-sm font-medium mt-2 ${
                          card.positive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {card.change}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Revenue Chart & Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Revenue over time */}
              <div className="lg:col-span-2">
                <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.05)] rounded-2xl">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-lg font-semibold">
                      Revenue over time
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Daily earnings across all locations.
                    </p>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="flex items-center gap-6 mb-5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">Current</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <span className="text-sm text-muted-foreground">Previous</span>
                      </div>
                    </div>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={revenueData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              border: "1px solid #E5E7EB",
                              borderRadius: "8px",
                            }}
                            formatter={(value: number, name: string) => [
                              `₦${Number(value).toLocaleString()}`,
                              name === "current" ? "Current" : "Previous",
                            ]}
                          />
                          <Bar
                            dataKey="current"
                            fill="#16a34a"
                            radius={[6, 6, 0, 0]}
                            name="Current"
                          />
                          <Line
                            type="monotone"
                            dataKey="previous"
                            stroke="#9CA3AF"
                            strokeWidth={2}
                            dot={false}
                            name="Previous"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Traffic Sources */}
              <div>
                <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.05)] rounded-2xl h-full">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-lg font-semibold">
                      Traffic Sources
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Where your visitors are coming from.
                    </p>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="space-y-6">
                      {trafficSources.map((source) => (
                        <div key={source.name}>
                          <div className="flex justify-between text-sm mb-2.5">
                            <span className="text-gray-700">{source.name}</span>
                            <span className="font-medium text-gray-900">
                              {source.value}%
                            </span>
                          </div>
                          <div className="h-2.5 rounded-full overflow-hidden bg-gray-100">
                            <div
                              className={`h-full rounded-full ${source.color} transition-all duration-500`}
                              style={{ width: `${source.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex gap-3">
                        <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/90">
                          Social traffic increased by 12% this month. Consider
                          boosting LinkedIn ads.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking by Space Type & Top Performing Spaces */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Booking by Space Type */}
              <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.05)] rounded-2xl">
                <CardHeader className="px-6 py-6 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Booking by Space Type
                    </CardTitle>
                  </div>
                  <Select defaultValue="units">
                    <SelectTrigger className="w-[140px] h-10 rounded-xl border-gray-200/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="units">Units Sold</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <Tabs defaultValue="coworking" className="w-full">
                    <TabsList className="bg-gray-100/80 p-1.5 rounded-xl text-sm gap-1">
                      {spaceTypes.map((type) => (
                        <TabsTrigger
                          key={type}
                          value={type.toLowerCase().replace(" ", "-")}
                          className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                        >
                          {type}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <div className="h-52 mt-6 flex items-center justify-center rounded-xl bg-gray-50/80">
                      <p className="text-sm text-gray-500">
                        Chart data for selected space type
                      </p>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Top Performing Spaces */}
              <Card className="bg-white border-0 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06),0_4px_16px_-4px_rgba(0,0,0,0.05)] rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between px-6 py-6">
                  <CardTitle className="text-lg font-semibold">
                    Top Performing Spaces
                  </CardTitle>
                  <Link
                    href="/dashboard/spaces"
                    className="text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                  >
                    View All
                  </Link>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground font-medium border-b border-gray-100">
                          <th scope="col" className="pb-4 pt-1 font-medium">
                            SPACE NAME
                          </th>
                          <th scope="col" className="pb-4 pt-1 font-medium">
                            BOOKINGS
                          </th>
                          <th scope="col" className="pb-4 pt-1 font-medium text-right">
                            REVENUE
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {topSpaces.map((space) => (
                          <tr
                            key={space.name}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-primary/90 flex items-center justify-center shrink-0">
                                  <span className="text-white text-xs font-bold">
                                    {space.name
                                      .split(" ")
                                      .map((w) => w[0])
                                      .join("")
                                      .slice(0, 2)}
                                  </span>
                                </div>
                                <span className="font-medium text-foreground">
                                  {space.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-5 text-muted-foreground">
                              {space.bookings}
                            </td>
                            <td className="py-5 text-right font-medium text-foreground">
                              {space.revenue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
