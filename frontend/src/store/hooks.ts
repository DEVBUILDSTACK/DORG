import { useEffect } from 'react';
import { useAuthStore } from './useAuthStore';
import { useAppStore } from './useAppStore';
import { useUserStore } from './useUserStore';

/**
 * Hook for managing authentication state synchronization
 */
export const useAuthSync = () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  useEffect(() => {
    // Sync user role from auth to user store only if different
    const authRole = authStore.user?.role;
    const userRole = userStore.role;
    
    if (authRole && authRole !== userRole) {
      userStore.setRole(authRole);
    }
  }, [authStore.user?.role, userStore.role]);

  return {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    role: authStore.user?.role || userStore.role,
  };
};

/**
 * Hook for managing loading states
 */
export const useLoadingState = (key?: string) => {
  const { isLoading, setLoading } = useAppStore();

  const startLoading = () => {
    if (key) {
      setLoading(key, true);
    }
  };

  const stopLoading = () => {
    if (key) {
      setLoading(key, false);
    }
  };

  return {
    isLoading: key ? isLoading(key) : isLoading(),
    startLoading,
    stopLoading,
  };
};

/**
 * Hook for managing notifications
 */
export const useNotifications = () => {
  const { 
    notifications, 
    addNotification, 
    removeNotification, 
    clearNotifications,
    hasNotifications,
    getNotificationsByType 
  } = useAppStore();

  const success = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message });
  };

  const warning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message });
  };

  return {
    notifications,
    hasNotifications: hasNotifications(),
    add: addNotification,
    remove: removeNotification,
    clear: clearNotifications,
    getByType: getNotificationsByType,
    // Convenience methods
    success,
    error,
    warning,
    info,
  };
};

/**
 * Hook for managing user preferences
 */
export const useUserPreferences = () => {
  const { preferences, updatePreferences } = useUserStore();

  const updatePreference = <K extends keyof typeof preferences>(
    key: K, 
    value: typeof preferences[K]
  ) => {
    updatePreferences({ [key]: value });
  };

  return {
    preferences,
    updatePreferences,
    updatePreference,
  };
};

/**
 * Hook for managing theme
 */
export const useTheme = () => {
  const { theme, setTheme } = useAppStore();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setSystemTheme = () => setTheme('system');

  return {
    theme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isSystem: theme === 'system',
  };
};

/**
 * Hook for managing modal states
 */
export const useModal = (modalKey: string) => {
  const { modals, openModal, closeModal, toggleModal } = useAppStore();

  const isOpen = modals[modalKey] || false;

  return {
    isOpen,
    open: () => openModal(modalKey),
    close: () => closeModal(modalKey),
    toggle: () => toggleModal(modalKey),
  };
};

/**
 * Hook for managing learning progress
 */
export const useLearningProgress = () => {
  const {
    coursesInProgress,
    completedCourses,
    addCourseInProgress,
    completeCourse,
    getCompletionRate,
  } = useUserStore();

  return {
    coursesInProgress,
    completedCourses,
    addCourse: addCourseInProgress,
    completeCourse,
    completionRate: getCompletionRate(),
    totalCourses: coursesInProgress.length + completedCourses.length,
    isInProgress: (courseId: string) => coursesInProgress.includes(courseId),
    isCompleted: (courseId: string) => completedCourses.includes(courseId),
  };
};

/**
 * Hook for managing bookmarks
 */
export const useBookmarks = () => {
  const { bookmarkedContent, toggleBookmark, isBookmarked } = useUserStore();

  return {
    bookmarks: bookmarkedContent,
    toggle: toggleBookmark,
    isBookmarked,
    count: bookmarkedContent.length,
  };
};