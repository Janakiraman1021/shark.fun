"use client"

import { useWallet } from "@/hooks/use-wallet"
import { Button } from "@/components/ui/button"
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink, RefreshCw, AlertCircle, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const WALLET_INFO: Record<string, { name: string; icon: string; installUrl: string }> = {
  typhon: {
    name: "Typhon",
    icon: "/typhon-wallet-logo-blue.jpg",
    installUrl: "https://typhonwallet.io/",
  },
  nami: {
    name: "Nami",
    icon: "/nami-wallet-logo.png",
    installUrl: "https://namiwallet.io/",
  },
  eternl: {
    name: "Eternl",
    icon: "/eternl-wallet-logo.png",
    installUrl: "https://eternl.io/",
  },
  flint: {
    name: "Flint",
    icon: "/flint-wallet-logo-purple.jpg",
    installUrl: "https://flint-wallet.com/",
  },
  yoroi: {
    name: "Yoroi",
    icon: "/yoroi-wallet-logo-blue.jpg",
    installUrl: "https://yoroi-wallet.com/",
  },
}

export function WalletConnectButton() {
  const { wallet, isConnecting, connect, disconnect, error, availableWallets, refreshBalance, clearError } = useWallet()
  const [copied, setCopied] = useState(false)
  const [showWalletDialog, setShowWalletDialog] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshBalance()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleConnect = async (walletName: string) => {
    if (!availableWallets.includes(walletName)) {
      // Open install URL in new tab instead of trying to connect
      window.open(WALLET_INFO[walletName]?.installUrl, "_blank")
      return
    }
    await connect(walletName)
    // Only close dialog if connection was successful (no error)
    if (!error) {
      setShowWalletDialog(false)
    }
  }

  const handleOpenDialog = () => {
    clearError?.()
    setShowWalletDialog(true)
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    if (addr.startsWith("addr1")) {
      return `${addr.slice(0, 12)}...${addr.slice(-8)}`
    }
    // For hex addresses
    return `addr1...${addr.slice(-8)}`
  }

  const shortAddress = wallet.address ? formatAddress(wallet.address) : ""

  const hasAvailableWallets = availableWallets.length > 0

  if (!wallet.connected) {
    return (
      <>
        <Button
          onClick={handleOpenDialog}
          disabled={isConnecting}
          className="relative bg-gradient-to-r from-[#9CFFBB] to-[#5CFF71] text-[#0A0A0A] font-semibold hover:opacity-90 transition-all duration-300 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
        >
          <Wallet size={18} className="mr-2 animate-pulse" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>

        {/* Wallet Selection Dialog */}
        <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
          <DialogContent className="glass-card border-[#9CFFBB]/20 bg-[#0A0A0A]/95 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Connect Wallet</DialogTitle>
              <DialogDescription className="text-gray-400">
                Select a Cardano wallet to connect to shark.fun
              </DialogDescription>
            </DialogHeader>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!hasAvailableWallets && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#9CFFBB]/5 border border-[#9CFFBB]/20">
                <Download size={20} className="text-[#9CFFBB] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">No wallets detected</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Install a Cardano wallet browser extension to connect. We recommend Typhon wallet for the best
                    experience.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2 mt-4">
              {/* Typhon - Primary recommended wallet */}
              <button
                onClick={() =>
                  hasAvailableWallets && availableWallets.includes("typhon")
                    ? handleConnect("typhon")
                    : window.open(WALLET_INFO.typhon.installUrl, "_blank")
                }
                disabled={isConnecting}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  availableWallets.includes("typhon")
                    ? "border-[#9CFFBB]/30 bg-[#9CFFBB]/5 hover:bg-[#9CFFBB]/10 hover:border-[#9CFFBB]/50"
                    : "border-[#9CFFBB]/20 bg-[#9CFFBB]/5 hover:bg-[#9CFFBB]/10"
                }`}
              >
                <img
                  src={WALLET_INFO.typhon.icon || "/placeholder.svg"}
                  alt="Typhon"
                  className="w-10 h-10 rounded-lg"
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">Typhon</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#9CFFBB]/20 text-[#9CFFBB]">Recommended</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {availableWallets.includes("typhon") ? "Click to connect" : "Click to install"}
                  </span>
                </div>
                {!availableWallets.includes("typhon") && <ExternalLink size={16} className="text-[#9CFFBB]" />}
              </button>

              {/* Other wallets */}
              {Object.entries(WALLET_INFO)
                .filter(([key]) => key !== "typhon")
                .map(([key, info]) => {
                  const isAvailable = availableWallets.includes(key)
                  return (
                    <button
                      key={key}
                      onClick={() => (isAvailable ? handleConnect(key) : window.open(info.installUrl, "_blank"))}
                      disabled={isConnecting}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        isAvailable
                          ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-gray-600"
                          : "border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-700"
                      }`}
                    >
                      <img src={info.icon || "/placeholder.svg"} alt={info.name} className="w-10 h-10 rounded-lg" />
                      <div className="flex-1 text-left">
                        <span className="font-semibold text-white">{info.name}</span>
                        <p className="text-sm text-gray-400">{isAvailable ? "Click to connect" : "Click to install"}</p>
                      </div>
                      {!isAvailable && <ExternalLink size={16} className="text-gray-500" />}
                    </button>
                  )
                })}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">By connecting, you agree to our Terms of Service</p>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-[#9CFFBB]/30 bg-[#9CFFBB]/5 text-[#9CFFBB] hover:bg-[#9CFFBB]/10 hover:text-[#9CFFBB]"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#5CFF71] animate-pulse" />
            <span>{shortAddress}</span>
            <span className="text-white/60">|</span>
            <span className="text-white">
              {wallet.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} ADA
            </span>
            <ChevronDown size={16} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 glass-card border-[#9CFFBB]/20">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Connected to {wallet.network}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                wallet.network === "mainnet" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {wallet.network}
            </span>
          </div>
          <p className="text-sm font-mono text-[#9CFFBB] mt-1 break-all">{shortAddress}</p>
          <p className="text-lg font-bold text-white mt-2">
            {wallet.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })} ADA
          </p>
        </div>
        <DropdownMenuSeparator className="bg-[#9CFFBB]/10" />
        <DropdownMenuItem
          onClick={handleRefresh}
          className="cursor-pointer text-gray-300 hover:text-white focus:text-white focus:bg-[#9CFFBB]/10"
        >
          <RefreshCw size={16} className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Balance
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={copyAddress}
          className="cursor-pointer text-gray-300 hover:text-white focus:text-white focus:bg-[#9CFFBB]/10"
        >
          <Copy size={16} className="mr-2" />
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-gray-300 hover:text-white focus:text-white focus:bg-[#9CFFBB]/10"
          onClick={() => {
            const explorerUrl =
              wallet.network === "mainnet"
                ? `https://cardanoscan.io/address/${wallet.address}`
                : `https://preview.cardanoscan.io/address/${wallet.address}`
            window.open(explorerUrl, "_blank")
          }}
        >
          <ExternalLink size={16} className="mr-2" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#9CFFBB]/10" />
        <DropdownMenuItem
          onClick={disconnect}
          className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
        >
          <LogOut size={16} className="mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

