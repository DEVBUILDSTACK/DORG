"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

export default function InvestorPortfolioPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [timeFilter, setTimeFilter] = useState('1M');
  const [viewMode, setViewMode] = useState('overview'); // overview, assets, performance

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Treasury Overview</h1>
          <p className="text-gray-400 text-lg">Track your investments, yields, and asset allocation</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm">{showBalance ? 'Hide' : 'Show'} Balance</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Portfolio Value', 
            value: showBalance ? '$127,450.32' : '••••••••', 
            change: '+$4,127.50 (3.35%)',
            period: 'Last 30 days',
            icon: DollarSign, 
            color: 'from-[#00E0FF] to-[#06B6D4]',
            isPositive: true
          },
          { 
            label: 'Available Balance', 
            value: showBalance ? '$8,247.18' : '••••••••', 
            change: 'Ready to invest',
            period: 'Liquid funds',
            icon: Coins, 
            color: 'from-green-500 to-emerald-500',
            isPositive: true
          },
          { 
            label: 'Total Yield Earned', 
            value: showBalance ? '$18,247.89' : '••••••••', 
            change: '+$847.32 this month',
            period: 'All time',
            icon: TrendingUp, 
            color: 'from-yellow-500 to-orange-500',
            isPositive: true
          },
          { 
            label: 'Active Investments', 
            value: '7 Vaults', 
            change: '2 new this quarter',
            period: 'Diversified',
            icon: PieChart, 
            color: 'from-purple-500 to-pink-500',
            isPositive: true
          },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{stat.period}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
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
            </div>
          </div>
        ))}
      </div>

      {/* View Mode Tabs */}
      <div className="flex items-center space-x-1 bg-gray-800/30 p-1 rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'assets', label: 'Asset Allocation', icon: PieChart },
          { id: 'performance', label: 'Performance', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === tab.id
                ? 'bg-[#00E0FF] text-black shadow-lg shadow-[#00E0FF]/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Based on View Mode */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Performance Chart */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-[#00E0FF]" />
                   Treasury Performance over Time
                  </h2>
                  <div className="flex items-center space-x-2">
                    {['1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
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

                {/* Mock Chart */}
                <div className="h-80 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#9F7AEA]/5" />
                  <div className="text-center z-10">
                    <TrendingUp className="w-16 h-16 text-[#00E0FF] mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 text-lg">Portfolio Performance Chart</p>
                    <p className="text-sm text-gray-500">Interactive chart component would render here</p>
                  </div>
                </div>

                {/* Chart Stats */}
                <div className="mt-6 grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Highest Value</p>
                    <p className="text-lg font-bold text-green-400">{showBalance ? '$129,847' : '••••••'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Lowest Value</p>
                    <p className="text-lg font-bold text-red-400">{showBalance ? '$98,234' : '••••••'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Average Return</p>
                    <p className="text-lg font-bold text-[#00E0FF]">+14.2%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Volatility</p>
                    <p className="text-lg font-bold text-yellow-400">Low</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions & Quick Stats */}
          <div className="space-y-6">
            {/* Recent Transactions */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { type: 'deposit', vault: 'Lwandi Surf Fund', amount: '+$5,000', time: '2h ago', status: 'completed' },
                    { type: 'yield', vault: 'India Tech Hub', amount: '+$247.32', time: '1d ago', status: 'completed' },
                    { type: 'withdrawal', vault: 'Mozambique Agri', amount: '-$1,500', time: '3d ago', status: 'completed' },
                    { type: 'deposit', vault: 'Kenya Solar', amount: '+$2,000', time: '1w ago', status: 'completed' },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-green-400' :
                          transaction.type === 'yield' ? 'bg-[#00E0FF]' : 'bg-yellow-400'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-white">{transaction.vault}</p>
                          <p className="text-xs text-gray-400 capitalize">{transaction.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          transaction.amount.startsWith('+') ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {showBalance ? transaction.amount : '••••••'}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-400" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Sharpe Ratio', value: '1.47', description: 'Risk-adjusted return' },
                    { label: 'Max Drawdown', value: '8.2%', description: 'Largest peak-to-trough decline' },
                    { label: 'Win Rate', value: '73%', description: 'Profitable investment ratio' },
                    { label: 'Avg. Hold Time', value: '4.2 months', description: 'Average investment duration' },
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{metric.label}</p>
                        <p className="text-xs text-gray-400">{metric.description}</p>
                      </div>
                      <p className="text-lg font-bold text-[#00E0FF]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Allocation Chart */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-[#00E0FF]" />
                Asset Allocation
              </h2>
              
              {/* Mock Pie Chart */}
              <div className="h-64 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#9F7AEA]/5" />
                <div className="text-center z-10">
                  <PieChart className="w-16 h-16 text-[#00E0FF] mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg">Asset Allocation Chart</p>
                  <p className="text-sm text-gray-500">Pie chart component would render here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
              <h2 className="text-xl font-semibold text-white mb-6">Asset Breakdown</h2>
              <div className="space-y-4">
                {[
                  { category: 'DeFi Vaults', allocation: 45, value: showBalance ? '$57,252' : '••••••', color: 'bg-[#00E0FF]' },
                  { category: 'Education Funds', allocation: 30, value: showBalance ? '$38,235' : '••••••', color: 'bg-purple-500' },
                  { category: 'Impact Bonds', allocation: 15, value: showBalance ? '$19,118' : '••••••', color: 'bg-green-500' },
                  { category: 'Liquid Assets', allocation: 10, value: showBalance ? '$12,745' : '••••••', color: 'bg-yellow-500' },
                ].map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                        <span className="text-white font-medium">{asset.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{asset.allocation}%</p>
                        <p className="text-sm text-gray-400">{asset.value}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${asset.color} transition-all duration-500`}
                        style={{ width: `${asset.allocation}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'performance' && (
        <div className="space-y-6">
          {/* Performance Comparison */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#00E0FF]" />
                Performance vs Benchmarks
              </h2>
              
              {/* Mock Performance Chart */}
              <div className="h-64 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#9F7AEA]/5" />
                <div className="text-center z-10">
                  <Activity className="w-16 h-16 text-[#00E0FF] mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg">Performance Comparison Chart</p>
                  <p className="text-sm text-gray-500">Multi-line chart comparing portfolio vs benchmarks</p>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">Your Portfolio</p>
                  <p className="text-2xl font-bold text-[#00E0FF]">+14.2%</p>
                </div>
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">S&P 500</p>
                  <p className="text-2xl font-bold text-gray-400">+8.7%</p>
                </div>
                <div className="text-center p-4 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">DeFi Index</p>
                  <p className="text-2xl font-bold text-gray-400">+11.3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
