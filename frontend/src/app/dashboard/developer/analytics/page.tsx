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
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function VaultAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedVault, setSelectedVault] = useState('all');

  return (
    <div className="space-y-8 p-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-[#5A6C7D]">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#FF6B35] font-medium">Vault Analytics</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Vault <span className="text-[#FF6B35]">Analytics</span></h1>
          <p className="text-[#5A6C7D] text-lg">Professional-grade data visualization and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedVault}
            onChange={(e) => setSelectedVault(e.target.value)}
            className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]"
          >
            <option value="all">All Vaults</option>
            <option value="sol30">SOL30 Vault</option>
            <option value="base10">BASE10 Pool</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg APY', value: '20.4%', change: '+2.1%', icon: Percent, color: 'from-[#2E865F] to-[#10B981]' },
          { label: 'Monthly ROI', value: '18.7%', change: '+5.3%', icon: TrendingUp, color: 'from-[#FF6B35] to-[#F97316]' },
          { label: 'Rebalance Frequency', value: '2.3x/week', change: 'Optimal', icon: RefreshCw, color: 'from-[#A855F7] to-[#D946EF]' },
          { label: 'Portfolio Risk Index', value: 'Medium', change: 'Stable', icon: Target, color: 'from-[#F59E0B] to-[#EAB308]' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-md`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-[#2E865F] font-semibold">{stat.change}</span>
              </div>
              <div>
                <p className="text-[#5A6C7D] text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1F2937] tabular-nums">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vault Growth Chart */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Vault Growth (AUM Over Time)
            </h2>
            <div className="h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
                <p className="text-[#5A6C7D]">AUM Growth Chart</p>
                <p className="text-sm text-[#9CA3AF]">Line chart visualization</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-[#5A6C7D]">Current AUM</p>
                <p className="text-lg font-bold text-[#FF6B35] tabular-nums">$4.2M</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#5A6C7D]">30d Growth</p>
                <p className="text-lg font-bold text-[#2E865F] tabular-nums">+18.7%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#5A6C7D]">Peak AUM</p>
                <p className="text-lg font-bold text-[#A855F7] tabular-nums">$4.8M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Token Allocation */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-[#A855F7]" />
              Token Allocation
            </h2>
            <div className="h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center mb-4">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-[#A855F7] mx-auto mb-4 opacity-50" />
                <p className="text-[#5A6C7D]">Token Distribution</p>
                <p className="text-sm text-[#9CA3AF]">Pie chart visualization</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { token: 'USDC', percentage: 45, color: 'bg-[#FF6B35]' },
                { token: 'SOL', percentage: 30, color: 'bg-[#A855F7]' },
                { token: 'ETH', percentage: 15, color: 'bg-[#2E865F]' },
                { token: 'Other', percentage: 10, color: 'bg-[#F59E0B]' },
              ].map((allocation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${allocation.color}`} />
                    <span className="text-[#1F2937] font-medium">{allocation.token}</span>
                  </div>
                  <span className="text-[#5A6C7D] tabular-nums">{allocation.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* APY Comparison */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-[#2E865F]" />
            Vault APY Comparison
          </h2>
          <div className="h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center mb-6">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-[#2E865F] mx-auto mb-4 opacity-50" />
              <p className="text-[#5A6C7D]">APY Comparison Chart</p>
              <p className="text-sm text-[#9CA3AF]">Bar chart showing vault performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { vault: 'SOL30', apy: '18.5%', performance: 'Excellent', color: 'text-[#2E865F]' },
              { vault: 'BASE10', apy: '22.3%', performance: 'Outstanding', color: 'text-[#FF6B35]' },
              { vault: 'ETH15', apy: '16.2%', performance: 'Good', color: 'text-[#A855F7]' },
            ].map((vault, index) => (
              <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#1F2937] font-medium">{vault.vault}</span>
                  <span className={`${vault.color} font-bold tabular-nums`}>{vault.apy}</span>
                </div>
                <p className="text-sm text-[#5A6C7D]">{vault.performance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Analysis */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#F59E0B]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#F59E0B]" />
              Risk Analysis
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'Volatility Index', value: '0.24', status: 'Low', color: 'text-[#2E865F]' },
                { metric: 'Max Drawdown', value: '8.2%', status: 'Acceptable', color: 'text-[#F59E0B]' },
                { metric: 'Sharpe Ratio', value: '1.47', status: 'Excellent', color: 'text-[#2E865F]' },
                { metric: 'Beta Coefficient', value: '0.89', status: 'Stable', color: 'text-[#FF6B35]' },
              ].map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <div>
                    <p className="text-[#1F2937] font-medium">{risk.metric}</p>
                    <p className="text-sm text-[#5A6C7D]">{risk.status}</p>
                  </div>
                  <span className={`${risk.color} font-bold tabular-nums`}>{risk.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Analytics */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Transaction Analytics
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'Daily Volume', value: '$124.2K', icon: DollarSign },
                { metric: 'Avg Transaction Size', value: '$2,847', icon: Database },
                { metric: 'Active Users (24h)', value: '1,247', icon: Users },
                { metric: 'Success Rate', value: '99.2%', icon: Zap },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                  <div className="flex items-center space-x-3">
                    <metric.icon className="w-4 h-4 text-[#5A6C7D]" />
                    <span className="text-[#1F2937] font-medium">{metric.metric}</span>
                  </div>
                  <span className="text-[#FF6B35] font-bold tabular-nums">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
