import Link from "next/link"
import Image from "next/image"
import type { Token } from "@/lib/types"
import { TrendingUp, TrendingDown, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface TokenCardProps {
  token: Token
  rank?: number
}

export function TokenCard({ token, rank }: TokenCardProps) {
  const isPositive = token.priceChange24h >= 0

  return (
    <Link href={`/tokens/${token.id}`}>
      <div className="glass-card rounded-2xl p-4 hover:border-[#9CFFBB]/30 transition-all group cursor-pointer">
        <div className="flex items-start gap-3">
          {rank && (
            <div className="w-8 h-8 rounded-lg bg-[#9CFFBB]/10 flex items-center justify-center text-[#9CFFBB] font-bold text-sm">
              #{rank}
            </div>
          )}
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#1A1A1A] flex-shrink-0">
            <Image
              src={token.image || "/placeholder.svg"}
              alt={token.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate group-hover:text-[#9CFFBB] transition-colors">
                {token.name}
              </h3>
              <span className="text-xs text-gray-500 uppercase">{token.symbol}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-white">
                {token.price < 0.01 ? token.price.toFixed(6) : token.price.toFixed(4)} ADA
              </span>
              <span
                className={cn(
                  "flex items-center gap-0.5 text-sm font-medium",
                  isPositive ? "text-[#5CFF71]" : "text-red-400",
                )}
              >
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(token.priceChange24h).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#9CFFBB]/10">
          <div className="text-center">
            <p className="text-xs text-gray-500">Volume 24h</p>
            <p className="text-sm font-medium text-white">{(token.volume24h / 1000).toFixed(1)}K</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Market Cap</p>
            <p className="text-sm font-medium text-white">{(token.marketCap / 1000).toFixed(1)}K</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Holders</p>
            <p className="text-sm font-medium text-white flex items-center justify-center gap-1">
              <Users size={12} />
              {token.holders.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
