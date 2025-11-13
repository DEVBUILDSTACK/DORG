import React from 'react';
import { 
  useAuthStore, 
  useAppStore, 
  useUserStore, 
  useNotifications, 
  useTheme, 
  useLoadingState,
  useLearningProgress 
} from '@/store';

/**
 * Demo component showing how to use the enhanced Zustand stores
 * This component demonstrates various store functionalities
 */
export const StoreDemo = () => {
  // Auth store
  const { isAuthenticated, user, getUserDisplayName } = useAuthStore();
  
  // App store
  const { theme, sidebarCollapsed, toggleSidebar } = useAppStore();
  
  // User store
  const { role, preferences, updatePreferences } = useUserStore();
  
  // Custom hooks
  const notifications = useNotifications();
  const themeControls = useTheme();
  const loadingState = useLoadingState('demo');
  const learning = useLearningProgress();

  const handleTestNotification = () => {
    notifications.success('Success!', 'This is a test success notification');
  };

  const handleTestError = () => {
    notifications.error('Error!', 'This is a test error notification');
  };

  const handleTestLoading = async () => {
    loadingState.startLoading();
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    loadingState.stopLoading();
    notifications.info('Loading Complete', 'The demo operation finished');
  };

  const handleToggleTheme = () => {
    themeControls.toggleTheme();
    notifications.info('Theme Changed', `Switched to ${themeControls.theme === 'light' ? 'dark' : 'light'} theme`);
  };

  const handleUpdatePreferences = () => {
    updatePreferences({
      dashboardLayout: preferences.dashboardLayout === 'grid' ? 'list' : 'grid',
      compactMode: !preferences.compactMode,
    });
    notifications.success('Preferences Updated', 'Your dashboard preferences have been saved');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Zustand Store Demo</h1>
        <p className="text-gray-600 mb-6">
          This demo shows how to use the enhanced Zustand stores in your application.
        </p>
      </div>

      {/* Auth Info */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Authentication Store</h2>
        <div className="space-y-2">
          <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>User:</strong> {getUserDisplayName() || 'Not logged in'}</p>
          <p><strong>Role:</strong> {user?.role || role || 'No role set'}</p>
        </div>
      </div>

      {/* App State */}
      <div className="bg-green-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-3">App Store</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span><strong>Theme:</strong> {themeControls.theme}</span>
            <button
              onClick={handleToggleTheme}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Toggle Theme
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span><strong>Sidebar:</strong> {sidebarCollapsed ? 'Collapsed' : 'Expanded'}</span>
            <button
              onClick={toggleSidebar}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Toggle Sidebar
            </button>
          </div>
        </div>
      </div>

      {/* User Preferences */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-purple-800 mb-3">User Preferences</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Dashboard Layout:</strong> {preferences.dashboardLayout || 'grid'}
            </div>
            <div>
              <strong>Compact Mode:</strong> {preferences.compactMode ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Email Notifications:</strong> {preferences.emailNotifications ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Skill Level:</strong> {preferences.skillLevel || 'beginner'}
            </div>
          </div>
          <button
            onClick={handleUpdatePreferences}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Toggle Preferences
          </button>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">Learning Progress</h2>
        <div className="space-y-2">
          <p><strong>Completion Rate:</strong> {learning.completionRate.toFixed(1)}%</p>
          <p><strong>Courses in Progress:</strong> {learning.coursesInProgress.length}</p>
          <p><strong>Completed Courses:</strong> {learning.completedCourses.length}</p>
          <p><strong>Total Courses:</strong> {learning.totalCourses}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Test Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={handleTestNotification}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Success Notification
          </button>
          <button
            onClick={handleTestError}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Error Notification
          </button>
          <button
            onClick={handleTestLoading}
            disabled={loadingState.isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingState.isLoading ? 'Loading...' : 'Test Loading'}
          </button>
          <button
            onClick={notifications.clear}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Clear Notifications
          </button>
        </div>
      </div>

      {/* Notifications Display */}
      {notifications.hasNotifications && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Active Notifications</h3>
          {notifications.notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' :
                notification.type === 'error' ? 'bg-red-100 text-red-800' :
                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <strong>{notification.title}</strong>
                  {notification.message && <p className="text-sm mt-1">{notification.message}</p>}
                </div>
                <button
                  onClick={() => notifications.remove(notification.id)}
                  className="text-lg font-bold hover:opacity-70"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreDemo;