"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Database,
  Menu,
  X,
  LogOut
} from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';

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
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Navigation Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] shadow-lg transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Logo/Branding */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-[#E5E7EB]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#A855F7] rounded-lg flex items-center justify-center shadow-md shadow-[#FF6B35]/20">
              <Terminal className="w-4 h-4 text-white font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-[#FF6B35] to-[#A855F7] bg-clip-text text-transparent">
                DevVault
              </span>
              <span className="text-xs text-[#5A6C7D] -mt-1 font-mono">v2.1.0</span>
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
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FF6B35]/10 text-[#FF6B35] shadow-md shadow-[#FF6B35]/10 border border-[#FF6B35]/20'
                        : 'text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 transition-all duration-200 ${
                        isActive 
                          ? 'text-[#FF6B35]' 
                          : 'group-hover:scale-110 group-hover:text-[#FF6B35]'
                      }`} 
                    />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* System Status */}
        <div className="mt-8 mx-4 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
          <h3 className="text-sm font-medium text-[#1F2937] mb-3">System Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#2E865F] rounded-full animate-pulse" />
                <span className="text-xs text-[#5A6C7D]">API</span>
              </div>
              <span className="text-xs text-[#2E865F] font-mono">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                <span className="text-xs text-[#5A6C7D]">Solana</span>
              </div>
              <span className="text-xs text-[#FF6B35] font-mono">Live</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#A855F7] rounded-full animate-pulse" />
                <span className="text-xs text-[#5A6C7D]">Base</span>
              </div>
              <span className="text-xs text-[#A855F7] font-mono">Live</span>
            </div>
          </div>
        </div>

        {/* Bottom Developer Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB] space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#F9FAFB] hover:bg-[#F0F1F3] transition-colors cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#A855F7] rounded-full flex items-center justify-center shadow-md shadow-[#FF6B35]/20">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1F2937] truncate">Alex Chen</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#FF6B35] font-medium">Pro Developer</span>
                <div className="w-1 h-1 bg-[#FF6B35] rounded-full animate-pulse" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#5A6C7D]">API Calls</p>
              <p className="text-sm font-bold text-[#FF6B35] font-mono">2.4K</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-[#DC2626] hover:bg-[#FEE2E2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] shadow-sm">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB] rounded-xl transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6C7D] w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search APIs, contracts..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder-[#5A6C7D] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]/50 transition-all font-mono text-sm"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <Activity className="w-4 h-4 text-[#2E865F]" />
                  <span className="text-sm text-[#2E865F] font-mono">Live</span>
                </div>
                
                <button className="relative p-2 text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB] rounded-xl transition-colors group" aria-label="Notifications">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                </button>
                
                <div className="hidden sm:block h-6 w-px bg-[#E5E7EB]" />
                
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-[#5A6C7D]">Rate Limit</p>
                  <p className="text-sm font-bold text-[#FF6B35] font-mono">847/1000</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* AI Assistant Floating Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#A855F7] to-[#FF6B35] rounded-full flex items-center justify-center shadow-lg shadow-[#A855F7]/30 hover:shadow-xl hover:shadow-[#A855F7]/40 transition-all hover:scale-110 z-50">
        <Bot className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
