import Image from "next/image"
import Link from "next/link"
import { mockTokens } from "@/lib/mock-data"
import { Trophy, TrendingUp, Crown, Medal } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LeaderboardPage() {
  const byVolume = [...mockTokens].sort((a, b) => b.volume24h - a.volume24h)
  const byMarketCap = [...mockTokens].sort((a, b) => b.marketCap - a.marketCap)
  const byHolders = [...mockTokens].sort((a, b) => b.holders - a.holders)

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy size={28} className="text-yellow-500" />
        <h1 className="text-3xl font-bold text-white">Leaderboards</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Volume */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#9CFFBB]/10 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#9CFFBB]" />
            <h2 className="font-semibold text-white">Top Volume (24h)</h2>
          </div>
          <div className="divide-y divide-[#9CFFBB]/5">
            {byVolume.slice(0, 10).map((token, i) => (
              <Link key={token.id} href={`/tokens/${token.id}`}>
                <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      i === 0
                        ? "bg-yellow-500 text-black"
                        : i === 1
                          ? "bg-gray-400 text-black"
                          : i === 2
                            ? "bg-amber-700 text-white"
                            : "bg-[#1A1A1A] text-gray-400",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#1A1A1A]">
                    <Image
                      src={token.image || "/placeholder.svg"}
                      alt={token.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{token.name}</p>
                  </div>
                  <p className="text-sm text-[#9CFFBB] font-medium">{(token.volume24h / 1000).toFixed(0)}K</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Market Cap */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#9CFFBB]/10 flex items-center gap-2">
            <Crown size={18} className="text-yellow-500" />
            <h2 className="font-semibold text-white">Top Market Cap</h2>
          </div>
          <div className="divide-y divide-[#9CFFBB]/5">
            {byMarketCap.slice(0, 10).map((token, i) => (
              <Link key={token.id} href={`/tokens/${token.id}`}>
                <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      i === 0
                        ? "bg-yellow-500 text-black"
                        : i === 1
                          ? "bg-gray-400 text-black"
                          : i === 2
                            ? "bg-amber-700 text-white"
                            : "bg-[#1A1A1A] text-gray-400",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#1A1A1A]">
                    <Image
                      src={token.image || "/placeholder.svg"}
                      alt={token.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{token.name}</p>
                  </div>
                  <p className="text-sm text-white font-medium">{(token.marketCap / 1000).toFixed(0)}K</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Most Holders */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#9CFFBB]/10 flex items-center gap-2">
            <Medal size={18} className="text-[#9CFFBB]" />
            <h2 className="font-semibold text-white">Most Holders</h2>
          </div>
          <div className="divide-y divide-[#9CFFBB]/5">
            {byHolders.slice(0, 10).map((token, i) => (
              <Link key={token.id} href={`/tokens/${token.id}`}>
                <div className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      i === 0
                        ? "bg-yellow-500 text-black"
                        : i === 1
                          ? "bg-gray-400 text-black"
                          : i === 2
                            ? "bg-amber-700 text-white"
                            : "bg-[#1A1A1A] text-gray-400",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#1A1A1A]">
                    <Image
                      src={token.image || "/placeholder.svg"}
                      alt={token.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{token.name}</p>
                  </div>
                  <p className="text-sm text-white font-medium">{token.holders.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
