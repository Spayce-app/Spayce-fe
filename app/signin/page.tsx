"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful!");
      localStorage.setItem("token", data.data.token);
        localStorage.setItem('userRole', data.data.user.role)
      const userRole = localStorage.getItem('userRole')
      if (userRole === 'owner') {
        window.location.href = "/dashboard";
      }
      else {
        window.location.href = "/find-spaces"
      }

    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed. Please check your credentials.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-3xl p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center absolute top-4 left-10 mb-8"
        >
          <Link href="/" className="flex relative items-center space-x-2">
            <div className="w-14 h-14 relative bg-transparent rounded-lg flex items-center justify-center">
              <Image
                src="/spaycelogo.png"
                alt="Spayce Logo"
                fill
                priority={true}
                blurDataURL="data:image/svg+xml;base64,..."
              />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Spayce</span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-left mb-5"
        >
          <h1 className="text-3xl font-bold text-foreground">
            <span className="text-primary">Welcome</span> Back
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Please enter your login details to access your account.
          </p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Input
              type="email"
              placeholder="E.g bendee@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              noRing
              required
              className="rounded-xl h-12 border border-border focus:border-primary/50 transition-all"
            />
          </div>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="E.g Steward12#$%"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              noRing
              required
              className="rounded-md border-0 border-b h-13 border-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            size={"lg"}
            disabled={loginMutation.isPending}
            className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg mt-4 transition"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-right mt-4">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Bottom Link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          New account?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
