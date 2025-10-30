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
          <h1 className="text-3xl font-bold text-[#1F2937]">Smart Contract <span className="text-[#FF6B35]">Access</span></h1>
          <p className="text-[#5A6C7D] text-lg font-mono">Direct interaction with deployed contracts</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-[#2E865F]/10 border border-[#2E865F]/20 rounded-lg">
          <Shield className="w-4 h-4 text-[#2E865F]" />
          <span className="text-sm text-[#2E865F] font-mono">Contracts Verified</span>
        </div>
      </div>

      {/* Vault Selection */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1F2937]">Select Vault Contract</h2>
            <select
              value={selectedVault}
              onChange={(e) => setSelectedVault(e.target.value)}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2 text-[#1F2937] font-mono focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            >
              <option value="sol30">SOL30 Vault (Solana)</option>
              <option value="base10">BASE10 Pool (Base)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-[#5A6C7D] font-mono mb-1">Contract Name</p>
              <p className="text-[#1F2937] font-mono font-medium">{selectedVaultData?.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#5A6C7D] font-mono mb-1">Chain</p>
              <span className={`px-2 py-1 rounded text-sm font-mono ${
                selectedVaultData?.chain === 'Solana' ? 'bg-[#FFE8E0] text-[#FF6B35]' : 'bg-[#A855F7]/10 text-[#A855F7]'
              }`}>
                {selectedVaultData?.chain}
              </span>
            </div>
            <div>
              <p className="text-sm text-[#5A6C7D] font-mono mb-1">Contract Address</p>
              <div className="flex items-center space-x-2">
                <code className="text-[#FF6B35] font-mono text-sm">
                  {selectedVaultData?.address.slice(0, 8)}...{selectedVaultData?.address.slice(-6)}
                </code>
                <button className="p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                  <Copy className="w-3 h-3 text-[#5A6C7D]" />
                </button>
                <button className="p-1 hover:bg-[#F9FAFB] rounded transition-colors">
                  <ExternalLink className="w-3 h-3 text-[#5A6C7D]" />
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
          <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 h-fit shadow-lg">
            {/* Read/Write Tabs */}
            <div className="flex items-center space-x-1 bg-[#F9FAFB] p-1 rounded-lg mb-4 border border-[#E5E7EB]">
              {['read', 'write'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all font-mono ${
                    activeTab === tab
                      ? 'bg-[#FF6B35] text-white shadow-lg'
                      : 'text-[#5A6C7D] hover:text-[#1F2937] hover:bg-white'
                  }`}
                >
                  {tab === 'read' ? 'Read Functions' : 'Write Functions'}
                </button>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Available Functions</h3>
            <div className="space-y-2">
              {availableFunctions.map((func, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFunction(func.name)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedFunction === func.name
                      ? 'bg-[#FFE8E0] border border-[#FF6B35]/30 text-[#FF6B35]'
                      : 'bg-[#F9FAFB] hover:bg-white text-[#5A6C7D] border border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-medium">{func.name}</span>
                    {activeTab === 'read' ? (
                      <FileText className="w-4 h-4 text-[#5A6C7D]" />
                    ) : (
                      <Zap className="w-4 h-4 text-[#F59E0B]" />
                    )}
                  </div>
                  <p className="text-xs text-[#5A6C7D] font-mono">
                    Returns: {func.returns}
                  </p>
                  {func.params.length > 0 && (
                    <p className="text-xs text-[#9CA3AF] font-mono mt-1">
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
            <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F2937]">Function Execution</h3>
                {selectedFunction && (
                  <button
                    onClick={executeFunction}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#E65A2D] text-white rounded-lg hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span className="font-mono">Execute Transaction</span>
                  </button>
                )}
              </div>

              {selectedFunction ? (
                <div className="space-y-6">
                  {/* Function Details */}
                  <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                    <h4 className="text-[#1F2937] font-mono font-medium mb-2">{selectedFunction}</h4>
                    <div className="text-sm text-[#5A6C7D] font-mono">{availableFunctions.find(f => f.name === selectedFunction)?.params.length === 0 ? (
                        <p>No parameters required</p>
                      ) : (
                        <div className="space-y-2">
                          <p>Parameters:</p>
                          {availableFunctions.find(f => f.name === selectedFunction)?.params.map((param, index) => (
                            <div key={index} className="ml-4">
                              <label className="block text-[#5A6C7D] mb-1">{param.name} ({param.type})</label>
                              <input
                                type="text"
                                placeholder={`Enter ${param.name}...`}
                                className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#1F2937] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Result */}
                  <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
                    <h4 className="text-[#1F2937] font-mono font-medium mb-2">Transaction Result</h4>
                    <div className="h-48 bg-white border border-[#E5E7EB] rounded-lg p-4 overflow-auto">
                      {txResult ? (
                        <pre className="text-sm font-mono text-[#1F2937] whitespace-pre-wrap">
                          {txResult}
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#9CA3AF]">
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
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-yellow-700 font-mono font-medium mb-1">Gas Estimation</h4>
                          <p className="text-sm text-yellow-800 font-mono">
                            Estimated gas: {selectedVaultData?.chain === 'Solana' ? '5,000 lamports' : '21,000 gas units'}
                          </p>
                          <p className="text-xs text-yellow-600 font-mono mt-1">
                            This is a write operation that will modify blockchain state
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-[#9CA3AF]">
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
          <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-[#2E865F]" />
              Security Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#5A6C7D] font-mono">Contract Verified</span>
                <CheckCircle className="w-4 h-4 text-[#2E865F]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A6C7D] font-mono">Audit Status</span>
                <span className="text-[#2E865F] font-mono">Passed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A6C7D] font-mono">Last Updated</span>
                <span className="text-[#1F2937] font-mono">2024-10-15</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-[#A855F7]" />
              Contract Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[#5A6C7D] font-mono">Total Value Locked</span>
                <span className="text-[#FF6B35] font-mono font-bold">$2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A6C7D] font-mono">Total Transactions</span>
                <span className="text-[#A855F7] font-mono">24,750</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5A6C7D] font-mono">Active Users</span>
                <span className="text-[#2E865F] font-mono">1,247</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
