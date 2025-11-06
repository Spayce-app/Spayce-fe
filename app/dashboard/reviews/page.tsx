"use client"

import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  return (
    <>
      <DashboardHeader title="Reviews" description="See what your guests are saying" />
      <main className="flex-1 p-6 overflow-y-auto bg-background">
        <div className="space-y-6">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Sarah Miller</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Downtown Creative Hub</p>
                    <p className="text-foreground">
                      Amazing workspace with great natural light and modern amenities. Perfect for my team&apos;s brainstorming
                      session. Will definitely book again!
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">December 13, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Michael Johnson</h4>
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <Star key={4} className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Executive Office Suite</p>
                    <p className="text-foreground">
                      Great office space with professional setup. Everything was clean and well-maintained. Highly recommend!
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">December 12, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

