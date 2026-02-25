"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  MessageCircle,
  Star,
  Check,
  Heart,
  Briefcase,
  Filter,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const HOST_DATA: Record<string, {
  id: string
  name: string
  avatar: string
  location: string
  verified: boolean
  yearsHosting: number
  responseRate: number
  rating: number
  bio: string
  speaks: string
  role: string
}> = {
  "1": {
    id: "1",
    name: "Chidi",
    avatar: "/placeholder.svg?key=host1",
    location: "Lagos, Nigeria",
    verified: true,
    yearsHosting: 4,
    responseRate: 98,
    rating: 4.9,
    bio: "Professional entrepreneur and workspace designer passionate about creating productive environments for Lagos' creative community. I manage premium hubs across Victoria Island and beyond, ensuring every guest has the tools they need to succeed.",
    speaks: "English, Yoruba",
    role: "Design Strategist",
  },
  "2": {
    id: "2",
    name: "Tunde Williams",
    avatar: "/placeholder.svg?key=host",
    location: "Lagos, Nigeria",
    verified: true,
    yearsHosting: 4,
    responseRate: 98,
    rating: 4.9,
    bio: "Professional entrepreneur and workspace designer passionate about creating productive environments for Lagos' creative community. I manage premium hubs across the city, ensuring every guest has the tools they need to succeed.",
    speaks: "English, Yoruba",
    role: "Design Strategist",
  },
}

const HOST_LISTINGS: {
  id: number
  hostId: string
  area: string
  name: string
  image: string
  rating: number
  capacity: number
  tags: string[]
  price: number
}[] = [
  {
    id: 1,
    hostId: "1",
    area: "VICTORIA ISLAND",
    name: "The Zenith Executive Suite",
    image: "/spaceimg1.jpg",
    rating: 4.9,
    capacity: 10,
    tags: ["Fiber", "Premium", "AV Set"],
    price: 25000,
  },
  {
    id: 2,
    hostId: "1",
    area: "LEKKI PHASE 1",
    name: "Creative Hub & Lounge",
    image: "/spaceimg2.jpg",
    rating: 4.8,
    capacity: 8,
    tags: ["Studio", "Premium"],
    price: 22000,
  },
  {
    id: 3,
    hostId: "1",
    area: "IKOYI",
    name: "Heritage Private Office",
    image: "/spaceimg3.jpg",
    rating: 4.95,
    capacity: 6,
    tags: ["Fiber", "Private"],
    price: 35000,
  },
  {
    id: 4,
    hostId: "1",
    area: "IKEJA GRA",
    name: "Boardroom Excellence",
    image: "/spaceimg4.jpg",
    rating: 4.9,
    capacity: 12,
    tags: ["Boardroom", "Premium", "AV Set"],
    price: 45000,
  },
]

const allListings = [
  ...HOST_LISTINGS,
  {
    id: 5,
    hostId: "1",
    area: "YABA",
    name: "Tech Hub Central",
    image: "/heroimg5.jpg",
    rating: 4.7,
    capacity: 20,
    tags: ["Fiber", "Event Space"],
    price: 18000,
  },
  {
    id: 6,
    hostId: "1",
    area: "AJAH",
    name: "Lakeside Workspace",
    image: "/heroimg6.jpg",
    rating: 4.8,
    capacity: 15,
    tags: ["Premium", "Parking"],
    price: 28000,
  },
  {
    id: 7,
    hostId: "1",
    area: "MARYLAND",
    name: "Urban Office Suite",
    image: "/heroimg7.jpg",
    rating: 4.6,
    capacity: 8,
    tags: ["Fiber", "Private"],
    price: 20000,
  },
  {
    id: 8,
    hostId: "1",
    area: "SURULERE",
    name: "Creative Studio Space",
    image: "/heroimg.jpg",
    rating: 4.85,
    capacity: 10,
    tags: ["Studio", "Premium"],
    price: 24000,
  },
]

export default function HostProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const [showAllListings, setShowAllListings] = useState(false)
  const host = HOST_DATA[params.id] || HOST_DATA["1"]
  const listings = showAllListings
    ? allListings.filter((l) => l.hostId === params.id)
    : HOST_LISTINGS.filter((l) => l.hostId === params.id)
  const totalListings = allListings.filter((l) => l.hostId === params.id).length
  const displayedCount = listings.length

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F4F5F7]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left column - Host info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white shadow-soft border border-border/40 p-6 text-center"
            >
              <div className="relative inline-block mb-4">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={host.avatar} />
                  <AvatarFallback className="text-2xl">
                    {host.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {host.verified && (
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <h1 className="text-xl font-bold text-foreground mb-1">
                {host.name}
              </h1>
              <p className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mb-3">
                <MapPin className="h-4 w-4 text-primary" />
                {host.location}
              </p>
              {host.verified && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
                  ✓ VERIFIED HOST
                </span>
              )}
              <Button
                className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <Link href={`/spaces/1?message=host`}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Host
                </Link>
              </Button>
              <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {host.yearsHosting} Years Hosting
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {host.responseRate}% Response
                  </p>
                </div>
                <div className="text-center flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <p className="text-sm font-semibold">{host.rating} Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl bg-white shadow-soft border border-border/40 p-6"
            >
              <h2 className="text-lg font-semibold mb-4">
                About {host.name.split(" ")[0]}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {host.bio}
              </p>
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                  Speaks {host.speaks}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-primary shrink-0" />
                  {host.role}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column - Listings */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    All Listings by {host.name.split(" ")[0]}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {totalListings} premium workspaces in Lagos
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl shrink-0"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {listings.map((space, idx) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 * (idx + 2),
                    }}
                  >
                    <Link href={`/spaces/${space.id}`}>
                      <div className="group rounded-2xl bg-white shadow-soft border border-border/40 overflow-hidden">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={space.image || "/placeholder.svg"}
                            alt={space.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              // TODO: toggle save
                            }}
                            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                            aria-label="Save"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="p-5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                            {space.area}
                          </p>
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                            {space.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 fill-primary text-primary shrink-0" />
                            <span className="text-sm font-medium">
                              {space.rating}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs text-muted-foreground">
                              Up to {space.capacity}
                            </span>
                            {space.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded bg-muted/80 text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground">
                              ₦{space.price.toLocaleString()}
                              <span className="text-sm font-normal text-muted-foreground">
                                {" "}
                                /day
                              </span>
                            </span>
                            <Button
                              size="sm"
                              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {totalListings > displayedCount && (
                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    className="rounded-xl border-primary text-primary hover:bg-primary/10"
                    onClick={() => setShowAllListings(!showAllListings)}
                  >
                    {showAllListings
                      ? "Show less"
                      : `View ${totalListings - displayedCount} More Listings`}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
