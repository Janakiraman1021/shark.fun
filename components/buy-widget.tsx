"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Token } from "@/lib/types"
import { calculateBuyPrice } from "@/lib/bonding-curve"
import { useTyphon } from "@/hooks/use-typhon"
import { ArrowDown, AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface BuyWidgetProps {
  token: Token
}

export function BuyWidget({ token }: BuyWidgetProps) {
  const [adaAmount, setAdaAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const { isConnected, buyState, executeBuy, clearBuyState } = useTyphon()

  const ada = Number.parseFloat(adaAmount) || 0
  const estimate =
    ada > 0 ? calculateBuyPrice(token.totalSupply, ada / token.price, token.curveType, token.reserveAda) : null

  const handleAdaChange = (value: string) => {
    setAdaAmount(value)
    const num = Number.parseFloat(value) || 0
    if (num > 0) {
      setTokenAmount((num / token.price).toFixed(0))
    } else {
      setTokenAmount("")
    }
  }

  const handleBuy = async () => {
    if (ada > 0) {
      await executeBuy(token, ada, 2)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Buy {token.symbol}</h3>

      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">You pay</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.00"
              value={adaAmount}
              onChange={(e) => handleAdaChange(e.target.value)}
              className="pr-16 h-14 text-lg bg-[#1A1A1A] border-[#9CFFBB]/20 text-white placeholder:text-gray-600"
              disabled={buyState.isLoading}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">ADA</span>
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
              placeholder="0"
              value={tokenAmount}
              readOnly
              className="pr-20 h-14 text-lg bg-[#1A1A1A] border-[#9CFFBB]/20 text-white placeholder:text-gray-600"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">{token.symbol}</span>
          </div>
        </div>
      </div>

      {estimate && ada > 0 && (
        <div className="space-y-2 p-3 rounded-xl bg-[#1A1A1A] border border-[#9CFFBB]/10">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact</span>
            <span className={estimate.priceImpact > 5 ? "text-yellow-400" : "text-gray-300"}>
              {estimate.priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Creator Fee ({token.creatorFee}%)</span>
            <span className="text-gray-300">{((ada * token.creatorFee) / 100).toFixed(4)} ADA</span>
          </div>
          {estimate.priceImpact > 5 && (
            <div className="flex items-center gap-2 text-yellow-400 text-xs mt-2">
              <AlertCircle size={14} />
              <span>High price impact. Consider smaller trades.</span>
            </div>
          )}
        </div>
      )}

      {buyState.txHash && buyState.status === "submitted" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#9CFFBB]/10 border border-[#9CFFBB]/30 text-[#9CFFBB] text-sm">
          <Loader2 size={16} className="animate-spin" />
          <span>Transaction submitted: {buyState.txHash.slice(0, 16)}...</span>
        </div>
      )}

      {buyState.txHash && buyState.status === "confirmed" && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Transaction confirmed!</span>
          </div>
          <button onClick={clearBuyState} className="text-xs opacity-70 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      {buyState.error && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{buyState.error}</span>
          </div>
          <button onClick={clearBuyState} className="text-xs opacity-70 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      <Button
        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] hover:opacity-90 transition-opacity disabled:opacity-50"
        disabled={!isConnected || !ada || ada <= 0 || buyState.isLoading}
        onClick={handleBuy}
      >
        {buyState.isLoading ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : isConnected ? (
          `Buy ${token.symbol}`
        ) : (
          "Connect Wallet to Buy"
        )}
      </Button>
    </div>
  )
}
