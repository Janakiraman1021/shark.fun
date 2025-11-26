import { mockTokens } from "@/lib/mock-data"
import { TokenCard } from "@/components/token-card"
import { FilterBar } from "@/components/filter-bar"
import { Flame } from "lucide-react"

export default function TrendingPage() {
  const trendingTokens = [...mockTokens].sort((a, b) => b.volume24h - a.volume24h)

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Flame size={28} className="text-orange-400" />
        <h1 className="text-3xl font-bold text-white">Trending Tokens</h1>
      </div>
      <p className="text-gray-400 mb-8">Tokens with the highest trading volume in the last 24 hours</p>

      <div className="mb-6">
        <FilterBar />
      </div>

      {/* Top 3 Featured */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {trendingTokens.slice(0, 3).map((token, i) => (
          <div key={token.id} className="relative">
            <div className="absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {i + 1}
            </div>
            <TokenCard token={token} rank={i + 1} />
          </div>
        ))}
      </div>

      {/* Rest of Tokens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingTokens.slice(3).map((token, i) => (
          <TokenCard key={token.id} token={token} rank={i + 4} />
        ))}
      </div>
    </div>
  )
}
