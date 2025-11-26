import { TokenTable } from "@/components/token-table"
import { FilterBar } from "@/components/filter-bar"
import { mockTokens } from "@/lib/mock-data"
import { Coins } from "lucide-react"

export default function TokensPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Coins size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">All Tokens</h1>
      </div>

      <div className="mb-6">
        <FilterBar />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <TokenTable tokens={mockTokens} />
      </div>
    </div>
  )
}
