"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Space Types", href: "/space-types", dropdown: true },
  { label: "Find Spaces", href: "/find-spaces" },
  { label: "Pricing", href: "/pricing" },
  { label: "List Your Space", href: "/list-space" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur  supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex relative items-center space-x-2">
            <div className="w-22 h-22  relative bg-transparent rounded-lg flex items-center justify-center">
              {/* <span className="text-primary-foreground font-bold text-lg">S</span> */}
              <Image src="/sapaycelogo.png" alt="Spayce Logo" fill priority={true} blurDataURL="data:image/svg+xml;base64,..." />
            </div>
            <span className="text-2xl absolute top-7 -right-14 font-bold text-primary">spayce</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ label, href, dropdown }) => (
              <Link key={label} href={href}>
                <Button
                  variant="ghost"
                  className={`${pathname === href ? "text-primary font-semibold" : "text-foreground"
                    } hover:text-white`}
                >
                  {label}
                  {dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-white" onClick={() => router.push('/signin')}>
              Log In
            </Button>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className={`${pathname === "/dashboard"
                  ? "text-primary font-semibold"
                  : "text-foreground"
                  } hover:text-white`}
              >
                Dashboard
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
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
              className="fixed inset-0 bg-black/50 h-[100vh]  backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-64  justify-between h-[100vh] bg-background z-50 shadow-xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div>
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-xl font-bold">spayce</span>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6 text-foreground" />
                  </button>
                </div>

                <motion.ul
                  className="flex flex-col space-y-4 p-4"
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
                        className={`block text-lg ${pathname === href
                          ? "text-primary font-semibold"
                          : "text-foreground"
                          } hover:text-white`}
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
                      className={`block text-lg ${pathname === "/dashboard"
                        ? "text-primary font-semibold"
                        : "text-foreground"
                        } hover:text-white`}
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
                className="flex flex-col items-center justify-center mb-4"
              >
                <Button className="w-[90%] mx-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Sign Up
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
