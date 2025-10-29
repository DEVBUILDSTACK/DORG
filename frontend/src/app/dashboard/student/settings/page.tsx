"use client";

import React, { useState } from 'react';
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Notifications {
  courseUpdates: boolean;
  communityPosts: boolean;
  vaultAlerts: boolean;
  weeklyDigest: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const SettingsPage = () => {
  const router = useRouter();
  const { logout, user, getUserDisplayName } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState<Notifications>({
    courseUpdates: true,
    communityPosts: true,
    vaultAlerts: true,
    weeklyDigest: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const [profile, setProfile] = useState({
    fullName: getUserDisplayName?.() || 'User',
    email: user?.email?.address || user?.google?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Web3 enthusiast learning to build the decentralized future',
    website: 'https://alexjohnson.dev',
    github: 'alexjohnson',
    twitter: 'alexjohnson_dev',
    linkedin: 'alexjohnson'
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'privacy', name: 'Privacy', icon: Eye },
    { id: 'data', name: 'Data & Export', icon: Download }
  ];

  const handleNotificationChange = (key: keyof Notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Settings className="w-8 h-8 mr-3 text-[#00E0FF]" />
          Settings
        </h1>
        <p className="text-gray-400 text-lg">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#06B6D4]/5 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-transparent rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Profile Information</h2>
                    <p className="text-gray-400">Update your personal information and public profile</p>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] rounded-full flex items-center justify-center text-3xl">
                      👤
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-[#00E0FF]/20 text-[#00E0FF] rounded-lg hover:bg-[#00E0FF]/30 transition-colors mr-3">
                        Change Photo
                      </button>
                      <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => handleProfileChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

  {/* Social Links */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="url"
                            value={profile.website}
                            onChange={(e) => handleProfileChange('website', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                            placeholder="https://your-website.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={profile.github}
                            onChange={(e) => handleProfileChange('github', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={profile.twitter}
                            onChange={(e) => handleProfileChange('twitter', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={profile.linkedin}
                            onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-[#00E0FF]/20 text-[#00E0FF] rounded-xl hover:bg-[#00E0FF]/30 transition-colors">
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Notification Preferences</h2>
                    <p className="text-gray-400">Choose what notifications you want to receive</p>
                  </div>

                  <div className="space-y-6">
                    {(Object.entries({
                      courseUpdates: 'Course updates and new content',
                      communityPosts: 'Community posts and discussions',
                      vaultAlerts: 'Vault performance and alerts',
                      weeklyDigest: 'Weekly progress digest',
                      emailNotifications: 'Email notifications',
                      pushNotifications: 'Push notifications'
                    }) as [keyof Notifications, string][]).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                        <div>
                          <p className="font-medium text-white">{label}</p>
                          <p className="text-sm text-gray-400">
                            {key === 'courseUpdates' && 'Get notified when new courses or modules are available'}
                            {key === 'communityPosts' && 'Notifications for replies and mentions in community'}
                            {key === 'vaultAlerts' && 'Important updates about your vault positions'}
                            {key === 'weeklyDigest' && 'Weekly summary of your learning progress'}
                            {key === 'emailNotifications' && 'Receive notifications via email'}
                            {key === 'pushNotifications' && 'Browser push notifications'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[key] ? 'bg-[#00E0FF]' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Security Settings</h2>
                    <p className="text-gray-400">Manage your account security and authentication</p>
                  </div>

                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-6 bg-gray-900/30 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                          />
                        </div>
                        <button className="px-4 py-2 bg-[#00E0FF]/20 text-[#00E0FF] rounded-lg hover:bg-[#00E0FF]/30 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-6 bg-gray-900/30 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    {/* API Keys */}
                    <div className="p-6 bg-gray-900/30 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <p className="font-medium text-white">Personal API Key</p>
                            <p className="text-sm text-gray-400">
                              {showApiKey ? 'sk_live_1234567890abcdef...' : '••••••••••••••••••••••••'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="p-2 text-gray-400 hover:text-white transition-colors"
                              aria-label="Toggle API key visibility"
                            >
                              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button 
                              className="p-2 text-gray-400 hover:text-white transition-colors"
                              aria-label="Regenerate API key"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-[#00E0FF]/20 text-[#00E0FF] rounded-lg hover:bg-[#00E0FF]/30 transition-colors">
                          Generate New Key
                        </button>
                      </div>
                    </div>

                    {/* Connected Accounts & Session */}
                    <div className="p-6 bg-gray-900/30 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Session Management</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-white">Current Session</p>
                              <p className="text-sm text-gray-400">
                                Logged in as {getUserDisplayName?.() || 'User'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              <span className="text-sm text-green-400">Active</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoggingOut ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                              <span>Logging out...</span>
                            </>
                          ) : (
                            <>
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly */}
              {activeTab === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Appearance Settings</h2>
                    <p className="text-gray-400">Customize the look and feel of your dashboard</p>
                  </div>
                  <div className="p-8 text-center text-gray-400">
                    <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Appearance settings coming soon...</p>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Privacy Settings</h2>
                    <p className="text-gray-400">Control your privacy and data sharing preferences</p>
                  </div>
                  <div className="p-8 text-center text-gray-400">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Privacy settings coming soon...</p>
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-2">Data & Export</h2>
                    <p className="text-gray-400">Download your data or delete your account</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-900/30 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
                      <p className="text-gray-400 mb-4">Download a copy of your account data including courses, progress, and community activity.</p>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-[#00E0FF]/20 text-[#00E0FF] rounded-lg hover:bg-[#00E0FF]/30 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                    </div>

                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Delete Account</h3>
                      <p className="text-gray-400 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
