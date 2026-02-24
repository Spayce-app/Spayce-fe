"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const savedSpaces = [
  {
    id: 1,
    name: "Executive Suite at Lekki Heights",
    location: "Lekki Phase 1, Lagos",
    price: 45000,
    rating: 4.8,
    reviews: 120,
    image: "/heroimg5.jpg",
    premium: true,
  },
  {
    id: 2,
    name: "The Hub - Victoria Island",
    location: "Victoria Island, Lagos",
    price: 35000,
    rating: 4.7,
    reviews: 85,
    image: "/heroimg2.jpg",
    premium: false,
  },
  {
    id: 3,
    name: "Quiet Corner Workspace",
    location: "Ikeja, Lagos",
    price: 25000,
    rating: 4.9,
    reviews: 42,
    image: "/heroimg6.jpg",
    premium: false,
  },
  {
    id: 4,
    name: "Creative Studio Yaba",
    location: "Yaba, Lagos",
    price: 20000,
    rating: 4.5,
    reviews: 60,
    image: "/heroimg3.jpg",
    premium: false,
  },
]

export default function SavedSpacesPage() {
  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Account
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">Saved Spaces</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Saved Spaces
            </h1>
            <p className="text-muted-foreground mt-1.5 text-base md:text-lg">
              You have {savedSpaces.length} premium workspaces saved for your next project.
            </p>
          </div>
          <Link href="/find-spaces" className="shrink-0">
            <Button
              size="lg"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md h-12 px-6 gap-2"
            >
              <ArrowRight className="h-5 w-5" />
              Start Exploring
            </Button>
          </Link>
        </div>

        {/* Card grid - same card style as Find Spaces (shadow-soft, primary accents) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {savedSpaces.map((space, idx) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/spaces/${space.id}`} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-soft border-0 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    {space.premium && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-orange-400 text-white shadow-sm">
                          PREMIUM
                        </span>
                      </div>
                    )}
                    <span
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                      aria-hidden
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </span>
                  </div>

                  {/* Content - aligned with Find Spaces card structure */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {space.name}
                      </h2>
                      <span className="inline-flex items-center gap-0.5 text-sm font-medium text-foreground shrink-0">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {space.rating}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                      {space.location}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      ({space.reviews} reviews)
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <div>
                        <p className="font-bold text-lg text-primary">
                          N{space.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">/DAY</p>
                      </div>
                      <span className="text-primary font-semibold text-sm hover:underline shrink-0">
                        Book Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA - primary green, accent button (orange-400 like home CTA) */}
        <motion.section
          className="relative rounded-t-2xl bg-primary overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2/5 max-w-md pointer-events-none" aria-hidden>
            <div className="absolute top-1/5 right-4 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute bottom-1/3 right-20 w-28 h-28 rounded-full bg-white/5" />
            <div className="absolute top-1/2 -right-4 w-24 h-24 rounded-full bg-white/[0.07]" />
          </div>

          <div className="relative px-6 py-12 md:px-12 md:py-16 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Finding the perfect spot?
            </h2>
            <p className="text-white/90 text-base md:text-lg max-w-xl mb-8">
              Our curated list of workspaces continues to grow. Explore new locations in Ikeja, Surulere and beyond.
            </p>
            <Link href="/find-spaces">
              <Button
                size="lg"
                className="rounded-xl bg-orange-400 hover:bg-orange-500 text-white font-semibold shadow-md h-12 px-8 gap-2"
              >
                Browse All Spaces
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}
