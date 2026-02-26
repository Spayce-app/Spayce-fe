"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const bookingsMap: Record<string, { renterName: string; spaceName: string; dateTime: string; duration: string; amount: string; status: string }> = {
  "1": {
    renterName: "Adewale Coker",
    spaceName: "Executive Boardroom",
    dateTime: "Oct 24, 2023 10:00 AM",
    duration: "4 Hours",
    amount: "N45,000",
    status: "Confirmed",
  },
  "2": {
    renterName: "Chinelo Okoro",
    spaceName: "Creative Studio",
    dateTime: "Oct 25, 2023 02:00 PM",
    duration: "2 Hours",
    amount: "N20,000",
    status: "Pending",
  },
  "3": {
    renterName: "Tunde Bakare",
    spaceName: "Private Office",
    dateTime: "Oct 22, 2023 09:00 AM",
    duration: "8 Hours",
    amount: "N60,000",
    status: "Completed",
  },
  "4": {
    renterName: "Sarah J.",
    spaceName: "Rooftop Lounge",
    dateTime: "Oct 20, 2023 06:00 PM",
    duration: "5 Hours",
    amount: "N120,000",
    status: "Cancelled",
  },
}

export default function BookingDetailPage() {
  const params = useParams()
  const id = params.id as string
  const booking = bookingsMap[id]

  if (!booking) {
    return (
      <>
        <DashboardHeader title="Booking Not Found" showSearch={false} />
        <main className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8FC] p-6">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">This booking could not be found.</p>
              <Link href="/dashboard/bookings">
                <Button variant="outline">Back to Bookings</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <DashboardHeader
        title={`Booking #${id}`}
        description="View booking details"
        showSearch={false}
      />
      <main className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8FC]">
        <div className="p-4 sm:p-6 md:p-8 max-w-[800px] mx-auto">
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </Button>
          </Link>
          <Card className="bg-white rounded-xl">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Renter</p>
                  <p className="font-semibold mt-1">{booking.renterName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Space</p>
                  <p className="font-semibold mt-1">{booking.spaceName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date & Time</p>
                  <p className="font-semibold mt-1">{booking.dateTime}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</p>
                  <p className="font-semibold mt-1">{booking.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</p>
                  <p className="font-semibold mt-1">{booking.amount}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
                  <p className="font-semibold mt-1">{booking.status}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/bookings">Back</Link>
                </Button>
                {booking.status === "Pending" && (
                  <Button>Confirm Booking</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
