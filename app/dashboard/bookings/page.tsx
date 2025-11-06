"use client"

import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export default function BookingsPage() {
  return (
    <>
      <DashboardHeader title="Bookings" description="Manage and track all your bookings" />
      <main className="flex-1 p-6 overflow-y-auto bg-background">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                <div className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">Sarah Miller</h4>
                      <p className="text-sm text-muted-foreground">Downtown Creative Hub</p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        Dec 15, 2024 • 9:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">$45.00</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 mt-2">
                      Confirmed
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">Michael Johnson</h4>
                      <p className="text-sm text-muted-foreground">Executive Office Suite</p>
                      <p className="text-sm text-muted-foreground flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        Dec 16, 2024 • 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">$120.00</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 mt-2">
                      Confirmed
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

