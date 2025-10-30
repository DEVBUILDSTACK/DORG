"use client";

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Code2, 
  FileText,
  Zap,
  Copy,
  Download,
  Settings,
  MessageCircle,
  Sparkles,
  Terminal,
  Book,
  ChevronRight
} from 'lucide-react';

export default function AIAssistantPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your DevVault AI Assistant. I can help you with vault protocols, API documentation, and code examples. What would you like to know?',
      timestamp: new Date().toISOString()
    }
  ]);

  const quickPrompts = [
    'Show me example code to deposit USDC into BASE10 vault',
    'Explain the rebalance logic for SOL30 vault',
    'Generate curl request for vault analytics API',
    'How do I handle transaction errors in Solana?',
    'What are the gas optimization strategies?',
    'Show me the vault contract ABI structure'
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: 'assistant',
        content: generateAIResponse(message),
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1500);

    setMessage('');
  };

  const generateAIResponse = (userMessage: string) => {
    if (userMessage.toLowerCase().includes('deposit') && userMessage.toLowerCase().includes('usdc')) {
      return `Here's an example of depositing USDC into the BASE10 vault:

\`\`\`javascript
// Using ethers.js
const vaultContract = new ethers.Contract(
  "0x8f3e2d1c9b7a6e5f4d3c2b1a9e8d7c6b5a4f3e2d1c9b",
  vaultABI,
  signer
);

const amount = ethers.utils.parseUnits("1000", 6); // 1000 USDC
const tx = await vaultContract.deposit(amount, userAddress);
await tx.wait();
\`\`\`

Key points:
- Ensure USDC approval before deposit
- Amount should be in wei (6 decimals for USDC)
- Always handle transaction failures`;
    }

    if (userMessage.toLowerCase().includes('curl') && userMessage.toLowerCase().includes('analytics')) {
      return `Here's a curl request for the vault analytics API:

\`\`\`bash
curl -X GET "https://api.devvault.com/v1/analytics" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -G \\
  -d "vault=all" \\
  -d "timeframe=30d"
\`\`\`

Response includes:
- Total TVL across all vaults
- Average APY calculations
- Transaction volume metrics
- Risk assessment data`;
    }

    return `I understand you're asking about "${userMessage}". Here are some helpful resources:

• Check the API documentation for detailed examples
• Review the smart contract functions in the Contracts section
• Use the API Playground to test endpoints interactively

Would you like me to provide more specific guidance on any particular aspect?`;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-[#5A6C7D]">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#FF6B35] font-medium">AI Assistant</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">AI <span className="text-[#FF6B35]">Assistant</span></h1>
          <p className="text-[#5A6C7D] text-lg">Your intelligent development companion</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-[#A855F7]/10 rounded-lg border border-[#A855F7]/20">
          <Sparkles className="w-4 h-4 text-[#A855F7]" />
          <span className="text-sm text-[#A855F7] font-medium">AI Powered</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-[#FF6B35]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 h-full flex flex-col hover:shadow-lg transition-all">
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-[#FF6B35] text-white ml-4 shadow-md' 
                        : 'bg-[#F9FAFB] text-[#1F2937] mr-4 border border-[#E5E7EB]'
                    }`}>
                      {msg.type === 'assistant' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4 text-[#A855F7]" />
                          <span className="text-sm text-[#A855F7] font-medium">DevVault AI</span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-sm">
                        {msg.content}
                      </div>
                      {msg.content.includes('```') && (
                        <button className="mt-2 flex items-center space-x-1 text-xs text-[#5A6C7D] hover:text-[#1F2937] transition-colors">
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask about vault protocols, APIs, or request code examples..."
                    className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:border-[#FF6B35]"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="p-3 bg-[#FF6B35] text-white rounded-xl hover:bg-[#E65A2D] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Prompts */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#A855F7]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-[#A855F7]" />
                Quick Prompts
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(prompt)}
                    className="w-full text-left p-3 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg transition-colors text-sm text-[#5A6C7D] hover:text-[#1F2937]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#2E865F]/5 rounded-2xl blur-xl" />
            <div className="relative bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-[#2E865F]" />
                AI Capabilities
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Code2, label: 'Code Generation', desc: 'Smart contract interactions' },
                  { icon: FileText, label: 'Documentation', desc: 'API reference & guides' },
                  { icon: Terminal, label: 'Debugging Help', desc: 'Error analysis & solutions' },
                  { icon: Book, label: 'Best Practices', desc: 'Security & optimization tips' }
                ].map((capability, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <capability.icon className="w-4 h-4 text-[#5A6C7D] mt-1" />
                    <div>
                      <p className="text-[#1F2937] font-medium text-sm">{capability.label}</p>
                      <p className="text-[#5A6C7D] text-xs">{capability.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg transition-colors">
            <Download className="w-4 h-4 text-[#5A6C7D]" />
            <span className="text-sm text-[#1F2937]">Export Chat</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4 text-[#5A6C7D]" />
            <span className="text-sm text-[#1F2937]">Clear History</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] rounded-lg transition-colors">
          <Settings className="w-4 h-4 text-[#5A6C7D]" />
          <span className="text-sm text-[#1F2937]">AI Settings</span>
        </button>
      </div>
    </div>
  );
}
