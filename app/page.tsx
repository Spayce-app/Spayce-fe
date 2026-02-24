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
import Footer from "@/components/Footer"

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
      <Navbar />
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 1.08 }}
          transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/heroimg4.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 hero-overlay" aria-hidden />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <section className="text-center py-0">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-6xl w-full md:leading-[1.15] font-bold text-white mb-6 text-balance drop-shadow-lg"
            >
              Find Your Perfect Workspace{" "}
              <span className="relative inline-block text-orange-400 w-[8ch]">
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
            </motion.h1>
          </section>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:text-xl text-white/90 mb-10 max-w-2xl mx-auto text-pretty"
          >
            Desks, meeting rooms, and private offices across Lagos, Abuja & beyond
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/98 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl shadow-black/10 max-w-6xl mx-auto border border-white/20"
          >
            <div className="flex flex-col  md:flex-row gap-4">
              <div className="flex-1  relative">
                <MapPin className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search by city or workspace name..."
                  className="pl-10 h-12 rounded-xl text-sm border-border focus:ring-primary transition-all"
                />
              </div>

              <div className="flex-1  relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Select date..." className="pl-10 h-12 rounded-xl text-sm border-border focus:ring-primary transition-all" />
              </div>

              <Link href="/find-spaces ">
                <Button className="h-12 px-20 md:px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground md:text-base shadow-md shadow-primary/20 transition-all">
                  <Search className="mr-2 h-5  w-5" />
                  Find Spaces
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="workspace-types" className="py-24 bg-[#F4F5F7] scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Workspace Types</h2>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Tailored environments for every stage of your business.
              </p>
            </div>
            <Link
              href="/find-spaces"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-primary/90 transition-colors shrink-0"
            >
              View all categories
              <span className="text-primary" aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Private Office",
                description: "Quiet & secure for focused work",
                image: "/heroimg6.jpg",
                href: "/find-spaces?type=office",
              },
              {
                title: "Dedicated Desk",
                description: "Collaborative community energy",
                image: "/heroimg5.jpg",
                href: "/find-spaces?type=desk",
              },
              {
                title: "Conference Room",
                description: "High-tech for impactful meetings",
                image: "/heroimg7.jpg",
                href: "/find-spaces?type=meeting",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <Link href={card.href} className="block">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft border border-border/40 bg-white">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-sm">
                        {card.title}
                      </h3>
                      <p className="text-white/95 text-sm md:text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Popular Workspaces</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Top-rated spaces in Lagos and across Nigeria</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { i: 3, name: "Villa Lagos Coworking", area: "Victoria Island" },
              { i: 4, name: "Co-Creation Hub", area: "Yaba" },
              { i: 5, name: "Wework Lagos", area: "Ikoyi" },
              { i: 6, name: "Leadspace", area: "Lekki Phase 1" },
              { i: 7, name: "Spark Innovation Hub", area: "Ikeja" },
              { i: 8, name: "Eko Innovation Centre", area: "Lagos Island" },
            ].map(({ i, name, area }, idx) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
              <Card onClick={() => router.push(`/spaces/${i}`)} className="group hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-transparent bg-white">
                <div className="aspect-video relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={`/heroimg${i}.jpg`}
                    alt={name}
                    loading="lazy"
                    fill
                    blurDataURL={`/heroimg${i}.jpg`}
                    placeholder="blur"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="rounded-lg bg-white/95 text-foreground shadow-soft backdrop-blur-sm">
                      <Star className="w-3 h-3 mr-1 fill-current text-primary" />
                      4.{8 + (i % 2)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{area}, Lagos</p>
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/find-spaces">
              <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 transition-all">
                View All Spaces
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* List your space CTA */}
      <section className="py-16 md:py-20 bg-[#F4F5F7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-2xl overflow-hidden bg-primary shadow-soft text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="py-12 md:py-16 px-4 sm:px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Have an empty workspace?
              </h2>
              <p className="text-white/95 text-base md:text-lg max-w-xl mx-auto mb-8">
                Join thousands of property owners in Nigeria earning passive income by listing their offices on Spayce.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/list-space">
                  <Button
                    size="lg"
                    className="rounded-xl bg-orange-400 hover:bg-orange-500 text-white font-semibold shadow-md transition-all"
                  >
                    Start Listing Now
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-xl bg-white/20 hover:bg-white/30 text-white border-0 font-medium transition-all"
                  >
                    Learn How it Works
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
