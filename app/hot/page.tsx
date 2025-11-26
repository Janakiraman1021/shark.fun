import { mockTokens } from "@/lib/mock-data"
import { TokenCard } from "@/components/token-card"
import { FilterBar } from "@/components/filter-bar"
import { TrendingUp, Zap } from "lucide-react"

export default function HotTokensPage() {
  const hotTokens = [...mockTokens].sort((a, b) => b.priceChange24h - a.priceChange24h)

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Zap size={28} className="text-yellow-400" />
        <h1 className="text-3xl font-bold text-white">Hot Tokens</h1>
      </div>
      <p className="text-gray-400 mb-8">Top gainers with the highest price increase</p>

      <div className="mb-6">
        <FilterBar />
      </div>

      {/* Top Gainers Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {hotTokens.slice(0, 3).map((token, i) => (
          <div key={token.id} className="glass-card rounded-xl p-4 border-[#5CFF71]/30">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-1 rounded-full bg-[#5CFF71]/20 text-[#5CFF71] text-xs font-bold">
                #{i + 1} GAINER
              </span>
              <span className="text-[#5CFF71] font-bold text-lg flex items-center gap-1">
                <TrendingUp size={18} />+{token.priceChange24h.toFixed(1)}%
              </span>
            </div>
            <TokenCard token={token} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hotTokens.slice(3).map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  )
}
