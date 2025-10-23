"use client";

import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  BookOpen,
  Globe,
  Filter,
  Search,
  ExternalLink,
  ChevronRight,
  Award,
  Activity
} from 'lucide-react';

export default function InvestorCohortsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  const cohorts = [
    {
      id: 1,
      name: 'Mozambique Cohort #12',
      region: 'Maputo, Mozambique',
      program: 'Lwandi Surf & Code',
      status: 'active',
      students: 24,
      startDate: '2024-09-15',
      endDate: '2024-12-15',
      progress: 75,
      fundingUtilized: 85,
      totalFunding: '$45,000',
      instructor: 'Carlos Mendoza',
      skills: ['Web Development', 'Surfing', 'Entrepreneurship'],
      outcomes: {
        graduated: 18,
        employed: 15,
        startups: 3
      }
    },
    {
      id: 2,
      name: 'India Tech Bootcamp #8',
      region: 'Mumbai, India',
      program: 'Full-Stack Development',
      status: 'active',
      students: 18,
      startDate: '2024-10-01',
      endDate: '2025-01-31',
      progress: 45,
      fundingUtilized: 60,
      totalFunding: '$32,000',
      instructor: 'Priya Sharma',
      skills: ['React', 'Node.js', 'Blockchain'],
      outcomes: {
        graduated: 0,
        employed: 0,
        startups: 0
      }
    },
    {
      id: 3,
      name: 'Kenya Solar Program #5',
      region: 'Nairobi, Kenya',
      program: 'Solar Energy Training',
      status: 'completed',
      students: 15,
      startDate: '2024-06-01',
      endDate: '2024-09-30',
      progress: 100,
      fundingUtilized: 95,
      totalFunding: '$28,500',
      instructor: 'Grace Wanjiku',
      skills: ['Solar Installation', 'Maintenance', 'Business'],
      outcomes: {
        graduated: 15,
        employed: 12,
        startups: 2
      }
    },
    {
      id: 4,
      name: 'Brazil Fintech Accelerator #3',
      region: 'São Paulo, Brazil',
      program: 'Financial Technology',
      status: 'completed',
      students: 12,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      progress: 100,
      fundingUtilized: 92,
      totalFunding: '$38,000',
      instructor: 'Ana Rodriguez',
      skills: ['Blockchain', 'DeFi', 'Mobile Apps'],
      outcomes: {
        graduated: 12,
        employed: 10,
        startups: 4
      }
    },
    {
      id: 5,
      name: 'Ghana Agriculture Tech #2',
      region: 'Accra, Ghana',
      program: 'AgriTech Innovation',
      status: 'upcoming',
      students: 20,
      startDate: '2024-11-15',
      endDate: '2025-03-15',
      progress: 0,
      fundingUtilized: 0,
      totalFunding: '$42,000',
      instructor: 'Kwame Asante',
      skills: ['IoT', 'Data Analytics', 'Sustainable Farming'],
      outcomes: {
        graduated: 0,
        employed: 0,
        startups: 0
      }
    }
  ];

  const filteredCohorts = cohorts.filter(cohort => {
    const matchesStatus = filterStatus === 'all' || cohort.status === filterStatus;
    const matchesRegion = filterRegion === 'all' || cohort.region.toLowerCase().includes(filterRegion.toLowerCase());
    return matchesStatus && matchesRegion;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      case 'upcoming': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Cohorts Overview</h1>
          <p className="text-gray-400 text-lg">Track active and completed educational cohorts across regions</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Students Impacted</p>
          <p className="text-2xl font-bold text-[#00E0FF]">1,247</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Cohorts', value: '3', icon: Activity, color: 'from-green-500 to-emerald-500' },
          { label: 'Completed Programs', value: '23', icon: Award, color: 'from-blue-500 to-cyan-500' },
          { label: 'Success Rate', value: '87%', icon: Target, color: 'from-[#00E0FF] to-[#06B6D4]' },
          { label: 'Avg. Employment Rate', value: '82%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        
        <select
          value={filterRegion}
          onChange={(e) => setFilterRegion(e.target.value)}
          className="bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00E0FF]/50"
        >
          <option value="all">All Regions</option>
          <option value="mozambique">Mozambique</option>
          <option value="india">India</option>
          <option value="kenya">Kenya</option>
          <option value="brazil">Brazil</option>
          <option value="ghana">Ghana</option>
        </select>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCohorts.map((cohort) => (
          <div key={cohort.id} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#06B6D4]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-[#00E0FF]/30 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{cohort.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{cohort.region}</span>
                  </div>
                  <p className="text-sm text-[#00E0FF] mt-1">{cohort.program}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(cohort.status)}`}>
                  {cohort.status.charAt(0).toUpperCase() + cohort.status.slice(1)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-white font-medium">{cohort.progress}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#00E0FF] to-[#06B6D4] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${cohort.progress}%` }}
                  />
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Students</p>
                  <p className="text-lg font-bold text-white">{cohort.students}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Funding</p>
                  <p className="text-lg font-bold text-[#00E0FF]">{cohort.totalFunding}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Utilized</p>
                  <p className="text-lg font-bold text-green-400">{cohort.fundingUtilized}%</p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Skills Focus</p>
                <div className="flex flex-wrap gap-2">
                  {cohort.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 text-xs text-gray-300 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcomes (for completed cohorts) */}
              {cohort.status === 'completed' && (
                <div className="mb-4 p-3 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Outcomes</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-green-400 font-bold">{cohort.outcomes.graduated}</p>
                      <p className="text-gray-500">Graduated</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#00E0FF] font-bold">{cohort.outcomes.employed}</p>
                      <p className="text-gray-500">Employed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 font-bold">{cohort.outcomes.startups}</p>
                      <p className="text-gray-500">Startups</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(cohort.startDate).toLocaleDateString()}</span>
                </div>
                <span>→</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(cohort.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-sm">
                <span>View Full Report</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
