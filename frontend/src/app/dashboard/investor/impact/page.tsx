"use client";

import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  DollarSign,
  TrendingUp,
  Globe,
  BookOpen,
  Award,
  Target,
  BarChart3,
  MapPin,
  Calendar,
  Star,
  ArrowUpRight,
  Download
} from 'lucide-react';

export default function InvestorImpactPage() {
  const [timeFilter, setTimeFilter] = useState('all');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Impact <span className="text-[#FF6B35]">Reports</span></h1>
          <p className="text-[#5A6C7D] text-lg">Track your social impact and community outcomes</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-xl transition-colors shadow-sm">
          <Download className="w-4 h-4 text-[#5A6C7D]" />
          <span className="text-sm text-[#1F2937]">Export Report</span>
        </button>
      </div>

      {/* Impact KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Students Funded', value: '1,247', change: '+156 this month', icon: Users, color: 'from-[#FF6B35] to-[#E65A2D]' },
          { label: 'Cohorts Completed', value: '23', change: '+3 this quarter', icon: Award, color: 'from-[#2E865F] to-emerald-500' },
          { label: 'Revenue Reinvested', value: '$89,247', change: '+$12,450 this month', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
          { label: 'DAO Treasury Growth', value: '+34.7%', change: 'All time high', icon: TrendingUp, color: 'from-[#A855F7] to-pink-500' },
        ].map((kpi, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all group-hover:transform group-hover:scale-105 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color} shadow-lg`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#2E865F]" />
              </div>
              <div>
                <p className="text-[#5A6C7D] text-sm mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-[#1F2937] mb-2">{kpi.value}</p>
                <p className="text-sm text-[#2E865F]">{kpi.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ROI Comparison Chart */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Financial ROI vs Social ROI
            </h2>
            <div className="flex items-center space-x-2">
              {['1Y', '2Y', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === period
                      ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30'
                      : 'text-[#5A6C7D] hover:text-[#1F2937] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Mock Chart */}
          <div className="h-64 bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 to-[#A855F7]/5" />
            <div className="text-center z-10">
              <BarChart3 className="w-16 h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
              <p className="text-[#5A6C7D] text-lg">ROI Comparison Chart</p>
              <p className="text-sm text-[#9CA3AF]">Dual-axis chart showing financial vs social returns</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
              <p className="text-sm text-[#5A6C7D] mb-1">Financial ROI</p>
              <p className="text-2xl font-bold text-[#2E865F]">+14.2%</p>
              <p className="text-xs text-[#9CA3AF]">Annualized return</p>
            </div>
            <div className="text-center p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
              <p className="text-sm text-[#5A6C7D] mb-1">Social ROI</p>
              <p className="text-2xl font-bold text-[#FF6B35]">847 pts</p>
              <p className="text-xs text-[#9CA3AF]">Impact score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Impact & Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regional Heatmap */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#A855F7]/30 transition-all shadow-lg">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-[#A855F7]" />
              Regional Impact Distribution
            </h3>
            
            {/* Mock Heatmap */}
            <div className="h-48 bg-gradient-to-br from-[#F9FAFB] to-white rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/5 to-pink-500/5" />
              <div className="text-center z-10">
                <Globe className="w-12 h-12 text-[#A855F7] mx-auto mb-2 opacity-50" />
                <p className="text-[#5A6C7D]">World Impact Map</p>
                <p className="text-sm text-[#9CA3AF]">Interactive heatmap component</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { region: 'Mozambique', students: 456, color: 'bg-[#FF6B35]' },
                { region: 'India', students: 342, color: 'bg-[#A855F7]' },
                { region: 'Kenya', students: 289, color: 'bg-[#2E865F]' },
                { region: 'Brazil', students: 160, color: 'bg-yellow-500' },
              ].map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${region.color}`} />
                    <span className="text-[#1F2937]">{region.region}</span>
                  </div>
                  <span className="text-[#5A6C7D]">{region.students} students</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#2E865F]/30 transition-all shadow-lg">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-[#2E865F]" />
              Impact Stories
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Maria Santos',
                  location: 'Maputo, Mozambique',
                  story: 'Thanks to the Lwandi Surf Fund, I learned web development and now work remotely for a tech company.',
                  program: 'Surf & Code Bootcamp'
                },
                {
                  name: 'Raj Patel',
                  location: 'Mumbai, India',
                  story: 'The tech accelerator helped me launch my fintech startup. We now serve 10,000+ users.',
                  program: 'India Tech Hub'
                },
                {
                  name: 'Grace Wanjiku',
                  location: 'Nairobi, Kenya',
                  story: 'Solar training program changed my community. We now have clean energy for 200 families.',
                  program: 'Kenya Solar Initiative'
                }
              ].map((testimonial, index) => (
                <div key={index} className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-start space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#2E865F] to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[#1F2937] font-medium">{testimonial.name}</p>
                      <p className="text-xs text-[#5A6C7D]">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-[#1F2937] text-sm mb-2">"{testimonial.story}"</p>
                  <p className="text-xs text-[#FF6B35]">{testimonial.program}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
