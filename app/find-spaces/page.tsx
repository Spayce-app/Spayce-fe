"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  MapPin,
  Users,
  Wifi,
  Car,
  Coffee,
  Shield,
  Star,
  Filter,
  Grid3X3,
  List,
  Map,
  Clock,
  Zap,
  Monitor,
  Utensils,
  Printer,
  Volume2,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getSpace } from "@/lib/api"
import { toast } from "sonner"

const mockSpaces = [
  {
    id: 1,
    name: "Pacific Workplaces - J Street DOCO",
    location: "Downtown, Sacramento",
    distance: "10.0 miles",
    openTime: "8:30am on 9/8",
    price: 25,
    priceUnit: "per day",
    rating: 4.8,
    image: "heroimg.jpg",
    amenities: ["Desks", "3 Meeting rooms"],
    features: ["WiFi", "Coffee", "Parking"],
  },
  {
    id: 2,
    name: "CENTRL Office - Downtown Sacramento",
    location: "Mansion Flats, Sacramento",
    distance: "10.3 miles",
    openTime: "9:00am on 9/8",
    price: 40,
    priceUnit: "per day",
    rating: 4.9,
    image: "herimg2.jpg",
    amenities: ["Desks", "4 Meeting rooms", "1 Office room"],
    features: ["WiFi", "Coffee", "Parking", "Printing"],
  },
  {
    id: 3,
    name: "Creative Hub - Midtown",
    location: "Midtown, Sacramento",
    distance: "8.5 miles",
    openTime: "7:00am on 9/8",
    price: 35,
    priceUnit: "per day",
    rating: 4.7,
    image: "heroimg3.jpg",
    amenities: ["Desks", "2 Meeting rooms"],
    features: ["WiFi", "Coffee", "24/7 Access"],
  },
  {
    id: 4,
    name: "Tech Valley Coworking",
    location: "East Sacramento",
    distance: "12.1 miles",
    openTime: "8:00am on 9/8",
    price: 30,
    priceUnit: "per day",
    rating: 4.6,
    image: "heroimg5.jpg",
    amenities: ["Desks", "1 Meeting room", "Phone booths"],
    features: ["WiFi", "Coffee", "Parking", "Printing"],
  },
  {
    id: 5,
    name: "Executive Suites Downtown",
    location: "Financial District, Sacramento",
    distance: "9.8 miles",
    openTime: "8:00am on 9/8",
    price: 55,
    priceUnit: "per day",
    rating: 4.9,
    image: "heroimg6.jpg",
    amenities: ["Private Offices", "3 Meeting rooms"],
    features: ["WiFi", "Coffee", "Parking", "Reception"],
  },
  {
    id: 6,
    name: "Startup Incubator Space",
    location: "Natomas, Sacramento",
    distance: "15.2 miles",
    openTime: "24/7 Access",
    price: 28,
    priceUnit: "per day",
    rating: 4.5,
    image: "heroimg7.jpg",
    amenities: ["Desks", "2 Meeting rooms", "Event space"],
    features: ["WiFi", "Coffee", "24/7 Access", "Kitchen"],
  },
]

export default function FindSpacesPage() {
  const [searchQuery, setSearchQuery] = useState("Lekki, Lagos")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100])

  const {data, isPending,isError} = useQuery({
    queryKey: ['get-spaces'],
    queryFn: getSpace
  })

  useEffect(() => {
    console.log(data)
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city or workspace name..."
                className="pl-10 h-12 text-lg border-border focus:ring-primary"
              />
            </div>
            <Button 
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                // TODO: Implement actual search functionality with API
                toast.info(`Searching for: ${searchQuery}`)
                // This would trigger a refetch with search params
              }}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
        <div className="mb-6">
          <Tabs defaultValue="desk" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
                <TabsTrigger value="desk" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Desk
                </TabsTrigger>
                <TabsTrigger value="meet" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Meet
                </TabsTrigger>
                <TabsTrigger value="office" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Office
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  All
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="rounded-l-none"
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            {showFilters && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Date & Time</h4>
                      <div className="space-y-2">
                        <Input type="date" className="w-full" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM-6PM)</SelectItem>
                            <SelectItem value="evening">Evening (6PM-10PM)</SelectItem>
                            <SelectItem value="allday">All Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Amenities</h4>
                      <div className="space-y-2">
                        {[
                          { id: "wifi", label: "WiFi", icon: Wifi },
                          { id: "coffee", label: "Coffee", icon: Coffee },
                          { id: "parking", label: "Parking", icon: Car },
                          { id: "printing", label: "Printing", icon: Printer },
                        ].map(({ id, label, icon: Icon }) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox id={id} />
                            <label htmlFor={id} className="flex items-center gap-2 text-sm">
                              <Icon className="h-4 w-4" />
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Mood</h4>
                      <div className="space-y-2">
                        {[
                          { id: "quiet", label: "Quiet", icon: Volume2 },
                          { id: "collaborative", label: "Collaborative", icon: Users },
                          { id: "energetic", label: "Energetic", icon: Zap },
                          { id: "professional", label: "Professional", icon: Shield },
                        ].map(({ id, label, icon: Icon }) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox id={id} />
                            <label htmlFor={id} className="flex items-center gap-2 text-sm">
                              <Icon className="h-4 w-4" />
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>₦{priceRange[0] * 1000}</span>
                          <span>₦{priceRange[1] * 1000}+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </Tabs>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-medium">{mockSpaces.length} results</span>
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Nearest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === "grid" && (
              <div className="grid md:grid-cols-2 gap-6">
                {mockSpaces.map((space) => (
                  <Link key={space.id} href={`/spaces/${space.id}`}>
                    <Card className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={space.image || "/placeholder.svg"}
                          alt={space.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant={'secondary'} className="bg-white/90 text-foreground">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {space.rating}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-md mb-1">{space.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          {space.location} • {space.distance} • Opens at {space.openTime}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {space.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            {space.features.slice(0, 3).map((feature) => (
                              <span key={feature} className="flex items-center">
                                {feature === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                                {feature === "Coffee" && <Coffee className="w-3 h-3 mr-1" />}
                                {feature === "Parking" && <Car className="w-3 h-3 mr-1" />}
                                {feature === "Printing" && <Printer className="w-3 h-3 mr-1" />}
                                {feature === "24/7 Access" && <Clock className="w-3 h-3 mr-1" />}
                                {feature === "Reception" && <Users className="w-3 h-3 mr-1" />}
                                {feature === "Kitchen" && <Utensils className="w-3 h-3 mr-1" />}
                                {feature}
                              </span>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">₦{space.price * 1000}</p>
                            <p className="text-xs text-muted-foreground">{space.priceUnit}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            
              </div>
            )}

            {viewMode === "list" && (
              <div className="space-y-4">
                {mockSpaces.map((space) => (
                  <Link key={space.id} href={`/spaces/${space.id}`}>
                    <Card className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-48 h-32 relative overflow-hidden">
                            <img
                              src={space.image || "/placeholder.svg"}
                              alt={space.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-white/90 text-foreground text-xs">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                {space.rating}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{space.name}</h3>
                                <p className="text-muted-foreground text-sm mb-2">
                                  {space.location} • {space.distance} • Opens at {space.openTime}
                                </p>

                                <div className="flex flex-wrap gap-1 mb-2">
                                  {space.amenities.map((amenity) => (
                                    <Badge key={amenity} variant="secondary" className="text-xs">
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  {space.features.map((feature) => (
                                    <span key={feature} className="flex items-center">
                                      {feature === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                                      {feature === "Coffee" && <Coffee className="w-3 h-3 mr-1" />}
                                      {feature === "Parking" && <Car className="w-3 h-3 mr-1" />}
                                      {feature === "Printing" && <Printer className="w-3 h-3 mr-1" />}
                                      {feature === "24/7 Access" && <Clock className="w-3 h-3 mr-1" />}
                                      {feature === "Reception" && <Users className="w-3 h-3 mr-1" />}
                                      {feature === "Kitchen" && <Utensils className="w-3 h-3 mr-1" />}
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="font-semibold text-xl">₦{space.price * 1000}</p>
                                <p className="text-sm text-muted-foreground">{space.priceUnit}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {viewMode === "map" && (
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map view would be implemented here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing {mockSpaces.length} spaces in the selected area
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <div className="h-96 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Map View</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
          <Footer/>
    </div>
  )
}
