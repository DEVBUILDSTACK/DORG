"use client";

import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const LeaderboardPage = () => {
  const [sortBy, setSortBy] = useState('xp');
  const [sortOrder, setSortOrder] = useState('desc');

  const leaderboardData = [
    { id: 1, name: 'Sarah Chen', avatar: '👩‍💻', xp: 2850, badges: 12, coursesCompleted: 8, weeklyGrowth: 15.2, level: 'Expert' },
    { id: 2, name: 'Mike Rodriguez', avatar: '👨‍🚀', xp: 2720, badges: 11, coursesCompleted: 7, weeklyGrowth: 12.8, level: 'Expert' },
    { id: 3, name: 'Emma Wilson', avatar: '👩‍🎓', xp: 2650, badges: 10, coursesCompleted: 6, weeklyGrowth: 18.5, level: 'Advanced' },
    { id: 4, name: 'David Kim', avatar: '👨‍💼', xp: 2420, badges: 9, coursesCompleted: 6, weeklyGrowth: 8.3, level: 'Advanced' },
    { id: 5, name: 'Lisa Zhang', avatar: '👩‍🔬', xp: 2380, badges: 8, coursesCompleted: 5, weeklyGrowth: 22.1, level: 'Advanced' },
    { id: 6, name: 'Alex Johnson', avatar: '👨‍🎨', xp: 2150, badges: 7, coursesCompleted: 5, weeklyGrowth: 5.7, level: 'Intermediate' },
    { id: 7, name: 'Maria Garcia', avatar: '👩‍⚕️', xp: 1980, badges: 6, coursesCompleted: 4, weeklyGrowth: 14.2, level: 'Intermediate' },
    { id: 8, name: 'James Wilson', avatar: '👨‍🏫', xp: 1850, badges: 6, coursesCompleted: 4, weeklyGrowth: 9.8, level: 'Intermediate' },
    { id: 9, name: 'Sophie Brown', avatar: '👩‍💼', xp: 1720, badges: 5, coursesCompleted: 3, weeklyGrowth: 11.4, level: 'Intermediate' },
    { id: 10, name: 'Ryan Davis', avatar: '👨‍🔧', xp: 1650, badges: 5, coursesCompleted: 3, weeklyGrowth: 7.9, level: 'Beginner' },
  ];

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    const aVal = a[sortBy as keyof typeof a] as number;
    const bVal = b[sortBy as keyof typeof b] as number;
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-600" />;
    return <span className="text-gray-400 font-bold">#{rank}</span>;
  };

  const getRankBorder = (rank: number) => {
    if (rank === 1) return 'border-yellow-500/50 shadow-yellow-500/20';
    if (rank === 2) return 'border-gray-400/50 shadow-gray-400/20';
    if (rank === 3) return 'border-orange-600/50 shadow-orange-600/20';
    return 'border-gray-700/50';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-purple-400 bg-purple-500/20';
      case 'Advanced': return 'text-blue-400 bg-blue-500/20';
      case 'Intermediate': return 'text-green-400 bg-green-500/20';
      case 'Beginner': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-gray-400 text-lg">See how you stack up against other learners</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sortedData.slice(0, 3).map((user, index) => {
          const rank = index + 1;
          const heights = ['h-32', 'h-28', 'h-24'];
          const glowColors = [
            'from-yellow-500/20 to-yellow-600/20',
            'from-gray-400/20 to-gray-500/20',
            'from-orange-600/20 to-orange-700/20'
          ];
          
          return (
            <div key={user.id} className={`relative group ${rank === 2 ? 'md:order-1' : rank === 1 ? 'md:order-2' : 'md:order-3'}`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${glowColors[index]} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
              <div className={`relative bg-gray-800/50 backdrop-blur-sm border-2 ${getRankBorder(rank)} rounded-2xl p-6 text-center ${heights[index]} flex flex-col justify-center hover:transform hover:scale-105 transition-all shadow-2xl`}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  {getRankIcon(rank)}
                </div>
                <div className="text-4xl mb-2">{user.avatar}</div>
                <h3 className="font-bold text-white text-lg mb-1">{user.name}</h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] bg-clip-text text-transparent">
                  {user.xp.toLocaleString()} XP
                </p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-400">{user.badges} badges</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#06B6D4]/5 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-900/50 border-b border-gray-700/50">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium text-gray-400">
              <div className="col-span-1">Rank</div>
              <div className="col-span-3">Student</div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('xp')}
              >
                XP Points
                {sortBy === 'xp' && (
                  sortOrder === 'desc' ? <ChevronDown className="w-4 h-4 ml-1" /> : <ChevronUp className="w-4 h-4 ml-1" />
                )}
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('badges')}
              >
                Badges
                {sortBy === 'badges' && (
                  sortOrder === 'desc' ? <ChevronDown className="w-4 h-4 ml-1" /> : <ChevronUp className="w-4 h-4 ml-1" />
                )}
              </div>
              <div 
                className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('weeklyGrowth')}
              >
                Weekly Growth
                {sortBy === 'weeklyGrowth' && (
                  sortOrder === 'desc' ? <ChevronDown className="w-4 h-4 ml-1" /> : <ChevronUp className="w-4 h-4 ml-1" />
                )}
              </div>
              <div className="col-span-2">Level</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700/30">
            {sortedData.map((user, index) => {
              const rank = index + 1;
              const isCurrentUser = user.name === 'Alex Johnson'; // Simulate current user
              
              return (
                <div 
                  key={user.id} 
                  className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-700/20 transition-colors ${
                    isCurrentUser ? 'bg-[#00E0FF]/10 border-l-4 border-[#00E0FF]' : ''
                  } ${rank <= 3 ? 'bg-gradient-to-r from-gray-800/30 to-transparent' : ''}`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    {rank <= 3 ? (
                      <div className="flex items-center">
                        {getRankIcon(rank)}
                      </div>
                    ) : (
                      <span className="text-gray-400 font-semibold">#{rank}</span>
                    )}
                  </div>

                  {/* Student Info */}
                  <div className="col-span-3 flex items-center space-x-3">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <p className={`font-medium ${isCurrentUser ? 'text-[#00E0FF]' : 'text-white'}`}>
                        {user.name} {isCurrentUser && '(You)'}
                      </p>
                      <p className="text-sm text-gray-400">{user.coursesCompleted} courses completed</p>
                    </div>
                  </div>

                  {/* XP Points */}
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-[#00E0FF]" />
                      <span className="font-bold text-white">{user.xp.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-white">{user.badges}</span>
                    </div>
                  </div>

                  {/* Weekly Growth */}
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-400 font-medium">+{user.weeklyGrowth}%</span>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="col-span-2 flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(user.level)}`}>
                      {user.level}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Your Progress Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-[#00E0FF]/30 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-[#00E0FF]" />
            Your Progress
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Current Rank</p>
              <p className="text-2xl font-bold text-[#00E0FF]">#6</p>
              <p className="text-xs text-gray-500">↑2 from last week</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">XP to Next Rank</p>
              <p className="text-2xl font-bold text-white">230</p>
              <div className="mt-2 bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Weekly Goal</p>
              <p className="text-2xl font-bold text-green-400">85%</p>
              <p className="text-xs text-gray-500">340/400 XP target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
