"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { WalletConnectButton } from "./wallet-connect-button"
import { Menu, X, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tokens", label: "All Tokens" },
  { href: "/create", label: "Create" },
  { href: "/arena", label: "Arena" },
  { href: "/trending", label: "Trending" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#9CFFBB]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] flex items-center justify-center">
              <span className="text-xl font-bold text-[#0A0A0A]">S</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              shark<span className="text-[#9CFFBB]">.fun</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search tokens..."
                className="w-full pl-10 bg-[#1A1A1A] border-[#9CFFBB]/20 text-white placeholder:text-gray-500 focus:border-[#9CFFBB]/50"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === link.href
                    ? "bg-[#9CFFBB]/10 text-[#9CFFBB]"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="flex items-center gap-3">
            <WalletConnectButton />
            <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-[#9CFFBB]/10">
          <div className="px-4 py-3 space-y-1">
            {/* Mobile Search */}
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search tokens..."
                className="w-full pl-10 bg-[#1A1A1A] border-[#9CFFBB]/20 text-white placeholder:text-gray-500"
              />
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === link.href
                    ? "bg-[#9CFFBB]/10 text-[#9CFFBB]"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
