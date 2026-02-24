"use client"

import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Wallet, Calendar, Eye, Star, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

const metricCards = [
  {
    title: "Total Earnings",
    value: "N2,450,000",
    change: "+12.5%",
    icon: Wallet,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Active Bookings",
    value: "12",
    change: "+3.2%",
    icon: Calendar,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Total Views",
    value: "1,280",
    change: "+18.0%",
    icon: Eye,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Average Rating",
    value: "4.8/5.0",
    tag: "New High",
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
]

const recentBookings = [
  {
    spaceName: "Lekki Office Hub",
    renter: "Amaka O.",
    renterInitials: "AO",
    date: "Oct 24, 2023",
    status: "CONFIRMED" as const,
  },
  {
    spaceName: "Victoria Island Suites",
    renter: "Tunde A.",
    renterInitials: "TA",
    date: "Oct 25, 2023",
    status: "PENDING" as const,
  },
  {
    spaceName: "Ikeja Creative Loft",
    renter: "Funke M.",
    renterInitials: "FM",
    date: "Oct 26, 2023",
    status: "COMPLETED" as const,
  },
]

const performanceData = [
  { day: "Mon", revenue: 240, traffic: 180 },
  { day: "Tue", revenue: 380, traffic: 220 },
  { day: "Wed", revenue: 320, traffic: 190 },
  { day: "Thu", revenue: 410, traffic: 250 },
  { day: "Fri", revenue: 520, traffic: 310 },
  { day: "Sat", revenue: 280, traffic: 160 },
  { day: "Sun", revenue: 350, traffic: 200 },
]

const listings = [
  {
    id: 1,
    name: "Lekki Co-working Hub",
    location: "Lekki Phase 1, Lagos",
    image: "/spaceimg1.jpg",
    views: "245",
    bookings: "32",
    earned: "N480,000",
  },
  {
    id: 2,
    name: "Victoria Island Suites",
    location: "Victoria Island, Lagos",
    image: "/spaceimg2.jpg",
    views: "189",
    bookings: "24",
    earned: "N360,000",
  },
]

export default function OverviewPage() {
  return (
    <>
      <DashboardHeader showSearch={true} />
      <main className="flex-1 overflow-y-auto bg-[#F7F8FC]">
        <div className="p-6 md:p-8 max-w-[1440px] mx-auto space-y-10">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {metricCards.map((card) => {
              const Icon = card.icon
              return (
                <Card
                  key={card.title}
                  className="bg-white border-gray-100 shadow-sm rounded-xl"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      {card.tag && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700 border-0 text-xs"
                        >
                          {card.tag}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">{card.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {card.value}
                    </p>
                    {card.change && (
                      <p className="text-sm text-primary font-medium mt-2">
                        {card.change}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Bookings & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-100 shadow-sm rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between px-6 py-5">
                  <CardTitle className="text-lg font-semibold">
                    Recent Bookings
                  </CardTitle>
                  <Link href="/dashboard/bookings">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/5 font-medium"
                    >
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-muted-foreground font-medium border-b border-gray-100">
                          <th scope="col" className="pb-3 pt-1 font-medium">SPACE NAME</th>
                          <th scope="col" className="pb-3 pt-1 font-medium">RENTER</th>
                          <th scope="col" className="pb-3 pt-1 font-medium">DATE</th>
                          <th scope="col" className="pb-3 pt-1 font-medium text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((booking) => (
                          <tr
                            key={booking.spaceName}
                            className="border-b border-gray-50 last:border-0"
                          >
                            <td className="py-4 font-medium text-foreground">
                              {booking.spaceName}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                                    {booking.renterInitials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-foreground">
                                  {booking.renter}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 text-muted-foreground">
                              {booking.date}
                            </td>
                            <td className="py-4 text-right">
                              <Badge
                                className={
                                  booking.status === "CONFIRMED"
                                    ? "bg-green-100 text-green-700 border-0"
                                    : booking.status === "PENDING"
                                      ? "bg-orange-100 text-orange-700 border-0"
                                      : "bg-gray-100 text-gray-600 border-0"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Graph */}
            <div>
              <Card className="bg-white border-gray-100 shadow-sm rounded-xl h-full">
                <CardHeader className="flex flex-row items-center justify-between px-6 py-5">
                  <CardTitle className="text-lg font-semibold">
                    Performance
                  </CardTitle>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[130px] h-9 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient
                            id="revenueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#16a34a"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="100%"
                              stopColor="#16a34a"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#E5E7EB"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#16a34a"
                          strokeWidth={2}
                          fill="url(#revenueGradient)"
                        />
                        <Line
                          type="monotone"
                          dataKey="traffic"
                          stroke="#F97316"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-xs text-gray-600">REVENUE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 border-t-2 border-dashed border-orange-500" />
                      <span className="text-xs text-gray-600">TRAFFIC</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Your Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Your Listings
              </h2>
              <Link href="/list-space">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Space
                </Button>
              </Link>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-2">
              {listings.map((listing) => (
                <Card
                  key={listing.id}
                  className="min-w-[240px] max-w-[240px] bg-white border-gray-100 shadow-sm rounded-lg overflow-hidden flex-shrink-0"
                >
                  <div className="relative h-32 bg-muted">
                    <Image
                      src={listing.image}
                      alt={listing.name}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
                      ACTIVE
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-base font-semibold text-foreground">{listing.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {listing.location}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>VIEWS</span>
                      <span>BOOKINGS</span>
                      <span>EARNED</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-900 mt-1">
                      <span>{listing.views}</span>
                      <span>{listing.bookings}</span>
                      <span>{listing.earned}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Listing Card */}
              <Link href="/list-space" className="flex-shrink-0">
                <Card className="min-w-[240px] max-w-[240px] h-full bg-white border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors rounded-lg cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center h-[220px] p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      Add New Listing
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Ready to scale your business?
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
