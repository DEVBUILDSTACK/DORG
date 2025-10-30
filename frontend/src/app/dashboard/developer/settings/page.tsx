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
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Developer <span className="text-[#FF6B35]">Settings</span></h1>
        <p className="text-[#5A6C7D] text-lg">Configure your development environment</p>
      </div>

      <div className="flex items-center space-x-1 bg-[#F9FAFB] p-1 rounded-xl w-fit border border-[#E5E7EB]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30'
                : 'text-[#5A6C7D] hover:text-[#1F2937] hover:bg-white'
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
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1F2937]">API Keys</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E65A2D] transition-colors shadow-md">
                  <Plus className="w-4 h-4" />
                  <span>Generate New Key</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Production API Key', key: 'dvk_live_1234567890abcdef...', created: '2024-10-15', lastUsed: '2 hours ago' },
                  { name: 'Development API Key', key: 'dvk_test_abcdef1234567890...', created: '2024-10-10', lastUsed: '5 minutes ago' }
                ].map((apiKey, index) => (
                  <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[#1F2937] font-medium">{apiKey.name}</h3>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setShowApiKeys(!showApiKeys)}
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          {showApiKeys ? <EyeOff className="w-4 h-4 text-[#5A6C7D]" /> : <Eye className="w-4 h-4 text-[#5A6C7D]" />}
                        </button>
                        <button className="p-1 hover:bg-white rounded transition-colors">
                          <Copy className="w-4 h-4 text-[#5A6C7D]" />
                        </button>
                        <button className="p-1 hover:bg-white rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-[#DC2626]" />
                        </button>
                      </div>
                    </div>
                    <code className="block p-3 bg-white rounded border border-[#E5E7EB] text-sm text-[#FF6B35] font-mono">
                      {showApiKeys ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <div className="flex justify-between text-xs text-[#5A6C7D] mt-2">
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
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-6">Developer Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#5A6C7D] mb-2">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex Chen" 
                    className="w-full px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#5A6C7D] mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="alex@devvault.com" 
                    className="w-full px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]" 
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#5A6C7D] mb-2">Developer Level</label>
                  <select className="w-full px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]">
                    <option>Pro Developer</option>
                    <option>Senior Developer</option>
                    <option>Lead Developer</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <h3 className="text-[#1F2937] font-medium mb-2">Account Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#5A6C7D]">API Calls This Month:</span>
                      <span className="text-[#FF6B35] font-semibold tabular-nums">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A6C7D]">Contracts Deployed:</span>
                      <span className="text-[#2E865F] font-semibold tabular-nums">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A6C7D]">Member Since:</span>
                      <span className="text-[#1F2937] font-semibold">Oct 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-6 flex items-center space-x-2 px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E65A2D] transition-colors shadow-md">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
