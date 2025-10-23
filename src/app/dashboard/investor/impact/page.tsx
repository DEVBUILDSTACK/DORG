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
          <h1 className="text-3xl font-bold text-white">Impact Reports</h1>
          <p className="text-gray-400 text-lg">Track your social impact and community outcomes</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm">Export Report</span>
        </button>
      </div>

      {/* Impact KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Students Funded', value: '1,247', change: '+156 this month', icon: Users, color: 'from-[#00E0FF] to-[#06B6D4]' },
          { label: 'Cohorts Completed', value: '23', change: '+3 this quarter', icon: Award, color: 'from-green-500 to-emerald-500' },
          { label: 'Revenue Reinvested', value: '$89,247', change: '+$12,450 this month', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
          { label: 'DAO Treasury Growth', value: '+34.7%', change: 'All time high', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
        ].map((kpi, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color} shadow-lg`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-white mb-2">{kpi.value}</p>
                <p className="text-sm text-green-400">{kpi.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ROI Comparison Chart */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-[#00E0FF]" />
              Financial ROI vs Social ROI
            </h2>
            <div className="flex items-center space-x-2">
              {['1Y', '2Y', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === period
                      ? 'bg-[#00E0FF] text-black shadow-lg shadow-[#00E0FF]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Mock Chart */}
          <div className="h-64 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/5 to-[#9F7AEA]/5" />
            <div className="text-center z-10">
              <BarChart3 className="w-16 h-16 text-[#00E0FF] mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">ROI Comparison Chart</p>
              <p className="text-sm text-gray-500">Dual-axis chart showing financial vs social returns</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-900/30 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Financial ROI</p>
              <p className="text-2xl font-bold text-green-400">+14.2%</p>
              <p className="text-xs text-gray-500">Annualized return</p>
            </div>
            <div className="text-center p-4 bg-gray-900/30 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Social ROI</p>
              <p className="text-2xl font-bold text-[#00E0FF]">847 pts</p>
              <p className="text-xs text-gray-500">Impact score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Impact & Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Regional Heatmap */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-purple-400" />
              Regional Impact Distribution
            </h3>
            
            {/* Mock Heatmap */}
            <div className="h-48 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
              <div className="text-center z-10">
                <Globe className="w-12 h-12 text-purple-400 mx-auto mb-2 opacity-50" />
                <p className="text-gray-400">World Impact Map</p>
                <p className="text-sm text-gray-500">Interactive heatmap component</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { region: 'Mozambique', students: 456, color: 'bg-[#00E0FF]' },
                { region: 'India', students: 342, color: 'bg-purple-500' },
                { region: 'Kenya', students: 289, color: 'bg-green-500' },
                { region: 'Brazil', students: 160, color: 'bg-yellow-500' },
              ].map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${region.color}`} />
                    <span className="text-white">{region.region}</span>
                  </div>
                  <span className="text-gray-400">{region.students} students</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-green-400" />
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
                <div key={index} className="p-4 bg-gray-900/30 rounded-lg">
                  <div className="flex items-start space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">"{testimonial.story}"</p>
                  <p className="text-xs text-[#00E0FF]">{testimonial.program}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
