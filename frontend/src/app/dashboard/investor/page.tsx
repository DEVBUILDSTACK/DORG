"use client";

import React from 'react';
import { TrendingUp, DollarSign, Users, Target, ArrowUpRight, ArrowDownRight, Vault, Briefcase, PieChart, BarChart3, Calendar, Shield, ExternalLink, CheckCircle, Clock } from 'lucide-react';

export default function InvestorOverviewPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">
              Investor <span className="text-[#FF6B35]">Portfolio</span>
            </h1>
            <p className="text-[#5A6C7D] text-base sm:text-lg">Track your vault investments and returns</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="px-3 sm:px-4 py-2 bg-[#F3F4F6] text-[#5A6C7D] rounded-lg hover:bg-[#E5E7EB] transition-colors text-sm font-medium">
              Export Report
            </button>
            <button className="px-3 sm:px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E65A2D] transition-colors text-sm font-medium">
              Invest in Vault
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total Portfolio Value', value: '$127,450', change: '+14.2%', trend: 'up', icon: DollarSign, bgClass: 'bg-[#FF6B35]/5' },
          { label: 'Monthly Returns', value: '$3,247', change: '+8.7%', trend: 'up', icon: TrendingUp, bgClass: 'bg-[#2E865F]/5' },
          { label: 'Active Investments', value: '3 Vaults', change: '2 Auditing', trend: 'neutral', icon: Vault, bgClass: 'bg-[#FF6B35]/5' },
          { label: 'Portfolio Yield', value: '12.8%', change: '+2.1%', trend: 'up', icon: Target, bgClass: 'bg-[#FF6B35]/5' },
        ].map((metric, index) => (
          <div key={index} className="relative group">
            <div className={cn("absolute inset-0 rounded-2xl blur-xl", metric.bgClass)} />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={cn("p-2 sm:p-3 rounded-xl shadow-md", metric.bgClass)}>
                  <metric.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B35]" />
                </div>
                <div className={cn(
                  "flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full",
                  metric.trend === 'up' ? "bg-[#2E865F]/10 text-[#2E865F]" : "bg-[#5A6C7D]/10 text-[#5A6C7D]"
                )}>
                  {metric.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  <span className="tabular-nums">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-[#5A6C7D] text-xs sm:text-sm mb-1">{metric.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-[#1F2937] tabular-nums">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Vaults Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#1F2937] flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#FF6B35]" />
                Our Flagship Vaults
              </h2>
              <p className="text-sm text-[#5A6C7D] mt-1">Professional-grade DeFi treasury management</p>
            </div>
            <button className="text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium flex items-center">
              View All Vaults
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* SOL30 Vault */}
            <div className="relative group/card">
              <div className="absolute inset-0 bg-[#9945FF]/5 rounded-xl blur-lg" />
              <div className="relative bg-white border-2 border-[#E5E7EB] rounded-xl p-4 sm:p-5 hover:border-[#9945FF]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#9945FF]/10 flex items-center justify-center">
                      <Vault className="w-5 h-5 sm:w-6 sm:h-6 text-[#9945FF]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">SOL30 Vault</h3>
                      <p className="text-xs text-[#5A6C7D]">Solana Ecosystem</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-1 bg-[#2E865F]/10 text-[#2E865F] rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Auditing</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Target APY</span>
                    <span className="text-base sm:text-lg font-bold text-[#2E865F] tabular-nums">12-15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Min. Investment</span>
                    <span className="text-sm font-semibold text-[#1F2937] tabular-nums">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Strategy</span>
                    <span className="text-sm font-medium text-[#1F2937]">70/30 Split</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB]">
                  <p className="text-xs text-[#5A6C7D] mb-3">
                    30 diversified Solana tokens with 70% core holdings + 30% Meteora yield enhancement
                  </p>
                  <button className="w-full py-2 bg-[#9945FF] text-white rounded-lg hover:bg-[#8639E6] transition-colors text-sm font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* BASE10 Vault */}
            <div className="relative group/card">
              <div className="absolute inset-0 bg-[#0052FF]/5 rounded-xl blur-lg" />
              <div className="relative bg-white border-2 border-[#E5E7EB] rounded-xl p-4 sm:p-5 hover:border-[#0052FF]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0052FF]/10 flex items-center justify-center">
                      <Vault className="w-5 h-5 sm:w-6 sm:h-6 text-[#0052FF]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">BASE10 Vault</h3>
                      <p className="text-xs text-[#5A6C7D]">Base L2 Ecosystem</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-1 bg-[#2E865F]/10 text-[#2E865F] rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Auditing</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Target APY</span>
                    <span className="text-base sm:text-lg font-bold text-[#2E865F] tabular-nums">10-13%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Min. Investment</span>
                    <span className="text-sm font-semibold text-[#1F2937] tabular-nums">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Strategy</span>
                    <span className="text-sm font-medium text-[#1F2937]">70/30 Split</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB]">
                  <p className="text-xs text-[#5A6C7D] mb-3">
                    10 Base ecosystem tokens with gas-free transactions via Plasma integration
                  </p>
                  <button className="w-full py-2 bg-[#0052FF] text-white rounded-lg hover:bg-[#0046DB] transition-colors text-sm font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Thesis 35 Vault */}
            <div className="relative group/card">
              <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-xl blur-lg" />
              <div className="relative bg-white border-2 border-[#E5E7EB] rounded-xl p-4 sm:p-5 hover:border-[#FF6B35]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                      <Vault className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B35]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">Thesis 35 Vault</h3>
                      <p className="text-xs text-[#5A6C7D]">Multi-Asset Treasury</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    <span>Building</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Target APY</span>
                    <span className="text-base sm:text-lg font-bold text-[#2E865F] tabular-nums">14-18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Min. Investment</span>
                    <span className="text-sm font-semibold text-[#1F2937] tabular-nums">$5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#5A6C7D]">Strategy</span>
                    <span className="text-sm font-medium text-[#1F2937]">35/65 Split</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB]">
                  <p className="text-xs text-[#5A6C7D] mb-3">
                    Institutional treasury with BTC, SOL, ETH, TAO exposure + Drift yield engine
                  </p>
                  <button className="w-full py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E65A2D] transition-colors text-sm font-medium">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[#1F2937] mb-1">We Also List Third-Party Vaults</h4>
                <p className="text-xs sm:text-sm text-[#5A6C7D]">
                  Access vetted DeFi vaults from top protocols across multiple chains. All third-party vaults undergo rigorous due diligence before listing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-[#FF6B35]" />
                  Portfolio Performance (Last 12 Months)
                </h2>
                <div className="flex items-center space-x-3">
                  <button className="px-3 py-1 bg-[#FF6B35] text-white rounded-lg text-sm font-medium">12M</button>
                  <button className="px-3 py-1 bg-[#F3F4F6] text-[#5A6C7D] rounded-lg text-sm font-medium hover:bg-[#E5E7EB] transition-colors">6M</button>
                  <button className="px-3 py-1 bg-[#F3F4F6] text-[#5A6C7D] rounded-lg text-sm font-medium hover:bg-[#E5E7EB] transition-colors">3M</button>
                </div>
              </div>

              <div className="h-48 sm:h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
                  <p className="text-sm sm:text-lg text-[#5A6C7D]">Performance Chart</p>
                  <p className="text-xs sm:text-sm text-[#9CA3AF]">Historical portfolio value growth</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#5A6C7D]">Total Invested</p>
                  <p className="text-2xl font-bold text-[#FF6B35] tabular-nums">$115,200</p>
                </div>
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#5A6C7D]">Total Returns</p>
                  <p className="text-2xl font-bold text-[#2E865F] tabular-nums">$12,250</p>
                </div>
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#5A6C7D]">ROI</p>
                  <p className="text-2xl font-bold text-[#FF6B35] tabular-nums">10.6%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Asset Allocation
            </h3>
            
            <div className="h-36 sm:h-48 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center mb-4">
              <PieChart className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF6B35] opacity-50" />
            </div>

            <div className="space-y-3">
              {[
                { name: 'SOL Vaults', percentage: '45%', colorClass: 'bg-[#9945FF]' },
                { name: 'BASE Vaults', percentage: '30%', colorClass: 'bg-[#0052FF]' },
                { name: 'Thesis 35', percentage: '15%', colorClass: 'bg-[#FF6B35]' },
                { name: 'Stablecoins', percentage: '10%', colorClass: 'bg-[#2E865F]' },
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={cn("w-3 h-3 rounded-full", asset.colorClass)} />
                    <span className="text-sm text-[#1F2937]">{asset.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#5A6C7D] tabular-nums">{asset.percentage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1F2937] flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-[#2E865F]" />
              Active Vault Positions
            </h2>
            <button className="text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium self-start sm:self-auto">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#5A6C7D]">Vault</th>
                    <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#5A6C7D]">Chain</th>
                    <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#5A6C7D]">Invested</th>
                    <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#5A6C7D] hidden sm:table-cell">Value</th>
                    <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#5A6C7D]">Returns</th>
                    <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-[#5A6C7D] hidden md:table-cell">APY</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'SOL30-Vault', chain: 'Solana', invested: '$45,000', value: '$52,340', returns: '+16.3%', apy: '14.2%', trend: 'up' },
                    { name: 'BASE10-Pool', chain: 'Base', invested: '$30,000', value: '$33,780', returns: '+12.6%', apy: '11.8%', trend: 'up' },
                    { name: 'Multi-Strat', chain: 'Multi', invested: '$20,000', value: '$21,840', returns: '+9.2%', apy: '10.4%', trend: 'up' },
                    { name: 'USDC-Stable', chain: 'Solana', invested: '$15,200', value: '$16,030', returns: '+5.5%', apy: '8.7%', trend: 'up' },
                  ].map((vault, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#FF6B35]/5 flex items-center justify-center shrink-0">
                            <Vault className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B35]" />
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-[#1F2937] truncate">{vault.name}</p>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-[#FF6B35]/10 text-[#FF6B35]">
                          {vault.chain}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-xs sm:text-sm text-[#5A6C7D] tabular-nums">{vault.invested}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-xs sm:text-sm font-semibold text-[#1F2937] tabular-nums hidden sm:table-cell">{vault.value}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right">
                        <div className={cn(
                          "inline-flex items-center space-x-1 text-xs sm:text-sm font-medium",
                          vault.trend === 'up' ? "text-[#2E865F]" : "text-[#DC2626]"
                        )}>
                          {vault.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          <span className="tabular-nums">{vault.returns}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-xs sm:text-sm font-semibold text-[#FF6B35] tabular-nums hidden md:table-cell">{vault.apy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Upcoming Maturities
            </h3>
            <div className="space-y-3">
              {[
                { vault: 'SOL30-Vault', date: 'Dec 15, 2024', amount: '$52,340' },
                { vault: 'BASE10-Pool', date: 'Jan 8, 2025', amount: '$33,780' },
                { vault: 'Multi-Strat', date: 'Feb 22, 2025', amount: '$21,840' },
              ].map((maturity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors">
                  <div>
                    <p className="text-sm font-medium text-[#1F2937]">{maturity.vault}</p>
                    <p className="text-xs text-[#5A6C7D]">{maturity.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#FF6B35] tabular-nums">{maturity.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Investment Opportunities
            </h3>
            <div className="space-y-3">
              {[
                { vault: 'New SOL Vault', apy: '15.8%', minInvest: '$5,000', status: 'Open' },
                { vault: 'BASE DeFi Pool', apy: '13.2%', minInvest: '$10,000', status: 'Filling Fast' },
                { vault: 'Stablecoin Plus', apy: '9.5%', minInvest: '$1,000', status: 'Open' },
              ].map((opportunity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-[#1F2937]">{opportunity.vault}</p>
                    <p className="text-xs text-[#5A6C7D]">Min: {opportunity.minInvest}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#2E865F] tabular-nums">{opportunity.apy}</p>
                    <span className="text-xs text-[#FF6B35]">{opportunity.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium">
              Explore All Vaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
