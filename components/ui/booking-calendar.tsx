"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns"

interface BookingSlot {
  date: Date
  time: string
  available: boolean
  booked?: boolean
}

interface BookingCalendarProps {
  spaceId: string
  price: number
  priceUnit: string
  instantBooking?: boolean
  onBookingComplete?: (booking: { date: Date; time: string; spaceId?: string }) => void
  existingBookings?: BookingSlot[]
  availableHours?: string[]
}

export function BookingCalendar({
  spaceId,
  price,
  priceUnit = "day",
  instantBooking = true,
  onBookingComplete,
  existingBookings = [],
  availableHours = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const isDateBooked = (date: Date) => {
    return existingBookings.some(
      (booking) => isSameDay(booking.date, date) && booking.booked
    )
  }

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate >= today && !isDateBooked(date)
  }

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date) && isSameMonth(date, currentMonth)) {
      setSelectedDate(date)
      setSelectedTime(null)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return

    setIsBooking(true)
    try {
      if (onBookingComplete) {
        await onBookingComplete({ date: selectedDate, time: selectedTime, spaceId })
      }
      
      // Reset selection after successful booking
      setSelectedDate(null)
      setSelectedTime(null)
    } catch (error) {
      console.error("Booking failed:", error)
      // Don't reset selection on error so user can retry
    } finally {
      setIsBooking(false)
    }
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const goToToday = () => setCurrentMonth(new Date())

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Spayce Schedule</h3>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToToday}
            className="text-white hover:bg-white/10 h-8 px-3 text-sm transition-colors"
          >
            today
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevMonth}
              className="text-white hover:bg-white/10 h-8 w-8 p-0 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextMonth}
              className="text-white hover:bg-white/10 h-8 w-8 p-0 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isBooked = isDateBooked(day)
            const isAvailable = isDateAvailable(day) && isCurrentMonth
            const isToday = isSameDay(day, new Date())

            return (
              <button
                key={idx}
                onClick={() => handleDateSelect(day)}
                disabled={!isAvailable}
                className={`
                  aspect-square p-2 rounded-lg text-sm font-medium transition-all
                  ${!isCurrentMonth ? "text-muted-foreground/30" : ""}
                  ${isToday && !isSelected ? "bg-primary/10 text-primary border-2 border-primary" : ""}
                  ${isSelected ? "bg-primary text-primary-foreground border-2 border-primary shadow-md" : ""}
                  ${isBooked ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" : ""}
                  ${isAvailable && !isSelected && !isToday ? "hover:bg-muted hover:text-foreground" : ""}
                  ${!isAvailable && !isBooked ? "cursor-not-allowed opacity-30" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-8 pt-6 border-t border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Select Time for {format(selectedDate, "EEEE, MMMM d")}
              </h3>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {availableHours.map((time) => {
                const isSelected = selectedTime === time
                const isBooked = existingBookings.some(
                  (b) => isSameDay(b.date, selectedDate) && b.time === time && b.booked
                )

                return (
                  <button
                    key={time}
                    onClick={() => !isBooked && handleTimeSelect(time)}
                    disabled={isBooked}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${isSelected ? "bg-primary text-primary-foreground shadow-md scale-105" : ""}
                      ${isBooked ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" : ""}
                      ${!isSelected && !isBooked ? "bg-muted/50 hover:bg-muted hover:scale-105 text-foreground" : ""}
                    `}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Booking Summary & Actions */}
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 pt-6 border-t border-border"
          >
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-5 mb-4 border border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground font-medium">Selected Date</span>
                <span className="font-semibold text-foreground">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground font-medium">Time</span>
                <span className="font-semibold text-foreground">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-sm text-muted-foreground font-medium">Total Price</span>
                <span className="text-2xl font-bold text-primary">₦{price.toLocaleString()}/{priceUnit}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleBooking}
                disabled={isBooking}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {isBooking ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : instantBooking ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Book Instantly
                  </>
                ) : (
                  <>
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Request Booking
                  </>
                )}
              </Button>
            </div>

            {instantBooking && (
              <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-primary" />
                Your booking will be confirmed immediately
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
