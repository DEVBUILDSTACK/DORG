"use client";

import React, { useState } from 'react';
import { 
  Trophy, 
  Crown,
  TrendingUp,
  DollarSign,
  Heart,
  Users,
  Medal,
  Star,
  ArrowUp,
  ArrowDown,
  Award,
  Target
} from 'lucide-react';

export default function InvestorLeaderboardPage() {
  const [sortBy, setSortBy] = useState('contribution');
  const [timeFilter, setTimeFilter] = useState('all');

  const investors = [
    {
      rank: 1,
      name: 'Sarah Chen',
      avatar: 'SC',
      tier: 'Diamond Partner',
      totalContribution: 2450000,
      yieldGenerated: 347250,
      impactIndex: 1247,
      studentsImpacted: 456,
      cohortsSupported: 12,
      joinDate: '2022-03-15',
      growth: '+23.4%',
      isCurrentUser: false
    },
    {
      rank: 2,
      name: 'Marcus Rodriguez',
      avatar: 'MR',
      tier: 'Platinum Investor',
      totalContribution: 1890000,
      yieldGenerated: 267850,
      impactIndex: 987,
      studentsImpacted: 342,
      cohortsSupported: 9,
      joinDate: '2022-07-22',
      growth: '+18.7%',
      isCurrentUser: false
    },
    {
      rank: 3,
      name: 'Elena Kowalski',
      avatar: 'EK',
      tier: 'Platinum Investor',
      totalContribution: 1650000,
      yieldGenerated: 234750,
      impactIndex: 876,
      studentsImpacted: 289,
      cohortsSupported: 8,
      joinDate: '2022-11-08',
      growth: '+21.2%',
      isCurrentUser: false
    },
    {
      rank: 4,
      name: 'Alex Chen',
      avatar: 'AC',
      tier: 'Platinum Investor',
      totalContribution: 1275000,
      yieldGenerated: 182450,
      impactIndex: 847,
      studentsImpacted: 267,
      cohortsSupported: 7,
      joinDate: '2023-01-12',
      growth: '+14.2%',
      isCurrentUser: true
    },
    {
      rank: 5,
      name: 'David Kim',
      avatar: 'DK',
      tier: 'Gold Investor',
      totalContribution: 980000,
      yieldGenerated: 142350,
      impactIndex: 654,
      studentsImpacted: 198,
      cohortsSupported: 5,
      joinDate: '2023-04-18',
      growth: '+16.8%',
      isCurrentUser: false
    },
    {
      rank: 6,
      name: 'Priya Sharma',
      avatar: 'PS',
      tier: 'Gold Investor',
      totalContribution: 750000,
      yieldGenerated: 108750,
      impactIndex: 523,
      studentsImpacted: 156,
      cohortsSupported: 4,
      joinDate: '2023-06-25',
      growth: '+12.3%',
      isCurrentUser: false
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond Partner': return 'from-cyan-400 to-blue-500';
      case 'Platinum Investor': return 'from-gray-300 to-gray-500';
      case 'Gold Investor': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-orange-400" />;
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Investor Leaderboard</h1>
          <p className="text-gray-400 text-lg">Top contributors ranked by impact and returns</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
          >
            <option value="contribution">Total Contribution</option>
            <option value="yield">Yield Generated</option>
            <option value="impact">Impact Index</option>
          </select>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
          >
            <option value="all">All Time</option>
            <option value="year">This Year</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Top Contributors</h2>
          
          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-24 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg">
                    <span className="text-black font-bold text-lg">{investors[1].avatar}</span>
                  </div>
                </div>
              </div>
              <p className="text-white font-semibold">{investors[1].name}</p>
              <p className="text-sm text-gray-400">${(investors[1].totalContribution / 1000000).toFixed(1)}M</p>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-32 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                  <Crown className="w-6 h-6 text-yellow-900" />
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg shadow-yellow-400/30 animate-pulse">
                    <span className="text-black font-bold text-xl">{investors[0].avatar}</span>
                  </div>
                </div>
              </div>
              <p className="text-white font-semibold">{investors[0].name}</p>
              <p className="text-sm text-yellow-400 font-medium">${(investors[0].totalContribution / 1000000).toFixed(1)}M</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg">
                    <span className="text-white font-bold text-lg">{investors[2].avatar}</span>
                  </div>
                </div>
              </div>
              <p className="text-white font-semibold">{investors[2].name}</p>
              <p className="text-sm text-gray-400">${(investors[2].totalContribution / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-semibold text-white">Full Rankings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Investor</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Total Contribution</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Yield Generated</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Impact Index</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Students Impacted</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {investors.map((investor) => (
                  <tr 
                    key={investor.rank} 
                    className={`hover:bg-gray-700/30 transition-colors ${
                      investor.isCurrentUser ? 'bg-[#00E0FF]/10 border-l-4 border-[#00E0FF]' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(investor.rank)}
                        {investor.rank <= 3 && (
                          <div className="w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getTierColor(investor.tier)} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-sm">{investor.avatar}</span>
                        </div>
                        <div>
                          <p className={`font-medium ${investor.isCurrentUser ? 'text-[#00E0FF]' : 'text-white'}`}>
                            {investor.name}
                            {investor.isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                          </p>
                          <p className="text-xs text-gray-400">{investor.tier}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">${(investor.totalContribution / 1000000).toFixed(2)}M</p>
                      <p className="text-xs text-gray-400">Since {new Date(investor.joinDate).getFullYear()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-green-400 font-medium">${(investor.yieldGenerated / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-gray-400">Total earned</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 font-medium">{investor.impactIndex}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-[#00E0FF]" />
                        <span className="text-white">{investor.studentsImpacted}</span>
                      </div>
                      <p className="text-xs text-gray-400">{investor.cohortsSupported} cohorts</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">{investor.growth}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Your Performance Summary */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-900/30 rounded-lg">
              <Trophy className="w-8 h-8 text-[#00E0FF] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">4th</p>
              <p className="text-sm text-gray-400">Current Rank</p>
            </div>
            <div className="text-center p-4 bg-gray-900/30 rounded-lg">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">Top 10%</p>
              <p className="text-sm text-gray-400">Percentile</p>
            </div>
            <div className="text-center p-4 bg-gray-900/30 rounded-lg">
              <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">+14.2%</p>
              <p className="text-sm text-gray-400">Growth Rate</p>
            </div>
            <div className="text-center p-4 bg-gray-900/30 rounded-lg">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">847</p>
              <p className="text-sm text-gray-400">Impact Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
