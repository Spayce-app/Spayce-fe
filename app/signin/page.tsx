"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="w-full max-w-3xl p-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center absolute top-10 left-10 mb-8"
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-foreground">spayce</span>
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 text-sm mt-1">
            Please enter your login details to access your account.
          </p>
        </motion.div>

        {/* Form */}
        <form className="space-y-8">
          <div>
            <Input
              type="email"
              placeholder="E.g bendee@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              noRing
              className="rounded-md border-0 h-13 border-b border-gray-300"
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="E.g Steward12#$%"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              noRing
              className="rounded-md border-0 border-b h-13 border-gray-300 pr-10"
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
            className="w-full bg-primary text-white hover:bg-green-700 rounded-lg mt-4 transition"
          >
            Sign In
          </Button>
        </form>

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
