import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "shark.fun | Create & Trade Meme Tokens on Cardano",
  description:
    "The apex predator of meme token platforms. Create, buy, and sell meme tokens using bonding curve pricing on Cardano.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#0A0A0A] text-white min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64 pt-16 min-h-screen flex flex-col">
            {children}
            <Footer />
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
