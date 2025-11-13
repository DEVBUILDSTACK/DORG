import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type PageOption = 
  | "DASHBOARD" 
  | "INTEGRATIONS" 
  | "SETTINGS" 
  | "CALENDAR" 
  | "TIMEOFF" 
  | "PROJECTS" 
  | "TEAMS" 
  | "BENEFITS" 
  | "DOCUMENTS" 
  | "SUPPORT"
  | "PROFILE"
  | "NOTIFICATIONS"
  | "HELP"
  | "BILLING";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CentralStore {
  // Navigation
  activePage: PageOption;
  setActivePage: (page: PageOption) => void;
  
  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  
  // Mobile navigation
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
  
  // Breadcrumbs
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  addBreadcrumb: (breadcrumb: BreadcrumbItem) => void;
  
  // Search
  isSearchOpen: boolean;
  searchQuery: string;
  setSearchOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  
  // UI helpers
  isPageActive: (page: PageOption) => boolean;
  getPageTitle: (page: PageOption) => string;
}

const PAGE_TITLES: Record<PageOption, string> = {
  DASHBOARD: "Dashboard",
  INTEGRATIONS: "Integrations",
  SETTINGS: "Settings",
  CALENDAR: "Calendar",
  TIMEOFF: "Time Off",
  PROJECTS: "Projects",
  TEAMS: "Teams",
  BENEFITS: "Benefits",
  DOCUMENTS: "Documents",
  SUPPORT: "Support",
  PROFILE: "Profile",
  NOTIFICATIONS: "Notifications",
  HELP: "Help",
  BILLING: "Billing",
};

export const useCentralStore = create<CentralStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      activePage: "DASHBOARD",
      isSidebarOpen: false,
      isMobileMenuOpen: false,
      breadcrumbs: [],
      isSearchOpen: false,
      searchQuery: "",
      
      // Navigation actions
      setActivePage: (page) => {
        set({ activePage: page });
        // Auto-close mobile menu when navigating
        set({ isMobileMenuOpen: false });
      },
      
      // Sidebar actions
      toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),
      setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      
      // Mobile menu actions
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      toggleMobileMenu: () => set({ isMobileMenuOpen: !get().isMobileMenuOpen }),
      
      // Breadcrumb actions
      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
      addBreadcrumb: (breadcrumb) => {
        set((state) => ({
          breadcrumbs: [...state.breadcrumbs, breadcrumb]
        }));
      },
      
      // Search actions
      setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: "", isSearchOpen: false }),
      
      // UI helpers
      isPageActive: (page) => get().activePage === page,
      getPageTitle: (page) => PAGE_TITLES[page] || page,
    }),
    { name: "CentralStore" }
  )
);
