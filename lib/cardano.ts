// CIP-30 Cardano Wallet API Types
export interface CardanoWalletApi {
  getNetworkId(): Promise<number>
  getUtxos(): Promise<string[] | undefined>
  getBalance(): Promise<string>
  getUsedAddresses(): Promise<string[]>
  getUnusedAddresses(): Promise<string[]>
  getChangeAddress(): Promise<string>
  getRewardAddresses(): Promise<string[]>
  signTx(tx: string, partialSign?: boolean): Promise<string>
  signData(addr: string, payload: string): Promise<{ signature: string; key: string }>
  submitTx(tx: string): Promise<string>
}

export interface CardanoWallet {
  name: string
  icon: string
  apiVersion: string
  enable(): Promise<CardanoWalletApi>
  isEnabled(): Promise<boolean>
}

declare global {
  interface Window {
    cardano?: {
      typhon?: CardanoWallet
      nami?: CardanoWallet
      eternl?: CardanoWallet
      flint?: CardanoWallet
      yoroi?: CardanoWallet
      [key: string]: CardanoWallet | undefined
    }
  }
}

// Helper to decode CBOR hex to lovelace (simplified)
export function hexToLovelace(hex: string): number {
  try {
    // The balance is returned as CBOR encoded value
    // For simplicity, we parse the hex directly
    // In production, use a proper CBOR library like @emurgo/cardano-serialization-lib
    const bytes = hexToBytes(hex)
    if (bytes.length === 0) return 0

    // Simple CBOR integer decoding for common cases
    const firstByte = bytes[0]

    if (firstByte <= 0x17) {
      return firstByte
    } else if (firstByte === 0x18) {
      return bytes[1]
    } else if (firstByte === 0x19) {
      return (bytes[1] << 8) | bytes[2]
    } else if (firstByte === 0x1a) {
      return (bytes[1] << 24) | (bytes[2] << 16) | (bytes[3] << 8) | bytes[4]
    } else if (firstByte === 0x1b) {
      // 64-bit integer - use BigInt for accuracy
      let value = BigInt(0)
      for (let i = 1; i <= 8; i++) {
        value = (value << BigInt(8)) | BigInt(bytes[i] || 0)
      }
      return Number(value)
    }

    return 0
  } catch {
    return 0
  }
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.substr(i, 2), 16)
  }
  return bytes
}

// Convert hex address to bech32 (simplified - shows hex for now)
export function hexToBech32(hex: string): string {
  // In production, use @emurgo/cardano-serialization-lib for proper bech32 encoding
  // For now, return a truncated version
  return `addr1${hex.slice(0, 50)}...`
}

// Check if a wallet is available with improved detection
export function isWalletAvailable(walletName: string): boolean {
  if (typeof window === "undefined") return false

  // Direct CIP-30 check
  if (window.cardano?.[walletName]) {
    return true
  }

  // Typhon may also be available under different names or as a method
  if (walletName === "typhon") {
    // Check for Typhon's alternative injection patterns
    if ((window as any).typhon) return true
    if ((window.cardano as any)?.enableTyphon) return true
  }

  return false
}

// Check if Typhon wallet is available
export function isTyphonAvailable(): boolean {
  return isWalletAvailable("typhon")
}

export function getAvailableWallets(): string[] {
  if (typeof window === "undefined" || !window.cardano) return []

  const wallets: string[] = []
  const supported = ["typhon", "nami", "eternl", "flint", "yoroi"]

  for (const wallet of supported) {
    if (isWalletAvailable(wallet)) {
      wallets.push(wallet)
    }
  }

  return wallets
}
