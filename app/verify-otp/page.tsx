"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/otp-input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { verifySignupOTP, sendSignupOTP } from "@/lib/api"
import { toast } from "sonner"

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const type = searchParams.get("type") || "signup"
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (!email) {
      router.push("/signup")
      return
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, router])

  const verifyMutation = useMutation({
    mutationFn: verifySignupOTP,
    onSuccess: (data) => {
      toast.success("Account verified successfully!")
      // Store token if provided
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token)
      }
      router.push("/dashboard")
    },
    onError: (error: any) => {
      toast.error(error.message || "Invalid OTP. Please try again.")
      setOtp("")
    },
  })

  const resendMutation = useMutation({
    mutationFn: sendSignupOTP,
    onSuccess: () => {
      toast.success("OTP resent to your email!")
      setCountdown(60)
      setCanResend(false)
      setOtp("")
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to resend OTP")
    },
  })

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code")
      return
    }
    verifyMutation.mutate({ email, otp })
  }

  const handleResend = () => {
    const signupData = sessionStorage.getItem("signupData")
    if (!signupData) {
      toast.error("Session expired. Please sign up again.")
      router.push("/signup")
      return
    }

    const data = JSON.parse(signupData)
    resendMutation.mutate({
      email: data.email,
      password: data.password,
      role: data.role,
      fullName: data.fullName,
      phone: data.phone,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center absolute top-5 left-10 mb-8"
        >
          <Link href="/" className="flex relative items-center space-x-2">
            <div className="w-22 h-22 relative bg-transparent rounded-lg flex items-center justify-center">
              <Image src="/sapaycelogo.png" alt="Spayce Logo" fill priority blurDataURL="data:image/svg+xml;base64,..." />
            </div>
            <span className="text-2xl absolute top-7 -right-14 font-bold text-primary">spayce</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Check Your Email
          </h1>
          <p className="text-muted-foreground mb-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-semibold text-foreground">{email}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            disabled={verifyMutation.isPending || otp.length !== 6}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            {canResend ? (
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={resendMutation.isPending}
                className="text-primary hover:text-primary/80"
              >
                {resendMutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend code in {countdown}s
              </p>
            )}
          </div>

          <div className="pt-4 border-t">
            <Link href="/signup">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign Up
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

