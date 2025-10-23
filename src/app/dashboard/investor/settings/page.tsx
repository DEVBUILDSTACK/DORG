"use client";

import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Key,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Edit,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Smartphone,
  Lock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function InvestorSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    vaultUpdates: true,
    impactReports: true,
    cohortProgress: true,
    yieldDistribution: true,
    emailNotifications: true,
    pushNotifications: false,
    smsAlerts: true
  });

  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Chen Ventures',
    location: 'San Francisco, CA',
    investorType: 'Individual',
    riskTolerance: 'Medium',
    investmentFocus: 'Education & Technology'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Access', icon: Key },
    { id: 'data', label: 'Data & Privacy', icon: Download }
  ];

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileChange = (key: keyof typeof profileData, value: string) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400 text-lg">Manage your investor profile, security, and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-gray-800/30 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#00E0FF] text-black shadow-lg shadow-[#00E0FF]/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Information */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#00E0FF] text-black rounded-lg hover:shadow-lg hover:shadow-[#00E0FF]/30 transition-all">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Preferences */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Investment Preferences</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Investor Type</label>
                    <select
                      value={profileData.investorType}
                      onChange={(e) => handleProfileChange('investorType', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Institutional">Institutional</option>
                      <option value="Family Office">Family Office</option>
                      <option value="Fund">Fund</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Risk Tolerance</label>
                    <select
                      value={profileData.riskTolerance}
                      onChange={(e) => handleProfileChange('riskTolerance', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                    >
                      <option value="Conservative">Conservative</option>
                      <option value="Medium">Medium</option>
                      <option value="Aggressive">Aggressive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Investment Focus</label>
                    <select
                      value={profileData.investmentFocus}
                      onChange={(e) => handleProfileChange('investmentFocus', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
                    >
                      <option value="Education & Technology">Education & Technology</option>
                      <option value="Sustainable Development">Sustainable Development</option>
                      <option value="Healthcare & Wellness">Healthcare & Wellness</option>
                      <option value="Financial Inclusion">Financial Inclusion</option>
                      <option value="Climate & Environment">Climate & Environment</option>
                    </select>
                  </div>

                  {/* Tier Badge */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-300/20 to-gray-500/20 rounded-lg border border-gray-600/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Current Tier</p>
                        <p className="text-sm text-gray-400">Based on your investment history</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                          Platinum Investor
                        </p>
                        <p className="text-xs text-gray-400">$1M+ invested</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                {/* Investment Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Investment Updates</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'vaultUpdates', label: 'Vault Performance Updates', description: 'Get notified about yield distributions and vault performance' },
                      { key: 'impactReports', label: 'Impact Reports', description: 'Receive monthly impact and social outcome reports' },
                      { key: 'cohortProgress', label: 'Cohort Progress Updates', description: 'Updates on educational cohort milestones and completions' },
                      { key: 'yieldDistribution', label: 'Yield Distribution Alerts', description: 'Notifications when yields are distributed to your account' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key as keyof typeof notifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-[#00E0FF]' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Communication Channels */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Communication Channels</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email', icon: Mail },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser and mobile push notifications', icon: Smartphone },
                      { key: 'smsAlerts', label: 'SMS Alerts', description: 'Critical alerts via SMS', icon: Phone }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-white font-medium">{item.label}</p>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key as keyof typeof notifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-[#00E0FF]' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Password & Authentication */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Password & Authentication</h2>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <div className="text-left">
                        <p className="text-white font-medium">Change Password</p>
                        <p className="text-sm text-gray-400">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div className="text-left">
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-green-400">Enabled</p>
                      </div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-gray-400" />
                      <div className="text-left">
                        <p className="text-white font-medium">Backup Codes</p>
                        <p className="text-sm text-gray-400">Generate backup authentication codes</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Login Sessions */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Active Sessions</h2>

                <div className="space-y-4">
                  {[
                    { device: 'MacBook Pro', location: 'San Francisco, CA', current: true, lastActive: 'Active now' },
                    { device: 'iPhone 15 Pro', location: 'San Francisco, CA', current: false, lastActive: '2 hours ago' },
                    { device: 'Chrome Browser', location: 'New York, NY', current: false, lastActive: '1 day ago' }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${session.current ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                        <div>
                          <p className="text-white font-medium">{session.device}</p>
                          <p className="text-sm text-gray-400">{session.location} • {session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">API Access</h2>

              <div className="space-y-6">
                {/* API Key */}
                <div className="p-4 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-medium">API Key</p>
                      <p className="text-sm text-gray-400">Use this key to access your portfolio data programmatically</p>
                    </div>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 p-3 bg-gray-800/50 rounded-lg text-sm font-mono text-gray-300">
                      {showApiKey ? 'l2l_live_sk_1234567890abcdef...' : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <button className="px-4 py-2 bg-[#00E0FF] text-black rounded-lg hover:shadow-lg hover:shadow-[#00E0FF]/30 transition-all">
                      Copy
                    </button>
                  </div>
                </div>

                {/* API Documentation */}
                <div className="p-4 bg-gray-900/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">API Documentation</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Access comprehensive documentation for integrating with the Learn2Launch API
                  </p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors">
                    <Globe className="w-4 h-4" />
                    <span>View Documentation</span>
                  </button>
                </div>

                {/* Rate Limits */}
                <div className="p-4 bg-gray-900/30 rounded-lg">
                  <h3 className="text-white font-medium mb-4">Rate Limits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Requests per minute</p>
                      <p className="text-lg font-bold text-[#00E0FF]">1,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Daily limit</p>
                      <p className="text-lg font-bold text-[#00E0FF]">100,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            {/* Data Export */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Data Export</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Portfolio Data', description: 'Export all your investment and performance data', format: 'CSV, JSON' },
                    { title: 'Transaction History', description: 'Complete history of all transactions', format: 'CSV, PDF' },
                    { title: 'Impact Reports', description: 'Social impact metrics and outcomes', format: 'PDF, JSON' },
                    { title: 'Tax Documents', description: 'Annual tax forms and statements', format: 'PDF' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900/30 rounded-lg">
                      <h3 className="text-white font-medium mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{item.format}</span>
                        <button className="flex items-center space-x-1 px-3 py-1 bg-[#00E0FF] text-black rounded-lg text-sm hover:shadow-lg hover:shadow-[#00E0FF]/30 transition-all">
                          <Download className="w-3 h-3" />
                          <span>Export</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2">Delete Account</h2>
                    <p className="text-gray-400 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-400">• All investment positions will be liquidated</p>
                      <p className="text-sm text-gray-400">• Historical data will be permanently removed</p>
                      <p className="text-sm text-gray-400">• API access will be revoked immediately</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
