"use client"

import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Plus, MapPin, Star, Edit, Eye, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function SpacesPage() {
  return (
    <>
      <DashboardHeader title="My Spaces" />
      <main className="flex-1 p-6 overflow-y-auto bg-background">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">My Spaces</h2>
            <Link href="/list-space">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add New Space
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/spaceimg1.jpg"
                  alt="Modern Coworking Space"
                  fill
                  className="object-cover"
                />
                <Badge variant="default" className="absolute top-3 left-3">Active</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Downtown Creative Hub</h3>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  123 Main St, San Francisco
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-primary">$45/day</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    4.9 (23 reviews)
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>12 bookings this month</span>
                  <span>85% occupancy</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-48">
                <Image src="/spaceimg2.jpg" alt="Executive Office" fill className="object-cover" />
                <Badge variant="default" className="absolute top-3 left-3">Active</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Executive Office Suite</h3>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  456 Business Ave, San Francisco
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-primary">$120/day</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    4.7 (18 reviews)
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>8 bookings this month</span>
                  <span>72% occupancy</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-muted hover:border-primary transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center min-h-[400px]">
                <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">Add New Space</h3>
                <p className="text-muted-foreground text-sm">List your workspace and start earning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

