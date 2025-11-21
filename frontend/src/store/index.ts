// Main stores
export { useCentralStore } from './Store';
export type { PageOption, BreadcrumbItem } from './Store';

export { useAuthStore } from './useAuthStore';
export type { User, UserRole } from './useAuthStore';

export { useAppStore } from './useAppStore';
export type { 
  ThemeMode, 
  Notification, 
  LoadingState 
} from './useAppStore';

export { useUserStore } from './useUserStore';
export type { 
  UserPreferences, 
  UserProfile 
} from './useUserStore';

// Specialized stores
export { default as useFLPStore } from './useFLPStore';
export { default as useWalletStore } from './useWalletStore';
export { default as useParentControlsStore } from './useParentControlsStore';

// Store hooks
export * from './hooks';

// Import stores for internal use
import { useCentralStore } from './Store';
import { useAuthStore } from './useAuthStore';
import { useAppStore } from './useAppStore';
import { useUserStore } from './useUserStore';
import useFLPStore from './useFLPStore';
import useWalletStore from './useWalletStore';
import useParentControlsStore from './useParentControlsStore';

// Re-export commonly used store combinations
export const useGlobalState = () => ({
  auth: useAuthStore(),
  app: useAppStore(),
  user: useUserStore(),
  central: useCentralStore(),
});

// Store reset utility
export const clearAllStores = () => {
  useAuthStore.getState().logout();
  useFLPStore.getState().clearFLPData();
  useFLPStore.getState().clearTierData();
  useFLPStore.getState().clearLpsData();
  useFLPStore.getState().clearAutoRenewalData();
  useFLPStore.getState().clearSignature();
  useFLPStore.getState().clearStepCount();
  useFLPStore.getState().clearCohortPhase();
  useWalletStore.getState().clearWallets();
  useParentControlsStore.getState().clearParentControls();
};

// Store sync utilities
export const syncStores = () => {
  try {
    const authState = useAuthStore.getState();
    const userState = useUserStore.getState();
    
    // Sync user role between auth and user stores only if different
    const authRole = authState.user?.role;
    const userRole = userState.role;
    
    if (authRole && authRole !== userRole) {
      userState.setRole(authRole);
    }
  } catch (error) {
    console.warn('Store sync failed:', error);
  }
};

// Development utilities (only available in development)
if (process.env.NODE_ENV === 'development') {
  // Add stores to window for debugging
  if (typeof window !== 'undefined') {
    (window as any).__stores__ = {
      auth: useAuthStore,
      app: useAppStore,
      user: useUserStore,
      central: useCentralStore,
      flp: useFLPStore,
      wallet: useWalletStore,
      parentControls: useParentControlsStore,
    };
  }
}