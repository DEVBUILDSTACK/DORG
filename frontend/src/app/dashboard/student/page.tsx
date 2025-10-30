"use client";

import React from 'react';
import { BookOpen, TrendingUp, Vault, Trophy, Users, Target, ArrowRight, Play, Star } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">
              Welcome back, <span className="text-[#FF6B35]">Alex</span>
            </h1>
            <p className="text-[#5A6C7D] text-base sm:text-lg">Here is your learning progress and achievements</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-[#5A6C7D]">Current Streak</p>
            <p className="text-2xl font-bold text-[#2E865F] tabular-nums">7 days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total XP', value: '1,250', icon: Trophy, bgClass: 'bg-[#FF6B35]/5' },
          { label: 'Courses', value: '3', subtext: '2 in progress', icon: BookOpen, bgClass: 'bg-[#2E865F]/5' },
          { label: 'Vault Returns', value: '$2,450', subtext: '+8.5%', icon: Vault, bgClass: 'bg-[#FF6B35]/5' },
          { label: 'Rank', value: '#47', subtext: 'Top 15%', icon: Star, bgClass: 'bg-[#F59E0B]/5' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className={cn("absolute inset-0 rounded-2xl blur-xl", stat.bgClass)} />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl shadow-md", stat.bgClass)}>
                  <stat.icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
              </div>
              <div>
                <p className="text-[#5A6C7D] text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#1F2937] tabular-nums">{stat.value}</p>
                {stat.subtext && <p className="text-sm text-[#2E865F] mt-1 tabular-nums">{stat.subtext}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[#FF6B35]" />
                  My Courses
                </h2>
                <button className="text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Solana Development Fundamentals', progress: 75, timeLeft: '2 weeks left', thumbnail: 'S', widthClass: 'w-[75%]' },
                  { title: 'DeFi Vault Strategies', progress: 45, timeLeft: '3 weeks left', thumbnail: 'D', widthClass: 'w-[45%]' },
                  { title: 'Smart Contract Security', progress: 20, timeLeft: '5 weeks left', thumbnail: 'SC', widthClass: 'w-[20%]' },
                ].map((course, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors gap-3 sm:gap-0">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 w-full sm:w-auto">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-[#FF6B35] to-[#2E865F] rounded-xl flex items-center justify-center text-white font-bold shadow-md text-sm sm:text-base shrink-0">
                        {course.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1F2937] mb-1 text-sm sm:text-base truncate">{course.title}</h3>
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="flex-1 bg-[#E5E7EB] rounded-full h-2">
                            <div className={cn("bg-[#2E865F] h-2 rounded-full transition-all duration-500", course.widthClass)} />
                          </div>
                          <span className="text-xs text-[#5A6C7D] tabular-nums">{course.progress}%</span>
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-1">{course.timeLeft}</p>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[#FF6B35]/10 text-[#FF6B35] rounded-lg hover:bg-[#FF6B35]/20 transition-colors w-full sm:w-auto justify-center sm:justify-start shrink-0">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Continue</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#F59E0B]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-[#F59E0B]" />
                Top Performers
              </h2>
              <button className="text-[#F59E0B] hover:text-[#D97706] transition-colors text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', xp: '2,850', rank: 1 },
                { name: 'Mike Rodriguez', xp: '2,720', rank: 2 },
                { name: 'Emma Wilson', xp: '2,650', rank: 3 },
              ].map((user, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-[#F9FAFB] rounded-xl">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white",
                    index === 0 && "bg-[#F59E0B]",
                    index === 1 && "bg-[#9CA3AF]",
                    index === 2 && "bg-[#EA580C]"
                  )}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1F2937] font-medium text-sm">{user.name}</p>
                    <p className="text-[#5A6C7D] text-xs tabular-nums">{user.xp} XP</p>
                  </div>
                  {index === 0 && <Star className="w-4 h-4 text-[#F59E0B]" />}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#FF6B35]/5 rounded-xl border border-[#FF6B35]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#1F2937] font-medium text-sm">Your Rank: #47</p>
                  <p className="text-[#5A6C7D] text-xs tabular-nums">1,250 XP • 150 XP to next rank</p>
                </div>
                <Target className="w-5 h-5 text-[#FF6B35]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#8B5CF6]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#8B5CF6]" />
                Community Feed
              </h2>
              <button className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                { user: 'David Kim', action: 'completed', target: 'Solana Smart Contracts', time: '2h ago' },
                { user: 'Lisa Zhang', action: 'joined vault', target: 'DeFi Yield Farm #3', time: '4h ago' },
                { user: 'Alex Johnson', action: 'earned badge', target: 'Web3 Pioneer', time: '6h ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors">
                  <div className="w-10 h-10 bg-linear-to-br from-[#8B5CF6] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#1F2937] text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="text-[#8B5CF6]">{activity.target}</span>
                    </p>
                    <p className="text-[#9CA3AF] text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                <Vault className="w-5 h-5 mr-2 text-[#2E865F]" />
                Portfolio Summary
              </h2>
              <button className="text-[#2E865F] hover:text-[#276A4F] transition-colors text-sm font-medium">
                View Details
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl">
                <div>
                  <p className="text-[#5A6C7D] text-sm">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-[#1F2937] tabular-nums">$2,847.50</p>
                </div>
                <div className="text-right">
                  <p className="text-[#2E865F] text-sm font-medium tabular-nums">+12.5%</p>
                  <p className="text-[#9CA3AF] text-xs">Last 7 days</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F9FAFB] rounded-xl">
                  <p className="text-[#5A6C7D] text-xs">Active Vaults</p>
                  <p className="text-[#1F2937] font-semibold text-lg tabular-nums">3</p>
                </div>
                <div className="p-3 bg-[#F9FAFB] rounded-xl">
                  <p className="text-[#5A6C7D] text-xs">Avg. APY</p>
                  <p className="text-[#2E865F] font-semibold text-lg tabular-nums">8.7%</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-[#2E865F]/10 text-[#2E865F] rounded-xl hover:bg-[#2E865F]/20 transition-all font-medium">
                <span>Explore New Vaults</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default DashboardPage;
