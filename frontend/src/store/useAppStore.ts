import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  timestamp: number;
}

export interface LoadingState {
  [key: string]: boolean;
}

interface AppState {
  // Theme
  theme: ThemeMode;
  
  // Notifications
  notifications: Notification[];
  
  // Loading states
  loading: LoadingState;
  
  // Global UI states
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  
  // Modal states
  modals: {
    [key: string]: boolean;
  };
  
  // Network status
  isOnline: boolean;
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Loading actions
  setLoading: (key: string, isLoading: boolean) => void;
  clearLoading: () => void;
  
  // UI actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Modal actions
  openModal: (modalKey: string) => void;
  closeModal: (modalKey: string) => void;
  toggleModal: (modalKey: string) => void;
  closeAllModals: () => void;
  
  // Network actions
  setOnline: (online: boolean) => void;
  
  // Computed
  isLoading: (key?: string) => boolean;
  hasNotifications: () => boolean;
  getNotificationsByType: (type: Notification['type']) => Notification[];
}

const initialState = {
  theme: 'system' as ThemeMode,
  notifications: [],
  loading: {},
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  modals: {},
  isOnline: true,
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Theme actions
        setTheme: (theme) => set({ theme }),
        
        // Notification actions
        addNotification: (notification) => {
          const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const newNotification: Notification = {
            ...notification,
            id,
            timestamp: Date.now(),
            duration: notification.duration || 5000,
          };
          
          set((state) => ({
            notifications: [...state.notifications, newNotification]
          }));
          
          // Auto-remove notification after duration
          if (newNotification.duration && newNotification.duration > 0) {
            setTimeout(() => {
              get().removeNotification(id);
            }, newNotification.duration);
          }
        },
        
        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
          }));
        },
        
        clearNotifications: () => set({ notifications: [] }),
        
        // Loading actions
        setLoading: (key, isLoading) => {
          set((state) => ({
            loading: {
              ...state.loading,
              [key]: isLoading,
            }
          }));
        },
        
        clearLoading: () => set({ loading: {} }),
        
        // UI actions
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        
        toggleSidebar: () => {
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
        },
        
        setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
        
        // Modal actions
        openModal: (modalKey) => {
          set((state) => ({
            modals: { ...state.modals, [modalKey]: true }
          }));
        },
        
        closeModal: (modalKey) => {
          set((state) => ({
            modals: { ...state.modals, [modalKey]: false }
          }));
        },
        
        toggleModal: (modalKey) => {
          set((state) => ({
            modals: { 
              ...state.modals, 
              [modalKey]: !state.modals[modalKey] 
            }
          }));
        },
        
        closeAllModals: () => set({ modals: {} }),
        
        // Network actions
        setOnline: (online) => set({ isOnline: online }),
        
        // Computed getters
        isLoading: (key) => {
          const { loading } = get();
          if (key) {
            return loading[key] || false;
          }
          return Object.values(loading).some((isLoading) => isLoading);
        },
        
        hasNotifications: () => {
          const { notifications } = get();
          return notifications.length > 0;
        },
        
        getNotificationsByType: (type) => {
          const { notifications } = get();
          return notifications.filter((n) => n.type === type);
        },
      }),
      {
        name: 'app-store',
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
        }),
      }
    ),
    { name: 'AppStore' }
  )
);