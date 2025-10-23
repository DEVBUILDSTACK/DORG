"use client";

import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Coins, 
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Globe,
  Users,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';

export default function InvestorOverviewPage() {
  const [timeFilter, setTimeFilter] = useState('1M');
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Good Evening, <span className="bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] bg-clip-text text-transparent">Alex</span>
            </h1>
            <p className="text-gray-400 text-lg">Here's an overview of your portfolio, impact, and yield performance</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last updated</p>
            <p className="text-sm text-[#00E0FF]">2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Portfolio Value', 
            value: showBalance ? '$127,450' : '••••••', 
            change: '+12.5%', 
            icon: DollarSign, 
            color: 'from-[#00E0FF] to-[#06B6D4]',
            bgColor: '#00E0FF',
            isPositive: true
          },
          { 
            label: 'Current APY', 
            value: '14.2%', 
            change: '+2.1%', 
            icon: TrendingUp, 
            color: 'from-green-500 to-emerald-500',
            bgColor: '#22c55e',
            isPositive: true
          },
          { 
            label: 'Revenue Earned (This Epoch)', 
            value: showBalance ? '$3,247' : '••••••', 
            change: '+8.3%', 
            icon: Coins, 
            color: 'from-yellow-500 to-orange-500',
            bgColor: '#eab308',
            isPositive: true
          },
          { 
            label: 'Social Impact Index', 
            value: '847', 
            change: '+15.2%', 
            icon: Heart, 
            color: 'from-purple-500 to-pink-500',
            bgColor: '#a855f7',
            isPositive: true
          },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div 
              className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" 
              style={{ background: `${stat.bgColor}20` }} 
            />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                  <span className={stat.isPositive ? 'text-green-400' : 'text-red-400'}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio Performance Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-[#00E0FF]" />
                  Portfolio Performance
                </h2>
                <div className="flex items-center space-x-2">
                  {['1W', '1M', '3M', '1Y'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeFilter(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        timeFilter === period
                          ? 'bg-[#00E0FF] text-black shadow-lg shadow-[#00E0FF]/30'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Chart Area */}
              <div className="h-64 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#9F7AEA]/5" />
                <div className="text-center z-10">
                  <TrendingUp className="w-12 h-12 text-[#00E0FF] mx-auto mb-2 opacity-50" />
                  <p className="text-gray-400">Portfolio growth visualization</p>
                  <p className="text-sm text-gray-500">Chart component would render here</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400">30-Day Return</p>
                  <p className="text-lg font-bold text-green-400">+$4,127</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Best Performing Vault</p>
                  <p className="text-lg font-bold text-[#00E0FF]">Lwandi Surf</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Total Yield</p>
                  <p className="text-lg font-bold text-yellow-400">$18,247</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Latest Updates & Active Cohorts */}
        <div className="space-y-6">
          {/* Latest Vault Updates */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-400" />
                Latest Vault Updates
              </h3>
              <div className="space-y-3">
                {[
                  { vault: 'Epoch V - Lwandi Surf', update: 'New cohort started', time: '2h ago', status: 'active' },
                  { vault: 'India Tech Hub', update: 'Yield distributed', time: '5h ago', status: 'completed' },
                  { vault: 'Mozambique Agri', update: 'Impact report published', time: '1d ago', status: 'report' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors cursor-pointer group">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-[#00E0FF] transition-colors">{item.vault}</p>
                      <p className="text-xs text-gray-400">{item.update}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{item.time}</p>
                      <div className={`w-2 h-2 rounded-full mt-1 ml-auto ${
                        item.status === 'active' ? 'bg-green-400 animate-pulse' :
                        item.status === 'completed' ? 'bg-[#00E0FF]' : 'bg-purple-400'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-[#00E0FF] hover:text-[#06B6D4] transition-colors text-sm font-medium flex items-center justify-center">
                View All Updates
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Active Cohorts */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-400" />
                Active Cohorts
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Mozambique Cohort #12', region: 'Maputo', progress: 75, students: 24 },
                  { name: 'India Tech Bootcamp', region: 'Mumbai', progress: 45, students: 18 },
                  { name: 'Kenya Agri Program', region: 'Nairobi', progress: 90, students: 15 },
                ].map((cohort, index) => (
                  <div key={index} className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-white">{cohort.name}</p>
                        <p className="text-xs text-gray-400">{cohort.region} • {cohort.students} students</p>
                      </div>
                      <span className="text-xs text-[#00E0FF] font-medium">{cohort.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${cohort.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Invest in New Vault', description: 'Explore upcoming opportunities', icon: Coins, color: 'from-[#00E0FF] to-[#06B6D4]' },
          { title: 'View Impact Report', description: 'See your social impact metrics', icon: Heart, color: 'from-purple-500 to-pink-500' },
          { title: 'Withdraw Earnings', description: 'Access your available yield', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
        ].map((action, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-105">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} w-fit mb-4`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
