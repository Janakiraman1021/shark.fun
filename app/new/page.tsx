import { mockTokens } from "@/lib/mock-data"
import { TokenCard } from "@/components/token-card"
import { FilterBar } from "@/components/filter-bar"
import { Sparkles, Clock } from "lucide-react"

export default function NewTokensPage() {
  const newTokens = [...mockTokens].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">New Tokens</h1>
      </div>
      <p className="text-gray-400 mb-8">Freshly minted tokens ready to discover</p>

      <div className="mb-6">
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {newTokens.map((token) => (
          <div key={token.id} className="relative">
            <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full bg-[#9CFFBB]/20 text-[#9CFFBB] text-xs flex items-center gap-1">
              <Clock size={12} />
              {Math.floor((Date.now() - new Date(token.createdAt).getTime()) / (1000 * 60 * 60 * 24))}d ago
            </div>
            <TokenCard token={token} />
          </div>
        ))}
      </div>
    </div>
  )
}
