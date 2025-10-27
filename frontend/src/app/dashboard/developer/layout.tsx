"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Code2, 
  FileText, 
  TrendingUp, 
  Shield, 
  Bot,
  Settings,
  Search,
  Bell,
  User,
  Terminal,
  Zap,
  Activity,
  Database
} from '@/components/icons';

const navigation = [
  { name: 'Overview', href: '/dashboard/developer', icon: BarChart3 },
  { name: 'API Playground', href: '/dashboard/developer/api', icon: Code2 },
  { name: 'On-chain Logs', href: '/dashboard/developer/logs', icon: FileText },
  { name: 'Vault Analytics', href: '/dashboard/developer/analytics', icon: TrendingUp },
  { name: 'Smart Contracts', href: '/dashboard/developer/contracts', icon: Shield },
  { name: 'AI Assistant', href: '/dashboard/developer/ai', icon: Bot },
  { name: 'Settings', href: '/dashboard/developer/settings', icon: Settings },
];

export default function DeveloperDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Left Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-r border-gray-800/50">
        {/* Logo/Branding */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] rounded-lg flex items-center justify-center shadow-lg shadow-[#00D1FF]/30">
              <Terminal className="w-4 h-4 text-black font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] bg-clip-text text-transparent">
                DevVault
              </span>
              <span className="text-xs text-gray-400 -mt-1 font-mono">v2.1.0</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00D1FF]/20 to-[#7C3AED]/20 text-[#00D1FF] shadow-lg shadow-[#00D1FF]/20 border border-[#00D1FF]/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:shadow-md hover:shadow-[#00D1FF]/10'
                    }`}
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 transition-all duration-200 ${
                        isActive 
                          ? 'text-[#00D1FF] drop-shadow-[0_0_8px_#00D1FF]' 
                          : 'group-hover:scale-110 group-hover:text-[#00D1FF] group-hover:drop-shadow-[0_0_4px_#00D1FF]'
                      }`} 
                    />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse shadow-[0_0_4px_#00D1FF]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* System Status */}
        <div className="mt-8 mx-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <h3 className="text-sm font-medium text-gray-300 mb-3">System Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">API</span>
              </div>
              <span className="text-xs text-green-400 font-mono">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Solana</span>
              </div>
              <span className="text-xs text-[#00D1FF] font-mono">Live</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Base</span>
              </div>
              <span className="text-xs text-purple-400 font-mono">Live</span>
            </div>
          </div>
        </div>

        {/* Bottom Developer Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg shadow-[#00D1FF]/30">
              <User className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Alex Chen</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#00D1FF] font-medium">Pro Developer</span>
                <div className="w-1 h-1 bg-[#00D1FF] rounded-full animate-pulse" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">API Calls</p>
              <p className="text-sm font-bold text-[#00D1FF] font-mono">2.4K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-gray-800/50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search APIs, contracts, or documentation..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50 focus:border-[#00D1FF]/50 transition-all font-mono text-sm"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800/30 rounded-lg">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-mono">Live</span>
                </div>
                
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse shadow-[0_0_4px_#00D1FF]" />
                </button>
                
                <div className="h-6 w-px bg-gray-700" />
                
                <div className="text-right">
                  <p className="text-xs text-gray-400">Rate Limit</p>
                  <p className="text-sm font-bold text-[#00D1FF] font-mono">847/1000</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* AI Assistant Floating Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#7C3AED] to-[#00D1FF] rounded-full flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/40 transition-all hover:scale-110 z-50">
        <Bot className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
