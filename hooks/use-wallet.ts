"use client"

import { useState, useCallback, useEffect } from "react"
import type { WalletState } from "@/lib/types"
import { type CardanoWalletApi, hexToLovelace, getAvailableWallets } from "@/lib/cardano"

const initialState: WalletState = {
  connected: false,
  address: null,
  balance: 0,
  network: "preview",
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(initialState)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletApi, setWalletApi] = useState<CardanoWalletApi | null>(null)
  const [availableWallets, setAvailableWallets] = useState<string[]>([])

  useEffect(() => {
    const checkWallets = () => {
      console.log("[v0] Checking for available wallets...")
      const detected = getAvailableWallets()
      console.log("[v0] Detected wallets:", detected)
      setAvailableWallets(detected)
    }

    // Check immediately and after multiple delays (wallets inject async)
    checkWallets()
    const timeout1 = setTimeout(checkWallets, 500)
    const timeout2 = setTimeout(checkWallets, 1500)
    const timeout3 = setTimeout(checkWallets, 3000)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const connect = useCallback(async (walletName = "typhon") => {
    setIsConnecting(true)
    setError(null)

    try {
      if (typeof window === "undefined" || !window.cardano) {
        // For Typhon, check alternative injection patterns
        if (walletName === "typhon" && (window as any)?.typhon) {
          console.log("[v0] Found Typhon via alternative injection")
          // Use Typhon's alternative API
          const typhonWindow = window as any
          const api = await typhonWindow.typhon.enable()
          setWalletApi(api)

          const networkId = await api.getNetworkId()
          const network = networkId === 1 ? "mainnet" : "preview"

          const usedAddresses = await api.getUsedAddresses()
          const unusedAddresses = await api.getUnusedAddresses()
          const address = usedAddresses[0] || unusedAddresses[0] || null

          const balanceHex = await api.getBalance()
          const balanceLovelace = hexToLovelace(balanceHex)
          const balanceAda = balanceLovelace / 1_000_000

          setWallet({
            connected: true,
            address: address,
            balance: balanceAda,
            network: network as "mainnet" | "preview",
          })
          setIsConnecting(false)
          return
        }

        setError(
          `No Cardano wallet detected. Please install ${walletName.charAt(0).toUpperCase() + walletName.slice(1)} wallet extension.`,
        )
        setIsConnecting(false)
        return
      }

      // Try standard CIP-30 method first
      const walletProvider = window.cardano[walletName]

      if (!walletProvider) {
        // For Typhon, try alternative injection
        if (walletName === "typhon") {
          const typhonWindow = window as any
          if (typhonWindow.typhon?.enable) {
            console.log("[v0] Using Typhon alternative API")
            const api = await typhonWindow.typhon.enable()
            setWalletApi(api)

            const networkId = await api.getNetworkId()
            const network = networkId === 1 ? "mainnet" : "preview"

            const usedAddresses = await api.getUsedAddresses()
            const unusedAddresses = await api.getUnusedAddresses()
            const address = usedAddresses[0] || unusedAddresses[0] || null

            const balanceHex = await api.getBalance()
            const balanceLovelace = hexToLovelace(balanceHex)
            const balanceAda = balanceLovelace / 1_000_000

            setWallet({
              connected: true,
              address: address,
              balance: balanceAda,
              network: network as "mainnet" | "preview",
            })
            setIsConnecting(false)
            return
          }
        }

        setError(
          `${walletName.charAt(0).toUpperCase() + walletName.slice(1)} wallet not found. Please install it from the browser extension store.`,
        )
        setIsConnecting(false)
        return
      }

      // Enable the wallet (this prompts the user)
      const api = await walletProvider.enable()
      setWalletApi(api)

      // Get network ID (0 = testnet/preview, 1 = mainnet)
      const networkId = await api.getNetworkId()
      const network = networkId === 1 ? "mainnet" : "preview"

      // Get the first used address
      const usedAddresses = await api.getUsedAddresses()
      const unusedAddresses = await api.getUnusedAddresses()
      const address = usedAddresses[0] || unusedAddresses[0] || null

      // Get balance in lovelace
      const balanceHex = await api.getBalance()
      const balanceLovelace = hexToLovelace(balanceHex)
      const balanceAda = balanceLovelace / 1_000_000 // Convert lovelace to ADA

      setWallet({
        connected: true,
        address: address,
        balance: balanceAda,
        network: network as "mainnet" | "preview",
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to connect wallet"
      console.log("[v0] Wallet connection error:", message)
      setError(message)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setWallet(initialState)
    setWalletApi(null)
    setError(null)
  }, [])

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (!walletApi) return

    try {
      const balanceHex = await walletApi.getBalance()
      const balanceLovelace = hexToLovelace(balanceHex)
      const balanceAda = balanceLovelace / 1_000_000

      setWallet((prev) => ({ ...prev, balance: balanceAda }))
    } catch (err) {
      console.error("Failed to refresh balance:", err)
    }
  }, [walletApi])

  return {
    wallet,
    isConnecting,
    connect,
    disconnect,
    error,
    clearError,
    walletApi,
    availableWallets,
    refreshBalance,
    isTyphonAvailable: availableWallets.includes("typhon"),
  }
}
