import Link from "next/link"
import { mockTrades, mockTokens } from "@/lib/mock-data"
import { ArrowLeft, History, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TransactionHistoryPage() {
  // Generate more mock transactions
  const transactions = [
    ...mockTrades,
    ...mockTrades.map((t, i) => ({
      ...t,
      id: `h${i}`,
      timestamp: new Date(Date.now() - (i + 5) * 3600000).toISOString(),
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} />
        Back to Portfolio
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <History size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">Transaction History</h1>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#9CFFBB]/10">
                <th className="text-left text-xs text-gray-400 font-medium p-4">Type</th>
                <th className="text-left text-xs text-gray-400 font-medium p-4">Token</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Amount</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Price</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Total</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Time</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const token = mockTokens.find((t) => t.id === tx.tokenId) || mockTokens[0]
                return (
                  <tr key={tx.id} className="border-b border-[#9CFFBB]/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                          tx.type === "buy" ? "bg-[#5CFF71]/20 text-[#5CFF71]" : "bg-red-500/20 text-red-400",
                        )}
                      >
                        {tx.type === "buy" ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                        {tx.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-medium">{token.symbol}</span>
                    </td>
                    <td className="p-4 text-right text-white">{tx.amount.toLocaleString()}</td>
                    <td className="p-4 text-right text-gray-400">{tx.price.toFixed(6)} ADA</td>
                    <td className="p-4 text-right text-white font-medium">{tx.totalAda.toFixed(2)} ADA</td>
                    <td className="p-4 text-right text-gray-400 text-sm">{new Date(tx.timestamp).toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button className="text-gray-400 hover:text-[#9CFFBB]">
                        <ExternalLink size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
