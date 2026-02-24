"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  Lock,
  CreditCard,
  Building2,
  MessageCircle,
  Star,
  Loader2,
} from "lucide-react"
import { format, parseISO, differenceInDays } from "date-fns"
import { toast } from "sonner"
import { createBooking } from "@/lib/api"

const PAYMENT_METHODS = [
  {
    id: "paystack",
    name: "Paystack",
    description: "Card, USSD, Bank Transfer",
    icon: Building2,
  },
  {
    id: "card",
    name: "Direct Card Payment",
    description: "Visa, Mastercard, Verve",
    icon: CreditCard,
  },
  {
    id: "bank",
    name: "Direct Bank Transfer",
    description: "Verify manually via support",
    icon: Building2,
  },
]

const DEFAULT_BOOKING = {
  spaceId: "1",
  spaceName: "Executive Suite at Lekki Heights",
  spaceImage: "/heroimg6.jpg",
  address: "12 Admiralty Way, Lekki Phase 1, Lagos",
  rating: 4.95,
  reviewCount: 128,
  pricePerDay: 35000,
  checkIn: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"),
  checkOut: format(new Date(Date.now() + 86400000 * 3), "yyyy-MM-dd"),
  startTime: "9:00 AM",
  endTime: "6:00 PM",
  hostId: "1",
  hostName: "Tunde Williams",
  hostAvatar: "/placeholder.svg?key=host",
  hostSince: "4 years hosting",
  superhost: true,
}

type BookingData = typeof DEFAULT_BOOKING

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState<BookingData>(DEFAULT_BOOKING)
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem("spayce_checkout")
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<BookingData>
        setBooking((prev) => ({ ...prev, ...parsed }))
      } catch {
        // use defaults
      }
    }
    // Also allow URL params to override
    const spaceId = searchParams.get("spaceId")
    const checkIn = searchParams.get("checkIn")
    const checkOut = searchParams.get("checkOut")
    if (spaceId) setBooking((b) => ({ ...b, spaceId }))
    if (checkIn) setBooking((b) => ({ ...b, checkIn }))
    if (checkOut) setBooking((b) => ({ ...b, checkOut }))
  }, [searchParams])

  const checkInDate = parseISO(booking.checkIn)
  const checkOutDate = parseISO(booking.checkOut)
  const days = Math.max(1, differenceInDays(checkOutDate, checkInDate))
  const subtotal = booking.pricePerDay * days
  const serviceFeeRate = 0.15
  const vatRate = 0.075
  const serviceFee = Math.round(subtotal * serviceFeeRate)
  const vat = Math.round(subtotal * vatRate)
  const total = subtotal + serviceFee + vat

  const handleConfirmPay = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      toast.error("Please log in to complete your booking")
      router.push("/signin?redirect=/checkout")
      return
    }

    setIsProcessing(true)
    try {
      await createBooking({
        spaceId: booking.spaceId,
        date: checkInDate.toISOString(),
        time: booking.startTime,
        duration: 1,
      })
      sessionStorage.removeItem("spayce_checkout")
      toast.success("Booking confirmed! Payment will be processed.")
      router.push("/dashboard/bookings")
    } catch (error) {
      toast.error(
        (error as Error).message || "Something went wrong. Please try again."
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const editHref = `/spaces/${booking.spaceId}?checkIn=${booking.checkIn}&checkOut=${booking.checkOut}`

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/find-spaces" className="hover:text-primary transition-colors">
                Lagos Spaces
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Confirm & Pay</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Confirm and Pay */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-1">
                  Confirm and pay
                </h1>
                <p className="text-sm text-muted-foreground">
                  Secure your premium workspace with end-to-end encryption.
                </p>
              </div>

              {/* Your booking */}
              <div className="rounded-xl bg-white shadow-soft border border-border/40 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold">Your booking</h2>
                  <Link
                    href={editHref}
                    className="text-primary font-medium text-sm hover:underline"
                  >
                    Edit
                  </Link>
                </div>
                <div className="space-y-0.5 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {format(checkInDate, "MMM d")} – {format(checkOutDate, "MMM d, yyyy")}
                  </p>
                  <p>
                    {days} full day{days > 1 ? "s" : ""} ({booking.startTime} – {booking.endTime})
                  </p>
                </div>
              </div>

              {/* Pay with */}
              <div className="rounded-xl bg-white shadow-soft border border-border/40 p-5">
                <h2 className="text-base font-semibold mb-3">Pay with</h2>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((pm) => {
                    const Icon = pm.icon
                    const isSelected = paymentMethod === pm.id
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border/60 bg-white hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{pm.name}</p>
                          <p className="text-xs text-muted-foreground">{pm.description}</p>
                        </div>
                        <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Secure checkout banner */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Lock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Secure Checkout</p>
                  <p className="text-xs text-muted-foreground">
                    Your connection is encrypted and your payment details are never stored on our servers.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleConfirmPay}
                disabled={isProcessing}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-md shadow-primary/20 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Confirm & Pay ₦{total.toLocaleString()}</>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By clicking the button above, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/terms#cancellation" className="text-primary hover:underline">
                  Cancellation Policy
                </Link>
                .
              </p>
            </motion.div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="sticky top-24 rounded-xl bg-white shadow-soft border border-border/40 overflow-hidden"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={booking.spaceImage || "/placeholder.svg"}
                  alt={booking.spaceName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium bg-white/95 text-muted-foreground">
                  PREMIUM WORKSPACE
                </span>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-foreground mb-0.5">
                    {booking.spaceName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{booking.address}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="font-medium text-sm">{booking.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({booking.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <h4 className="text-xs font-semibold mb-2">Price details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        ₦{booking.pricePerDay.toLocaleString()} x {days} days
                      </span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Service fee
                      </Link>
                      <span>₦{serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-primary"
                      >
                        VAT (7.5%)
                      </Link>
                      <span>₦{vat.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm pt-2">
                      <span>Total (NGN)</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Hosted by
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={"/host/" + (booking.hostId || "1")}
                      className="flex items-center gap-3 shrink-0 min-w-0"
                    >
                      <Avatar className="h-9 w-9 shrink-0 hover:ring-2 hover:ring-primary/30 transition-all">
                        <AvatarImage src={booking.hostAvatar} />
                        <AvatarFallback>
                          {booking.hostName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{booking.hostName}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.superhost ? "Superhost • " : ""}
                          {booking.hostSince} hosting
                        </p>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-primary hover:bg-primary/10 shrink-0"
                      aria-label="Message host"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Lock className="h-4 w-4 shrink-0" />
                  <span>SSL SECURED PAYMENT</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
