"use client";

import React from 'react';
import { Activity, Code2, Database, DollarSign, CheckCircle, GitBranch, Server, Terminal, Play, Copy, ExternalLink } from 'lucide-react';

export default function DeveloperOverviewPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937]">
              Developer <span className="text-[#FF6B35]">Command Center</span>
            </h1>
            <p className="text-[#5A6C7D] text-lg">Build, test, and deploy with confidence</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#5A6C7D]">Last deployment</p>
            <p className="text-sm text-[#FF6B35] tabular-nums">12 minutes ago</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Vault API Status', value: 'Live', subtext: '99.9% uptime', icon: Activity, bgClass: 'bg-[#2E865F]/5' },
          { label: 'Chain Connected', value: 'Multi', subtext: 'Solana + Base', icon: Database, bgClass: 'bg-[#FF6B35]/5' },
          { label: 'Active Vaults', value: '2 Active', subtext: '1 Test vault', icon: Server, bgClass: 'bg-[#FF6B35]/5' },
          { label: 'Latest Tx Volume', value: '$124,230', subtext: 'Last 24h', icon: DollarSign, bgClass: 'bg-[#FF6B35]/5' },
        ].map((metric, index) => (
          <div key={index} className="relative group">
            <div className={cn("absolute inset-0 rounded-2xl blur-xl", metric.bgClass)} />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-xl shadow-md", metric.bgClass)}>
                  <metric.icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#2E865F] animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-[#5A6C7D] text-sm mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-[#1F2937] tabular-nums">{metric.value}</p>
                <p className="text-sm text-[#5A6C7D] mt-1 tabular-nums">{metric.subtext}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-[#FF6B35]" />
                  API Call Success Rate (Last 7 Days)
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#2E865F] rounded-full" />
                    <span className="text-sm text-[#5A6C7D]">Success</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#DC2626] rounded-full" />
                    <span className="text-sm text-[#5A6C7D]">Error</span>
                  </div>
                </div>
              </div>

              <div className="h-64 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <Activity className="w-16 h-16 text-[#FF6B35] mx-auto mb-4 opacity-50" />
                  <p className="text-[#5A6C7D] text-lg">API Performance Chart</p>
                  <p className="text-sm text-[#9CA3AF]">Real-time success rate visualization</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#5A6C7D]">Success Rate</p>
                  <p className="text-2xl font-bold text-[#2E865F] tabular-nums">99.2%</p>
                </div>
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#5A6C7D]">Avg Response</p>
                  <p className="text-2xl font-bold text-[#FF6B35] tabular-nums">142ms</p>
                </div>
                <div className="text-center p-3 bg-[#F9FAFB] rounded-lg">
                  <p className="text-sm text-[#5A6C7D]">Total Calls</p>
                  <p className="text-2xl font-bold text-[#FF6B35] tabular-nums">24.7K</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
          <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
              <GitBranch className="w-5 h-5 mr-2 text-[#FF6B35]" />
              Recent Deployments
            </h3>
            <div className="space-y-3">
              {[
                { name: 'SOL30-Vault', chain: 'Solana', status: 'success', time: '12m ago', build: '2.1s' },
                { name: 'BASE10-Pool', chain: 'Base', status: 'success', time: '1h ago', build: '1.8s' },
                { name: 'Test-Vault-v2', chain: 'Solana', status: 'failed', time: '3h ago', build: '0.9s' },
                { name: 'Analytics-API', chain: 'Multi', status: 'success', time: '6h ago', build: '3.2s' },
              ].map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      deployment.status === 'success' ? "bg-[#2E865F]" : "bg-[#DC2626]"
                    )} />
                    <div>
                      <p className="text-sm font-medium text-[#1F2937]">{deployment.name}</p>
                      <p className="text-xs text-[#5A6C7D]">{deployment.chain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#9CA3AF] tabular-nums">{deployment.time}</p>
                    <p className="text-xs text-[#5A6C7D] tabular-nums">Build: {deployment.build}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium flex items-center justify-center">
              View All Deployments
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Open API Playground', description: 'Test endpoints and view responses', icon: Code2 },
          { title: 'View Vault Schema (JSON)', description: 'Explore data structures and types', icon: Database },
          { title: 'Test Contract Function', description: 'Execute smart contract methods', icon: Terminal },
        ].map((action, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="p-3 rounded-xl bg-[#FF6B35]/5 w-fit mb-4 shadow-sm">
                <action.icon className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">{action.title}</h3>
              <p className="text-[#5A6C7D] text-sm mb-4">{action.description}</p>
              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-2 text-[#FF6B35] hover:text-[#E65A2D] transition-colors text-sm font-medium">
                  <Play className="w-4 h-4" />
                  <span>Execute</span>
                </button>
                {index === 1 && (
                  <button className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors" aria-label="Copy schema">
                    <Copy className="w-4 h-4 text-[#5A6C7D]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#1F2937] flex items-center">
              <Server className="w-5 h-5 mr-2 text-[#2E865F]" />
              System Health
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#2E865F] rounded-full animate-pulse" />
              <span className="text-sm text-[#2E865F]">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { service: 'Vault API', status: 'Operational', uptime: '99.9%', response: '142ms' },
              { service: 'Solana RPC', status: 'Operational', uptime: '99.8%', response: '89ms' },
              { service: 'Base RPC', status: 'Operational', uptime: '99.7%', response: '156ms' },
              { service: 'Analytics DB', status: 'Operational', uptime: '100%', response: '23ms' },
            ].map((service, index) => (
              <div key={index} className="p-4 bg-[#F9FAFB] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1F2937]">{service.service}</span>
                  <CheckCircle className="w-4 h-4 text-[#2E865F]" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#5A6C7D]">Uptime</span>
                    <span className="text-[#2E865F] tabular-nums">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#5A6C7D]">Response</span>
                    <span className="text-[#FF6B35] tabular-nums">{service.response}</span>
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
