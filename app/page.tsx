import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Users, Wifi, Car, Shield, Calendar, Star, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold text-foreground">spayce</span>
              </Link>

              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Space Types
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                <Link href="/find-spaces">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Find Spaces
                  </Button>
                </Link>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Pricing
                </Button>
                <Link href="/list-space">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    List Your Space
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Log In
              </Button>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Dashboard
                </Button>
              </Link>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/placeholder.svg?key=j2ec9')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Browse and Book Workspaces
            <span className="block text-accent">Instantly</span>
          </h1>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
            10,000+ workspace options including Desks, Conference Rooms, and Private Offices
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-6 shadow-2xl max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search by city or workspace name..."
                  className="pl-10 h-12 text-lg border-border focus:ring-primary"
                />
              </div>

              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Select date..." className="pl-10 h-12 text-lg border-border focus:ring-primary" />
              </div>

              <Link href="/find-spaces">
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
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
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
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

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Desks & Day Passes</h3>
                <p className="text-muted-foreground mb-4">
                  Access to work on a desk or table in a space's communal area(s).
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">WiFi</Badge>
                  <Badge variant="secondary">Coffee</Badge>
                  <Badge variant="secondary">Printing</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
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
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`/modern-office.png?key=w7yw9&key=sj9dk&key=zc2nt&key=4shcy&height=200&width=300&query=modern office space ${i}`}
                    alt={`Workspace ${i}`}
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
      <section className="py-16 bg-muted/30">
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
      </section>

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
