"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  User
} from '@/components/icons';

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

  return (
    <div className="min-h-screen bg-[#0C0F16] text-white">
      {/* Left Navigation Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0D1117] to-[#0C0F16] border-r border-gray-800/50">
        {/* Logo/Branding */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">L2L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] bg-clip-text text-transparent">
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
                        ? 'bg-gradient-to-r from-[#00E0FF]/20 to-[#06B6D4]/20 text-[#00E0FF] shadow-lg shadow-[#00E0FF]/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 transition-all duration-200 ${
                        isActive 
                          ? 'text-[#00E0FF] drop-shadow-[0_0_8px_#00E0FF]' 
                          : 'group-hover:scale-110 group-hover:text-[#00E0FF]'
                      }`} 
                    />
                    {item.name}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Student User</p>
              <p className="text-xs text-gray-400 truncate">Level 3 • 1,250 XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#0C0F16]/80 backdrop-blur-xl border-b border-gray-800/50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search courses, vaults, or community..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
