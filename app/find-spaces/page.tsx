"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Wifi,
  Car,
  Coffee,
  Star,
  Map,
  Zap,
  Users,
  Heart,
  Check,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const mockSpaces = [
  {
    id: 1,
    name: "Executive Desk in Victori...",
    location: "Victoria Island, Lagos",
    price: 15000,
    rating: 4.9,
    image: "/heroimg.jpg",
    topRated: true,
    features: ["WiFi", "Power", "Parking", "Coffee", "People"],
  },
  {
    id: 2,
    name: "Villa Lagos Coworking",
    location: "Victoria Island, Lagos",
    price: 25000,
    rating: 4.8,
    image: "/heroimg2.jpg",
    topRated: false,
    features: ["WiFi", "Power", "Parking", "Coffee"],
  },
  {
    id: 3,
    name: "Co-Creation Hub",
    location: "Yaba, Lagos",
    price: 40000,
    rating: 4.9,
    image: "/heroimg3.jpg",
    topRated: true,
    features: ["WiFi", "Power", "Parking", "Coffee", "People"],
  },
  {
    id: 4,
    name: "Leadspace Lekki",
    location: "Lekki Phase 1, Lagos",
    price: 35000,
    rating: 4.7,
    image: "/heroimg5.jpg",
    topRated: false,
    features: ["WiFi", "Power", "Coffee"],
  },
  {
    id: 5,
    name: "Spark Innovation Hub",
    location: "Ikeja, Lagos",
    price: 30000,
    rating: 4.6,
    image: "/heroimg6.jpg",
    topRated: true,
    features: ["WiFi", "Power", "Parking", "People"],
  },
  {
    id: 6,
    name: "Eko Innovation Centre",
    location: "Lagos Island, Lagos",
    price: 55000,
    rating: 4.9,
    image: "/heroimg7.jpg",
    topRated: false,
    features: ["WiFi", "Power", "Parking", "Coffee", "People"],
  },
]

const spaceTypes = [
  { id: "private", label: "Private Office" },
  { id: "desk", label: "Dedicated Desk" },
  { id: "meeting", label: "Meeting Room" },
]

const amenityOptions = [
  { id: "wifi", label: "High-speed Wi-Fi", icon: Wifi },
  { id: "power", label: "Uninterrupted Power", icon: Zap },
  { id: "parking", label: "Free Parking", icon: Car },
  { id: "coffee", label: "Coffee Bar", icon: Coffee },
]

const moodOptions = ["Productive", "Creative", "Quiet", "Social"]

function AmenityIcon({ name }: { name: string }) {
  switch (name) {
    case "WiFi":
      return <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
    case "Power":
      return <Zap className="h-3.5 w-3.5 text-muted-foreground" />
    case "Parking":
      return <Car className="h-3.5 w-3.5 text-muted-foreground" />
    case "Coffee":
      return <Coffee className="h-3.5 w-3.5 text-muted-foreground" />
    case "People":
      return <Users className="h-3.5 w-3.5 text-muted-foreground" />
    default:
      return null
  }
}

export default function FindSpacesPage() {
  const [spaceType, setSpaceType] = useState("private")
  const [priceRange, setPriceRange] = useState([5, 100])
  const [selectedMood, setSelectedMood] = useState("Productive")
  const [showMap, setShowMap] = useState(false)
  const [amenities, setAmenities] = useState({
    wifi: true,
    power: true,
    parking: false,
    coffee: false,
  })

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F4F5F7]">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Page header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Workspaces in Lagos
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Showing 124 available spaces for today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Select defaultValue="popular">
              <SelectTrigger className="w-full sm:w-[180px] h-10 rounded-xl border-border/60 bg-white shadow-soft">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showMap ? "default" : "outline"}
              className="rounded-xl border-border/60 w-full sm:w-auto"
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="h-4 w-4 mr-2 shrink-0" />
              Map View
            </Button>
          </div>
        </motion.div>

        {/* Main layout: sidebar + content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Filters */}
          <motion.aside
            className="w-full lg:w-72 shrink-0"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl bg-white shadow-soft border border-muted-foreground/20 p-4 sm:p-6 space-y-6 sm:space-y-8 lg:sticky lg:top-24">
              {/* SPACE TYPE */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Space Type
                </h3>
                <div className="space-y-2">
                  {spaceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSpaceType(type.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                        spaceType === type.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      {spaceType === type.id && <Check className="h-4 w-4 shrink-0" />}
                      <span className={spaceType === type.id ? "" : "ml-7"}>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE RANGE */}
              <div className="border-t border-border/60 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Price Range (₦)
                </h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-primary"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₦{priceRange[0]}k</span>
                    <span>₦{priceRange[1]}k+</span>
                  </div>
                </div>
              </div>

              {/* AMENITIES */}
              <div className="border-t border-border/60 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Amenities
                </h3>
                <div className="space-y-3">
                  {amenityOptions.map(({ id, label, icon: Icon }) => (
                    <label
                      key={id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <Checkbox
                        checked={amenities[id as keyof typeof amenities] ?? false}
                        onCheckedChange={(checked) =>
                          setAmenities((prev) => ({ ...prev, [id]: !!checked }))
                        }
                        className="rounded data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* VIBE & MOOD */}
              <div className="border-t border-border/60 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Vibe & Mood
                </h3>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedMood === mood
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main content - workspace cards */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {mockSpaces.map((space, idx) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link href={`/spaces/${space.id}`}>
                    <Card className="group overflow-hidden border-0 bg-white rounded-2xl shadow-soft h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={space.image || "/placeholder.svg"}
                          alt={space.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                        {space.topRated && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-sm">
                              TOP RATED
                            </span>
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // TODO: toggle favorite
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
                          aria-label="Save"
                        >
                          <Heart className="h-4 w-4 text-foreground" />
                        </button>
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-base text-foreground line-clamp-1">
                            {space.name}
                          </h3>
                          <span className="inline-flex items-center gap-0.5 text-sm font-medium text-foreground shrink-0">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            {space.rating}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {space.location}
                        </p>
                        <div className="flex items-center gap-3 text-muted-foreground mb-4">
                          {space.features.map((f) => (
                            <AmenityIcon key={f} name={f} />
                          ))}
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <p className="font-bold text-lg text-foreground">
                              ₦{space.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">PER DAY</p>
                          </div>
                          <span className="inline-flex">
                            <Button
                              size="sm"
                              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 pointer-events-none"
                            >
                              Book Now
                            </Button>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-10 pb-24 lg:pb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-9 w-9 p-0 border-border/60"
              >
                ‹
              </Button>
              <Button
                size="sm"
                className="rounded-xl h-9 w-9 p-0 bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-9 w-9 p-0 border-border/60"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-9 w-9 p-0 border-border/60"
              >
                3
              </Button>
              <span className="px-2 text-muted-foreground">…</span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-9 w-9 p-0 border-border/60"
              >
                12
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-9 w-9 p-0 border-border/60"
              >
                ›
              </Button>
            </motion.div>
          </div>
        </div>


        {/* Show Map floating button (mobile) */}
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="secondary"
            className="rounded-full px-6 py-6 h-auto bg-gray-800 hover:bg-gray-900 text-white shadow-lg"
            onClick={() => setShowMap(!showMap)}
          >
            <Map className="h-4 w-4 mr-2" />
            Show Map
          </Button>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
