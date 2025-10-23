"use client";

import React, { useState } from 'react';
import { 
  Zap, 
  Link as LinkIcon, 
  TrendingUp, 
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Code2,
  Database,
  Play,
  FileText,
  ExternalLink,
  Copy,
  Terminal,
  GitBranch,
  Server
} from 'lucide-react';

export default function DeveloperOverviewPage() {
  const [apiStatus, setApiStatus] = useState('live');

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Developer <span className="bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] bg-clip-text text-transparent">Command Center</span>
            </h1>
            <p className="text-gray-400 text-lg font-mono">Build, test, and deploy with confidence</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Last deployment</p>
            <p className="text-sm text-[#00D1FF] font-mono">12 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Vault API Status', 
            value: 'Live', 
            subtext: '99.9% uptime', 
            icon: Zap, 
            color: 'from-green-500 to-emerald-500',
            bgColor: '#22c55e',
            status: 'live'
          },
          { 
            label: 'Chain Connected', 
            value: 'Multi', 
            subtext: 'Solana + Base', 
            icon: LinkIcon, 
            color: 'from-[#00D1FF] to-[#7C3AED]',
            bgColor: '#00D1FF',
            status: 'connected'
          },
          { 
            label: 'Active Vaults', 
            value: '2 Active', 
            subtext: '1 Test vault', 
            icon: Database, 
            color: 'from-purple-500 to-pink-500',
            bgColor: '#a855f7',
            status: 'active'
          },
          { 
            label: 'Latest Tx Volume', 
            value: '$124,230', 
            subtext: 'Last 24h', 
            icon: DollarSign, 
            color: 'from-yellow-500 to-orange-500',
            bgColor: '#eab308',
            status: 'volume'
          },
        ].map((metric, index) => (
          <div key={index} className="relative group">
            <div 
              className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" 
              style={{ background: `${metric.bgColor}20` }} 
            />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    metric.status === 'live' ? 'bg-green-400 animate-pulse' :
                    metric.status === 'connected' ? 'bg-[#00D1FF] animate-pulse' :
                    metric.status === 'active' ? 'bg-purple-400 animate-pulse' :
                    'bg-yellow-400 animate-pulse'
                  }`} />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-white font-mono">{metric.value}</p>
                <p className="text-sm text-gray-500 mt-1">{metric.subtext}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* API Success vs Error Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-[#00D1FF]/30 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-[#00D1FF]" />
                  API Call Success vs Error (Last 7 Days)
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                    <span className="text-sm text-gray-400 font-mono">Success</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <span className="text-sm text-gray-400 font-mono">Error</span>
                  </div>
                </div>
              </div>

              {/* Mock Chart Area */}
              <div className="h-64 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/5 to-[#7C3AED]/5" />
                <div className="text-center z-10">
                  <Activity className="w-16 h-16 text-[#00D1FF] mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg font-mono">API Performance Chart</p>
                  <p className="text-sm text-gray-500">Real-time success rate visualization</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-green-400 font-mono">99.2%</p>
                </div>
                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-sm text-gray-400">Avg Response</p>
                  <p className="text-2xl font-bold text-[#00D1FF] font-mono">142ms</p>
                </div>
                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-sm text-gray-400">Total Calls</p>
                  <p className="text-2xl font-bold text-purple-400 font-mono">24.7K</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Deployments */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <GitBranch className="w-5 h-5 mr-2 text-purple-400" />
              Recent Deployments
            </h3>
            <div className="space-y-3">
              {[
                { name: 'SOL30-Vault', chain: 'Solana', status: 'success', time: '12m ago', build: '2.1s' },
                { name: 'BASE10-Pool', chain: 'Base', status: 'success', time: '1h ago', build: '1.8s' },
                { name: 'Test-Vault-v2', chain: 'Solana', status: 'failed', time: '3h ago', build: '0.9s' },
                { name: 'Analytics-API', chain: 'Multi', status: 'success', time: '6h ago', build: '3.2s' },
              ].map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      deployment.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-white font-mono group-hover:text-[#00D1FF] transition-colors">
                        {deployment.name}
                      </p>
                      <p className="text-xs text-gray-400">{deployment.chain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-mono">{deployment.time}</p>
                    <p className="text-xs text-gray-400 font-mono">Build: {deployment.build}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#00D1FF] hover:text-[#7C3AED] transition-colors text-sm font-medium flex items-center justify-center font-mono">
              View All Deployments
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Open API Playground', 
            description: 'Test endpoints and view responses', 
            icon: Code2, 
            color: 'from-[#00D1FF] to-[#7C3AED]',
            href: '/dashboard/developer/api'
          },
          { 
            title: 'View Vault Schema (JSON)', 
            description: 'Explore data structures and types', 
            icon: FileText, 
            color: 'from-green-500 to-emerald-500',
            action: 'schema'
          },
          { 
            title: 'Test Contract Function', 
            description: 'Execute smart contract methods', 
            icon: Terminal, 
            color: 'from-purple-500 to-pink-500',
            href: '/dashboard/developer/contracts'
          },
        ].map((action, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all group-hover:transform group-hover:scale-105">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} w-fit mb-4 shadow-lg`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-mono">{action.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{action.description}</p>
              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-2 text-[#00D1FF] hover:text-[#7C3AED] transition-colors font-mono text-sm">
                  <Play className="w-4 h-4" />
                  <span>Execute</span>
                </button>
                {action.action === 'schema' && (
                  <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Health Status */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Server className="w-5 h-5 mr-2 text-green-400" />
              System Health
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400 font-mono">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { service: 'Vault API', status: 'Operational', uptime: '99.9%', response: '142ms' },
              { service: 'Solana RPC', status: 'Operational', uptime: '99.8%', response: '89ms' },
              { service: 'Base RPC', status: 'Operational', uptime: '99.7%', response: '156ms' },
              { service: 'Analytics DB', status: 'Operational', uptime: '100%', response: '23ms' },
            ].map((service, index) => (
              <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white font-mono">{service.service}</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-400 font-mono">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Response</span>
                    <span className="text-[#00D1FF] font-mono">{service.response}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
