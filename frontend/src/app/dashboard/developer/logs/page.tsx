"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  Filter, 
  Download, 
  Play,
  Pause,
  AlertTriangle,
  Info,
  AlertCircle,
  ExternalLink,
  Search,
  Calendar,
  Hash,
  Activity
} from 'lucide-react';

export default function OnChainLogsPage() {
  const [isLiveFeed, setIsLiveFeed] = useState(true);
  const [selectedVault, setSelectedVault] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedChain, setSelectedChain] = useState('all');

  const logs = [
    {
      id: 1,
      timestamp: '2024-10-23T06:08:23.456Z',
      vault: 'SOL30',
      chain: 'Solana',
      txHash: '5KJp7z2X9vQ8mR4nF6tY3sL1wE9cA7bH2dG8kM3pN6qR',
      event: 'Deposit',
      severity: 'info',
      message: 'User deposited 1000 USDC into SOL30 vault',
      amount: '$1,000',
      user: '7xK2...9mP4'
    },
    {
      id: 2,
      timestamp: '2024-10-23T06:07:45.123Z',
      vault: 'BASE10',
      chain: 'Base',
      txHash: '0x8f3e2d1c9b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2d1c9b',
      event: 'Rebalance',
      severity: 'info',
      message: 'Automated rebalance executed successfully',
      amount: '$45,230',
      user: 'System'
    },
    {
      id: 3,
      timestamp: '2024-10-23T06:06:12.789Z',
      vault: 'SOL30',
      chain: 'Solana',
      txHash: '9mP4z2X9vQ8mR4nF6tY3sL1wE9cA7bH2dG8kM3pN6qR',
      event: 'Withdrawal',
      severity: 'warning',
      message: 'Large withdrawal detected - manual review required',
      amount: '$25,000',
      user: '3xK2...7mP9'
    },
    {
      id: 4,
      timestamp: '2024-10-23T06:05:34.567Z',
      vault: 'BASE10',
      chain: 'Base',
      txHash: '0x2d1c9b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2d1c9b8f3e',
      event: 'Error',
      severity: 'error',
      message: 'Transaction failed: Insufficient gas fee',
      amount: '$0',
      user: '5xK2...1mP6'
    },
    {
      id: 5,
      timestamp: '2024-10-23T06:04:56.234Z',
      vault: 'SOL30',
      chain: 'Solana',
      txHash: '6qRz2X9vQ8mR4nF6tY3sL1wE9cA7bH2dG8kM3pN6qR5K',
      event: 'Yield Distribution',
      severity: 'info',
      message: 'Weekly yield distributed to all vault participants',
      amount: '$12,450',
      user: 'System'
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getChainColor = (chain: string) => {
    switch (chain) {
      case 'Solana': return 'text-[#FF6B35] bg-[#FFE8E0]';
      case 'Base': return 'text-[#A855F7] bg-[#A855F7]/10';
      default: return 'text-[#5A6C7D] bg-[#F9FAFB]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">On-Chain <span className="text-[#FF6B35]">Logs</span></h1>
          <p className="text-[#5A6C7D] text-lg font-mono">Real-time blockchain events and transactions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiveFeed(!isLiveFeed)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              isLiveFeed 
                ? 'bg-[#2E865F]/10 text-[#2E865F] border border-[#2E865F]/30' 
                : 'bg-[#F9FAFB] text-[#5A6C7D] hover:bg-white border border-[#E5E7EB]'
            }`}
          >
            {isLiveFeed ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="font-mono">{isLiveFeed ? 'Live Feed ON' : 'Live Feed OFF'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#E65A2D] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all">
            <Download className="w-4 h-4" />
            <span className="font-mono">Export Logs</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#5A6C7D]" />
              <span className="text-sm text-[#5A6C7D] font-mono">Filters:</span>
            </div>
            
            <select
              value={selectedVault}
              onChange={(e) => setSelectedVault(e.target.value)}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            >
              <option value="all">All Vaults</option>
              <option value="SOL30">SOL30</option>
              <option value="BASE10">BASE10</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            >
              <option value="all">All Severity</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>

            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[#1F2937] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            >
              <option value="all">All Chains</option>
              <option value="Solana">Solana</option>
              <option value="Base">Base</option>
            </select>

            <div className="flex-1" />

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5A6C7D] w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-10 pr-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#1F2937] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-lg">
          
          {/* Live Feed Indicator */}
          {isLiveFeed && (
            <div className="px-6 py-3 bg-[#2E865F]/10 border-b border-[#2E865F]/20 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#2E865F] animate-pulse" />
              <span className="text-[#2E865F] font-mono text-sm">Real-time feed active</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-[#2E865F] rounded-full animate-ping" />
                <div className="w-1 h-1 bg-[#2E865F] rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-1 bg-[#2E865F] rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Vault</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Chain</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Severity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#5A6C7D] font-mono">Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                        <span className="text-sm text-[#1F2937] font-mono">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#1F2937] font-mono">{log.vault}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium font-mono ${getChainColor(log.chain)}`}>
                        {log.chain}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#1F2937] font-mono">{log.event}</span>
                      {log.amount !== '$0' && (
                        <div className="text-xs text-[#FF6B35] font-mono">{log.amount}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(log.severity)}
                        <span className={`px-2 py-1 rounded text-xs font-medium font-mono ${getSeverityColor(log.severity)}`}>
                          {log.severity.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#1F2937] max-w-xs truncate">{log.message}</p>
                      <p className="text-xs text-[#9CA3AF] font-mono">User: {log.user}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-3 h-3 text-[#9CA3AF]" />
                        <code className="text-xs text-[#FF6B35] font-mono">
                          {log.txHash.slice(0, 8)}...{log.txHash.slice(-6)}
                        </code>
                        <button className="p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                          <ExternalLink className="w-3 h-3 text-[#5A6C7D]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="text-sm text-[#5A6C7D] font-mono">
              Showing 1-5 of 2,847 logs
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded text-sm font-mono transition-colors text-[#5A6C7D]">
                Previous
              </button>
              <span className="px-3 py-1 bg-[#FF6B35] text-white rounded text-sm font-mono">1</span>
              <button className="px-3 py-1 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded text-sm font-mono transition-colors text-[#5A6C7D]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Events Today', value: '2,847', icon: FileText, color: 'from-[#FF6B35] to-[#E65A2D]' },
          { label: 'Error Rate', value: '0.3%', icon: AlertCircle, color: 'from-red-500 to-orange-500' },
          { label: 'Avg Response Time', value: '142ms', icon: Activity, color: 'from-[#2E865F] to-emerald-500' },
          { label: 'Active Chains', value: '2', icon: Hash, color: 'from-[#A855F7] to-pink-500' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all group-hover:transform group-hover:scale-105 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-[#5A6C7D] text-sm mb-1 font-mono">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1F2937] font-mono">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
