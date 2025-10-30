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
      case 'low': return 'text-[#2E865F] bg-[#2E865F]/10';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-500 bg-red-50';
      default: return 'text-[#5A6C7D] bg-[#F9FAFB]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-[#2E865F] bg-[#2E865F]/10';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'closed': return 'text-[#5A6C7D] bg-[#F9FAFB]';
      default: return 'text-[#5A6C7D] bg-[#F9FAFB]';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Investment <span className="text-[#FF6B35]">Vaults</span></h1>
          <p className="text-[#5A6C7D] text-lg">Discover and invest in impactful education and development projects</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E65A2D] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all">
          <Plus className="w-5 h-5" />
          <span>Create Vault</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6C7D] w-4 h-4" />
            <input
              type="text"
              placeholder="Search vaults or regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]/50 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#5A6C7D]" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-2 text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
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
          <p className="text-sm text-[#5A6C7D]">Total Vaults</p>
          <p className="text-xl font-bold text-[#FF6B35]">{filteredVaults.length}</p>
        </div>
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVaults.map((vault) => (
          <div key={vault.id} className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all group-hover:transform group-hover:scale-105 shadow-lg">
              {/* Vault Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{vault.logo}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#FF6B35] transition-colors">
                      {vault.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Globe className="w-3 h-3 text-[#5A6C7D]" />
                      <span className="text-sm text-[#5A6C7D]">{vault.region}</span>
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
              <p className="text-[#5A6C7D] text-sm mb-4">{vault.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="w-4 h-4 text-[#2E865F] mr-1" />
                    <span className="text-sm text-[#5A6C7D]">APY</span>
                  </div>
                  <p className="text-xl font-bold text-[#2E865F]">{vault.apy}%</p>
                </div>
                <div className="text-center p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-[#FF6B35] mr-1" />
                    <span className="text-sm text-[#5A6C7D]">TVL</span>
                  </div>
                  <p className="text-xl font-bold text-[#FF6B35]">{vault.tvl}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5A6C7D]">Participants</span>
                  <span className="text-[#1F2937]">{vault.participants}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5A6C7D]">Duration</span>
                  <span className="text-[#1F2937]">{vault.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5A6C7D]">Min Investment</span>
                  <span className="text-[#1F2937]">{vault.minInvestment}</span>
                </div>
                {vault.yourInvestment !== '$0' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5A6C7D]">Your Investment</span>
                    <span className="text-[#FF6B35] font-medium">{vault.yourInvestment}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {vault.status === 'active' && vault.yourInvestment === '$0' ? (
                  <button className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#E65A2D] text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all">
                    Invest Now
                  </button>
                ) : vault.status === 'active' && vault.yourInvestment !== '$0' ? (
                  <button className="flex-1 bg-[#F9FAFB] hover:bg-white text-[#1F2937] font-medium py-2 px-4 rounded-lg transition-colors border border-[#E5E7EB]">
                    Add More
                  </button>
                ) : vault.status === 'pending' ? (
                  <button className="flex-1 bg-yellow-50 text-yellow-600 font-medium py-2 px-4 rounded-lg cursor-not-allowed border border-yellow-200">
                    Coming Soon
                  </button>
                ) : (
                  <button className="flex-1 bg-[#F9FAFB] text-[#9CA3AF] font-medium py-2 px-4 rounded-lg cursor-not-allowed border border-[#E5E7EB]">
                    Closed
                  </button>
                )}
                <button className="p-2 bg-[#F9FAFB] hover:bg-white border border-[#E5E7EB] rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-[#5A6C7D]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Education Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-yellow-500/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-yellow-500/30 transition-all shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Investment Safety & Education</h3>
              <p className="text-[#5A6C7D] mb-4">
                Learn about risk management, diversification strategies, and how our vaults work to maximize both financial and social returns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2E865F]" />
                  <span className="text-[#1F2937]">Smart Contract Audited</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2E865F]" />
                  <span className="text-[#1F2937]">Transparent Reporting</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#2E865F]" />
                  <span className="text-[#1F2937]">Impact Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
