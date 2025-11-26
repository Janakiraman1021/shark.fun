"use client"

import Image from "next/image"
import Link from "next/link"
import { mockPortfolio } from "@/lib/mock-data"
import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  History,
  RefreshCw,
  Filter,
  Download,
  Eye,
  EyeOff,
  BarChart3,
  Zap,
  ArrowDownUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const performanceData = [
  { date: "Jan 1", value: 1800 },
  { date: "Jan 5", value: 2100 },
  { date: "Jan 10", value: 1950 },
  { date: "Jan 15", value: 2400 },
  { date: "Jan 20", value: 2200 },
  { date: "Jan 25", value: 2739 },
]

const COLORS = ["#9CFFBB", "#5CFF71", "#3DD68C", "#2AA876", "#1A7A5E"]

export default function PortfolioPage() {
  const { connected, address, balance } = useWallet()
  const [hideBalances, setHideBalances] = useState(false)
  const [sortBy, setSortBy] = useState<"value" | "pnl" | "name">("value")
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "all">("30d")

  // deterministic formatter to avoid server/client locale mismatches
  const formatNumber = (n: number, fractionDigits = 0) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(Number.isFinite(n) ? n : 0)

  const totalValue = mockPortfolio.reduce((sum, h) => sum + h.currentValue, 0)
  const totalPnl = mockPortfolio.reduce((sum, h) => sum + h.pnl, 0)
  const totalPnlPercent = ((totalValue - totalPnl) === 0 ? 0 : (totalPnl / (totalValue - totalPnl)) * 100) || 0

  const allocationData = mockPortfolio.map((h) => ({
    name: h.token.symbol,
    value: h.currentValue,
    // store as number for consistent usage
    percent: Number(((h.currentValue / (totalValue || 1)) * 100).toFixed(1)),
  }))

  const sortedPortfolio = [...mockPortfolio].sort((a, b) => {
    if (sortBy === "value") return b.currentValue - a.currentValue
    if (sortBy === "pnl") return b.pnlPercent - a.pnlPercent
    return a.token.name.localeCompare(b.token.name)
  })

  // safe display values to avoid runtime errors when wallet hook returns undefined
  const safeBalanceNum = Number(balance ?? 0)
  const balanceDisplay = hideBalances ? "••••" : `${formatNumber(safeBalanceNum)} ADA`
  const addressDisplay = address ? `${address.slice(0, 12)}...${address.slice(-4)}` : "—"

  // Do not short-circuit render when not connected — render full portfolio page.
  // Wallet-specific values (address, balance) will show fallbacks when disconnected.

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <PieChart size={28} className="text-[#9CFFBB]" />
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHideBalances(!hideBalances)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            {hideBalances ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Value Card with Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Portfolio Value</p>
              <p className="text-4xl font-bold text-white">
                {hideBalances ? "••••••" : `${formatNumber(totalValue)} ADA`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full",
                    totalPnl >= 0 ? "text-[#5CFF71] bg-[#5CFF71]/10" : "text-red-400 bg-red-400/10",
                  )}
                >
                  {totalPnl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {hideBalances ? "••••" : `${totalPnl >= 0 ? "+" : ""}${formatNumber(totalPnl)} ADA`}(
                  {totalPnlPercent.toFixed(1)}%)
                </span>
                <span className="text-xs text-gray-500">All time</span>
              </div>
            </div>
            {/* Timeframe selector */}
            <div className="flex gap-1 bg-[#1A1A1A] rounded-lg p-1">
              {(["24h", "7d", "30d", "all"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                    timeframe === tf ? "bg-[#9CFFBB]/20 text-[#9CFFBB]" : "text-gray-400 hover:text-white",
                  )}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9CFFBB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9CFFBB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}`} />
                <Tooltip
                  contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                  // accept any to avoid strict typing errors
                  formatter={(value: any) => [`${formatNumber(Number(value))} ADA`, "Value"]}
                />
                <Area type="monotone" dataKey="value" stroke="#9CFFBB" strokeWidth={2} fill="url(#portfolioGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {/* Wallet Balance */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-white">
                  {balanceDisplay}
                </p>
              </div>
              <Wallet size={24} className="text-[#9CFFBB]" />
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono truncate">
              {addressDisplay}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-gray-400">Holdings</p>
              <p className="text-xl font-bold text-white">{mockPortfolio.length}</p>
              <p className="text-xs text-gray-500">Tokens</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-gray-400">Best Performer</p>
              <p className="text-xl font-bold text-[#5CFF71]">+50%</p>
              <p className="text-xs text-gray-500">DFISH</p>
            </div>
          </div>

          {/* Allocation Chart */}
          <div className="glass-card rounded-xl p-5">
            <p className="text-sm text-gray-400 mb-3">Allocation</p>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {allocationData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1.5">
                {allocationData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#9CFFBB]/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your Holdings</h2>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              onClick={() => setSortBy(sortBy === "value" ? "pnl" : sortBy === "pnl" ? "name" : "value")}
            >
              <ArrowDownUp size={14} />
              Sort by {sortBy === "value" ? "Value" : sortBy === "pnl" ? "P&L" : "Name"}
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#9CFFBB]/10">
                <th className="text-left text-xs text-gray-400 font-medium p-4">Token</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Balance</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Avg Buy</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Current Price</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">Value</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">P&L</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4">24h</th>
                <th className="text-right text-xs text-gray-400 font-medium p-4"></th>
              </tr>
            </thead>
            <tbody>
              {sortedPortfolio.map((holding, index) => (
                <tr
                  key={holding.token.id}
                  className={cn(
                    "border-b border-[#9CFFBB]/5 hover:bg-white/5 transition-colors",
                    index === 0 && "bg-[#9CFFBB]/5",
                  )}
                >
                  <td className="p-4">
                    <Link href={`/tokens/${holding.token.id}`} className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1A1A1A]">
                          <Image
                            src={holding.token.image || "/placeholder.svg"}
                            alt={holding.token.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#9CFFBB] rounded-full flex items-center justify-center">
                            <Zap size={10} className="text-[#0A0A0A]" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{holding.token.name}</p>
                        <p className="text-xs text-gray-400">{holding.token.symbol}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-white">{hideBalances ? "••••" : formatNumber(holding.amount)}</p>
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-gray-400">{holding.avgBuyPrice.toFixed(6)} ADA</p>
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-white">{holding.token.price.toFixed(6)} ADA</p>
                  </td>
                  <td className="p-4 text-right">
                    <p className="text-white font-medium">
                      {hideBalances ? "••••" : `${Math.round(holding.currentValue).toString() === "NaN" ? "0" : formatNumber(holding.currentValue)} ADA`}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <p className={cn("font-medium", holding.pnl >= 0 ? "text-[#5CFF71]" : "text-red-400")}>
                      {hideBalances ? "••••" : `${holding.pnl >= 0 ? "+" : ""}${formatNumber(holding.pnl) } ADA`}
                    </p>
                    <p className={cn("text-xs", holding.pnlPercent >= 0 ? "text-[#5CFF71]" : "text-red-400")}>
                      {holding.pnlPercent >= 0 ? "+" : ""}
                      {holding.pnlPercent.toFixed(1)}%
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        holding.token.priceChange24h >= 0 ? "text-[#5CFF71]" : "text-red-400",
                      )}
                    >
                      {holding.token.priceChange24h >= 0 ? "+" : ""}
                      {holding.token.priceChange24h.toFixed(1)}%
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/tokens/${holding.token.id}`}>
                        <Button size="sm" className="bg-[#9CFFBB]/20 text-[#9CFFBB] hover:bg-[#9CFFBB]/30 border-0">
                          Buy
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href="/portfolio/history"
          className="text-[#9CFFBB] hover:text-[#5CFF71] inline-flex items-center gap-2 text-sm"
        >
          <History size={16} />
          View Transaction History
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/tokens">
            <Button variant="outline" className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent">
              <BarChart3 size={16} className="mr-2" />
              Browse Tokens
            </Button>
          </Link>
          <Link href="/arena">
            <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold">
              <Zap size={16} className="mr-2" />
              Battle Arena
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
