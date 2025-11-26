"use client"

import Image from "next/image"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"
import { mockTokens, mockBattles } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import {
  Palette,
  Users,
  DollarSign,
  ArrowUpRight,
  Plus,
  Settings,
  BarChart3,
  Wallet,
  Download,
  Eye,
  Calendar,
  Trophy,
  Zap,
  ChevronRight,
  Percent,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const revenueData = [
  { date: "Week 1", fees: 320, volume: 45000 },
  { date: "Week 2", fees: 480, volume: 68000 },
  { date: "Week 3", fees: 620, volume: 89000 },
  { date: "Week 4", fees: 780, volume: 125000 },
]

const holderGrowthData = [
  { date: "Jan 1", holders: 100 },
  { date: "Jan 5", holders: 450 },
  { date: "Jan 10", holders: 890 },
  { date: "Jan 15", holders: 1234 },
  { date: "Jan 20", holders: 1890 },
]

const volumeByToken = [
  { name: "SHRK", volume: 125000, color: "#9CFFBB" },
  { name: "WHALE", volume: 89000, color: "#5CFF71" },
  { name: "DFISH", volume: 456000, color: "#3DD68C" },
]

export default function CreatorStudioPage() {
  const { connected, address } = useWallet()
  const [activeTab, setActiveTab] = useState<"overview" | "tokens" | "analytics" | "battles">("overview")
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "all">("30d")

  const createdTokens = mockTokens.slice(0, 3)
  const totalVolume = createdTokens.reduce((sum, t) => sum + t.volume24h, 0)
  const totalHolders = createdTokens.reduce((sum, t) => sum + t.holders, 0)
  const totalEarnings = 2450
  const pendingWithdrawal = 180
  const weeklyEarnings = 780
  const avgFeePercent = 5.3

  // Get battles user's tokens are in
  const activeBattles = mockBattles.filter((b) => b.status === "active")

  if (!connected) {
    return (
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#9CFFBB]/10 flex items-center justify-center mb-6">
            <Palette size={40} className="text-[#9CFFBB]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Creator Studio</h1>
          <p className="text-gray-400 mb-6 max-w-md">
            Connect your wallet to access Creator Studio and manage your tokens.
          </p>
          <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold">
            Connect Wallet
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] flex items-center justify-center">
            <Palette size={24} className="text-[#0A0A0A]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Creator Studio</h1>
            <p className="text-sm text-gray-400">Manage your tokens and track earnings</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold">
              <Plus size={18} className="mr-2" />
              Create Token
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex gap-1 bg-[#1A1A1A] rounded-xl p-1 mb-8 w-fit">
        {(["overview", "tokens", "analytics", "battles"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize",
              activeTab === tab ? "bg-[#9CFFBB]/20 text-[#9CFFBB]" : "text-gray-400 hover:text-white",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <DollarSign size={20} className="text-[#9CFFBB]" />
                <span className="text-xs text-[#5CFF71] bg-[#5CFF71]/10 px-2 py-0.5 rounded-full">+23%</span>
              </div>
              <p className="text-xs text-gray-400">Total Earnings</p>
              <p className="text-2xl font-bold text-[#9CFFBB]">{totalEarnings.toLocaleString()} ADA</p>
              <p className="text-xs text-gray-500 mt-1">Lifetime creator fees</p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 size={20} className="text-[#9CFFBB]" />
                <span className="text-xs text-[#5CFF71] bg-[#5CFF71]/10 px-2 py-0.5 rounded-full">+18%</span>
              </div>
              <p className="text-xs text-gray-400">Total Volume</p>
              <p className="text-2xl font-bold text-white">{(totalVolume / 1000).toFixed(0)}K ADA</p>
              <p className="text-xs text-gray-500 mt-1">Across all tokens</p>
            </div>
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Users size={20} className="text-[#9CFFBB]" />
                <span className="text-xs text-[#5CFF71] bg-[#5CFF71]/10 px-2 py-0.5 rounded-full">+156</span>
              </div>
              <p className="text-xs text-gray-400">Total Holders</p>
              <p className="text-2xl font-bold text-white">{totalHolders.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Unique addresses</p>
            </div>
            <div className="glass-card rounded-xl p-5 border border-[#9CFFBB]/30">
              <div className="flex items-center justify-between mb-3">
                <Wallet size={20} className="text-[#9CFFBB]" />
                <Zap size={16} className="text-[#9CFFBB]" />
              </div>
              <p className="text-xs text-gray-400">Ready to Withdraw</p>
              <p className="text-2xl font-bold text-white">{pendingWithdrawal} ADA</p>
              <Button size="sm" className="w-full mt-3 bg-[#9CFFBB] text-[#0A0A0A] hover:bg-[#5CFF71] font-semibold">
                <Download size={14} className="mr-2" />
                Withdraw Now
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
                  <p className="text-sm text-gray-400">Fee earnings over time</p>
                </div>
                <div className="flex gap-1 bg-[#1A1A1A] rounded-lg p-1">
                  {(["7d", "30d", "90d", "all"] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                        timeframe === tf ? "bg-[#9CFFBB]/20 text-[#9CFFBB]" : "text-gray-400 hover:text-white",
                      )}
                    >
                      {tf.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9CFFBB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#9CFFBB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} />
                    <YAxis stroke="#666" fontSize={11} tickLine={false} tickFormatter={(v) => `${v} ADA`} />
                    <Tooltip
                      contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 8 }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="fees"
                      stroke="#9CFFBB"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      name="Fees Earned"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats Side Panel */}
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={18} className="text-[#9CFFBB]" />
                  <span className="text-sm text-gray-400">This Week</span>
                </div>
                <p className="text-3xl font-bold text-[#9CFFBB]">{weeklyEarnings} ADA</p>
                <p className="text-xs text-gray-500 mt-1">Fee revenue earned</p>
              </div>
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Percent size={18} className="text-[#9CFFBB]" />
                  <span className="text-sm text-gray-400">Avg Fee Rate</span>
                </div>
                <p className="text-3xl font-bold text-white">{avgFeePercent}%</p>
                <p className="text-xs text-gray-500 mt-1">Across all tokens</p>
              </div>
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy size={18} className="text-[#9CFFBB]" />
                  <span className="text-sm text-gray-400">Battle Wins</span>
                </div>
                <p className="text-3xl font-bold text-white">2</p>
                <p className="text-xs text-gray-500 mt-1">Prize pools won</p>
              </div>
            </div>
          </div>

          {activeBattles.length > 0 && (
            <div className="glass-card rounded-2xl p-6 mb-8 border border-[#9CFFBB]/20 bg-gradient-to-r from-[#9CFFBB]/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#9CFFBB]/20 flex items-center justify-center">
                    <Trophy size={24} className="text-[#9CFFBB]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Active Battle: {activeBattles[0].name}</h3>
                    <p className="text-sm text-gray-400">Your token SHRK is ranked #1 with score 8,500</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Prize Pool</p>
                    <p className="text-xl font-bold text-[#9CFFBB]">
                      {activeBattles[0].prizePool.toLocaleString()} ADA
                    </p>
                  </div>
                  <Link href={`/arena/${activeBattles[0].id}`}>
                    <Button className="bg-[#9CFFBB] text-[#0A0A0A] font-semibold">
                      View Battle
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "tokens" && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#9CFFBB]/10 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Your Created Tokens</h2>
            <span className="text-sm text-gray-400">{createdTokens.length} tokens</span>
          </div>
          <div className="divide-y divide-[#9CFFBB]/5">
            {createdTokens.map((token) => (
              <div key={token.id} className="p-5 hover:bg-white/5 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#1A1A1A]">
                      <Image
                        src={token.image || "/placeholder.svg"}
                        alt={token.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-lg">{token.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#9CFFBB]/10 text-[#9CFFBB]">
                          {token.curveType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{token.symbol}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8">
                    <div>
                      <p className="text-xs text-gray-400">Price</p>
                      <p className="text-sm font-medium text-white">{token.price.toFixed(6)} ADA</p>
                      <p className={cn("text-xs", token.priceChange24h >= 0 ? "text-[#5CFF71]" : "text-red-400")}>
                        {token.priceChange24h >= 0 ? "+" : ""}
                        {token.priceChange24h.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">24h Volume</p>
                      <p className="text-sm font-medium text-white">{(token.volume24h / 1000).toFixed(1)}K ADA</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Holders</p>
                      <p className="text-sm font-medium text-white">{token.holders.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Creator Fee</p>
                      <p className="text-sm font-medium text-[#9CFFBB]">{token.creatorFee}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Fees Earned (24h)</p>
                      <p className="text-sm font-medium text-[#9CFFBB]">
                        {((token.volume24h * token.creatorFee) / 100).toFixed(0)} ADA
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/tokens/${token.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/studio/${token.id}/settings`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent"
                      >
                        <Settings size={14} className="mr-1" />
                        Settings
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Holder Growth Chart */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Holder Growth</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={holderGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} />
                  <YAxis stroke="#666" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 8 }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="holders"
                    stroke="#9CFFBB"
                    strokeWidth={2}
                    dot={{ fill: "#9CFFBB", strokeWidth: 0 }}
                    name="Total Holders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume by Token */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Volume by Token (24h)</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeByToken} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                  <XAxis type="number" stroke="#666" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" stroke="#666" fontSize={11} width={60} />
                  <Tooltip
                    contentStyle={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 8 }}
                    labelStyle={{ color: "#fff" }}
                    formatter={(value: number) => [`${value.toLocaleString()} ADA`, "Volume"]}
                  />
                  <Bar dataKey="volume" fill="#9CFFBB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "battles" && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Battle Performance</h3>
            <div className="space-y-4">
              {mockBattles.map((battle) => (
                <div
                  key={battle.id}
                  className={cn(
                    "p-4 rounded-xl border transition-colors",
                    battle.status === "active" ? "border-[#9CFFBB]/30 bg-[#9CFFBB]/5" : "border-white/5 bg-white/5",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          battle.status === "active" ? "bg-[#9CFFBB]/20" : "bg-white/10",
                        )}
                      >
                        <Trophy size={20} className={battle.status === "active" ? "text-[#9CFFBB]" : "text-gray-400"} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{battle.name}</h4>
                        <p
                          className={cn(
                            "text-xs capitalize",
                            battle.status === "active"
                              ? "text-[#9CFFBB]"
                              : battle.status === "upcoming"
                                ? "text-yellow-400"
                                : "text-gray-400",
                          )}
                        >
                          {battle.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{battle.prizePool.toLocaleString()} ADA</p>
                      <p className="text-xs text-gray-400">Prize Pool</p>
                    </div>
                    <Link href={`/arena/${battle.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9CFFBB]/30 text-gray-400 hover:text-white bg-transparent"
                      >
                        View
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {createdTokens.length === 0 && activeTab === "tokens" && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#9CFFBB]/10 flex items-center justify-center mx-auto mb-4">
            <Plus size={32} className="text-[#9CFFBB]" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Tokens Yet</h3>
          <p className="text-gray-400 mb-6">Create your first token and start earning creator fees.</p>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold">
              Create Token
              <ArrowUpRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
