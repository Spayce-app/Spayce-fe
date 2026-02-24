"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, Lock } from "lucide-react"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { sendPasswordResetOTP } from "@/lib/api"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const mutation = useMutation({
    mutationFn: sendPasswordResetOTP,
    onSuccess: () => {
      toast.success("Password reset code sent to your email!")
      sessionStorage.setItem("resetEmail", email)
      router.push(`/verify-reset-otp?email=${encodeURIComponent(email)}`)
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reset code")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address")
      return
    }
    mutation.mutate({ email })
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
            <div className="w-14 h-14 relative bg-transparent rounded-lg flex items-center justify-center">
              <Image src="/spaycelogo.png" alt="Spayce Logo" fill priority blurDataURL="data:image/svg+xml;base64,..." />
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
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground">
            Don't worry! Enter your email address and we'll send you a code to reset your password.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              {mutation.isPending ? (
                <>
                  <Mail className="mr-2 h-4 w-4 animate-pulse" />
                  Sending Code...
                </>
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <Link href="/signin">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

