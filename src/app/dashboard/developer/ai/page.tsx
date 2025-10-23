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
  Book
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Assistant</h1>
          <p className="text-gray-400 text-lg font-mono">Your intelligent development companion</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-[#7C3AED]/20 rounded-lg">
          <Sparkles className="w-4 h-4 text-[#7C3AED]" />
          <span className="text-sm text-[#7C3AED] font-mono">AI Powered</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/10 to-[#7C3AED]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-full flex flex-col">
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-[#00D1FF] text-black ml-4' 
                        : 'bg-gray-800/50 text-white mr-4'
                    }`}>
                      {msg.type === 'assistant' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4 text-[#7C3AED]" />
                          <span className="text-sm text-[#7C3AED] font-mono">DevVault AI</span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap font-mono text-sm">
                        {msg.content}
                      </div>
                      {msg.content.includes('```') && (
                        <button className="mt-2 flex items-center space-x-1 text-xs opacity-70 hover:opacity-100 transition-opacity">
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00D1FF]/50"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="p-3 bg-gradient-to-r from-[#00D1FF] to-[#7C3AED] text-white rounded-xl hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all disabled:opacity-50"
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-400" />
                Quick Prompts
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(prompt)}
                    className="w-full text-left p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-colors text-sm font-mono text-gray-300 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Bot className="w-5 h-5 mr-2 text-green-400" />
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
                    <capability.icon className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-white font-mono text-sm">{capability.label}</p>
                      <p className="text-gray-400 text-xs font-mono">{capability.desc}</p>
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span className="font-mono text-sm">Export Chat</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="font-mono text-sm">Clear History</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          <span className="font-mono text-sm">AI Settings</span>
        </button>
      </div>
    </div>
  );
}
