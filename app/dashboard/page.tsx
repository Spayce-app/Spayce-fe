"use client"

import { useState } from "react"
import {
  Building2,
  Calendar,
  DollarSign,
  Eye,
  Star,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  Edit,
  MoreHorizontal,
  Plus,
  BarChart3,
  MessageSquare,
  Settings,
  Home,
  LogOut,
  Bell,
  Badge,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "spaces", label: "My Spaces", icon: Building2 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />
      case "spaces":
        return <SpacesContent />
      case "bookings":
        return <BookingsContent />
      case "analytics":
        return <AnalyticsContent />
      case "reviews":
        return <ReviewsContent />
      case "settings":
        return <SettingsContent />
      default:
        return <OverviewContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Spayce</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Space Owner</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {sidebarItems.find((item) => item.id === activeTab)?.label || "Dashboard"}
                </h1>
                <p className="text-gray-600">Manage your spaces and track performance</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  List New Space
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

function OverviewContent() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Sarah Miller</p>
                  <p className="text-xs text-muted-foreground">Downtown Creative Hub</p>
                </div>
                <div className="text-sm font-medium">$45</div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Michael Johnson</p>
                  <p className="text-xs text-muted-foreground">Executive Office Suite</p>
                </div>
                <div className="text-sm font-medium">$120</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Performance chart would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SpacesContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Spaces</h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Space
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ... existing space cards ... */}
        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src="/modern-coworking-space-with-natural-light--plants-.jpg"
              alt="Modern Coworking Space"
              fill
              className="object-cover"
            />
            <Badge className="absolute top-3 left-3 bg-emerald-600">Active</Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">Downtown Creative Hub</h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-sm mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              123 Main St, San Francisco
            </p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-emerald-600">$45/day</span>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                4.9 (23 reviews)
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>12 bookings this month</span>
              <span>85% occupancy</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="relative h-48">
            <Image src="/modern-office.png" alt="Executive Office" fill className="object-cover" />
            <Badge className="absolute top-3 left-3 bg-emerald-600">Active</Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">Executive Office Suite</h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600 text-sm mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              456 Business Ave, San Francisco
            </p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl font-bold text-emerald-600">$120/day</span>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                4.7 (18 reviews)
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>8 bookings this month</span>
              <span>72% occupancy</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Plus className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Add New Space</h3>
            <p className="text-gray-600 text-sm">List your workspace and start earning</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BookingsContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {/* ... existing booking items ... */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">Sarah Miller</h4>
                  <p className="text-sm text-gray-600">Downtown Creative Hub</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Dec 15, 2024 • 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">$45.00</p>
                <Badge  className="bg-green-100 text-green-800">
                  Confirmed
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Revenue chart would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Booking Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Booking patterns chart would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ReviewsContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Sarah Miller</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Downtown Creative Hub</p>
                <p className="text-gray-700">
                  "Amazing workspace with great natural light and modern amenities. Perfect for my team's brainstorming
                  session. Will definitely book again!"
                </p>
                <p className="text-sm text-gray-500 mt-2">December 13, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}
