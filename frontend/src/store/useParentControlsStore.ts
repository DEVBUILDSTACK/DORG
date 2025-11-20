import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Parent Controls Store
 * Manages parent-child account relationships and spending controls
 * Note: This is UI-only validation - not blockchain-enforced
 */

export type SpendingLimit = {
  id: string;
  walletAddress: string;
  dailyLimit: number; // USD
  weeklyLimit: number; // USD
  monthlyLimit: number; // USD
  perTransactionLimit: number; // USD
  allowedTokens?: string[]; // Token addresses that can be spent
  requiresApproval: boolean; // If true, transactions need parent approval
};

export type AccountLink = {
  id: string;
  parentUserId: string;
  parentEmail: string;
  childUserId: string;
  childEmail: string;
  childWallets: string[]; // Wallet addresses under control
  status: "pending" | "active" | "suspended";
  createdAt: number;
};

export type PendingTransaction = {
  id: string;
  linkId: string; // AccountLink ID
  fromWallet: string;
  toAddress: string;
  amount: string;
  token: string;
  reason?: string;
  requestedAt: number;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: number;
};

export type SpendingActivity = {
  id: string;
  walletAddress: string;
  amount: number; // USD
  timestamp: number;
  txHash?: string;
  category: "daily" | "weekly" | "monthly";
};

type ParentControlsStore = {
  // State
  accountLinks: AccountLink[];
  spendingLimits: Record<string, SpendingLimit>; // walletAddress -> limit
  pendingTransactions: PendingTransaction[];
  spendingActivity: SpendingActivity[];
  
  // Account Linking
  createAccountLink: (link: Omit<AccountLink, "id" | "createdAt" | "status">) => string;
  updateAccountLink: (linkId: string, updates: Partial<AccountLink>) => void;
  removeAccountLink: (linkId: string) => void;
  getAccountLink: (linkId: string) => AccountLink | null;
  getLinksByParent: (parentUserId: string) => AccountLink[];
  getLinksByChild: (childUserId: string) => AccountLink[];
  isChildAccount: (userId: string) => boolean;
  getParentForChild: (childUserId: string) => AccountLink | null;

  // Spending Limits
  setSpendingLimit: (walletAddress: string, limit: Omit<SpendingLimit, "id" | "walletAddress">) => void;
  getSpendingLimit: (walletAddress: string) => SpendingLimit | null;
  updateSpendingLimit: (walletAddress: string, updates: Partial<SpendingLimit>) => void;
  removeSpendingLimit: (walletAddress: string) => void;

  // Transaction Approvals
  requestApproval: (tx: Omit<PendingTransaction, "id" | "requestedAt" | "status">) => string;
  approveTransaction: (txId: string, approvedBy: string) => void;
  rejectTransaction: (txId: string) => void;
  getPendingTransactions: (linkId: string) => PendingTransaction[];
  getAllPendingForParent: (parentUserId: string) => PendingTransaction[];

  // Spending Tracking
  recordSpending: (activity: Omit<SpendingActivity, "id">) => void;
  getSpendingForWallet: (walletAddress: string, period: "daily" | "weekly" | "monthly") => number;
  checkSpendingLimit: (walletAddress: string, amount: number) => {
    allowed: boolean;
    reason?: string;
    requiresApproval: boolean;
  };

  // Utility
  clearParentControls: () => void;
};

const useParentControlsStore = create<ParentControlsStore>()(
  persist(
    devtools((set, get) => ({
      // Initial state
      accountLinks: [],
      spendingLimits: {},
      pendingTransactions: [],
      spendingActivity: [],

      // Account Linking
      createAccountLink: (link) => {
        const id = `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newLink: AccountLink = {
          ...link,
          id,
          status: "pending",
          createdAt: Date.now(),
        };

        set({ accountLinks: [...get().accountLinks, newLink] });
        return id;
      },

      updateAccountLink: (linkId, updates) => {
        set({
          accountLinks: get().accountLinks.map(link =>
            link.id === linkId ? { ...link, ...updates } : link
          ),
        });
      },

      removeAccountLink: (linkId) => {
        set({
          accountLinks: get().accountLinks.filter(link => link.id !== linkId),
        });
      },

      getAccountLink: (linkId) => {
        return get().accountLinks.find(link => link.id === linkId) || null;
      },

      getLinksByParent: (parentUserId) => {
        return get().accountLinks.filter(link => link.parentUserId === parentUserId);
      },

      getLinksByChild: (childUserId) => {
        return get().accountLinks.filter(link => link.childUserId === childUserId);
      },

      isChildAccount: (userId) => {
        return get().accountLinks.some(
          link => link.childUserId === userId && link.status === "active"
        );
      },

      getParentForChild: (childUserId) => {
        return get().accountLinks.find(
          link => link.childUserId === childUserId && link.status === "active"
        ) || null;
      },

      // Spending Limits
      setSpendingLimit: (walletAddress, limit) => {
        const id = `limit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newLimit: SpendingLimit = {
          ...limit,
          id,
          walletAddress,
        };

        set({
          spendingLimits: {
            ...get().spendingLimits,
            [walletAddress]: newLimit,
          },
        });
      },

      getSpendingLimit: (walletAddress) => {
        return get().spendingLimits[walletAddress] || null;
      },

      updateSpendingLimit: (walletAddress, updates) => {
        const current = get().spendingLimits[walletAddress];
        if (current) {
          set({
            spendingLimits: {
              ...get().spendingLimits,
              [walletAddress]: { ...current, ...updates },
            },
          });
        }
      },

      removeSpendingLimit: (walletAddress) => {
        const { [walletAddress]: removed, ...rest } = get().spendingLimits;
        set({ spendingLimits: rest });
      },

      // Transaction Approvals
      requestApproval: (tx) => {
        const id = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newTx: PendingTransaction = {
          ...tx,
          id,
          requestedAt: Date.now(),
          status: "pending",
        };

        set({
          pendingTransactions: [...get().pendingTransactions, newTx],
        });
        return id;
      },

      approveTransaction: (txId, approvedBy) => {
        set({
          pendingTransactions: get().pendingTransactions.map(tx =>
            tx.id === txId
              ? { ...tx, status: "approved", approvedBy, approvedAt: Date.now() }
              : tx
          ),
        });
      },

      rejectTransaction: (txId) => {
        set({
          pendingTransactions: get().pendingTransactions.map(tx =>
            tx.id === txId ? { ...tx, status: "rejected" } : tx
          ),
        });
      },

      getPendingTransactions: (linkId) => {
        return get().pendingTransactions.filter(
          tx => tx.linkId === linkId && tx.status === "pending"
        );
      },

      getAllPendingForParent: (parentUserId) => {
        const links = get().getLinksByParent(parentUserId);
        const linkIds = links.map(link => link.id);
        
        return get().pendingTransactions.filter(
          tx => linkIds.includes(tx.linkId) && tx.status === "pending"
        );
      },

      // Spending Tracking
      recordSpending: (activity) => {
        const id = `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newActivity: SpendingActivity = { ...activity, id };

        set({
          spendingActivity: [...get().spendingActivity, newActivity],
        });
      },

      getSpendingForWallet: (walletAddress, period) => {
        const now = Date.now();
        let cutoff: number;

        switch (period) {
          case "daily":
            cutoff = now - 24 * 60 * 60 * 1000;
            break;
          case "weekly":
            cutoff = now - 7 * 24 * 60 * 60 * 1000;
            break;
          case "monthly":
            cutoff = now - 30 * 24 * 60 * 60 * 1000;
            break;
        }

        return get()
          .spendingActivity.filter(
            a => a.walletAddress === walletAddress && a.timestamp >= cutoff
          )
          .reduce((sum, a) => sum + a.amount, 0);
      },

      checkSpendingLimit: (walletAddress, amount) => {
        const limit = get().getSpendingLimit(walletAddress);

        if (!limit) {
          return { allowed: true, requiresApproval: false };
        }

        // Check per-transaction limit
        if (amount > limit.perTransactionLimit) {
          return {
            allowed: false,
            reason: `Exceeds per-transaction limit of $${limit.perTransactionLimit}`,
            requiresApproval: limit.requiresApproval,
          };
        }

        // Check daily limit
        const dailySpent = get().getSpendingForWallet(walletAddress, "daily");
        if (dailySpent + amount > limit.dailyLimit) {
          return {
            allowed: false,
            reason: `Exceeds daily limit of $${limit.dailyLimit}`,
            requiresApproval: limit.requiresApproval,
          };
        }

        // Check weekly limit
        const weeklySpent = get().getSpendingForWallet(walletAddress, "weekly");
        if (weeklySpent + amount > limit.weeklyLimit) {
          return {
            allowed: false,
            reason: `Exceeds weekly limit of $${limit.weeklyLimit}`,
            requiresApproval: limit.requiresApproval,
          };
        }

        // Check monthly limit
        const monthlySpent = get().getSpendingForWallet(walletAddress, "monthly");
        if (monthlySpent + amount > limit.monthlyLimit) {
          return {
            allowed: false,
            reason: `Exceeds monthly limit of $${limit.monthlyLimit}`,
            requiresApproval: limit.requiresApproval,
          };
        }

        return {
          allowed: true,
          requiresApproval: limit.requiresApproval,
        };
      },

      // Utility
      clearParentControls: () => {
        set({
          accountLinks: [],
          spendingLimits: {},
          pendingTransactions: [],
          spendingActivity: [],
        });
      },
    })),
    {
      name: "parent-controls-store",
    }
  )
);

export default useParentControlsStore;
