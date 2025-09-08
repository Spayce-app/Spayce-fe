'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Users, Wifi, Car, Shield, Calendar, Star, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  const rotatingWords = ["Anytime", "Anywhere", "Instantly"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500); // change word every 2.5s
    return () => clearInterval(interval);
  }, []);

  const router = useRouter()
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('heroimg4.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <section className="text-center py-0">
            <h1 className="text-3xl md:text-6xl w-full md:leading-16 font-bold text-white mb-6 text-balance">
              Find Your Perfect Workspace{" "}
              <span className="relative inline-block text-accent w-[8ch]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute -bottom-2 md:-bottom-3 left-0 md:left-0"
                  >
                    {rotatingWords[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            {/* <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Flexible, modern, and ready when you are.
            </p> */}
          </section>
          <p className="md:text-xl text text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
            10,000+ workspace options including Desks, Conference Rooms, and Private Offices
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search by city or workspace name..."
                  className="pl-10 h-12 text-sm border-border focus:ring-primary"
                />
              </div>

              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Select date..." className="pl-10 h-12 text-sm border-border focus:ring-primary" />
              </div>

              <Link href="/find-spaces">
                <Button  className="h-12 px-24 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground md:text-md">
                  <Search className="mr-2 h-5 w-5" />
                  Find Spaces
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Space Types Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Workspace Type</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From hot desks to private offices, find the perfect space for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conference Rooms</h3>
                <p className="text-muted-foreground mb-4">Rent a conference room for part of or the entire day.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Projector</Badge>
                  <Badge variant="secondary">Whiteboard</Badge>
                  <Badge variant="secondary">Video Conf</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Desks & Day Passes</h3>
                <p className="text-muted-foreground mb-4">
                  Access to work on a desk or table in a space&apos;s communal area(s).
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">WiFi</Badge>
                  <Badge variant="secondary">Coffee</Badge>
                  <Badge variant="secondary">Printing</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Private Offices</h3>
                <p className="text-muted-foreground mb-4">
                  Rent office space by the hour, day, week, month or for multiple months in a row.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Private</Badge>
                  <Badge variant="secondary">Secure</Badge>
                  <Badge variant="secondary">24/7 Access</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Workspaces</h2>
            <p className="text-lg text-muted-foreground">Discover highly-rated spaces in your area</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} onClick={() => router.push(`/spaces/${i}`)} className="group hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={`/heroimg${i}.jpg`}
                    alt={`Workspace ${i}`}
                    loading="lazy"
                    fill
                    blurDataURL={`/heroimg${i}.jpg`}
                    placeholder="blur"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-foreground">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      4.{8 + (i % 2)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Modern Office - Downtown</h3>
                  <p className="text-muted-foreground text-sm mb-3">Lagos Island, Lagos</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {4 + i} people
                      </span>
                      <span className="flex items-center">
                        <Car className="w-4 h-4 mr-1" />
                        Parking
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">₦{(15 + i * 5) * 1000}</p>
                      <p className="text-sm text-muted-foreground">per day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/find-spaces">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View All Spaces
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {/* <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              ENABLING THE BEST BRANDS, SMALL BUSINESSES AND INDIVIDUALS
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Microsoft", "Netflix", "Mailchimp", "Facebook", "Reddit"].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-muted-foreground">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">spayce</span>
              </div>
              <p className="text-background/80">Find and book the perfect workspace for your needs.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Renters</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <Link href="/find-spaces" className="hover:text-primary transition-colors">
                    Find Spaces
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Hosts</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <Link href="/list-space" className="hover:text-primary transition-colors">
                    List Your Space
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Host Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/80">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Spayce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
