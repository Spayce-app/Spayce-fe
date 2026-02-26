"use client"

import { useState, useMemo } from "react"
import { toast } from "sonner"
import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const ratingDistribution = [
  { stars: 5, count: 97, percent: 78 },
  { stars: 4, count: 19, percent: 15 },
  { stars: 3, count: 5, percent: 4 },
  { stars: 2, count: 2, percent: 2 },
  { stars: 1, count: 1, percent: 1 },
]

const reviews = [
  {
    id: 1,
    author: "Sarah Jenkins",
    initials: "SJ",
    space: "Urban Greenhouse Loft",
    rating: 5,
    comment:
      "Absolutely loved the space! The natural light and plants created such a calming environment. Perfect for a productive work session.",
    date: "October 24, 2023",
    hasReply: false,
  },
  {
    id: 2,
    author: "Marcus Thorne",
    initials: "MT",
    space: "Minimalist Studio A",
    rating: 5,
    comment:
      "Clean, modern, and exactly what we needed for our client meeting. The host was very responsive and accommodating. Will book again!",
    date: "October 20, 2023",
    hasReply: true,
    replyText: "Thank you so much, Marcus! We're thrilled you had a great experience. Looking forward to hosting you again.",
    replyDate: "2 days ago",
  },
  {
    id: 3,
    author: "David Chen",
    initials: "DC",
    space: "Coastal View Workspace",
    rating: 5,
    comment:
      "Stunning views and impeccable facilities. The meeting room had everything we needed. Highly recommend for professional teams.",
    date: "October 18, 2023",
    hasReply: false,
  },
]

const filterTabs = [
  { value: "all", label: "All Reviews (124)" },
  { value: "pending", label: "Pending Reply (12)" },
  { value: "high", label: "High Rated" },
  { value: "low", label: "Low Rated" },
]

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleReply = (reviewId: number) => {
    setReplyingTo(reviewId)
    setReplyText("")
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      setReplyingTo(null)
      setReplyText("")
    }
  }

  const maxPercent = Math.max(...ratingDistribution.map((r) => r.percent))

  const filteredReviews = useMemo(() => {
    if (activeTab === "all") return reviews
    if (activeTab === "pending") return reviews.filter((r) => !r.hasReply)
    if (activeTab === "high") return reviews.filter((r) => r.rating >= 4)
    if (activeTab === "low") return reviews.filter((r) => r.rating <= 2)
    return reviews
  }, [activeTab])

  const ITEMS_PER_PAGE = 3
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / ITEMS_PER_PAGE))
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReviews = filteredReviews.slice(start, start + ITEMS_PER_PAGE)

  const handleEditReply = () => toast.info("Edit reply — coming soon")
  const handleDeleteReply = () => toast.info("Delete reply — coming soon")

  return (
    <>
      <DashboardHeader
        title="Guest Reviews"
        description="Monitor your feedback and keep your rating high."
        showSearch={false}
        badge={
          <Badge className="bg-primary/10 text-primary border border-primary/30 font-medium px-3 py-1">
            Top Rated Host
          </Badge>
        }
      />
      <main className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8FC]">
        <div className="p-4 sm:p-6 md:p-8 max-w-[1440px] mx-auto space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
              <CardContent className="p-5">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Overall Rating
                </h3>
                <div className="flex flex-col items-center text-center">
                  <span className="text-2xl font-bold text-foreground">4.8</span>
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i <= 4.8 ? "text-primary fill-primary" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Based on 124 reviews</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
              <CardContent className="p-5">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Rating Distribution
                </h3>
                <div className="space-y-3">
                  {ratingDistribution.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12 shrink-0">
                        <span className="text-xs font-medium text-foreground">{row.stars}★</span>
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${(row.percent / maxPercent) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {row.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-1 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => { setActiveTab(tab.value); setCurrentPage(1) }}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors -mb-px ${
                    activeTab === tab.value
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-5">
            {paginatedReviews.map((review) => (
              <Card
                key={review.id}
                className="bg-white border-gray-100 shadow-sm rounded-lg overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                        {review.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            {review.author}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Stayed at: {review.space}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-primary fill-primary"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-foreground/90 text-sm mt-3 leading-relaxed">
                        &ldquo;{review.comment}&rdquo;
                      </p>

                      {review.hasReply ? (
                        <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                          <p className="text-xs font-medium text-primary mb-1">
                            Your Response {review.replyDate}
                          </p>
                          <p className="text-sm text-foreground/90">{review.replyText}</p>
                          <div className="flex gap-4 mt-2">
                            <button
                              type="button"
                              onClick={handleEditReply}
                              className="text-xs font-medium text-primary hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={handleDeleteReply}
                              className="text-xs font-medium text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : replyingTo === review.id ? (
                        <div className="mt-4 space-y-3">
                          <Textarea
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                            className="text-sm resize-none"
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null)
                                setReplyText("")
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                              onClick={handleSendReply}
                              disabled={!replyText.trim()}
                            >
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 border-primary text-primary hover:bg-primary/5"
                          onClick={() => handleReply(review.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1.5" />
                          Reply
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <p className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="h-9"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1 mx-1 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={currentPage === p ? "default" : "outline"}
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="h-9"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
