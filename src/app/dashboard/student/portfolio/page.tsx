"use client";

import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  Calendar,
  Eye,
  EyeOff
} from 'lucide-react';

const PortfolioPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');

  const portfolioStats = {
    totalValue: 2847.50,
    weeklyChange: 12.5,
    monthlyChange: 28.3,
    totalInvested: 2500.00,
    totalProfit: 347.50,
    profitPercentage: 13.9
  };

  const assets = [
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 15.5,
      value: 1240.50,
      change24h: 8.2,
      allocation: 43.6,
      color: 'from-purple-500 to-pink-500'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      amount: 850.00,
      value: 850.00,
      change24h: 0.1,
      allocation: 29.9,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      amount: 125.8,
      value: 456.20,
      change24h: -2.1,
      allocation: 16.0,
      color: 'from-green-500 to-emerald-500'
    },
    {
      symbol: 'ORCA',
      name: 'Orca',
      amount: 89.3,
      value: 300.80,
      change24h: 5.7,
      allocation: 10.5,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const vaultPositions = [
    {
      name: 'SOL-USDC LP Vault',
      protocol: 'Raydium',
      deposited: 1200.00,
      currentValue: 1356.80,
      apy: 12.4,
      duration: '45 days',
      status: 'active',
      yield: 156.80
    },
    {
      name: 'Marinade Staking',
      protocol: 'Marinade',
      deposited: 800.00,
      currentValue: 842.30,
      apy: 6.8,
      duration: '30 days',
      status: 'active',
      yield: 42.30
    },
    {
      name: 'Orca Whirlpool',
      protocol: 'Orca',
      deposited: 500.00,
      currentValue: 648.40,
      apy: 18.2,
      duration: '60 days',
      status: 'active',
      yield: 148.40
    }
  ];

  const performanceData = [
    { date: '2024-01-01', value: 2500 },
    { date: '2024-01-08', value: 2580 },
    { date: '2024-01-15', value: 2420 },
    { date: '2024-01-22', value: 2680 },
    { date: '2024-01-29', value: 2847.50 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Briefcase className="w-8 h-8 mr-3 text-[#00E0FF]" />
            Portfolio
          </h1>
          <p className="text-gray-400 text-lg">Track your investments and vault performance</p>
        </div>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span className="text-sm text-gray-400">
            {showBalance ? 'Hide' : 'Show'} Balance
          </span>
        </button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Portfolio Value</p>
              <Wallet className="w-5 h-5 text-[#00E0FF]" />
            </div>
            <p className="text-3xl font-bold text-white">
              {showBalance ? `$${portfolioStats.totalValue.toLocaleString()}` : '••••••'}
            </p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm font-medium">
                +{portfolioStats.weeklyChange}% (7d)
              </span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Profit</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {showBalance ? `$${portfolioStats.totalProfit.toLocaleString()}` : '••••••'}
            </p>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm font-medium">
                +{portfolioStats.profitPercentage}% ROI
              </span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Monthly Change</p>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              +{portfolioStats.monthlyChange}%
            </p>
            <div className="flex items-center mt-2">
              <Calendar className="w-4 h-4 text-purple-400 mr-1" />
              <span className="text-purple-400 text-sm font-medium">
                Last 30 days
              </span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Invested</p>
              <DollarSign className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {showBalance ? `$${portfolioStats.totalInvested.toLocaleString()}` : '••••••'}
            </p>
            <div className="flex items-center mt-2">
              <Target className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-yellow-400 text-sm font-medium">
                Principal amount
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Allocation & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Allocation */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#06B6D4]/5 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-[#00E0FF]" />
                Asset Allocation
              </h3>
            </div>

            <div className="space-y-4">
              {assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.color}`} />
                    <div>
                      <p className="font-medium text-white">{asset.symbol}</p>
                      <p className="text-sm text-gray-400">{asset.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-white">
                      {showBalance ? `$${asset.value.toLocaleString()}` : '••••'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">{asset.allocation}%</span>
                      <span className={`text-sm font-medium flex items-center ${
                        asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {asset.change24h >= 0 ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(asset.change24h)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                Performance
              </h3>
              
              <div className="flex items-center space-x-2">
                {['7d', '30d', '90d', '1y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      timeframe === period
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified Chart Visualization */}
            <div className="h-48 flex items-end justify-between space-x-2">
              {performanceData.map((point, index) => {
                const height = ((point.value - 2400) / 500) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-sm transition-all duration-500 hover:opacity-80"
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    <span className="text-xs text-gray-400 mt-2">
                      {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-green-500/10 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Portfolio Growth</span>
                <span className="text-green-400 font-medium">+13.9% (All Time)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Vault Positions */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-500" />
              Active Vault Positions
            </h3>
            <button className="text-purple-500 hover:text-purple-400 transition-colors text-sm font-medium">
              Manage Vaults
            </button>
          </div>

          <div className="space-y-4">
            {vaultPositions.map((vault, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{vault.name}</h4>
                    <p className="text-sm text-gray-400">{vault.protocol} • {vault.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Deposited</p>
                    <p className="font-medium text-white">
                      {showBalance ? `$${vault.deposited.toLocaleString()}` : '••••'}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Current Value</p>
                    <p className="font-medium text-white">
                      {showBalance ? `$${vault.currentValue.toLocaleString()}` : '••••'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">APY</p>
                    <p className="font-medium text-green-400">{vault.apy}%</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">Yield Earned</p>
                    <p className="font-medium text-green-400">
                      {showBalance ? `+$${vault.yield.toLocaleString()}` : '••••'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Total Vault Yield</p>
                <p className="text-sm text-gray-400">Across all active positions</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">
                  {showBalance ? `+$${vaultPositions.reduce((sum, vault) => sum + vault.yield, 0).toLocaleString()}` : '••••'}
                </p>
                <p className="text-sm text-green-400">+13.8% Average APY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
