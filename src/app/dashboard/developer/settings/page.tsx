"use client";

import React, { useState } from 'react';
import { 
  User, 
  Key, 
  Bell, 
  Shield,
  Monitor,
  Save,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus
} from 'lucide-react';

export default function DeveloperSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKeys, setShowApiKeys] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Monitor }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Developer Settings</h1>
        <p className="text-gray-400 text-lg font-mono">Configure your development environment</p>
      </div>

      <div className="flex items-center space-x-1 bg-gray-800/30 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all font-mono ${
              activeTab === tab.id
                ? 'bg-[#00D1FF] text-black shadow-lg shadow-[#00D1FF]/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">API Keys</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#00D1FF] text-black rounded-lg">
                  <Plus className="w-4 h-4" />
                  <span className="font-mono">Generate New Key</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Production API Key', key: 'dvk_live_1234567890abcdef...', created: '2024-10-15', lastUsed: '2 hours ago' },
                  { name: 'Development API Key', key: 'dvk_test_abcdef1234567890...', created: '2024-10-10', lastUsed: '5 minutes ago' }
                ].map((apiKey, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-mono font-medium">{apiKey.name}</h3>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => setShowApiKeys(!showApiKeys)}>
                          {showApiKeys ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                        </button>
                        <button><Copy className="w-4 h-4 text-gray-400" /></button>
                        <button><Trash2 className="w-4 h-4 text-red-400" /></button>
                      </div>
                    </div>
                    <code className="block p-3 bg-gray-900/50 rounded font-mono text-sm text-[#00D1FF]">
                      {showApiKeys ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                      <span>Created: {apiKey.created}</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Developer Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-mono">Display Name</label>
                  <input type="text" defaultValue="Alex Chen" className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-mono">Email</label>
                  <input type="email" defaultValue="alex@devvault.com" className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-mono">Developer Level</label>
                  <select className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono">
                    <option>Pro Developer</option>
                    <option>Senior Developer</option>
                    <option>Lead Developer</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/30 rounded-lg">
                  <h3 className="text-white font-mono mb-2">Account Statistics</h3>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex justify-between"><span className="text-gray-400">API Calls This Month:</span><span className="text-[#00D1FF]">2,847</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Contracts Deployed:</span><span className="text-green-400">12</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Member Since:</span><span className="text-gray-300">Oct 2023</span></div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-6 flex items-center space-x-2 px-6 py-2 bg-[#00D1FF] text-black rounded-lg">
              <Save className="w-4 h-4" />
              <span className="font-mono">Save Changes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
