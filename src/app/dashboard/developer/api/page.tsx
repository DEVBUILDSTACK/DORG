"use client";

import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  Copy, 
  Download,
  Settings,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Zap,
  Database,
  Key,
  Globe
} from 'lucide-react';

export default function APIPlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('get-vaults');
  const [activeTab, setActiveTab] = useState('headers');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    {
      id: 'get-vaults',
      method: 'GET',
      path: '/api/v1/vaults',
      description: 'Retrieve all active vaults',
      category: 'Vaults'
    },
    {
      id: 'get-vault-details',
      method: 'GET',
      path: '/api/v1/vaults/{id}',
      description: 'Get specific vault details',
      category: 'Vaults'
    },
    {
      id: 'post-deposit',
      method: 'POST',
      path: '/api/v1/vaults/{id}/deposit',
      description: 'Deposit funds into vault',
      category: 'Transactions'
    },
    {
      id: 'post-withdraw',
      method: 'POST',
      path: '/api/v1/vaults/{id}/withdraw',
      description: 'Withdraw funds from vault',
      category: 'Transactions'
    },
    {
      id: 'get-analytics',
      method: 'GET',
      path: '/api/v1/analytics',
      description: 'Get vault performance analytics',
      category: 'Analytics'
    },
    {
      id: 'get-transactions',
      method: 'GET',
      path: '/api/v1/transactions',
      description: 'List recent transactions',
      category: 'Transactions'
    },
    {
      id: 'get-user-portfolio',
      method: 'GET',
      path: '/api/v1/user/portfolio',
      description: 'Get user portfolio summary',
      category: 'User'
    }
  ];

  const mockResponses = {
    'get-vaults': {
      status: 200,
      data: {
        vaults: [
          {
            id: "sol30",
            name: "SOL30 Vault",
            chain: "solana",
            apy: 18.5,
            tvl: 2400000,
            status: "active"
          },
          {
            id: "base10",
            name: "BASE10 Pool",
            chain: "base",
            apy: 22.3,
            tvl: 1800000,
            status: "active"
          }
        ],
        total: 2,
        timestamp: "2024-10-23T06:08:00Z"
      }
    },
    'get-analytics': {
      status: 200,
      data: {
        totalTvl: 4200000,
        avgApy: 20.4,
        totalTransactions: 24750,
        activeUsers: 1247,
        performance: {
          "7d": 12.3,
          "30d": 18.7,
          "90d": 24.1
        }
      }
    }
  };

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint);

  const executeRequest = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse = mockResponses[selectedEndpoint as keyof typeof mockResponses] || {
        status: 200,
        data: { message: "Success", timestamp: new Date().toISOString() }
      };
      
      setResponse(JSON.stringify(mockResponse, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  const generateCurlCommand = () => {
    const endpoint = selectedEndpointData;
    if (!endpoint) return '';
    
    const baseUrl = 'https://api.devvault.com';
    let curl = `curl -X ${endpoint.method} "${baseUrl}${endpoint.path}"`;
    curl += ` \\\n  -H "Authorization: Bearer YOUR_API_KEY"`;
    curl += ` \\\n  -H "Content-Type: application/json"`;
    
    if (endpoint.method === 'POST' && requestBody) {
      curl += ` \\\n  -d '${requestBody}'`;
    }
    
    return curl;
  };

  const generateJSFetch = () => {
    const endpoint = selectedEndpointData;
    if (!endpoint) return '';
    
    const baseUrl = 'https://api.devvault.com';
    let js = `fetch('${baseUrl}${endpoint.path}', {\n`;
    js += `  method: '${endpoint.method}',\n`;
    js += `  headers: {\n`;
    js += `    'Authorization': 'Bearer YOUR_API_KEY',\n`;
    js += `    'Content-Type': 'application/json'\n`;
    js += `  }`;
    
    if (endpoint.method === 'POST' && requestBody) {
      js += `,\n  body: JSON.stringify(${requestBody})`;
    }
    
    js += `\n})\n.then(response => response.json())\n.then(data => console.log(data));`;
    
    return js;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">API Playground</h1>
          <p className="text-gray-400 text-lg font-mono">Test endpoints and explore responses</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-mono">API Online</span>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-200px)]">
        {/* Left Panel - Endpoint List */}
        <div className="lg:col-span-2">
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-full overflow-hidden flex flex-col">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-[#00D1FF]" />
                API Endpoints
              </h2>
              
              <div className="flex-1 overflow-y-auto space-y-2">
                {['Vaults', 'Transactions', 'Analytics', 'User'].map(category => (
                  <div key={category} className="mb-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2 font-mono">{category}</h3>
                    <div className="space-y-1">
                      {endpoints.filter(e => e.category === category).map(endpoint => (
                        <button
                          key={endpoint.id}
                          onClick={() => setSelectedEndpoint(endpoint.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            selectedEndpoint === endpoint.id
                              ? 'bg-[#00D1FF]/20 border border-[#00D1FF]/30 text-[#00D1FF]'
                              : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs px-2 py-1 rounded font-mono ${
                              endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                              endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {endpoint.method}
                            </span>
                          </div>
                          <p className="text-sm font-mono mb-1">{endpoint.path}</p>
                          <p className="text-xs text-gray-400">{endpoint.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Request Editor & Response */}
        <div className="lg:col-span-3">
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-full overflow-hidden flex flex-col">
              
              {/* Request Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-white">Request Builder</h2>
                  {selectedEndpointData && (
                    <span className={`text-xs px-2 py-1 rounded font-mono ${
                      selectedEndpointData.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedEndpointData.method}
                    </span>
                  )}
                </div>
                <button
                  onClick={executeRequest}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-white rounded-lg hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all disabled:opacity-50"
                >
                  {isLoading ? <Clock className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span className="font-mono">{isLoading ? 'Executing...' : 'Execute'}</span>
                </button>
              </div>

              {/* URL Display */}
              {selectedEndpointData && (
                <div className="mb-4 p-3 bg-gray-800/30 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1 font-mono">Endpoint URL</p>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 text-[#00D1FF] font-mono text-sm">
                      https://api.devvault.com{selectedEndpointData.path}
                    </code>
                    <button className="p-1 hover:bg-gray-700/50 rounded transition-colors">
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="flex items-center space-x-1 bg-gray-800/30 p-1 rounded-lg mb-4">
                {['headers', 'body', 'response'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all font-mono ${
                      activeTab === tab
                        ? 'bg-[#00D1FF] text-black shadow-lg shadow-[#00D1FF]/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                {activeTab === 'headers' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2 font-mono">Authorization</label>
                        <input
                          type="text"
                          placeholder="Bearer YOUR_API_KEY"
                          className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2 font-mono">Content-Type</label>
                        <select className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50">
                          <option>application/json</option>
                          <option>application/x-www-form-urlencoded</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'body' && (
                  <div className="h-full">
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder={selectedEndpointData?.method === 'POST' ? 
                        '{\n  "amount": 1000,\n  "token": "USDC"\n}' : 
                        'Request body not needed for GET requests'
                      }
                      disabled={selectedEndpointData?.method === 'GET'}
                      className="w-full h-full p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50 disabled:opacity-50"
                    />
                  </div>
                )}

                {activeTab === 'response' && (
                  <div className="h-full">
                    <div className="h-full bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 overflow-auto">
                      {response ? (
                        <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                          {response}
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <div className="text-center">
                            <Code2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="font-mono">Execute a request to see the response</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Code Generation */}
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400 font-mono">Code Examples</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-colors text-sm">
                    <span className="font-mono">cURL</span>
                    <Copy className="w-3 h-3" />
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-colors text-sm">
                    <span className="font-mono">JavaScript</span>
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
