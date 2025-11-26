import Image from "next/image"
import Link from "next/link"
import { mockBattles } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Clock, Zap, TrendingUp, Users, ShoppingCart, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BattleDetailsPage({ params }: PageProps) {
  const { id } = await params
  const battle = mockBattles.find((b) => b.id === id) || mockBattles[0]

  const isActive = battle.status === "active"
  const isUpcoming = battle.status === "upcoming"
  const isEnded = battle.status === "ended"

  const timeRemaining = isActive
    ? Math.max(0, new Date(battle.endTime).getTime() - Date.now())
    : isUpcoming
      ? new Date(battle.startTime).getTime() - Date.now()
      : 0

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link href="/arena" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} />
        Back to Arena
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] flex items-center justify-center">
            <Zap size={32} className="text-[#0A0A0A]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{battle.name}</h1>
              <span
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-full",
                  isActive
                    ? "bg-[#5CFF71] text-[#0A0A0A] animate-pulse"
                    : isUpcoming
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-gray-500/20 text-gray-400",
                )}
              >
                {battle.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 mt-1">Compete for the prize pool by driving volume and engagement</p>
          </div>
        </div>
        {isActive && (
          <Button className="bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold glow-mint">
            Enter Battle
          </Button>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Trophy size={24} className="text-yellow-500" />
            <div>
              <p className="text-xs text-gray-400">Prize Pool</p>
              <p className="text-xl font-bold text-white">{battle.prizePool.toLocaleString()} ADA</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-[#9CFFBB]" />
            <div>
              <p className="text-xs text-gray-400">Participants</p>
              <p className="text-xl font-bold text-white">{battle.participants.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-[#9CFFBB]" />
            <div>
              <p className="text-xs text-gray-400">
                {isActive ? "Time Remaining" : isUpcoming ? "Starts In" : "Ended"}
              </p>
              <p className="text-xl font-bold text-white">
                {isEnded ? new Date(battle.endTime).toLocaleDateString() : `${days}d ${hours}h ${minutes}m`}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-3">
            <TrendingUp size={24} className="text-[#9CFFBB]" />
            <div>
              <p className="text-xs text-gray-400">Total Volume</p>
              <p className="text-xl font-bold text-white">
                {(battle.participants.reduce((sum, p) => sum + p.volume, 0) / 1000).toFixed(0)}K ADA
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Trophy size={20} className="text-[#9CFFBB]" />
              Leaderboard
            </h2>
            <div className="space-y-3">
              {battle.participants.map((participant, index) => (
                <Link key={participant.tokenId} href={`/tokens/${participant.tokenId}`}>
                  <div
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/5",
                      index === 0
                        ? "bg-yellow-500/10 border border-yellow-500/30"
                        : index === 1
                          ? "bg-gray-400/10 border border-gray-400/30"
                          : index === 2
                            ? "bg-amber-700/10 border border-amber-700/30"
                            : "bg-[#1A1A1A]",
                    )}
                  >
                    {/* Rank */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                        index === 0
                          ? "bg-yellow-500 text-black"
                          : index === 1
                            ? "bg-gray-400 text-black"
                            : index === 2
                              ? "bg-amber-700 text-white"
                              : "bg-[#2A2A2A] text-gray-400",
                      )}
                    >
                      {index + 1}
                    </div>

                    {/* Token Info */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#2A2A2A]">
                      <Image
                        src={participant.token.image || "/placeholder.svg"}
                        alt={participant.token.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{participant.token.name}</h3>
                      <p className="text-sm text-gray-400">{participant.token.symbol}</p>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:grid grid-cols-3 gap-6 text-right">
                      <div>
                        <p className="text-xs text-gray-400">Volume</p>
                        <p className="text-sm font-medium text-white">{(participant.volume / 1000).toFixed(1)}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Buys</p>
                        <p className="text-sm font-medium text-white">{participant.buyCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">New Holders</p>
                        <p className="text-sm font-medium text-white">{participant.newHolders}</p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Score</p>
                      <p className="text-lg font-bold text-[#9CFFBB]">{participant.score.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {battle.participants.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Target size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No participants yet. Be the first to enter!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rules */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Battle Rules</h3>
            <ul className="space-y-3">
              {battle.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#9CFFBB]/20 text-[#9CFFBB] flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scoring */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Scoring System</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-400">
                  <TrendingUp size={14} /> Volume
                </span>
                <span className="text-white">1 pt / ADA</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-400">
                  <ShoppingCart size={14} /> Buy Orders
                </span>
                <span className="text-white">10 pts each</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-400">
                  <Users size={14} /> New Holders
                </span>
                <span className="text-white">25 pts each</span>
              </div>
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Prize Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-white">1st Place</span>
                </div>
                <span className="text-[#9CFFBB] font-semibold">
                  {Math.floor(battle.prizePool * 0.5).toLocaleString()} ADA
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-400 text-black text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-white">2nd Place</span>
                </div>
                <span className="text-[#9CFFBB] font-semibold">
                  {Math.floor(battle.prizePool * 0.3).toLocaleString()} ADA
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span className="text-white">3rd Place</span>
                </div>
                <span className="text-[#9CFFBB] font-semibold">
                  {Math.floor(battle.prizePool * 0.2).toLocaleString()} ADA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
