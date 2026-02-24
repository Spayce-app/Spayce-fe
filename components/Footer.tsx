"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-orange-950 text-white py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-transparent to-transparent pointer-events-none" aria-hidden />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden transition-transform group-hover:scale-105">
                <Image src="/sapaycelogo.png" alt="Spayce" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight">Spayce</span>
            </Link>
            <p className="text-white/75 text-sm leading-relaxed max-w-xs">
              Nigeria&apos;s workspace marketplace. Find and book the perfect desk, meeting room, or private office.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/90">For Renters</h4>
            <ul className="space-y-3 text-white/75 text-sm">
              <li>
                <Link href="/find-spaces" className="hover:text-orange-400 transition-all duration-200 inline-block hover:translate-x-0.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:ring-offset-2 focus:ring-offset-orange-950">
                  Find Spaces
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-orange-400 transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#workspace-types" className="hover:text-orange-400 transition-colors duration-200">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/90">For Hosts</h4>
            <ul className="space-y-3 text-white/75 text-sm">
              <li>
                <Link href="/list-space" className="hover:text-orange-400 transition-colors duration-200">
                  List Your Space
                </Link>
              </li>
              <li>
                <Link href="/list-space" className="hover:text-orange-400 transition-colors duration-200">
                  Host Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/90">Support</h4>
            <ul className="space-y-3 text-white/75 text-sm">
              <li>
                <Link href="/terms" className="hover:text-orange-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@spayce.ng" className="hover:text-orange-400 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Spayce. All rights reserved.</p>
          <p className="text-white/60 text-sm">Lagos, Nigeria</p>
        </div>
      </div>
    </footer>
  )
}
