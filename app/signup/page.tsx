"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { sendSignupOTP } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: sendSignupOTP,
    onSuccess: (data) => {
      toast.success("OTP sent to your email!");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem('userRole', data.data.user.role)
      const userRole = localStorage.getItem('userRole')
      sessionStorage.setItem("signupData", JSON.stringify({
        email,
        password,
        role,
        fullName,
        phone,
      }));
      console.log(data)
      // router.push(`/verify-otp?email=${encodeURIComponent(email)}&type=signup`);
      if (userRole === 'owner') {
        router.push('/dashboard/overview')
      }
      else {
        router.push('/find-spaces')
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    mutation.mutate({
      email,
      password,
      role,
      fullName,
      phone,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="w-full max-w-3xl p-8">
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-left mb-5">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Create</span> An Account
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mt-1">
            Register now to start listing or booking workspaces. We'll send you a verification code.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border-0 h-13 border-b border-gray-300"
          />
          <Input
            type="text"
            placeholder="fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-md border-0 h-13 border-b border-gray-300"
          />
          <Input
            type="text"
            placeholder="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-md border-0 h-13 border-b border-gray-300"
          />

          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-2">Register as</label> */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border-0 h-13 border-b border-gray-300 bg-transparent text-gray-900 focus:ring-0"
            >
              <option value="">Register as</option>
              <option value="renter">Renter</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="E.g Steward12#$%"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border-0 border-b h-13 border-gray-300 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-white hover:bg-primary/90 rounded-lg mt-4 transition"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Mail className="mr-2 h-4 w-4 animate-pulse" />
                Sending OTP...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
