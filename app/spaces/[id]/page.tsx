"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingCalendar } from "@/components/ui/booking-calendar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
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
  Calendar,
  Download,
  X,
  Mail,
  Send,
} from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { useMutation } from "@tanstack/react-query"
import { createBooking, sendMessageToHost } from "@/lib/api"
import { openCalendar, downloadICSFile, createCalendarEvent } from "@/lib/calendar-integration"
import { toast } from "sonner"
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
  const [showBookingCalendar, setShowBookingCalendar] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactMessage, setContactMessage] = useState("")
  const [lastBooking, setLastBooking] = useState<{ date: Date; time: string } | null>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showBookingCalendar || showContactModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showBookingCalendar, showContactModal])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showBookingCalendar) setShowBookingCalendar(false)
        if (showContactModal) setShowContactModal(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [showBookingCalendar, showContactModal])

  const handleContactHost = () => {
    setShowContactModal(true)
  }

  const messageMutation = useMutation({
    mutationFn: sendMessageToHost,
    onSuccess: () => {
      toast.success("Message sent to host! They'll respond within " + spaceData.host.responseTime.toLowerCase())
      setContactMessage("")
      setShowContactModal(false)
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send message. Please try again.")
    },
  })

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      toast.error("Please enter a message")
      return
    }
    messageMutation.mutate({
      spaceId: params.id,
      message: contactMessage,
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spaceData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spaceData.images.length) % spaceData.images.length)
  }

  const handleBookingComplete = async (booking: { date: Date; time: string }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error("Please log in to make a booking")
        reject(new Error("No token found"))
        return
      }

      createBooking({
        spaceId: params.id,
        date: booking.date.toISOString(),
        time: booking.time,
        duration: 1,
      })
        .then((data) => {
          // Store booking data for calendar integration
          // Handle different possible response structures
          const bookingData = data?.data?.booking || data?.booking || data
          if (bookingData) {
            setLastBooking({
              date: bookingData.date ? new Date(bookingData.date) : booking.date,
              time: bookingData.time || booking.time,
            })
          } else {
            // Fallback to the booking we just made
            setLastBooking(booking)
          }
          toast.success("Booking confirmed! 🎉")
          // Close modal after a brief delay to show success
          setTimeout(() => {
            setShowBookingCalendar(false)
          }, 1500)
          resolve(data)
        })
        .catch((error) => {
          toast.error(error.message || "Failed to create booking. Please try again.")
          reject(error)
        })
    })
  }

  const handleAddToCalendar = (provider: 'google' | 'outlook' | 'ics') => {
    if (!lastBooking) {
      toast.error("Please complete a booking first")
      return
    }

    const event = createCalendarEvent(
      spaceData.name,
      spaceData.location,
      lastBooking.date,
      lastBooking.time
    )

    if (provider === 'ics') {
      downloadICSFile(event, `spayce-booking-${spaceData.name.replace(/\s+/g, '-')}.ics`)
      toast.success("Calendar file downloaded!")
    } else {
      openCalendar(event, provider)
      toast.success(`Opening ${provider === 'google' ? 'Google' : 'Outlook'} Calendar...`)
    }
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
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-white/90 hover:bg-white"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: spaceData.name,
                          text: spaceData.description,
                          url: window.location.href,
                        }).catch(() => {
                          // Fallback to copy
                          navigator.clipboard.writeText(window.location.href)
                          toast.success("Link copied to clipboard!")
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                        toast.success("Link copied to clipboard!")
                      }
                    }}
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className="bg-white/90 hover:bg-white"
                    onClick={() => {
                      // TODO: Implement favorite/save functionality
                      toast.success("Space saved to favorites!")
                    }}
                  >
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

                <Button 
                  variant="outline" 
                  className="w-full mt-6 bg-transparent"
                  onClick={() => {
                    // TODO: Navigate to full reviews page or expand reviews
                    toast.info("Showing all reviews...")
                  }}
                >
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

                  <Button
                    onClick={() => setShowBookingCalendar(true)}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg mb-4"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Select Date & Time
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">Instant booking available</div>
                </CardContent>
              </Card>

              {/* Calendar Integration */}
              {lastBooking && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Add to Calendar</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAddToCalendar("google")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Google Calendar
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAddToCalendar("outlook")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Outlook Calendar
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleAddToCalendar("ics")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download .ics File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

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

                  <Button 
                    variant="outline" 
                    className="w-full mt-4 bg-transparent"
                    onClick={handleContactHost}
                  >
                    <Mail className="h-4 w-4 mr-2" />
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

      {/* Booking Calendar Modal */}
      <AnimatePresence>
        {showBookingCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowBookingCalendar(false)
              }
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-50 w-full max-w-6xl max-h-[95vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 border-b border-border px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                    Booking
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    Select date & time for {spaceData.name}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBookingCalendar(false)}
                  className="h-9 w-9 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="overflow-y-auto flex-1 px-6 py-6">
                <BookingCalendar
                  spaceId={params.id}
                  price={spaceData.price * 1000}
                  priceUnit={spaceData.priceUnit}
                  instantBooking={true}
                  onBookingComplete={handleBookingComplete}
                  availableHours={[
                    "9:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                  ]}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Host Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowContactModal(false)
              }
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-50 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                    Contact
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    Message {spaceData.host.name}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowContactModal(false)}
                  className="h-9 w-9 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4 pb-4 border-b border-border">
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
                    <p className="font-semibold">{spaceData.host.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Response time: {spaceData.host.responseTime}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Ask about availability, amenities, or any questions you have about this space..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {contactMessage.length} characters
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={messageMutation.isPending}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {messageMutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
