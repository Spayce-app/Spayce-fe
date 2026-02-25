"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Find Spaces", href: "/find-spaces" },
  { label: "Saved", href: "/saved" },
  { label: "List Your Space", href: "/list-space" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-border/80 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Spayce - Home">
            <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden transition-all duration-200 group-hover:scale-105 group-hover:shadow-md">
              <Image
                src="/spaycelogo.png"
                alt=""
                width={48}
                height={48}
                priority
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Spayce</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ label, href}) => (
              <Link key={label} href={href}>
                <Button
                  variant="ghost"
                  className={`rounded-xl transition-all duration-200 ${
                    pathname === href
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-foreground"
                  } hover:text-primary hover:bg-primary/5`}
                >
                  {label}
                  
                </Button>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="rounded-xl text-foreground hover:text-primary hover:bg-primary/5 transition-all" onClick={() => router.push('/signin')}>
              Log In
            </Button>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className={`rounded-xl transition-all duration-200 ${
                  pathname === "/dashboard"
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-foreground"
                } hover:text-primary hover:bg-primary/5`}
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 transition-all">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 h-[100dvh]  backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-64 max-w-[85vw] h-[100dvh] bg-background z-50 shadow-2xl flex flex-col justify-between border-r border-gray-100 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div>
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <span className="text-xl font-bold text-foreground">Spayce</span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-2 -m-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="h-6 w-6 text-foreground" />
                  </button>
                </div>

                <motion.ul
                  className="flex flex-col space-y-10 p-4"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                    show: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {navLinks.map(({ label, href }) => (
                    <motion.li
                      key={label}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-2 ${pathname === href
                          ? "text-primary font-semibold"
                          : "text-foreground"
                          } hover:text-primary`}
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 text-lg ${pathname === "/dashboard"
                        ? "text-primary font-semibold"
                        : "text-foreground"
                        } hover:text-primary`}
                    >
                      Dashboard
                    </Link>
                  </motion.li>

                </motion.ul>
              </div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 },
                }}
                className="flex flex-col items-center justify-center mb-4 gap-4"
              >
                <Link href="/signup" className="w-[90%]" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/signin" className="w-[90%]" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl">
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
