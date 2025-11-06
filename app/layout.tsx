import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Spayce - Find Your Perfect Workspace",
  description:
    "Browse and book workspaces instantly. 10,000+ workspace options including desks, conference rooms, and private offices.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen w-screen bg-white">
              <img
                src="/sapaycelogo.png"
                alt="App Logo"
                className="h-40 w-40 animate-pulse"
              />
            </div>
          }>{children}</Suspense>
        </Providers>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
