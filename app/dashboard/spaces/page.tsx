"use client"

import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const listings = [
  {
    id: 1,
    name: "Lekki Co-working Hub",
    location: "Lekki Phase 1, Lagos",
    image: "/spaceimg1.jpg",
    views: "245",
    bookings: "32",
    earned: "N480,000",
    price: "₦25,000/day",
  },
  {
    id: 2,
    name: "Victoria Island Suites",
    location: "Victoria Island, Lagos",
    image: "/spaceimg2.jpg",
    views: "189",
    bookings: "24",
    earned: "N360,000",
    price: "₦40,000/day",
  },
]

export default function SpacesPage() {
  return (
    <>
      <DashboardHeader
        title="My Spaces"
        description="Manage your listed spaces"
        showSearch={true}
      />
      <main className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8F9]">
        <div className="p-4 sm:p-6 md:p-8 max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Listings</h2>
            <Link href="/list-space" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add New Space
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card
                key={listing.id}
                className="bg-white border-gray-100 shadow-sm rounded-xl overflow-hidden"
              >
                <div className="relative h-48 bg-muted">
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
                    ACTIVE
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {listing.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 shrink-0" />
                    {listing.location}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span>VIEWS</span>
                    <span>BOOKINGS</span>
                    <span>EARNED</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-900 mt-1">
                    <span>{listing.views}</span>
                    <span>{listing.bookings}</span>
                    <span>{listing.earned}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Space Card */}
            <Link href="/list-space">
              <Card className="h-full min-h-[340px] bg-white border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-colors rounded-xl cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Add New Listing</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Ready to scale your business?
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
