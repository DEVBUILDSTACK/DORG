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
      case 'Low': return 'text-[#2E865F] bg-[#2E865F]/10 border border-[#2E865F]/30';
      case 'Medium': return 'text-[#F59E0B] bg-[#FEF3C7] border border-[#F59E0B]/30';
      case 'High': return 'text-[#FF6B35] bg-[#FFE8E0] border border-[#FF6B35]/30';
      case 'Very High': return 'text-[#DC2626] bg-red-50 border border-[#DC2626]/30';
      default: return 'text-[#5A6C7D] bg-[#F3F4F6] border border-[#E5E7EB]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#2E865F] bg-[#2E865F]/10 border border-[#2E865F]/30';
      case 'new': return 'text-[#FF6B35] bg-[#FFE8E0] border border-[#FF6B35]/30';
      case 'premium': return 'text-[#FF6B35] bg-[#FFE8E0] border border-[#FF6B35]/30';
      default: return 'text-[#5A6C7D] bg-[#F3F4F6] border border-[#E5E7EB]';
    }
  };

  const totalDeposited = vaults.reduce((sum, vault) => sum + vault.userDeposit, 0);
  const averageAPY = vaults.filter(v => v.userDeposit > 0).reduce((sum, vault) => sum + vault.apy, 0) / vaults.filter(v => v.userDeposit > 0).length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] flex items-center">
          <Vault className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-[#FF6B35]" />
          Vaults
        </h1>
        <p className="text-[#5A6C7D] text-base sm:text-lg">Automated yield strategies for maximum returns</p>
      </div>

      {/* Your Vault Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:border-[#FF6B35]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Total Deposited</p>
              <DollarSign className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F2937]">${totalDeposited.toLocaleString()}</p>
            <p className="text-sm text-[#5A6C7D] mt-1">Across 3 vaults</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:border-[#2E865F]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Average APY</p>
              <TrendingUp className="w-5 h-5 text-[#2E865F]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F2937]">{averageAPY.toFixed(1)}%</p>
            <p className="text-sm text-[#2E865F] mt-1">+2.3% from last month</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:border-[#FF6B35]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Total Yield Earned</p>
              <Zap className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F2937]">$347</p>
            <p className="text-sm text-[#FF6B35] mt-1">This month</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:border-[#FF6B35]/30 transition-all shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#5A6C7D] text-sm">Active Positions</p>
              <Target className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#1F2937]">3</p>
            <p className="text-sm text-[#FF6B35] mt-1">Out of 12 available</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <Filter className="w-5 h-5 text-[#5A6C7D] shrink-0" />
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-[#FFE8E0] text-[#FF6B35] border border-[#FF6B35]/30'
                    : 'bg-white text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB] border border-[#E5E7EB]'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6C7D] w-4 h-4" />
            <input
              type="text"
              placeholder="Search vaults..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]/50 transition-all"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort vaults by"
            className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
          >
            <option value="apy">Sort by APY</option>
            <option value="tvl">Sort by TVL</option>
            <option value="risk">Sort by Risk</option>
          </select>
        </div>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {sortedVaults.map((vault) => (
          <div key={vault.id} className="relative group">
            <div className={`absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl group-hover:opacity-10 transition-opacity`} />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:border-[#FF6B35]/30 transition-all group-hover:transform group-hover:scale-[1.01] shadow-sm">
              {/* Vault Header */}
              <div className="flex items-start justify-between mb-4 gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-r ${vault.color} flex items-center justify-center text-xl sm:text-2xl shrink-0`}>
                    {vault.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-[#1F2937] group-hover:text-[#FF6B35] transition-colors truncate">
                      {vault.name}
                    </h3>
                    <p className="text-sm text-[#5A6C7D]">{vault.protocol}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(vault.status)}`}>
                    {vault.status === 'new' ? '🆕 New' : vault.status === 'premium' ? '💎 Premium' : '✅ Active'}
                  </span>
                </div>
              </div>

              {/* Vault Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
                <div className="text-center p-2 sm:p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                  <p className="text-xl sm:text-2xl font-bold text-[#2E865F]">{vault.apy}%</p>
                  <p className="text-xs text-[#5A6C7D]">APY</p>
                </div>
                <div className="text-center p-2 sm:p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                  <p className="text-base sm:text-lg font-bold text-[#1F2937]">${(vault.tvl / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-[#5A6C7D]">TVL</p>
                </div>
                <div className="text-center p-2 sm:p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRiskColor(vault.riskLevel)}`}>
                    {vault.riskLevel}
                  </span>
                  <p className="text-xs text-[#5A6C7D] mt-1">Risk</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#5A6C7D] mb-4 line-clamp-2">{vault.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {vault.features.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFE8E0] text-[#FF6B35] text-xs rounded-lg border border-[#FF6B35]/20">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Vault Details */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#5A6C7D]">Min Deposit:</span>
                  <span className="text-[#1F2937] font-medium">${vault.minDeposit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5A6C7D]">Lock Period:</span>
                  <span className="text-[#1F2937] font-medium">{vault.lockPeriod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5A6C7D]">Participants:</span>
                  <span className="text-[#1F2937] font-medium">{vault.participants.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5A6C7D]">Your Deposit:</span>
                  <span className="text-[#1F2937] font-medium">
                    {vault.userDeposit > 0 ? `$${vault.userDeposit.toLocaleString()}` : 'None'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                {vault.userDeposit > 0 ? (
                  <>
                    <button className="w-full sm:flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E65A2D] transition-colors font-medium">
                      <TrendingUp className="w-4 h-4" />
                      <span>Manage Position</span>
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-4 bg-[#F3F4F6] text-[#5A6C7D] rounded-xl hover:bg-[#E5E7EB] transition-colors border border-[#E5E7EB]">
                      <Unlock className="w-4 h-4" />
                      <span>Withdraw</span>
                    </button>
                  </>
                ) : (
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E65A2D] transition-all font-medium shadow-sm">
                    <DollarSign className="w-4 h-4" />
                    <span>Deposit Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Risk Warning for High Risk Vaults */}
              {(vault.riskLevel === 'High' || vault.riskLevel === 'Very High') && (
                <div className="mt-4 p-3 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-xs text-[#92400E]">
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
        <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:border-[#FF6B35]/30 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-[#1F2937] flex items-center">
              <Shield className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Vault Safety & Education
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-[#1F2937]">Risk Management</h4>
              <p className="text-sm text-[#5A6C7D]">
                All vaults undergo security audits and implement risk controls to protect your funds.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-[#1F2937]">Diversification</h4>
              <p className="text-sm text-[#5A6C7D]">
                Spread your investments across multiple vaults to reduce overall portfolio risk.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-[#1F2937]">Learn More</h4>
              <button className="text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium">
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
