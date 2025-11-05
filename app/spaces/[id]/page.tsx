"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Wifi,
  Car,
  Coffee,
  Shield,
  Star,
  ChevronLeft,
  Share,
  Heart,
  Clock,
  Printer,
  Phone,
  Utensils,
  AirVent,
  Camera,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
const spaceData = {
  id: 1,
  name: "CENTRL Office - Downtown Sacramento",
  location: "1201 J Street • Mansion Flats, Sacramento",
  rating: 4.9,
  reviewCount: 127,
  price: 40,
  priceUnit: "per day",
  images: [
    "/spaceimg1.jpg",
    "/spaceimg2.jpg",
    "/spaceimg3.jpg",
    "/spaceimg4.jpg",
  ],
  description:
    "A modern, professional workspace in the heart of downtown Sacramento. Perfect for individuals and teams looking for a productive environment with all the amenities you need.",
  amenities: [
    { icon: Wifi, label: "High-Speed WiFi", included: true },
    { icon: Coffee, label: "Complimentary Coffee", included: true },
    { icon: Car, label: "Parking Available", included: true },
    { icon: Printer, label: "Printing & Scanning", included: true },
    { icon: Phone, label: "Phone Booths", included: true },
    { icon: Utensils, label: "Kitchen Access", included: true },
    { icon: AirVent, label: "Air Conditioning", included: true },
    { icon: Shield, label: "24/7 Security", included: true },
  ],
  spaces: {
    meetingRooms: 4,
    officeSpaces: 1,
    desks: 12,
    capacity: 25,
  },
  hours: {
    weekdays: "8:00 AM - 6:00 PM",
    weekends: "9:00 AM - 5:00 PM",
  },
  host: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?key=host1",
    joinedDate: "2022",
    responseTime: "Within 1 hour",
    rating: 4.9,
  },
  reviews: [
    {
      id: 1,
      author: "Michael Chen",
      avatar: "/placeholder.svg?key=rev1",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent workspace with great amenities. The meeting rooms are well-equipped and the staff is very helpful.",
    },
    {
      id: 2,
      author: "Lisa Rodriguez",
      avatar: "/placeholder.svg?key=rev2",
      rating: 5,
      date: "1 month ago",
      comment:
        "Perfect location in downtown Sacramento. Clean, modern, and professional environment. Highly recommend!",
    },
    {
      id: 3,
      author: "David Kim",
      avatar: "/placeholder.svg?key=rev3",
      rating: 4,
      date: "2 months ago",
      comment: "Great space for team meetings. The parking is convenient and the coffee is actually good!",
    },
  ],
}

export default function SpaceDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spaceData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spaceData.images.length) % spaceData.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/find-spaces" className="hover:text-primary flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to search
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={spaceData.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${spaceData.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  <Camera className="inline h-4 w-4 mr-1" />
                  {currentImageIndex + 1} / {spaceData.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {spaceData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Space Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{spaceData.name}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {spaceData.location}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                      {spaceData.rating} ({spaceData.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">{spaceData.description}</p>
            </div>

            {/* Space Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Space Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Meeting Rooms</span>
                      <span className="font-medium">{spaceData.spaces.meetingRooms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Office Spaces</span>
                      <span className="font-medium">{spaceData.spaces.officeSpaces}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Available Desks</span>
                      <span className="font-medium">{spaceData.spaces.desks}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Capacity</span>
                      <span className="font-medium">{spaceData.spaces.capacity} people</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Amenities</h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-primary"
                  >
                    {showAllAmenities ? "Show less" : "Show all"}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${showAllAmenities ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {spaceData.amenities.slice(0, showAllAmenities ? undefined : 6).map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <amenity.icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Hours</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">{spaceData.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Saturday - Sunday</span>
                    <span className="font-medium">{spaceData.hours.weekends}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-current text-yellow-500" />
                    <span className="font-semibold">{spaceData.rating}</span>
                    <span className="text-muted-foreground">({spaceData.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {spaceData.reviews.map((review) => (
                    <div key={review.id} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{review.author}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-current text-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6 bg-transparent">
                  Show all reviews
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-foreground">₦{spaceData.price * 1000}</div>
                    <div className="text-muted-foreground">{spaceData.priceUnit}</div>
                  </div>

                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg mb-4">
                    Reserve Desk - ₦{spaceData.price * 1000} per day
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">You will not be charged yet</div>
                </CardContent>
              </Card>

              {/* Host Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hosted by {spaceData.host.name}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={spaceData.host.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {spaceData.host.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="font-medium">{spaceData.host.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Joined in {spaceData.host.joinedDate}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Response time: {spaceData.host.responseTime}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Contact Host
                  </Button>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Location</h3>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive map</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{spaceData.location}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
