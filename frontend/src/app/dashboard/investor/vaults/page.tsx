"use client";

import React, { useState } from 'react';
import { 
  Vault, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
  ExternalLink,
  Plus,
  ArrowUpRight,
  Globe,
  Target,
  Zap
} from 'lucide-react';

export default function InvestorVaultsPage() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const vaults = [
    {
      id: 1,
      name: 'Epoch V - Lwandi Surf Fund',
      category: 'Education',
      apy: 18.5,
      tvl: '$2.4M',
      status: 'active',
      risk: 'medium',
      region: 'Mozambique',
      description: 'Funding surf education and youth development programs',
      participants: 156,
      duration: '12 months',
      minInvestment: '$1,000',
      yourInvestment: '$15,000',
      logo: '🏄‍♂️'
    },
    {
      id: 2,
      name: 'India Tech Hub Accelerator',
      category: 'Technology',
      apy: 22.3,
      tvl: '$1.8M',
      status: 'active',
      risk: 'high',
      region: 'India',
      description: 'Supporting tech startups and coding bootcamps',
      participants: 89,
      duration: '18 months',
      minInvestment: '$2,500',
      yourInvestment: '$25,000',
      logo: '💻'
    },
    {
      id: 3,
      name: 'Mozambique Agri Development',
      category: 'Agriculture',
      apy: 14.7,
      tvl: '$3.1M',
      status: 'active',
      risk: 'low',
      region: 'Mozambique',
      description: 'Sustainable farming and agricultural education',
      participants: 234,
      duration: '24 months',
      minInvestment: '$500',
      yourInvestment: '$8,000',
      logo: '🌾'
    },
    {
      id: 4,
      name: 'Kenya Solar Initiative',
      category: 'Energy',
      apy: 16.2,
      tvl: '$1.2M',
      status: 'pending',
      risk: 'medium',
      region: 'Kenya',
      description: 'Solar energy training and infrastructure',
      participants: 67,
      duration: '15 months',
      minInvestment: '$1,500',
      yourInvestment: '$0',
      logo: '☀️'
    },
    {
      id: 5,
      name: 'Brazil Fintech Bootcamp',
      category: 'Fintech',
      apy: 19.8,
      tvl: '$950K',
      status: 'closed',
      risk: 'medium',
      region: 'Brazil',
      description: 'Financial technology education program',
      participants: 45,
      duration: '9 months',
      minInvestment: '$2,000',
      yourInvestment: '$12,000',
      logo: '💳'
    }
  ];

  const filteredVaults = vaults.filter(vault => {
    const matchesCategory = filterCategory === 'all' || vault.category.toLowerCase() === filterCategory;
    const matchesSearch = vault.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         vault.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'closed': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Investment Vaults</h1>
          <p className="text-gray-400 text-lg">Discover and invest in impactful education and development projects</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] text-black font-medium rounded-xl hover:shadow-lg hover:shadow-[#00E0FF]/30 transition-all">
          <Plus className="w-5 h-5" />
          <span>Create Vault</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search vaults or regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50 focus:border-[#00E0FF]/50 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
            >
              <option value="all">All Categories</option>
              <option value="education">Education</option>
              <option value="technology">Technology</option>
              <option value="agriculture">Agriculture</option>
              <option value="energy">Energy</option>
              <option value="fintech">Fintech</option>
            </select>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400">Total Vaults</p>
          <p className="text-xl font-bold text-[#00E0FF]">{filteredVaults.length}</p>
        </div>
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVaults.map((vault) => (
          <div key={vault.id} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all group-hover:transform group-hover:scale-105">
              {/* Vault Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{vault.logo}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#00E0FF] transition-colors">
                      {vault.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Globe className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-400">{vault.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(vault.status)}`}>
                    {vault.status.charAt(0).toUpperCase() + vault.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRiskColor(vault.risk)}`}>
                    {vault.risk.charAt(0).toUpperCase() + vault.risk.slice(1)} Risk
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{vault.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm text-gray-400">APY</span>
                  </div>
                  <p className="text-xl font-bold text-green-400">{vault.apy}%</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-[#00E0FF] mr-1" />
                    <span className="text-sm text-gray-400">TVL</span>
                  </div>
                  <p className="text-xl font-bold text-[#00E0FF]">{vault.tvl}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Participants</span>
                  <span className="text-white">{vault.participants}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{vault.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Min Investment</span>
                  <span className="text-white">{vault.minInvestment}</span>
                </div>
                {vault.yourInvestment !== '$0' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Your Investment</span>
                    <span className="text-[#00E0FF] font-medium">{vault.yourInvestment}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {vault.status === 'active' && vault.yourInvestment === '$0' ? (
                  <button className="flex-1 bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] text-black font-medium py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#00E0FF]/30 transition-all">
                    Invest Now
                  </button>
                ) : vault.status === 'active' && vault.yourInvestment !== '$0' ? (
                  <button className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Add More
                  </button>
                ) : vault.status === 'pending' ? (
                  <button className="flex-1 bg-yellow-500/20 text-yellow-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <button className="flex-1 bg-gray-700/50 text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed">
                    Closed
                  </button>
                )}
                <button className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Education Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">Investment Safety & Education</h3>
              <p className="text-gray-400 mb-4">
                Learn about risk management, diversification strategies, and how our vaults work to maximize both financial and social returns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Smart Contract Audited</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Transparent Reporting</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Impact Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
