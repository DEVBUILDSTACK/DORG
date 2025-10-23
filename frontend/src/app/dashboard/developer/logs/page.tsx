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
      case 'Solana': return 'text-[#00D1FF] bg-[#00D1FF]/20';
      case 'Base': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">On-Chain Logs</h1>
          <p className="text-gray-400 text-lg font-mono">Real-time blockchain events and transactions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLiveFeed(!isLiveFeed)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              isLiveFeed 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            {isLiveFeed ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="font-mono">{isLiveFeed ? 'Live Feed ON' : 'Live Feed OFF'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#00D1FF] text-black rounded-lg hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all">
            <Download className="w-4 h-4" />
            <span className="font-mono">Export Logs</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400 font-mono">Filters:</span>
            </div>
            
            <select
              value={selectedVault}
              onChange={(e) => setSelectedVault(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
            >
              <option value="all">All Vaults</option>
              <option value="SOL30">SOL30</option>
              <option value="BASE10">BASE10</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
            >
              <option value="all">All Severity</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>

            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
            >
              <option value="all">All Chains</option>
              <option value="Solana">Solana</option>
              <option value="Base">Base</option>
            </select>

            <div className="flex-1" />

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden">
          
          {/* Live Feed Indicator */}
          {isLiveFeed && (
            <div className="px-6 py-3 bg-green-500/10 border-b border-green-500/20 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-green-400 font-mono text-sm">Real-time feed active</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" />
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Vault</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Chain</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Severity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 font-mono">Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-sm text-gray-300 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white font-mono">{log.vault}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium font-mono ${getChainColor(log.chain)}`}>
                        {log.chain}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-mono">{log.event}</span>
                      {log.amount !== '$0' && (
                        <div className="text-xs text-[#00D1FF] font-mono">{log.amount}</div>
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
                      <p className="text-sm text-gray-300 max-w-xs truncate">{log.message}</p>
                      <p className="text-xs text-gray-500 font-mono">User: {log.user}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-3 h-3 text-gray-500" />
                        <code className="text-xs text-[#00D1FF] font-mono">
                          {log.txHash.slice(0, 8)}...{log.txHash.slice(-6)}
                        </code>
                        <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-700/50 flex items-center justify-between">
            <div className="text-sm text-gray-400 font-mono">
              Showing 1-5 of 2,847 logs
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 rounded text-sm font-mono transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 bg-[#00D1FF] text-black rounded text-sm font-mono">1</span>
              <button className="px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 rounded text-sm font-mono transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Events Today', value: '2,847', icon: FileText, color: 'from-[#00D1FF] to-[#7C3AED]' },
          { label: 'Error Rate', value: '0.3%', icon: AlertCircle, color: 'from-red-500 to-orange-500' },
          { label: 'Avg Response Time', value: '142ms', icon: Activity, color: 'from-green-500 to-emerald-500' },
          { label: 'Active Chains', value: '2', icon: Hash, color: 'from-purple-500 to-pink-500' },
        ].map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all group-hover:transform group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 font-mono">{stat.label}</p>
                <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
