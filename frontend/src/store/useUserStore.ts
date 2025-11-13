import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserRole } from './useAuthStore';

export interface UserPreferences {
  // Dashboard preferences
  dashboardLayout: 'grid' | 'list';
  compactMode: boolean;
  
  // Notification preferences
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  
  // Privacy preferences
  publicProfile: boolean;
  showWalletAddress: boolean;
  allowAnalytics: boolean;
  
  // Learning preferences
  preferredLanguage: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[];
  
  // Developer preferences
  favoriteFrameworks: string[];
  preferredChains: string[];
  
  // Treasury preferences
  riskTolerance: 'low' | 'medium' | 'high';
  investmentHorizon: 'short' | 'medium' | 'long';
}

export interface UserProfile {
  // Basic info
  displayName?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  
  // Social links
  twitter?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
  
  // Professional info
  title?: string;
  company?: string;
  experience?: string;
  
  // Stats (read-only)
  joinDate?: string;
  lastActive?: string;
  coursesCompleted?: number;
  projectsBuilt?: number;
  reputationScore?: number;
}

interface UserState {
  // Core user data
  role: UserRole | null;
  preferences: Partial<UserPreferences>;
  profile: Partial<UserProfile>;
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  onboardingStep: number;
  
  // Learning progress
  coursesInProgress: string[];
  completedCourses: string[];
  bookmarkedContent: string[];
  
  // Developer data
  repositories: string[];
  deployedContracts: string[];
  
  // Treasury data
  portfolioValue: number;
  allocations: Record<string, number>;
  
  // Actions
  setRole: (role: UserRole) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  
  // Onboarding actions
  setOnboardingComplete: (complete: boolean) => void;
  setOnboardingStep: (step: number) => void;
  nextOnboardingStep: () => void;
  
  // Learning actions
  addCourseInProgress: (courseId: string) => void;
  completeCourse: (courseId: string) => void;
  toggleBookmark: (contentId: string) => void;
  
  // Developer actions
  addRepository: (repoUrl: string) => void;
  removeRepository: (repoUrl: string) => void;
  addContract: (contractAddress: string) => void;
  
  // Treasury actions
  updatePortfolioValue: (value: number) => void;
  updateAllocation: (asset: string, percentage: number) => void;
  
  // Computed getters
  getCompletionRate: () => number;
  isBookmarked: (contentId: string) => boolean;
  hasRepository: (repoUrl: string) => boolean;
  
  // Reset
  reset: () => void;
}

const defaultPreferences: Partial<UserPreferences> = {
  dashboardLayout: 'grid',
  compactMode: false,
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  publicProfile: false,
  showWalletAddress: false,
  allowAnalytics: true,
  preferredLanguage: 'en',
  skillLevel: 'beginner',
  learningGoals: [],
  favoriteFrameworks: [],
  preferredChains: [],
  riskTolerance: 'medium',
  investmentHorizon: 'medium',
};

const initialState = {
  role: null,
  preferences: defaultPreferences,
  profile: {},
  hasCompletedOnboarding: false,
  onboardingStep: 0,
  coursesInProgress: [],
  completedCourses: [],
  bookmarkedContent: [],
  repositories: [],
  deployedContracts: [],
  portfolioValue: 0,
  allocations: {},
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Basic setters
        setRole: (role) => set({ role }),
        
        updatePreferences: (preferences) => {
          set((state) => ({
            preferences: { ...state.preferences, ...preferences }
          }));
        },
        
        updateProfile: (profile) => {
          set((state) => ({
            profile: { ...state.profile, ...profile }
          }));
        },
        
        // Onboarding actions
        setOnboardingComplete: (complete) => set({ hasCompletedOnboarding: complete }),
        
        setOnboardingStep: (step) => set({ onboardingStep: step }),
        
        nextOnboardingStep: () => {
          set((state) => ({ onboardingStep: state.onboardingStep + 1 }));
        },
        
        // Learning actions
        addCourseInProgress: (courseId) => {
          set((state) => ({
            coursesInProgress: [...new Set([...state.coursesInProgress, courseId])]
          }));
        },
        
        completeCourse: (courseId) => {
          set((state) => ({
            coursesInProgress: state.coursesInProgress.filter(id => id !== courseId),
            completedCourses: [...new Set([...state.completedCourses, courseId])]
          }));
        },
        
        toggleBookmark: (contentId) => {
          set((state) => {
            const isBookmarked = state.bookmarkedContent.includes(contentId);
            return {
              bookmarkedContent: isBookmarked
                ? state.bookmarkedContent.filter(id => id !== contentId)
                : [...state.bookmarkedContent, contentId]
            };
          });
        },
        
        // Developer actions
        addRepository: (repoUrl) => {
          set((state) => ({
            repositories: [...new Set([...state.repositories, repoUrl])]
          }));
        },
        
        removeRepository: (repoUrl) => {
          set((state) => ({
            repositories: state.repositories.filter(url => url !== repoUrl)
          }));
        },
        
        addContract: (contractAddress) => {
          set((state) => ({
            deployedContracts: [...new Set([...state.deployedContracts, contractAddress])]
          }));
        },
        
        // Treasury actions
        updatePortfolioValue: (value) => set({ portfolioValue: value }),
        
        updateAllocation: (asset, percentage) => {
          set((state) => ({
            allocations: { ...state.allocations, [asset]: percentage }
          }));
        },
        
        // Computed getters
        getCompletionRate: () => {
          const { coursesInProgress, completedCourses } = get();
          const total = coursesInProgress.length + completedCourses.length;
          if (total === 0) return 0;
          return (completedCourses.length / total) * 100;
        },
        
        isBookmarked: (contentId) => {
          const { bookmarkedContent } = get();
          return bookmarkedContent.includes(contentId);
        },
        
        hasRepository: (repoUrl) => {
          const { repositories } = get();
          return repositories.includes(repoUrl);
        },
        
        // Reset
        reset: () => set(initialState),
      }),
      {
        name: 'user-store',
      }
    ),
    { name: 'UserStore' }
  )
);