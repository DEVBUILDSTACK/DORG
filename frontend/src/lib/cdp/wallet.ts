/**
 * CDP Smart Wallet Integration
 * Wrapper for Coinbase CDP SDK operations (v1.38.4+)
 * 
 * NOTE: Full CDP integration requires backend API key management.
 * For now, we'll use a hybrid approach with Privy embedded wallets
 * and plan for future CDP Smart Account integration.
 */

import { CdpClient } from "@coinbase/cdp-sdk";
import type { EvmSmartAccount } from "@coinbase/cdp-sdk";

// Types for wallet operations
export type CDPWalletData = {
  id: string;
  address: string;
  networkId: string;
  type: "smart-account" | "embedded" | "privy";
};

export type WalletBalance = {
  asset: string;
  amount: string;
  decimals?: number;
  usdValue?: string;
};

export type CreateWalletOptions = {
  networkId?: string;
};

// Singleton instance
let cdpClientInstance: CdpClient | null = null;

/**
 * Initialize CDP SDK Client
 * Note: Full CDP integration requires backend API management
 */
export async function initializeCDP(config?: { apiKeyId: string; apiKeySecret: string }): Promise<CdpClient | null> {
  if (cdpClientInstance) {
    return cdpClientInstance;
  }

  try {
    // CDP SDK requires server-side API key management
    // For now, we'll return null and use Privy embedded wallets
    // TODO: Implement backend proxy for CDP operations
    
    if (!config) {
      console.warn("CDP not configured - using Privy embedded wallets instead");
      return null;
    }

    cdpClientInstance = new CdpClient({
      apiKeyId: config.apiKeyId,
      apiKeySecret: config.apiKeySecret,
    });

    return cdpClientInstance;
  } catch (error) {
    console.error("Failed to initialize CDP:", error);
    return null;
  }
}

/**
 * Create a new Smart Account
 * This is a placeholder for future CDP Smart Account integration
 * Currently returns embedded wallet from Privy
 */
export async function createSmartWallet(
  options: CreateWalletOptions = {}
): Promise<CDPWalletData> {
  // For now, this will be handled by Privy embedded wallets
  // CDP Smart Accounts require backend infrastructure
  throw new Error("Direct CDP Smart Account creation requires backend integration. Use Privy embedded wallets instead.");
}

/**
 * Format balance for display
 */
export function formatBalance(balance: string, decimals: number = 18): string {
  try {
    const value = parseFloat(balance) / Math.pow(10, decimals);
    if (value === 0) return "0.00";
    if (value < 0.01) return "< 0.01";
    return value.toFixed(2);
  } catch {
    return "0.00";
  }
}

/**
 * Format balance with full precision
 */
export function formatBalanceFull(balance: string, decimals: number = 18): string {
  try {
    const value = parseFloat(balance) / Math.pow(10, decimals);
    return value.toFixed(6);
  } catch {
    return "0.000000";
  }
}

/**
 * Convert USD to display format
 */
export function formatUSD(amount: string | number): string {
  try {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return "$0.00";
  }
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

