/**
 * Utility functions for managing user role in localStorage
 * This ensures consistent role management across the application
 */

const STORAGE_KEY = 'user_role';

export type UserRole = 'student' | 'developer' | 'treasury';

/**
 * Save user role to localStorage
 */
export const saveUserRole = (role: UserRole): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, role);
    console.log('Role saved to localStorage:', role);
  } catch (error) {
    console.error('Failed to save role to localStorage:', error);
  }
};

/**
 * Get user role from localStorage
 */
export const getUserRole = (): UserRole | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const role = localStorage.getItem(STORAGE_KEY);
    return role as UserRole | null;
  } catch (error) {
    console.error('Failed to get role from localStorage:', error);
    return null;
  }
};

/**
 * Remove user role from localStorage
 */
export const clearUserRole = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Role cleared from localStorage');
  } catch (error) {
    console.error('Failed to clear role from localStorage:', error);
  }
};

/**
 * Check if user has a saved role
 */
export const hasUserRole = (): boolean => {
  return getUserRole() !== null;
};
