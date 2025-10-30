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
          <h1 className="text-3xl font-bold text-[#1F2937]">Treasury <span className="text-[#FF6B35]">Overview</span></h1>
          <p className="text-[#5A6C7D] text-lg">Track your investments, yields, and asset allocation</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-xl transition-colors"
          >
            {showBalance ? <Eye className="w-4 h-4 text-[#5A6C7D]" /> : <EyeOff className="w-4 h-4 text-[#5A6C7D]" />}
            <span className="text-sm text-[#1F2937]">{showBalance ? 'Hide' : 'Show'} Balance</span>
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
            color: 'from-[#FF6B35] to-[#E65A2D]',
            isPositive: true
          },
          { 
            label: 'Available Balance', 
            value: showBalance ? '$8,247.18' : '••••••••', 
            change: 'Ready to invest',
            period: 'Liquid funds',
            icon: Coins, 
            color: 'from-[#2E865F] to-[#059669]',
            isPositive: true
          },
          { 
            label: 'Total Yield Earned', 
            value: showBalance ? '$18,247.89' : '••••••••', 
            change: '+$847.32 this month',
            period: 'All time',
            icon: TrendingUp, 
            color: 'from-[#F59E0B] to-[#D97706]',
            isPositive: true
          },
          { 
            label: 'Active Investments', 
            value: '7 Vaults', 
            change: '2 new this quarter',
            period: 'Diversified',
            icon: PieChart, 
            color: 'from-[#A855F7] to-[#9333EA]',
            isPositive: true
          },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9CA3AF]">{stat.period}</p>
                </div>
              </div>
              <div>
                <p className="text-[#5A6C7D] text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1F2937] mb-2">{stat.value}</p>
                <div className="flex items-center space-x-1 text-sm">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-[#2E865F]" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-[#DC2626]" />
                  )}
                  <span className={stat.isPositive ? 'text-[#2E865F]' : 'text-[#DC2626]'}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Mode Tabs */}
      <div className="flex items-center space-x-1 bg-[#F9FAFB] p-1 rounded-xl w-fit border border-[#E5E7EB]">
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
                ? 'bg-[#FF6B35] text-white shadow-lg'
                : 'text-[#5A6C7D] hover:text-[#1F2937] hover:bg-white'
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
              <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
              <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-[#FF6B35]" />
                   Treasury Performance over Time
                  </h2>
                  <div className="flex items-center space-x-2">
                    {['1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setTimeFilter(period)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          timeFilter === period
                            ? 'bg-[#FF6B35] text-white shadow-lg'
                            : 'text-[#5A6C7D] hover:text-[#1F2937] bg-[#F3F4F6] hover:bg-[#E5E7EB]'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="h-80 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <TrendingUp className="w-16 h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
                    <p className="text-[#5A6C7D] text-lg">Portfolio Performance Chart</p>
                    <p className="text-sm text-[#9CA3AF]">Interactive chart component would render here</p>
                  </div>
                </div>

                {/* Chart Stats */}
                <div className="mt-6 grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                    <p className="text-sm text-[#5A6C7D]">Highest Value</p>
                    <p className="text-lg font-bold text-[#2E865F]">{showBalance ? '$129,847' : '••••••'}</p>
                  </div>
                  <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                    <p className="text-sm text-[#5A6C7D]">Lowest Value</p>
                    <p className="text-lg font-bold text-[#DC2626]">{showBalance ? '$98,234' : '••••••'}</p>
                  </div>
                  <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                    <p className="text-sm text-[#5A6C7D]">Average Return</p>
                    <p className="text-lg font-bold text-[#FF6B35]">+14.2%</p>
                  </div>
                  <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                    <p className="text-sm text-[#5A6C7D]">Volatility</p>
                    <p className="text-lg font-bold text-[#F59E0B]">Low</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions & Quick Stats */}
          <div className="space-y-6">
            {/* Recent Transactions */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
              <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-[#A855F7]" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { type: 'deposit', vault: 'Lwandi Surf Fund', amount: '+$5,000', time: '2h ago', status: 'completed' },
                    { type: 'yield', vault: 'India Tech Hub', amount: '+$247.32', time: '1d ago', status: 'completed' },
                    { type: 'withdrawal', vault: 'Mozambique Agri', amount: '-$1,500', time: '3d ago', status: 'completed' },
                    { type: 'deposit', vault: 'Kenya Solar', amount: '+$2,000', time: '1w ago', status: 'completed' },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          transaction.type === 'deposit' ? 'bg-[#2E865F]' :
                          transaction.type === 'yield' ? 'bg-[#FF6B35]' : 'bg-[#F59E0B]'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-[#1F2937]">{transaction.vault}</p>
                          <p className="text-xs text-[#5A6C7D] capitalize">{transaction.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          transaction.amount.startsWith('+') ? 'text-[#2E865F]' : 'text-[#F59E0B]'
                        }`}>
                          {showBalance ? transaction.amount : '••••••'}
                        </p>
                        <p className="text-xs text-[#9CA3AF]">{transaction.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
              <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#2E865F]" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Sharpe Ratio', value: '1.47', description: 'Risk-adjusted return' },
                    { label: 'Max Drawdown', value: '8.2%', description: 'Largest peak-to-trough decline' },
                    { label: 'Win Rate', value: '73%', description: 'Profitable investment ratio' },
                    { label: 'Avg. Hold Time', value: '4.2 months', description: 'Average investment duration' },
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-[#1F2937]">{metric.label}</p>
                        <p className="text-xs text-[#5A6C7D]">{metric.description}</p>
                      </div>
                      <p className="text-lg font-bold text-[#FF6B35]">{metric.value}</p>
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
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-[#FF6B35]" />
                Asset Allocation
              </h2>
              
              {/* Mock Pie Chart */}
              <div className="h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <PieChart className="w-16 h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
                  <p className="text-[#5A6C7D] text-lg">Asset Allocation Chart</p>
                  <p className="text-sm text-[#9CA3AF]">Pie chart component would render here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6">Asset Breakdown</h2>
              <div className="space-y-4">
                {[
                  { category: 'DeFi Vaults', allocation: 45, value: showBalance ? '$57,252' : '••••••', color: 'bg-[#FF6B35]' },
                  { category: 'Education Funds', allocation: 30, value: showBalance ? '$38,235' : '••••••', color: 'bg-[#A855F7]' },
                  { category: 'Impact Bonds', allocation: 15, value: showBalance ? '$19,118' : '••••••', color: 'bg-[#2E865F]' },
                  { category: 'Liquid Assets', allocation: 10, value: showBalance ? '$12,745' : '••••••', color: 'bg-[#F59E0B]' },
                ].map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                        <span className="text-[#1F2937] font-medium">{asset.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[#1F2937] font-bold">{asset.allocation}%</p>
                        <p className="text-sm text-[#5A6C7D]">{asset.value}</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-2">
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
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-[#1F2937] mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-[#FF6B35]" />
                Performance vs Benchmarks
              </h2>
              
              {/* Mock Performance Chart */}
              <div className="h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <Activity className="w-16 h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
                  <p className="text-[#5A6C7D] text-lg">Performance Comparison Chart</p>
                  <p className="text-sm text-[#9CA3AF]">Multi-line chart comparing portfolio vs benchmarks</p>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#FFE8E0] rounded-lg border border-[#FF6B35]/20">
                  <p className="text-sm text-[#5A6C7D]">Your Portfolio</p>
                  <p className="text-2xl font-bold text-[#FF6B35]">+14.2%</p>
                </div>
                <div className="text-center p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <p className="text-sm text-[#5A6C7D]">S&P 500</p>
                  <p className="text-2xl font-bold text-[#9CA3AF]">+8.7%</p>
                </div>
                <div className="text-center p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <p className="text-sm text-[#5A6C7D]">DeFi Index</p>
                  <p className="text-2xl font-bold text-[#9CA3AF]">+11.3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
