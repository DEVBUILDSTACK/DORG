"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Briefcase, 
  Vault, 
  Trophy, 
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut
} from '@/components/icons';
import { useAuth } from '@/hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
  { name: 'Courses', href: '/dashboard/student/courses', icon: BookOpen },
  { name: 'Community', href: '/dashboard/student/community', icon: Users },

  { name: 'Vaults | LPs', href: '/dashboard/student/vaults', icon: Vault },
  { name: 'Leaderboard', href: '/dashboard/student/leaderboard', icon: Trophy },
  { name: 'Settings', href: '/dashboard/student/settings', icon: Settings },
];

export default function StudentDashboardLayout({
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
      {/* Mobile Menu Overlay */}
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
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-lg flex items-center justify-center shadow-md shadow-[#FF6B35]/20">
              <span className="text-white font-bold text-sm">L2L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] bg-clip-text text-transparent">
              Learn2Launch
            </span>
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
                        ? 'bg-[#FF6B35]/10 text-[#FF6B35] shadow-md shadow-[#FF6B35]/10 border border-[#FF6B35]/20'
                        : 'text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
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

        {/* Bottom User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB] space-y-2">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#F9FAFB] hover:bg-[#F0F1F3] transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] rounded-full flex items-center justify-center shadow-md shadow-[#FF6B35]/20">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1F2937] truncate">Student User</p>
              <p className="text-xs text-[#5A6C7D] truncate">Level 3 • 1,250 XP</p>
            </div>
          </div>
          
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
                    placeholder="Search courses, vaults, or community..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder-[#5A6C7D] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]/50 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2">
                <button className="relative p-2 text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB] rounded-xl transition-colors" aria-label="Notifications">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
