"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingCalendar } from "@/components/ui/booking-calendar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  MapPin,
  Wifi,
  Car,
  Coffee,
  Shield,
  Star,
  Share,
  Heart,
  ChevronRight,
  Calendar,
  Download,
  X,
  Mail,
  Send,
  Zap,
  CheckCircle2,
  Printer,
  Monitor,
  Utensils,
  AirVent,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useMutation } from "@tanstack/react-query"
import { createBooking, sendMessageToHost } from "@/lib/api"
import {
  openCalendar,
  downloadICSFile,
  createCalendarEvent,
} from "@/lib/calendar-integration"
import { toast } from "sonner"
import { format, addDays, differenceInDays } from "date-fns"

const spaceData = {
  id: 1,
  name: "Premium Coworking Suite - Victoria Island",
  area: "Victoria Island",
  city: "Lagos",
  country: "Nigeria",
  location: "Victoria Island, Lagos, Nigeria",
  fullLocation: "294 Herbert Macaulay Way • Victoria Island, Lagos",
  rating: 4.8,
  reviewCount: 124,
  price: 15000,
  priceUnit: "per day",
  images: [
    "/spaceimg1.jpg",
    "/spaceimg2.jpg",
    "/spaceimg3.jpg",
    "/spaceimg4.jpg",
    "/heroimg5.jpg",
  ],
  sqft: 2400,
  capacity: 24,
  meetingRooms: 6,
  description: `This premium coworking space is strategically located in the heart of Victoria Island, offering startups, freelancers, and remote teams a professional environment to thrive. Whether you need a quiet desk for focused work or a collaborative area for team projects, this space delivers.

The space features ergonomic Herman Miller chairs, sound-proof phone booths for private calls, and high-speed fiber optic internet. Enjoy the rooftop terrace for breaks and networking, with stunning views of Lagos.`,
  amenities: [
    { icon: Wifi, label: "High-speed Fiber WiFi (100 Mbps)", included: true },
    {
      icon: Coffee,
      label: "Unlimited Specialty Coffee & Tea",
      included: true,
    },
    {
      icon: Printer,
      label: "Business-grade Printing & Scanning",
      included: true,
    },
    {
      icon: AirVent,
      label: "Central Air Conditioning",
      included: true,
    },
    { icon: Car, label: "Secure On-site Parking", included: true },
    {
      icon: Monitor,
      label: "Equipped Video Conferencing",
      included: true,
    },
    { icon: Shield, label: "Private Lockers", included: true },
    {
      icon: Utensils,
      label: "Fully Equipped Kitchenette",
      included: true,
    },
  ],
  totalAmenitiesCount: 32,
  host: {
    id: "1",
    name: "Chidi",
    avatar: "/placeholder.svg?key=host1",
    joinedDate: "2023",
    responseTime: "Within 1 hour",
    rating: 4.9,
  },
  keyFeatures: [
    {
      icon: Star,
      title: "Elite Workspace",
      desc: "Recognized as one of the top 5% coworking spaces in Victoria Island for service quality.",
    },
    {
      icon: Zap,
      title: "24/7 Power Guaranteed",
      desc: "Redundant power systems including inverter and industrial-grade generators.",
    },
    {
      icon: CheckCircle2,
      title: "Free cancellation",
      desc: "Cancel up to 24 hours before your booking for a full refund.",
    },
  ],
  reviews: [
    {
      id: 1,
      author: "Amaka O.",
      location: "Lagos, Nigeria",
      avatar: "/placeholder.svg?key=rev1",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Fantastic space! The internet was incredibly fast and the atmosphere was very professional. Perfect for client meetings.",
    },
    {
      id: 2,
      author: "Babajide S.",
      location: "Ibadan, Nigeria",
      avatar: "/placeholder.svg?key=rev2",
      rating: 5,
      date: "1 month ago",
      comment:
        "The power supply was seamless during my 2-day stay. The coffee is definitely a plus! I'll definitely be back.",
    },
  ],
  mapDescription:
    "Walking distance to Eko Hotels and various banking headquarters.",
  planTypes: [
    { value: "daily", label: "Daily Desk Access" },
    { value: "weekly", label: "Weekly Pass" },
    { value: "monthly", label: "Monthly Membership" },
  ],
}

export default function SpaceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showMoreDescription, setShowMoreDescription] = useState(false)
  const [showBookingCalendar, setShowBookingCalendar] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactMessage, setContactMessage] = useState("")
  const [lastBooking, setLastBooking] = useState<{
    date: Date
    time: string
  } | null>(null)

  const [checkIn, setCheckIn] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"))
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 2), "yyyy-MM-dd"))
  const [planType, setPlanType] = useState("daily")

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.max(
    1,
    differenceInDays(checkOutDate, checkInDate)
  )
  const subtotal = spaceData.price * nights
  const serviceFee = Math.round(subtotal * 0.08)
  const total = subtotal + serviceFee

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

  const messageMutation = useMutation({
    mutationFn: sendMessageToHost,
    onSuccess: () => {
      toast.success(
        "Message sent! Host will respond within " +
          spaceData.host.responseTime.toLowerCase()
      )
      setContactMessage("")
      setShowContactModal(false)
    },
    onError: (error: unknown) => {
      toast.error(
        (error as Error).message || "Failed to send message. Please try again."
      )
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

  const handleBookingComplete = async (booking: {
    date: Date
    time: string
  }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token")
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
          const bookingData =
            (data as { data?: { booking?: unknown }; booking?: unknown })
              ?.data?.booking || (data as { booking?: unknown })?.booking || data
          if (bookingData && typeof bookingData === "object" && "date" in bookingData) {
            setLastBooking({
              date: new Date((bookingData as { date: string }).date),
              time: (bookingData as { time?: string }).time || booking.time,
            })
          } else {
            setLastBooking(booking)
          }
          toast.success("Booking confirmed! 🎉")
          setTimeout(() => setShowBookingCalendar(false), 1500)
          resolve(data)
        })
        .catch((error: unknown) => {
          toast.error(
            (error as Error).message ||
              "Failed to create booking. Please try again."
          )
          reject(error)
        })
    })
  }

  const handleAddToCalendar = (provider: "google" | "outlook" | "ics") => {
    if (!lastBooking) {
      toast.error("Please complete a booking first")
      return
    }
    const event = createCalendarEvent(
      spaceData.name,
      spaceData.fullLocation,
      lastBooking.date,
      lastBooking.time
    )
    if (provider === "ics") {
      downloadICSFile(
        event,
        `spayce-booking-${spaceData.name.replace(/\s+/g, "-")}.ics`
      )
      toast.success("Calendar file downloaded!")
    } else {
      openCalendar(event, provider)
      toast.success(
        `Opening ${provider === "google" ? "Google" : "Outlook"} Calendar...`
      )
    }
  }

  const handleBookNow = () => {
    const checkoutData = {
      spaceId: params.id,
      hostId: spaceData.host.id,
      spaceName: spaceData.name,
      spaceImage: spaceData.images[0] || "/heroimg.jpg",
      address: spaceData.fullLocation,
      rating: spaceData.rating,
      reviewCount: spaceData.reviewCount,
      pricePerDay: spaceData.price,
      checkIn,
      checkOut,
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      hostName: spaceData.host.name,
      hostAvatar: spaceData.host.avatar,
      hostSince: "2023",
      superhost: true,
    }
    sessionStorage.setItem("spayce_checkout", JSON.stringify(checkoutData))
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Breadcrumbs */}
        <nav
          className="text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link
                href="/find-spaces"
                className="hover:text-primary transition-colors"
              >
                {spaceData.city}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/find-spaces"
                className="hover:text-primary transition-colors"
              >
                {spaceData.area}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Coworking Spaces</li>
          </ol>
        </nav>

        {/* Title, rating, Share/Save */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
              {spaceData.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                {spaceData.rating}
              </span>
              <span>({spaceData.reviewCount} reviews)</span>
              <span>•</span>
              <span>{spaceData.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-border/60"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: spaceData.name,
                      text: spaceData.description,
                      url: window.location.href,
                    })
                    .catch(() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success("Link copied!")
                    })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success("Link copied!")
                }
              }}
            >
              <Share className="h-4 w-4 mr-1.5" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-border/60"
              onClick={() => toast.success("Saved to favorites!")}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-10 rounded-2xl overflow-hidden">
          <div className="relative aspect-[4/3] md:aspect-auto md:row-span-2 md:min-h-[400px]">
            <Image
              src={spaceData.images[currentImageIndex] || "/placeholder.svg"}
              alt={spaceData.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-2 relative">
            {spaceData.images.slice(1, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx + 1)}
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={img}
                  alt={`${spaceData.name} ${idx + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </button>
            ))}
            <button
              onClick={() => setCurrentImageIndex(0)}
              className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-white/95 text-foreground text-sm font-medium shadow-md hover:bg-white transition-colors"
            >
              See all photos
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host + Key features */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Entire suite hosted by{" "}
                  <Link
                    href={`/host/${spaceData.host.id}`}
                    className="text-primary hover:underline"
                  >
                    {spaceData.host.name}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-3">
                  Up to {spaceData.capacity} professionals •{" "}
                  {spaceData.meetingRooms} Meeting Rooms •{" "}
                  {spaceData.sqft.toLocaleString()} sq ft
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setShowContactModal(true)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact host
                </Button>
              </div>
              <Link href={`/host/${spaceData.host.id}`} className="shrink-0">
                <Avatar className="h-14 w-14 hover:ring-2 hover:ring-primary/30 transition-all cursor-pointer">
                  <AvatarImage src={spaceData.host.avatar} />
                <AvatarFallback>
                  {spaceData.host.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              </Link>
            </div>

            <div className="space-y-4">
              {spaceData.keyFeatures.map((f, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About this space */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold mb-4">About this space</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {showMoreDescription
                    ? spaceData.description
                    : spaceData.description.slice(0, 280) + "..."}
                </p>
                <button
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  className="flex items-center gap-1 text-primary font-medium hover:underline"
                >
                  {showMoreDescription ? "Show less" : "Show more"}
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      showMoreDescription ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* What this space offers */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold mb-6">
                What this space offers
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {spaceData.amenities
                  .slice(0, showAllAmenities ? undefined : 8)
                  .map((a, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <a.icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{a.label}</span>
                    </div>
                  ))}
              </div>
              <Button
                variant="outline"
                className="mt-4 rounded-xl border-border/60"
                onClick={() => setShowAllAmenities(!showAllAmenities)}
              >
                {showAllAmenities
                  ? "Show less"
                  : `Show all ${spaceData.totalAmenitiesCount} amenities`}
              </Button>
            </div>

            {/* Reviews */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                {spaceData.rating} • {spaceData.reviewCount} reviews
              </h2>
              <div className="space-y-8">
                {spaceData.reviews.map((r) => (
                  <div key={r.id} className="flex gap-4">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage src={r.avatar} />
                      <AvatarFallback>
                        {r.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{r.author}</span>
                        <span className="text-muted-foreground">
                          {r.location} • {r.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < r.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-6 rounded-xl border-border/60"
                onClick={() => toast.info("Loading all reviews...")}
              >
                Show all reviews
              </Button>
            </div>

            {/* Where you'll be */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-semibold mb-4">Where you&apos;ll be</h2>
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted border border-border/60">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="font-medium text-foreground">
                      {spaceData.area}, {spaceData.city}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {spaceData.mapDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-white shadow-soft p-6 space-y-6">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold text-foreground">
                  ₦{spaceData.price.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/ day</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{spaceData.rating}</span>
                <span className="text-muted-foreground">
                  • {spaceData.reviewCount} reviews
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Check in
                  </label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Check out
                  </label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Plan type
                </label>
                <Select value={planType} onValueChange={setPlanType}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {spaceData.planTypes.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleBookNow}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-md shadow-primary/20"
              >
                Book Now
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                You won&apos;t be charged yet
              </p>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span>
                    ₦{spaceData.price.toLocaleString()} x {nights} days
                  </span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span>₦{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Spayce Guarantee — Every booking is covered with our guarantee.</span>
              </div>

              <Link
                href="#"
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Report this listing
              </Link>

              {lastBooking && (
                <div className="pt-4 border-t border-border space-y-2">
                  <h3 className="text-sm font-semibold">Add to Calendar</h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start rounded-xl"
                      onClick={() => handleAddToCalendar("google")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Google Calendar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start rounded-xl"
                      onClick={() => handleAddToCalendar("outlook")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Outlook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start rounded-xl"
                      onClick={() => handleAddToCalendar("ics")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download .ics
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Calendar Modal */}
      <AnimatePresence>
        {showBookingCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowBookingCalendar(false)
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-50 w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white z-10 border-b border-border px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Booking
                  </p>
                  <h2 className="text-xl font-bold">
                    Select date & time — {spaceData.name}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBookingCalendar(false)}
                  className="h-9 w-9 rounded-full"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                <BookingCalendar
                  spaceId={params.id}
                  price={spaceData.price}
                  priceUnit={spaceData.priceUnit}
                  instantBooking
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowContactModal(false)
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-50 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Contact
                  </p>
                  <h2 className="text-xl font-bold">
                    Message {spaceData.host.name}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowContactModal(false)}
                  className="h-9 w-9 rounded-full"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={spaceData.host.avatar} />
                    <AvatarFallback>
                      {spaceData.host.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{spaceData.host.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Response: {spaceData.host.responseTime}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Ask about availability, amenities..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={5}
                    className="resize-none rounded-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={messageMutation.isPending}
                    className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                  >
                    {messageMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send
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
