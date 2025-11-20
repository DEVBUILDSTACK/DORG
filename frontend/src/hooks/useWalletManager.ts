import { useEffect, useCallback } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount, useBalance } from "wagmi";
import { useWalletStore } from "@/store";
import type { WalletInfo, ChainType } from "@/store/useWalletStore";
import { formatBalance } from "@/lib/cdp/wallet";

/**
 * useWalletManager Hook
 * Manages wallet synchronization between Privy, wagmi, and our Zustand store
 */
export function useWalletManager() {
  const { ready, authenticated, user } = usePrivy();
  const { wallets: privyWallets } = useWallets();
  const { address: connectedAddress } = useAccount();
  
  const {
    wallets,
    addWallet,
    updateBalance,
    setActiveWallet,
    refreshAllBalances,
    isRefreshing,
  } = useWalletStore();

  // Store wallets.length to avoid referencing the whole array in dependencies
  const walletsCount = wallets.length;

  // Determine chain type from wallet
  const getChainType = (chainId?: string): ChainType => {
    if (!chainId) return "base-sepolia";
    
    // Ethereum chains
    if (chainId.includes("eip155:8453")) return "base";
    if (chainId.includes("eip155:84532")) return "base-sepolia";
    if (chainId.includes("eip155:1")) return "ethereum";
    
    // Solana chains
    if (chainId.includes("solana:5eykt4")) return "solana";
    if (chainId.includes("solana:EtWTRABZaYq6")) return "solana-devnet";
    
    return "base-sepolia"; // default
  };

  // Sync Privy wallets to store
  useEffect(() => {
    if (!ready || !authenticated || !privyWallets.length) return;

    privyWallets.forEach((wallet) => {
      const walletId = `${wallet.walletClientType}_${wallet.address}`;
      const chainType = getChainType(wallet.chainId);

      // Check if wallet already exists using walletsCount check
      const existingWallet = wallets.find((w) => w.id === walletId);

      if (!existingWallet) {
        const walletInfo: WalletInfo = {
          id: walletId,
          address: wallet.address,
          type: wallet.walletClientType === "privy" ? "embedded" : "external",
          chain: chainType,
          label: wallet.walletClientType === "privy" 
            ? "Privy Embedded Wallet"
            : `${wallet.walletClientType || "External"} Wallet`,
          balance: {
            native: "0",
            usdc: "0",
          },
          isActive: false,
        };

        addWallet(walletInfo);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated, privyWallets.length, walletsCount]);

  // Set active wallet when connected via wagmi
  useEffect(() => {
    if (connectedAddress) {
      const wallet = wallets.find((w) => 
        w.address.toLowerCase() === connectedAddress.toLowerCase()
      );
      if (wallet && !wallet.isActive) {
        setActiveWallet(wallet.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAddress, walletsCount]);

  // Refresh balances for all wallets
  const refreshBalances = useCallback(async () => {
    if (!ready || !authenticated) return;

    for (const wallet of wallets) {
      try {
        // Fetch balance based on chain type
        if (wallet.chain.includes("solana")) {
          // TODO: Implement Solana balance fetching
          // For now, set placeholder
          const newBalance = {
            native: "0",
            usdc: "0",
          };
          
          // Only update if different
          if (JSON.stringify(wallet.balance) !== JSON.stringify(newBalance)) {
            updateBalance(wallet.id, newBalance);
          }
        } else {
          // EVM chains - use wagmi balance hook
          // This is handled per-wallet below
        }
      } catch (error) {
        console.error(`Failed to fetch balance for ${wallet.address}:`, error);
      }
    }
  }, [ready, authenticated, wallets.length, updateBalance]);

  return {
    wallets,
    activeWallet: wallets.find((w) => w.isActive) || null,
    isRefreshing,
    refreshBalances,
    privyWallets,
  };
}

/**
 * useWalletBalance Hook
 * Fetches and updates balance for a specific wallet
 */
export function useWalletBalance(walletAddress?: string, chainId?: number) {
  const { updateBalance } = useWalletStore();
  const { wallets } = useWalletStore();

  const wallet = wallets.find((w) => 
    w.address.toLowerCase() === walletAddress?.toLowerCase()
  );

  // Determine the correct chain ID based on wallet chain
  const getChainId = () => {
    if (chainId) return chainId;
    if (wallet?.chain === "base") return 8453;
    if (wallet?.chain === "base-sepolia") return 84532;
    if (wallet?.chain === "ethereum") return 1;
    return 84532; // Default to Base Sepolia for testing
  };

  const targetChainId = getChainId();
  const isSolana = wallet?.chain.includes("solana");

  // Fetch native balance (ETH/SOL)
  const { data: nativeBalance, error: nativeError } = useBalance({
    address: walletAddress as `0x${string}`,
    chainId: targetChainId,
    query: {
      enabled: !!walletAddress && !isSolana,
      refetchInterval: 30000, // Refetch every 30s
      retry: 3,
    },
  });

  // USDC contract addresses by chain
  const USDC_ADDRESSES: Record<number, string> = {
    8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base
    84532: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia
    1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Ethereum
  };

  // Fetch USDC balance
  const { data: usdcBalance, error: usdcError } = useBalance({
    address: walletAddress as `0x${string}`,
    token: USDC_ADDRESSES[targetChainId] as `0x${string}`,
    chainId: targetChainId,
    query: {
      enabled: !!walletAddress && !isSolana && !!USDC_ADDRESSES[targetChainId],
      refetchInterval: 30000,
      retry: 3,
    },
  });

  // Log errors for debugging
  useEffect(() => {
    if (nativeError) console.error("Native balance fetch error:", nativeError);
    if (usdcError) console.error("USDC balance fetch error:", usdcError);
  }, [nativeError, usdcError]);

  // Update store when balances change
  useEffect(() => {
    if (wallet) {
      const newBalance = {
        native: nativeBalance?.formatted || "0",
        usdc: usdcBalance?.formatted || "0",
      };
      
      // Only update if balance actually changed
      const currentBalance = wallet.balance;
      const hasChanged = 
        currentBalance?.native !== newBalance.native || 
        currentBalance?.usdc !== newBalance.usdc;
      
      if (hasChanged) {
        updateBalance(wallet.id, newBalance);
      }
    }
  }, [nativeBalance?.formatted, usdcBalance?.formatted, wallet?.id, updateBalance]);

  return {
    nativeBalance: nativeBalance?.formatted || "0",
    usdcBalance: usdcBalance?.formatted || "0",
    symbol: nativeBalance?.symbol || "ETH",
  };
}

/**
 * useCreatePrivyWallet Hook
 * Note: Privy creates embedded wallets automatically on login.
 * This hook is a placeholder for future direct wallet creation.
 */
export function useCreatePrivyWallet() {
  const { wallets: privyWallets } = useWallets();
  const { ready, authenticated, createWallet } = usePrivy();

  const createEmbeddedWallet = useCallback(async (chainType: "base" | "solana" = "base") => {
    if (!ready || !authenticated) {
      throw new Error("Please login first to create a wallet.");
    }

    // Check if embedded wallet already exists
    const existingWallet = privyWallets.find(w => w.walletClientType === "privy");
    
    if (existingWallet) {
      console.log("Embedded wallet already exists:", existingWallet.address);
      return existingWallet;
    }

    // Create new embedded wallet via Privy
    try {
      if (createWallet) {
        await createWallet();
        // Wait for wallet to be created and added to privyWallets
        await new Promise(resolve => setTimeout(resolve, 1000));
        return privyWallets.find(w => w.walletClientType === "privy");
      } else {
        throw new Error("Wallet creation not available. Please refresh the page.");
      }
    } catch (error) {
      console.error("Failed to create wallet:", error);
      throw error;
    }
  }, [privyWallets, ready, authenticated, createWallet]);

  return { createEmbeddedWallet };
}
