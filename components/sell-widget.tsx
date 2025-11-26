"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Token } from "@/lib/types"
import { calculateSellPrice } from "@/lib/bonding-curve"
import { useTyphon } from "@/hooks/use-typhon"
import { ArrowDown, CheckCircle, Loader2, AlertCircle } from "lucide-react"

interface SellWidgetProps {
  token: Token
  userBalance?: number
}

export function SellWidget({ token, userBalance = 125000 }: SellWidgetProps) {
  const [tokenAmount, setTokenAmount] = useState("")
  const [adaAmount, setAdaAmount] = useState("")
  const { isConnected, sellState, executeSell, clearSellState } = useTyphon()

  const amount = Number.parseFloat(tokenAmount) || 0
  const estimate = amount > 0 ? calculateSellPrice(token.totalSupply, amount, token.curveType, token.reserveAda) : null

  const handleTokenChange = (value: string) => {
    setTokenAmount(value)
    const num = Number.parseFloat(value) || 0
    if (num > 0) {
      setAdaAmount((num * token.price * 0.97).toFixed(4))
    } else {
      setAdaAmount("")
    }
  }

  const setPercentage = (percent: number) => {
    const amount = Math.floor((userBalance * percent) / 100)
    handleTokenChange(amount.toString())
  }

  const handleSell = async () => {
    if (amount > 0 && amount <= userBalance) {
      await executeSell(token, amount, 2)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Sell {token.symbol}</h3>

      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">You sell</label>
            <span className="text-xs text-gray-500">
              Balance: {userBalance.toLocaleString()} {token.symbol}
            </span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0"
              value={tokenAmount}
              onChange={(e) => handleTokenChange(e.target.value)}
              className="pr-20 h-14 text-lg bg-[#1A1A1A] border-[#9CFFBB]/20 text-white placeholder:text-gray-600"
              disabled={sellState.isLoading}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">{token.symbol}</span>
          </div>
          <div className="flex gap-2">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => setPercentage(percent)}
                disabled={sellState.isLoading}
                className="flex-1 py-1.5 text-xs font-medium text-gray-400 bg-[#1A1A1A] rounded-lg hover:bg-[#9CFFBB]/10 hover:text-[#9CFFBB] transition-colors disabled:opacity-50"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#9CFFBB]/20 flex items-center justify-center">
            <ArrowDown size={18} className="text-[#9CFFBB]" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">You receive</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="0.00"
              value={adaAmount}
              readOnly
              className="pr-16 h-14 text-lg bg-[#1A1A1A] border-[#9CFFBB]/20 text-white placeholder:text-gray-600"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">ADA</span>
          </div>
        </div>
      </div>

      {estimate && amount > 0 && (
        <div className="space-y-2 p-3 rounded-xl bg-[#1A1A1A] border border-[#9CFFBB]/10">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact</span>
            <span className={estimate.priceImpact > 5 ? "text-yellow-400" : "text-gray-300"}>
              -{estimate.priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Slippage</span>
            <span className="text-gray-300">~3%</span>
          </div>
        </div>
      )}

      {sellState.txHash && sellState.status === "submitted" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#9CFFBB]/10 border border-[#9CFFBB]/30 text-[#9CFFBB] text-sm">
          <Loader2 size={16} className="animate-spin" />
          <span>Transaction submitted: {sellState.txHash.slice(0, 16)}...</span>
        </div>
      )}

      {sellState.txHash && sellState.status === "confirmed" && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Transaction confirmed!</span>
          </div>
          <button onClick={clearSellState} className="text-xs opacity-70 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      {sellState.error && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{sellState.error}</span>
          </div>
          <button onClick={clearSellState} className="text-xs opacity-70 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full h-12 text-lg font-semibold border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500 bg-transparent disabled:opacity-50"
        disabled={!isConnected || !amount || amount <= 0 || amount > userBalance || sellState.isLoading}
        onClick={handleSell}
      >
        {sellState.isLoading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : isConnected ? (
          `Sell ${token.symbol}`
        ) : (
          "Connect Wallet to Sell"
        )}
      </Button>
    </div>
  )
}
