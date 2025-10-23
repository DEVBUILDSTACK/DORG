"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Target,
  DollarSign,
  Percent,
  RefreshCw,
  Activity,
  Zap,
  Database,
  Users,
  Calendar
} from 'lucide-react';

export default function VaultAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedVault, setSelectedVault] = useState('all');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vault Analytics</h1>
          <p className="text-gray-400 text-lg font-mono">Professional-grade data visualization and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedVault}
            onChange={(e) => setSelectedVault(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
          >
            <option value="all">All Vaults</option>
            <option value="sol30">SOL30 Vault</option>
            <option value="base10">BASE10 Pool</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg APY', value: '20.4%', change: '+2.1%', icon: Percent, color: 'from-green-500 to-emerald-500' },
          { label: 'Monthly ROI', value: '18.7%', change: '+5.3%', icon: TrendingUp, color: 'from-[#00D1FF] to-[#7C3AED]' },
          { label: 'Rebalance Frequency', value: '2.3x/week', change: 'Optimal', icon: RefreshCw, color: 'from-purple-500 to-pink-500' },
          { label: 'Portfolio Risk Index', value: 'Medium', change: 'Stable', icon: Target, color: 'from-yellow-500 to-orange-500' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-400 font-mono">{stat.change}</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 font-mono">{stat.label}</p>
                <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vault Growth Chart */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#00D1FF]" />
              Vault Growth (AUM Over Time)
            </h2>
            <div className="h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-[#00D1FF] mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 font-mono">AUM Growth Chart</p>
                <p className="text-sm text-gray-500">Line chart visualization</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400 font-mono">Current AUM</p>
                <p className="text-lg font-bold text-[#00D1FF] font-mono">$4.2M</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 font-mono">30d Growth</p>
                <p className="text-lg font-bold text-green-400 font-mono">+18.7%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 font-mono">Peak AUM</p>
                <p className="text-lg font-bold text-purple-400 font-mono">$4.8M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Token Allocation */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-400" />
              Token Allocation
            </h2>
            <div className="h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 flex items-center justify-center mb-4">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 font-mono">Token Distribution</p>
                <p className="text-sm text-gray-500">Pie chart visualization</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { token: 'USDC', percentage: 45, color: 'bg-[#00D1FF]' },
                { token: 'SOL', percentage: 30, color: 'bg-purple-500' },
                { token: 'ETH', percentage: 15, color: 'bg-green-500' },
                { token: 'Other', percentage: 10, color: 'bg-yellow-500' },
              ].map((allocation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${allocation.color}`} />
                    <span className="text-white font-mono">{allocation.token}</span>
                  </div>
                  <span className="text-gray-400 font-mono">{allocation.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* APY Comparison */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
            Vault APY Comparison
          </h2>
          <div className="h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 flex items-center justify-center mb-6">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 font-mono">APY Comparison Chart</p>
              <p className="text-sm text-gray-500">Bar chart showing vault performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { vault: 'SOL30', apy: '18.5%', performance: 'Excellent', color: 'text-green-400' },
              { vault: 'BASE10', apy: '22.3%', performance: 'Outstanding', color: 'text-[#00D1FF]' },
              { vault: 'ETH15', apy: '16.2%', performance: 'Good', color: 'text-purple-400' },
            ].map((vault, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-mono font-medium">{vault.vault}</span>
                  <span className={`${vault.color} font-mono font-bold`}>{vault.apy}</span>
                </div>
                <p className="text-sm text-gray-400 font-mono">{vault.performance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Analysis */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-yellow-400" />
              Risk Analysis
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'Volatility Index', value: '0.24', status: 'Low', color: 'text-green-400' },
                { metric: 'Max Drawdown', value: '8.2%', status: 'Acceptable', color: 'text-yellow-400' },
                { metric: 'Sharpe Ratio', value: '1.47', status: 'Excellent', color: 'text-green-400' },
                { metric: 'Beta Coefficient', value: '0.89', status: 'Stable', color: 'text-[#00D1FF]' },
              ].map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-mono">{risk.metric}</p>
                    <p className="text-sm text-gray-400 font-mono">{risk.status}</p>
                  </div>
                  <span className={`${risk.color} font-mono font-bold`}>{risk.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Analytics */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-[#00D1FF]" />
              Transaction Analytics
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'Daily Volume', value: '$124.2K', icon: DollarSign },
                { metric: 'Avg Transaction Size', value: '$2,847', icon: Database },
                { metric: 'Active Users (24h)', value: '1,247', icon: Users },
                { metric: 'Success Rate', value: '99.2%', icon: Zap },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <metric.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-mono">{metric.metric}</span>
                  </div>
                  <span className="text-[#00D1FF] font-mono font-bold">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
