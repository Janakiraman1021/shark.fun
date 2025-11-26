import Link from "next/link"
import Image from "next/image"
import { mockBattles } from "@/lib/mock-data"
import { Swords, Trophy, Zap, Clock, Users, ArrowRight, Flame, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ArenaPage() {
  const activeBattles = mockBattles.filter((b) => b.status === "active")
  const upcomingBattles = mockBattles.filter((b) => b.status === "upcoming")
  const endedBattles = mockBattles.filter((b) => b.status === "ended")

  const totalPrizePool = mockBattles.reduce((sum, b) => sum + b.prizePool, 0)

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Swords size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">Battle Arena</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Battles</p>
              <p className="text-3xl font-bold text-[#9CFFBB]">{activeBattles.length}</p>
            </div>
            <Zap size={28} className="text-[#9CFFBB]" />
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Prize Pool</p>
              <p className="text-3xl font-bold text-white">{(totalPrizePool / 1000).toFixed(0)}K ADA</p>
            </div>
            <Trophy size={28} className="text-yellow-500" />
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Participants</p>
              <p className="text-3xl font-bold text-white">
                {mockBattles.reduce((sum, b) => sum + b.participants.length, 0)}
              </p>
            </div>
            <Users size={28} className="text-[#9CFFBB]" />
          </div>
        </div>
      </div>

      {/* Active Battles */}
      {activeBattles.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Flame size={20} className="text-orange-400" />
            Active Battles
          </h2>
          <div className="space-y-4">
            {activeBattles.map((battle) => (
              <Link key={battle.id} href={`/arena/${battle.id}`}>
                <div className="glass-card rounded-2xl p-6 border-[#9CFFBB]/30 hover:border-[#9CFFBB]/50 transition-all group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#9CFFBB] to-[#5CFF71] flex items-center justify-center">
                        <Zap size={28} className="text-[#0A0A0A]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#5CFF71] text-[#0A0A0A] text-xs font-bold rounded-full animate-pulse">
                            LIVE
                          </span>
                          <h3 className="text-xl font-bold text-white">{battle.name}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{battle.participants.length} participants competing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#9CFFBB]">{battle.prizePool.toLocaleString()} ADA</p>
                        <p className="text-xs text-gray-400">Prize Pool</p>
                      </div>
                      <div className="flex -space-x-2">
                        {battle.participants.slice(0, 3).map((p, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-[#0A0A0A] overflow-hidden"
                          >
                            <Image
                              src={p.token.image || "/placeholder.svg"}
                              alt={p.token.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {battle.participants.length > 3 && (
                          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border-2 border-[#0A0A0A] flex items-center justify-center text-xs text-gray-400">
                            +{battle.participants.length - 3}
                          </div>
                        )}
                      </div>
                      <Button className="bg-[#9CFFBB] text-[#0A0A0A] hover:bg-[#5CFF71] group-hover:scale-105 transition-transform">
                        View Battle
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </div>
                  </div>

                  {/* Top 3 Leaderboard Preview */}
                  <div className="mt-6 pt-4 border-t border-[#9CFFBB]/10">
                    <div className="grid grid-cols-3 gap-4">
                      {battle.participants.slice(0, 3).map((p, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                              i === 0
                                ? "bg-yellow-500 text-black"
                                : i === 1
                                  ? "bg-gray-400 text-black"
                                  : "bg-amber-700 text-white",
                            )}
                          >
                            {i + 1}
                          </span>
                          <span className="text-sm text-white">{p.token.symbol}</span>
                          <span className="text-sm text-[#9CFFBB] ml-auto">{p.score.toLocaleString()} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Battles */}
      {upcomingBattles.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-[#9CFFBB]" />
            Upcoming Battles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBattles.map((battle) => (
              <Link key={battle.id} href={`/arena/${battle.id}`}>
                <div className="glass-card rounded-xl p-6 hover:border-[#9CFFBB]/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{battle.name}</h3>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">UPCOMING</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock size={14} /> Starts {new Date(battle.startTime).toLocaleDateString()}
                    </span>
                    <span className="text-[#9CFFBB] font-semibold">{battle.prizePool.toLocaleString()} ADA</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Past Battles */}
      {endedBattles.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-gray-500" />
            Past Battles
          </h2>
          <div className="space-y-3">
            {endedBattles.map((battle) => (
              <Link key={battle.id} href={`/arena/${battle.id}`}>
                <div className="glass-card rounded-xl p-4 hover:border-[#9CFFBB]/20 transition-all opacity-75 hover:opacity-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-white">{battle.name}</h3>
                      <span className="text-xs text-gray-500">
                        Ended {new Date(battle.endTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {battle.participants[0] && (
                        <div className="flex items-center gap-2">
                          <Trophy size={14} className="text-yellow-500" />
                          <span className="text-sm text-white">{battle.participants[0].token.symbol}</span>
                        </div>
                      )}
                      <span className="text-sm text-gray-400">{battle.prizePool.toLocaleString()} ADA</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
