import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type UserRole = 'student' | 'developer' | 'treasury';

export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  walletAddress?: string;
  role?: UserRole;
  customMetadata?: Record<string, any>;
}

interface AuthState {
  // Auth status
  isAuthenticated: boolean;
  isLoading: boolean;
  isReady: boolean;
  
  // User data
  user: User | null;
  wallets: any[];
  
  // UI states
  showRoleModal: boolean;
  
  // Actions
  setAuth: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setReady: (ready: boolean) => void;
  setUser: (user: User | null) => void;
  setWallets: (wallets: any[]) => void;
  setUserRole: (role: UserRole) => void;
  setShowRoleModal: (show: boolean) => void;
  
  // Computed
  getUserDisplayName: () => string | null;
  getEmbeddedWallet: () => any | null;
  
  // Actions
  updateUserMetadata: (metadata: Record<string, any>) => void;
  logout: () => void;
  reset: () => void;
}

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isReady: false,
  user: null,
  wallets: [],
  showRoleModal: false,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Setters with guards to prevent unnecessary updates
        setAuth: (authenticated) => {
          const current = get();
          if (current.isAuthenticated !== authenticated) {
            set({ isAuthenticated: authenticated });
          }
        },
        setLoading: (loading) => {
          const current = get();
          if (current.isLoading !== loading) {
            set({ isLoading: loading });
          }
        },
        setReady: (ready) => {
          const current = get();
          if (current.isReady !== ready) {
            set({ isReady: ready });
          }
        },
        setUser: (user) => {
          const current = get();
          if (JSON.stringify(current.user) !== JSON.stringify(user)) {
            set({ user });
          }
        },
        setWallets: (wallets) => {
          const current = get();
          if (JSON.stringify(current.wallets) !== JSON.stringify(wallets)) {
            set({ wallets });
          }
        },
        setShowRoleModal: (show) => {
          const current = get();
          if (current.showRoleModal !== show) {
            set({ showRoleModal: show });
          }
        },
        
        setUserRole: (role) => {
          const { user } = get();
          if (user) {
            set({
              user: {
                ...user,
                role,
                customMetadata: {
                  ...user.customMetadata,
                  role,
                }
              }
            });
          }
        },
        
        // Computed getters
        getUserDisplayName: () => {
          const { user } = get();
          if (!user) return null;
          
          return user.name || 
                 user.email?.split('@')[0] || 
                 (user.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : null) ||
                 'User';
        },
        
        getEmbeddedWallet: () => {
          const { wallets } = get();
          return wallets.find((wallet) => wallet.walletClientType === 'privy') || null;
        },
        
        // Actions
        updateUserMetadata: (metadata) => {
          const { user } = get();
          if (user) {
            set({
              user: {
                ...user,
                customMetadata: {
                  ...user.customMetadata,
                  ...metadata,
                }
              }
            });
          }
        },
        
        logout: () => {
          set({
            isAuthenticated: false,
            user: null,
            wallets: [],
            showRoleModal: false,
          });
        },
        
        reset: () => set(initialState),
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);