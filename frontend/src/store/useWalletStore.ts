import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Wallet Store
 * Manages all wallet types: Privy embedded, Privy linked, and Solana wallets
 */

export type WalletType = "embedded" | "external" | "solana" | "smart-account";

export type ChainType = "base" | "base-sepolia" | "ethereum" | "solana" | "solana-devnet";

export type WalletInfo = {
  id: string;
  address: string;
  type: WalletType;
  chain: ChainType;
  label?: string; // User-friendly name
  balance?: {
    native: string; // ETH or SOL
    usdc?: string;
    tokens?: Record<string, string>; // Other token balances
  };
  lastUpdated?: number; // Timestamp of last balance update
  isActive?: boolean; // Currently selected wallet
};

export type OnRampDeposit = {
  id: string;
  amount: string; // USD amount
  walletAddress: string;
  timestamp: number;
  status: "pending" | "completed" | "failed";
  txHash?: string;
};

type WalletStore = {
  // State
  wallets: WalletInfo[];
  activeWalletId: string | null;
  deposits: OnRampDeposit[];
  isRefreshing: boolean;
  lastRefresh: number | null;

  // Wallet Management Actions
  addWallet: (wallet: WalletInfo) => void;
  removeWallet: (walletId: string) => void;
  updateWallet: (walletId: string, updates: Partial<WalletInfo>) => void;
  setActiveWallet: (walletId: string) => void;
  getActiveWallet: () => WalletInfo | null;
  getWalletById: (walletId: string) => WalletInfo | null;
  getWalletsByChain: (chain: ChainType) => WalletInfo[];

  // Balance Actions
  updateBalance: (walletId: string, balance: WalletInfo["balance"]) => void;
  refreshAllBalances: () => Promise<void>;
  setRefreshing: (isRefreshing: boolean) => void;

  // Deposit Tracking
  addDeposit: (deposit: OnRampDeposit) => void;
  updateDeposit: (depositId: string, updates: Partial<OnRampDeposit>) => void;
  getDepositsByWallet: (walletAddress: string) => OnRampDeposit[];
  getPendingDeposits: () => OnRampDeposit[];

  // Utility Actions
  clearWallets: () => void;
  getTotalBalance: () => { usd: number; native: number };
};

const useWalletStore = create<WalletStore>()(
  persist(
    devtools((set, get) => ({
      // Initial state
      wallets: [],
      activeWalletId: null,
      deposits: [],
      isRefreshing: false,
      lastRefresh: null,

      // Wallet Management
      addWallet: (wallet: WalletInfo) => {
        const state = get();
        
        // Check if wallet already exists
        const exists = state.wallets.some(w => w.address === wallet.address && w.chain === wallet.chain);
        if (exists) {
          console.warn("Wallet already exists:", wallet.address);
          return;
        }

        set({
          wallets: [...state.wallets, { ...wallet, lastUpdated: Date.now() }],
        });

        // Set as active if it's the first wallet
        if (state.wallets.length === 0) {
          set({ activeWalletId: wallet.id });
        }
      },

      removeWallet: (walletId: string) => {
        const state = get();
        const newWallets = state.wallets.filter(w => w.id !== walletId);
        
        set({ wallets: newWallets });

        // Update active wallet if removed
        if (state.activeWalletId === walletId) {
          set({ activeWalletId: newWallets.length > 0 ? newWallets[0].id : null });
        }
      },

      updateWallet: (walletId: string, updates: Partial<WalletInfo>) => {
        set({
          wallets: get().wallets.map(w =>
            w.id === walletId
              ? { ...w, ...updates, lastUpdated: Date.now() }
              : w
          ),
        });
      },

      setActiveWallet: (walletId: string) => {
        const state = get();
        
        // Prevent update if already active
        if (state.activeWalletId === walletId) {
          return;
        }
        
        const wallet = state.wallets.find(w => w.id === walletId);
        if (wallet) {
          set({
            activeWalletId: walletId,
            wallets: state.wallets.map(w => ({
              ...w,
              isActive: w.id === walletId,
            })),
          });
        }
      },

      getActiveWallet: () => {
        const state = get();
        return state.wallets.find(w => w.id === state.activeWalletId) || null;
      },

      getWalletById: (walletId: string) => {
        return get().wallets.find(w => w.id === walletId) || null;
      },

      getWalletsByChain: (chain: ChainType) => {
        return get().wallets.filter(w => w.chain === chain);
      },

      // Balance Management
      updateBalance: (walletId: string, balance: WalletInfo["balance"]) => {
        const state = get();
        const wallet = state.wallets.find(w => w.id === walletId);
        
        // Prevent update if balance hasn't changed
        if (wallet && JSON.stringify(wallet.balance) === JSON.stringify(balance)) {
          return;
        }
        
        set({
          wallets: state.wallets.map(w =>
            w.id === walletId
              ? { ...w, balance, lastUpdated: Date.now() }
              : w
          ),
          lastRefresh: Date.now(),
        });
      },

      refreshAllBalances: async () => {
        set({ isRefreshing: true });
        
        // This will be implemented with actual balance fetching logic
        // For now, it's a placeholder
        
        try {
          // TODO: Implement balance fetching for each wallet
          // await Promise.all(get().wallets.map(wallet => fetchBalance(wallet)))
          
          set({ 
            isRefreshing: false,
            lastRefresh: Date.now(),
          });
        } catch (error) {
          console.error("Failed to refresh balances:", error);
          set({ isRefreshing: false });
        }
      },

      setRefreshing: (isRefreshing: boolean) => {
        set({ isRefreshing });
      },

      // Deposit Tracking
      addDeposit: (deposit: OnRampDeposit) => {
        set({
          deposits: [deposit, ...get().deposits],
        });
      },

      updateDeposit: (depositId: string, updates: Partial<OnRampDeposit>) => {
        set({
          deposits: get().deposits.map(d =>
            d.id === depositId ? { ...d, ...updates } : d
          ),
        });
      },

      getDepositsByWallet: (walletAddress: string) => {
        return get().deposits.filter(d => d.walletAddress === walletAddress);
      },

      getPendingDeposits: () => {
        return get().deposits.filter(d => d.status === "pending");
      },

      // Utility
      clearWallets: () => {
        set({
          wallets: [],
          activeWalletId: null,
          deposits: [],
          lastRefresh: null,
        });
      },

      getTotalBalance: () => {
        const wallets = get().wallets;
        let totalUsd = 0;
        let totalNative = 0;

        wallets.forEach(wallet => {
          if (wallet.balance?.native) {
            totalNative += parseFloat(wallet.balance.native) || 0;
          }
          // TODO: Add USD conversion logic
        });

        return { usd: totalUsd, native: totalNative };
      },
    })),
    {
      name: "wallet-store",
      partialize: (state) => ({
        wallets: state.wallets,
        activeWalletId: state.activeWalletId,
        deposits: state.deposits,
        lastRefresh: state.lastRefresh,
      }),
    }
  )
);

export default useWalletStore;
