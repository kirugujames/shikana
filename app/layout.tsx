import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SFUP - Shikana Frontliners for Unity Party",
  description:
    "Join the movement for unity, progress, and inclusive governance. Discover our vision for a stronger Tanzania.",
  generator: "v0.app",
  keywords: ["politics", "unity", "party", "governance", "Tanzania", "SFUP"],
  openGraph: {
    title: "SFUP - Shikana Frontliners for Unity Party",
    description: "Join the movement for unity, progress, and inclusive governance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SFUP - Shikana Frontliners for Unity Party",
    description: "Join the movement for unity, progress, and inclusive governance.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
