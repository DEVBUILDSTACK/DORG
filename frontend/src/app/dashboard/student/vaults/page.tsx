"use client";

import React, { useState } from 'react';
import { 
  Vault, 
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  Filter,
  Search,
  Zap,
  Target,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';

const VaultsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('apy');

  const categories = [
    { id: 'all', name: 'All Vaults', count: 12 },
    { id: 'defi', name: 'DeFi Yield', count: 6 },
    { id: 'staking', name: 'Staking', count: 3 },
    { id: 'liquidity', name: 'Liquidity Pools', count: 3 }
  ];

  const vaults = [
    {
      id: 1,
      name: 'SOL-USDC Liquidity Vault',
      protocol: 'Raydium',
      category: 'liquidity',
      apy: 18.5,
      tvl: 2400000,
      riskLevel: 'Medium',
      minDeposit: 100,
      lockPeriod: '7 days',
      participants: 1247,
      description: 'Automated liquidity provision on Raydium with auto-compounding rewards',
      features: ['Auto-compound', 'IL Protection', 'Weekly Rewards'],
      status: 'active',
      userDeposit: 1200,
      icon: '🌊',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Marinade Liquid Staking',
      protocol: 'Marinade',
      category: 'staking',
      apy: 6.8,
      tvl: 15600000,
      riskLevel: 'Low',
      minDeposit: 50,
      lockPeriod: 'None',
      participants: 3421,
      description: 'Liquid staking with mSOL tokens, no lock-up period',
      features: ['Liquid Staking', 'No Lock-up', 'Native Yield'],
      status: 'active',
      userDeposit: 800,
      icon: '🥩',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Orca Whirlpool Strategy',
      protocol: 'Orca',
      category: 'liquidity',
      apy: 24.2,
      tvl: 890000,
      riskLevel: 'High',
      minDeposit: 250,
      lockPeriod: '14 days',
      participants: 567,
      description: 'High-yield concentrated liquidity positions with active management',
      features: ['Concentrated LP', 'Active Management', 'High Yield'],
      status: 'active',
      userDeposit: 500,
      icon: '🐋',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      name: 'Jupiter Perpetuals Vault',
      protocol: 'Jupiter',
      category: 'defi',
      apy: 15.7,
      tvl: 1200000,
      riskLevel: 'High',
      minDeposit: 500,
      lockPeriod: '30 days',
      participants: 234,
      description: 'Automated perpetual trading strategies with risk management',
      features: ['Auto Trading', 'Risk Management', 'Leveraged Yields'],
      status: 'new',
      userDeposit: 0,
      icon: '🚀',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 5,
      name: 'Drift Protocol Yield',
      protocol: 'Drift',
      category: 'defi',
      apy: 12.3,
      tvl: 3400000,
      riskLevel: 'Medium',
      minDeposit: 200,
      lockPeriod: '21 days',
      participants: 892,
      description: 'Lending and borrowing yield optimization on Drift Protocol',
      features: ['Lending Yield', 'Auto Optimization', 'Stable Returns'],
      status: 'active',
      userDeposit: 0,
      icon: '⚡',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 6,
      name: 'Kamino Leverage Vault',
      protocol: 'Kamino',
      category: 'defi',
      apy: 28.9,
      tvl: 650000,
      riskLevel: 'Very High',
      minDeposit: 1000,
      lockPeriod: '45 days',
      participants: 156,
      description: 'Leveraged yield farming with automated position management',
      features: ['Leveraged Farming', 'Auto Rebalance', 'Premium Yields'],
      status: 'premium',
      userDeposit: 0,
      icon: '💎',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const filteredVaults = selectedCategory === 'all' 
    ? vaults 
    : vaults.filter(vault => vault.category === selectedCategory);

  const sortedVaults = [...filteredVaults].sort((a, b) => {
    switch (sortBy) {
      case 'apy': return b.apy - a.apy;
      case 'tvl': return b.tvl - a.tvl;
      case 'risk': 
        const riskOrder: Record<string, number> = { 'Low': 1, 'Medium': 2, 'High': 3, 'Very High': 4 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      default: return 0;
    }
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/20';
      case 'Very High': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'new': return 'text-blue-400 bg-blue-500/20';
      case 'premium': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const totalDeposited = vaults.reduce((sum, vault) => sum + vault.userDeposit, 0);
  const averageAPY = vaults.filter(v => v.userDeposit > 0).reduce((sum, vault) => sum + vault.apy, 0) / vaults.filter(v => v.userDeposit > 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Vault className="w-8 h-8 mr-3 text-[#00E0FF]" />
          Vaults
        </h1>
        <p className="text-gray-400 text-lg">Automated yield strategies for maximum returns</p>
      </div>

      {/* Your Vault Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Deposited</p>
              <DollarSign className="w-5 h-5 text-[#00E0FF]" />
            </div>
            <p className="text-3xl font-bold text-white">${totalDeposited.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">Across 3 vaults</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Average APY</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-white">{averageAPY.toFixed(1)}%</p>
            <p className="text-sm text-green-400 mt-1">+2.3% from last month</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Total Yield Earned</p>
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-white">$347</p>
            <p className="text-sm text-purple-400 mt-1">This month</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Active Positions</p>
              <Target className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-sm text-yellow-400 mt-1">Out of 12 available</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]/30'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vaults..."
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
          >
            <option value="apy">Sort by APY</option>
            <option value="tvl">Sort by TVL</option>
            <option value="risk">Sort by Risk</option>
          </select>
        </div>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedVaults.map((vault) => (
          <div key={vault.id} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r opacity-5 rounded-2xl blur-xl group-hover:opacity-10 transition-opacity ${vault.color.replace('from-', '').replace('to-', '').split(' ').map(c => c + '/20').join(' ')}`} />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-[1.02]">
              {/* Vault Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${vault.color} flex items-center justify-center text-2xl`}>
                    {vault.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#00E0FF] transition-colors">
                      {vault.name}
                    </h3>
                    <p className="text-sm text-gray-400">{vault.protocol}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(vault.status)}`}>
                    {vault.status === 'new' ? '🆕 New' : vault.status === 'premium' ? '💎 Premium' : '✅ Active'}
                  </span>
                </div>
              </div>

              {/* Vault Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-2xl font-bold text-green-400">{vault.apy}%</p>
                  <p className="text-xs text-gray-400">APY</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-lg font-bold text-white">${(vault.tvl / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-400">TVL</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-xl">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRiskColor(vault.riskLevel)}`}>
                    {vault.riskLevel}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Risk</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4">{vault.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {vault.features.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-[#00E0FF]/10 text-[#00E0FF] text-xs rounded-lg">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Vault Details */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Min Deposit:</span>
                  <span className="text-white font-medium">${vault.minDeposit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Lock Period:</span>
                  <span className="text-white font-medium">{vault.lockPeriod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Participants:</span>
                  <span className="text-white font-medium">{vault.participants.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Your Deposit:</span>
                  <span className="text-white font-medium">
                    {vault.userDeposit > 0 ? `$${vault.userDeposit.toLocaleString()}` : 'None'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {vault.userDeposit > 0 ? (
                  <>
                    <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-[#00E0FF]/20 text-[#00E0FF] rounded-xl hover:bg-[#00E0FF]/30 transition-colors">
                      <TrendingUp className="w-4 h-4" />
                      <span>Manage Position</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-700/50 text-gray-300 rounded-xl hover:bg-gray-600/50 transition-colors">
                      <Unlock className="w-4 h-4" />
                      <span>Withdraw</span>
                    </button>
                  </>
                ) : (
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-[#00E0FF]/20 to-[#06B6D4]/20 text-[#00E0FF] rounded-xl hover:from-[#00E0FF]/30 hover:to-[#06B6D4]/30 transition-all">
                    <DollarSign className="w-4 h-4" />
                    <span>Deposit Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Risk Warning for High Risk Vaults */}
              {(vault.riskLevel === 'High' || vault.riskLevel === 'Very High') && (
                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-400">
                      High risk strategy. Only invest what you can afford to lose.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Educational Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-500" />
              Vault Safety & Education
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-white">Risk Management</h4>
              <p className="text-sm text-gray-400">
                All vaults undergo security audits and implement risk controls to protect your funds.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-white">Diversification</h4>
              <p className="text-sm text-gray-400">
                Spread your investments across multiple vaults to reduce overall portfolio risk.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-white">Learn More</h4>
              <button className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium">
                Read Vault Strategies Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultsPage;
