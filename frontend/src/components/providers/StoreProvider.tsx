import { useEffect, ReactNode, useCallback } from 'react';
import { useAppStore, syncStores } from '@/store';

interface StoreProviderProps {
  children: ReactNode;
}

/**
 * Provider component that initializes and synchronizes all Zustand stores
 * Should be placed near the root of the application
 */
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const setOnline = useAppStore(state => state.setOnline);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleOnline = useCallback(() => setOnline(true), [setOnline]);
  const handleOffline = useCallback(() => setOnline(false), [setOnline]);

  useEffect(() => {
    // Sync stores on mount only once
    syncStores();

    // Listen to online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Empty dependency array to run only once

  return <>{children}</>;
};

export default StoreProvider;