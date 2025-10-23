"use client";

import React from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Trophy, 
  Users, 
  Vault,
  ArrowRight,
  Play,
  Star,
  Target,
  Zap
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] bg-clip-text text-transparent">Alex</span>
        </h1>
        <p className="text-gray-400 text-lg">Continue your journey toward financial mastery</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total XP', value: '1,250', icon: Zap, color: 'from-[#00E0FF] to-[#06B6D4]', bgColor: '#00E0FF' },
          { label: 'Courses Completed', value: '3', icon: BookOpen, color: 'from-purple-500 to-pink-500', bgColor: '#a855f7' },
          { label: 'Vault Returns', value: '+12.5%', icon: TrendingUp, color: 'from-green-500 to-emerald-500', bgColor: '#22c55e' },
          { label: 'Rank', value: '#47', icon: Trophy, color: 'from-yellow-500 to-orange-500', bgColor: '#eab308' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" 
                 style={{ background: `${stat.bgColor}20` }} />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[#00E0FF]" />
                  Continue Learning
                </h2>
                <button className="text-[#00E0FF] hover:text-[#06B6D4] transition-colors text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Anchor Framework Fundamentals',
                    category: 'Solana Development',
                    progress: 75,
                    timeLeft: '2h 30m left',
                    thumbnail: '🏗️'
                  },
                  {
                    title: 'DeFi Yield Strategies',
                    category: 'Investment',
                    progress: 45,
                    timeLeft: '4h 15m left',
                    thumbnail: '💰'
                  }
                ].map((course, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors group/course">
                    <div className="text-3xl">{course.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white group-hover/course:text-[#00E0FF] transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-400">{course.category}</p>
                      <div className="mt-2 flex items-center space-x-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{course.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{course.timeLeft}</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#00E0FF]/20 text-[#00E0FF] rounded-lg hover:bg-[#00E0FF]/30 transition-colors">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Continue</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Snapshot */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Top Performers
              </h2>
              <button className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', xp: '2,850', rank: 1, avatar: '👩‍💻' },
                { name: 'Mike Rodriguez', xp: '2,720', rank: 2, avatar: '👨‍🚀' },
                { name: 'Emma Wilson', xp: '2,650', rank: 3, avatar: '👩‍🎓' },
              ].map((user, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-900/30 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                    'bg-gradient-to-r from-orange-600 to-orange-700'
                  }`}>
                    {user.rank}
                  </div>
                  <div className="text-lg">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.xp} XP</p>
                  </div>
                  {index === 0 && <Star className="w-4 h-4 text-yellow-500" />}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-xl border border-[#00E0FF]/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium text-sm">Your Rank: #47</p>
                  <p className="text-gray-400 text-xs">1,250 XP • 150 XP to next rank</p>
                </div>
                <Target className="w-5 h-5 text-[#00E0FF]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Community Feed */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                Community Feed
              </h2>
              <button className="text-purple-500 hover:text-purple-400 transition-colors text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  user: 'David Kim',
                  action: 'completed',
                  target: 'Solana Smart Contracts',
                  time: '2h ago',
                  avatar: '👨‍💼'
                },
                {
                  user: 'Lisa Zhang',
                  action: 'joined vault',
                  target: 'DeFi Yield Farm #3',
                  time: '4h ago',
                  avatar: '👩‍🔬'
                },
                {
                  user: 'Alex Johnson',
                  action: 'earned badge',
                  target: 'Web3 Pioneer',
                  time: '6h ago',
                  avatar: '👨‍🎨'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors">
                  <div className="text-lg">{activity.avatar}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="text-purple-400">{activity.target}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio & Vault Summary */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Vault className="w-5 h-5 mr-2 text-green-500" />
                Portfolio Summary
              </h2>
              <button className="text-green-500 hover:text-green-400 transition-colors text-sm font-medium">
                View Details
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                <div>
                  <p className="text-gray-400 text-sm">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">$2,847.50</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 text-sm font-medium">+12.5%</p>
                  <p className="text-gray-400 text-xs">Last 7 days</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-gray-400 text-xs">Active Vaults</p>
                  <p className="text-white font-semibold">3</p>
                </div>
                <div className="p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-gray-400 text-xs">Avg. APY</p>
                  <p className="text-green-400 font-semibold">8.7%</p>
                </div>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all">
                <span className="font-medium">Explore New Vaults</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
