import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"

const outfit = localFont({
  src: [
    { path: "../public/fonts/Outfit-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Outfit-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Outfit-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Outfit-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Outfit-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
})
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"
import { Providers } from "./providers"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://spayce.ng"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Spayce - Find & Book Workspaces in Nigeria",
    template: "%s | Spayce",
  },
  description:
    "Spayce is Nigeria's workspace marketplace. Discover and book desks, meeting rooms, and private offices across Lagos and beyond. Instant booking, transparent pricing.",
  keywords: ["workspace", "coworking", "office space", "meeting rooms", "Lagos", "Nigeria", "Spayce"],
  authors: [{ name: "Spayce", url: SITE_URL }],
  creator: "Spayce",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Spayce",
    title: "Spayce - Find & Book Workspaces in Nigeria",
    description: "Discover and book desks, meeting rooms, and private offices across Lagos and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spayce - Find & Book Workspaces in Nigeria",
    description: "Nigeria's workspace marketplace. Instant booking across Lagos.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/spaycelogo.png",
    apple: "/spaycelogo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${outfit.variable} antialiased`}>
        <Providers>
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen w-screen bg-background">
              <div className="flex flex-col items-center gap-4">
                <img src="/spaycelogo.png" alt="Spayce" className="h-24 w-24 animate-pulse" />
                <span className="text-lg font-semibold text-primary">Spayce</span>
              </div>
            </div>
          }>{children}</Suspense>
        </Providers>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
