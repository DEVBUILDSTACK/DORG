"use client";

import React, { useState } from 'react';
import { 
  Shield, 
  Play, 
  Code2, 
  ExternalLink,
  Copy,
  AlertTriangle,
  CheckCircle,
  Settings,
  FileText,
  Zap,
  Hash,
  Key
} from 'lucide-react';

export default function SmartContractsPage() {
  const [selectedVault, setSelectedVault] = useState('sol30');
  const [activeTab, setActiveTab] = useState('read');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [functionParams, setFunctionParams] = useState({});
  const [txResult, setTxResult] = useState('');

  const vaults = {
    sol30: {
      name: 'SOL30 Vault',
      address: '7xK2mP4z2X9vQ8mR4nF6tY3sL1wE9cA7bH2dG8kM3pN6qR',
      chain: 'Solana',
      functions: {
        read: [
          { name: 'getVaultInfo', params: [], returns: 'VaultInfo' },
          { name: 'getTotalSupply', params: [], returns: 'u64' },
          { name: 'getUserBalance', params: [{ name: 'user', type: 'Pubkey' }], returns: 'u64' },
          { name: 'getCurrentApy', params: [], returns: 'u16' }
        ],
        write: [
          { name: 'deposit', params: [{ name: 'amount', type: 'u64' }], returns: 'Result' },
          { name: 'withdraw', params: [{ name: 'amount', type: 'u64' }], returns: 'Result' },
          { name: 'rebalance', params: [], returns: 'Result' }
        ]
      }
    },
    base10: {
      name: 'BASE10 Pool',
      address: '0x8f3e2d1c9b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2d1c9b',
      chain: 'Base',
      functions: {
        read: [
          { name: 'totalAssets', params: [], returns: 'uint256' },
          { name: 'balanceOf', params: [{ name: 'account', type: 'address' }], returns: 'uint256' },
          { name: 'previewDeposit', params: [{ name: 'assets', type: 'uint256' }], returns: 'uint256' }
        ],
        write: [
          { name: 'deposit', params: [{ name: 'assets', type: 'uint256' }, { name: 'receiver', type: 'address' }], returns: 'uint256' },
          { name: 'withdraw', params: [{ name: 'assets', type: 'uint256' }], returns: 'uint256' }
        ]
      }
    }
  };

  const selectedVaultData = vaults[selectedVault as keyof typeof vaults];
  const availableFunctions = selectedVaultData?.functions[activeTab as keyof typeof selectedVaultData.functions] || [];

  const executeFunction = async () => {
    setTxResult('Executing transaction...');
    
    setTimeout(() => {
      const mockTxHash = selectedVaultData.chain === 'Solana' 
        ? '5KJp7z2X9vQ8mR4nF6tY3sL1wE9cA7bH2dG8kM3pN6qR9mP4z2X9vQ8mR4nF6tY3sL1wE9cA7bH2dG8kM3pN6qR'
        : '0x8f3e2d1c9b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2d1c9b8f3e2d1c9b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2d1c9b';
      
      setTxResult(JSON.stringify({
        success: true,
        txHash: mockTxHash,
        gasUsed: selectedVaultData.chain === 'Solana' ? '5000 lamports' : '21000 gas',
        blockNumber: Math.floor(Math.random() * 1000000),
        timestamp: new Date().toISOString()
      }, null, 2));
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Smart Contract Access</h1>
          <p className="text-gray-400 text-lg font-mono">Direct interaction with deployed contracts</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-lg">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-mono">Contracts Verified</span>
        </div>
      </div>

      {/* Vault Selection */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Select Vault Contract</h2>
            <select
              value={selectedVault}
              onChange={(e) => setSelectedVault(e.target.value)}
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
            >
              <option value="sol30">SOL30 Vault (Solana)</option>
              <option value="base10">BASE10 Pool (Base)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">Contract Name</p>
              <p className="text-white font-mono">{selectedVaultData?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">Chain</p>
              <span className={`px-2 py-1 rounded text-sm font-mono ${
                selectedVaultData?.chain === 'Solana' ? 'bg-[#00D1FF]/20 text-[#00D1FF]' : 'bg-purple-500/20 text-purple-400'
              }`}>
                {selectedVaultData?.chain}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-mono mb-1">Contract Address</p>
              <div className="flex items-center space-x-2">
                <code className="text-[#00D1FF] font-mono text-sm">
                  {selectedVaultData?.address.slice(0, 8)}...{selectedVaultData?.address.slice(-6)}
                </code>
                <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                  <Copy className="w-3 h-3 text-gray-400" />
                </button>
                <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Function Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Function Selection */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-fit">
            {/* Read/Write Tabs */}
            <div className="flex items-center space-x-1 bg-gray-800/30 p-1 rounded-lg mb-4">
              {['read', 'write'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all font-mono ${
                    activeTab === tab
                      ? 'bg-[#00D1FF] text-black shadow-lg shadow-[#00D1FF]/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {tab === 'read' ? 'Read Functions' : 'Write Functions'}
                </button>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">Available Functions</h3>
            <div className="space-y-2">
              {availableFunctions.map((func, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFunction(func.name)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedFunction === func.name
                      ? 'bg-[#00D1FF]/20 border border-[#00D1FF]/30 text-[#00D1FF]'
                      : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-medium">{func.name}</span>
                    {activeTab === 'read' ? (
                      <FileText className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Zap className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    Returns: {func.returns}
                  </p>
                  {func.params.length > 0 && (
                    <p className="text-xs text-gray-500 font-mono mt-1">
                      Params: {func.params.map(p => p.name).join(', ')}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Function Execution */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Function Execution</h3>
                {selectedFunction && (
                  <button
                    onClick={executeFunction}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-white rounded-lg hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span className="font-mono">Execute Transaction</span>
                  </button>
                )}
              </div>

              {selectedFunction ? (
                <div className="space-y-6">
                  {/* Function Details */}
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h4 className="text-white font-mono font-medium mb-2">{selectedFunction}</h4>
                    <div className="text-sm text-gray-400 font-mono">
                      {availableFunctions.find(f => f.name === selectedFunction)?.params.length === 0 ? (
                        <p>No parameters required</p>
                      ) : (
                        <div className="space-y-2">
                          <p>Parameters:</p>
                          {availableFunctions.find(f => f.name === selectedFunction)?.params.map((param, index) => (
                            <div key={index} className="ml-4">
                              <label className="block text-gray-400 mb-1">{param.name} ({param.type})</label>
                              <input
                                type="text"
                                placeholder={`Enter ${param.name}...`}
                                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Result */}
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h4 className="text-white font-mono font-medium mb-2">Transaction Result</h4>
                    <div className="h-48 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-auto">
                      {txResult ? (
                        <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                          {txResult}
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <div className="text-center">
                            <Hash className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="font-mono text-sm">Execute a function to see results</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gas Estimation */}
                  {activeTab === 'write' && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="text-yellow-400 font-mono font-medium mb-1">Gas Estimation</h4>
                          <p className="text-sm text-gray-300 font-mono">
                            Estimated gas: {selectedVaultData?.chain === 'Solana' ? '5,000 lamports' : '21,000 gas units'}
                          </p>
                          <p className="text-xs text-gray-400 font-mono mt-1">
                            This is a write operation that will modify blockchain state
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-mono">Select a function to interact with the contract</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contract Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Security Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-mono">Contract Verified</span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-mono">Audit Status</span>
                <span className="text-green-400 font-mono">Passed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-mono">Last Updated</span>
                <span className="text-gray-300 font-mono">2024-10-15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-purple-400" />
              Contract Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-mono">Total Value Locked</span>
                <span className="text-[#00D1FF] font-mono font-bold">$2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-mono">Total Transactions</span>
                <span className="text-purple-400 font-mono">24,750</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-mono">Active Users</span>
                <span className="text-green-400 font-mono">1,247</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
