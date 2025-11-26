import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Coins, TrendingUp, Wallet, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Connect any CIP-30 compatible Cardano wallet like Eternl, Nami, or Lace to get started.",
  },
  {
    icon: Coins,
    title: "Create or Buy Tokens",
    description: "Create your own meme token with custom bonding curves, or browse and buy existing tokens with ADA.",
  },
  {
    icon: TrendingUp,
    title: "Trade on the Curve",
    description:
      "Buy and sell tokens instantly. The bonding curve automatically adjusts prices based on supply and demand.",
  },
  {
    icon: Zap,
    title: "Compete in Battles",
    description: "Enter the Battle Arena to compete against other tokens for prize pools and glory.",
  },
]

const features = [
  "No liquidity pools required",
  "Instant trades via bonding curves",
  "Transparent, on-chain pricing",
  "Creator fees on every trade",
  "Battle Arena competitions",
  "Built on Cardano for low fees",
]

export default function HowItWorksPage() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen size={28} className="text-[#9CFFBB]" />
            <h1 className="text-4xl font-bold text-white">How It Works</h1>
          </div>
          <p className="text-lg text-gray-400">
            Learn how to create, trade, and compete with meme tokens on the Cardano blockchain.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] flex items-center justify-center text-[#0A0A0A] font-bold">
                {i + 1}
              </div>
              <div className="pt-4">
                <step.icon size={32} className="text-[#9CFFBB] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonding Curves Explained */}
      <section className="bg-[#111111] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Understanding Bonding Curves</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#9CFFBB]/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-[#9CFFBB]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Linear Curve</h3>
              <p className="text-sm text-gray-400">
                Price increases at a constant rate. Good for stable, predictable growth.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#9CFFBB]/20 flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-[#9CFFBB]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Exponential Curve</h3>
              <p className="text-sm text-gray-400">
                Price grows faster as supply increases. Higher risk and reward potential.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#9CFFBB]/20 flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-[#9CFFBB]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sigmoid Curve</h3>
              <p className="text-sm text-gray-400">S-curve with slower growth at extremes. Balanced risk profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Platform Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle size={20} className="text-[#9CFFBB] shrink-0" />
              <span className="text-white">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Dive In?</h2>
          <p className="text-gray-400 mb-6">Create your first token or start trading in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold">
                Create Token
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/tokens">
              <Button variant="outline" className="border-[#9CFFBB]/30 text-white hover:bg-[#9CFFBB]/10 bg-transparent">
                Explore Tokens
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
