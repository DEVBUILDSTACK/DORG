'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  PieChart, 
  BarChart3,
  ChevronRight,
  CheckCircle,
  Lock,
  Zap,
  Eye,
  Target,
  Wallet
} from '@/components/icons';

export default function InvestorLandingPage() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Transparent",
      description: "All vaults are audited and secured by battle-tested smart contracts on the blockchain.",
      color: "from-[#2E865F] to-[#1E5A42]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "High-Yield Returns",
      description: "Access AI-powered vaults with optimized strategies for maximum returns.",
      color: "from-[#FF6B35] to-[#CC5629]"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Diversified Portfolio",
      description: "Spread your investments across multiple strategies to minimize risk.",
      color: "from-[#0A4A7A] to-[#083A5E]"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Track your investments with comprehensive analytics and performance metrics.",
      color: "from-[#0A4A7A] to-[#2E865F]"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Non-Custodial",
      description: "You maintain full control of your assets. Withdraw anytime, no lock-ups.",
      color: "from-[#FF6B35] to-[#0A4A7A]"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Deposits",
      description: "Start earning immediately with instant deposits and automated compounding.",
      color: "from-[#2E865F] to-[#FF6B35]"
    }
  ];

  const investmentSteps = [
    {
      step: "1",
      title: "Connect Wallet",
      description: "Securely connect your Web3 wallet to get started.",
      icon: <Wallet className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Browse Vaults",
      description: "Explore various vaults with different strategies and risk levels.",
      icon: <PieChart className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Deposit Funds",
      description: "Choose your vault and deposit funds to start earning.",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Track & Earn",
      description: "Monitor your portfolio and watch your investments grow.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const benefits = [
    "No minimum investment required",
    "Withdraw anytime, no penalties",
    "Automated yield optimization",
    "Gas-efficient transactions",
    "Multi-chain support",
    "Insurance coverage available",
    "24/7 customer support",
    "Tax reporting tools"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFBFC] to-white">
      <Navbar />
      
      <main className="relative pt-24">
      {/* Hero Section */}
      <section className="pt-8 pb-20 px-6 relative overflow-hidden bg-linear-to-br from-[#F0F9FF] to-white">
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#0A4A7A' : '#2E865F'} 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="relative inline-block group">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block px-4 py-2 bg-[#FFE8E0] border border-[#FF6B35] rounded-full text-[#CC5629] text-sm font-medium cursor-default"
              >
                💎For DAT Holders
              </motion.div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#0F0F0F]/95 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Digital Asset Treasury
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0F0F0F]/95"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#0A4A7A]">
              Automated Allocations
            </h1>

            <p className="text-xl md:text-2xl text-[#525252] max-w-3xl mx-auto leading-relaxed">
             Programmatically  Powered DAT DevVaults and Non-Custodial LPs with real-time analytics.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link
                href="/dashboard/investor"
                className="group px-8 py-4 bg-[#FF6B35] text-white rounded-full font-semibold hover:bg-[#CC5629] hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Allocate</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard/investor/portfolio"
                className="px-8 py-4 border-2 border-[#0A4A7A] text-[#0A4A7A] rounded-full hover:bg-[#0A4A7A] hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Vaults</span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto"
            >
              {[
                { value: "$5M+", label: "Total Value Locked" },
                { value: "25%", label: "Avg APY" },
                { value: "1000+", label: "Active Treasurys" },
                { value: "50+", label: "Vaults Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-white backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="text-3xl font-bold tabular-nums text-[#FF6B35]">{stat.value}</div>
                  <div className="text-sm text-[#737373]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Vaults Section */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Our Flagship Vaults
            </h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">
              Professional-grade DeFi treasury management across multiple chains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* SOL30 Vault */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative p-8 bg-white backdrop-blur-sm rounded-2xl border-2 border-gray-200 hover:border-[#9945FF] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#9945FF]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-xl bg-[#9945FF]/10 flex items-center justify-center">
                      <PieChart className="w-7 h-7 text-[#9945FF]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0F0F0F]">SOL30 Vault</h3>
                      <p className="text-sm text-[#737373]">Solana Ecosystem</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#2E865F]/10 text-[#2E865F] rounded-full text-xs font-semibold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Auditing</span>
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#737373]">Target APY</span>
                    <span className="text-xl font-bold text-[#2E865F] tabular-nums">12-15%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#737373]">Min. Investment</span>
                    <span className="font-semibold text-[#0F0F0F] tabular-nums">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#737373]">Strategy</span>
                    <span className="font-medium text-[#0F0F0F]">70/30 Split</span>
                  </div>
                </div>

                <p className="text-sm text-[#737373] mb-6">
                  30 diversified Solana tokens with 70% core holdings and 30% Meteora yield enhancement for optimal returns.
                </p>

                <Link
                  href="/dashboard/investor"
                  className="block w-full py-3 bg-[#9945FF] text-white rounded-xl text-center font-semibold hover:bg-[#8639E6] transition-colors group-hover:shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* BASE10 Vault */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative p-8 bg-white backdrop-blur-sm rounded-2xl border-2 border-gray-200 hover:border-[#0052FF] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#0052FF]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-xl bg-[#0052FF]/10 flex items-center justify-center">
                      <Shield className="w-7 h-7 text-[#0052FF]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0F0F0F]">BASE10 Vault</h3>
                      <p className="text-sm text-[#737373]">Base L2 Ecosystem</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#2E865F]/10 text-[#2E865F] rounded-full text-xs font-semibold flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Auditing</span>
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#737373]">Target APY</span>
                    <span className="text-xl font-bold text-[#2E865F] tabular-nums">10-13%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#737373]">Min. Investment</span>
                    <span className="font-semibold text-[#0F0F0F] tabular-nums">$1,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#737373]">Strategy</span>
                    <span className="font-medium text-[#0F0F0F]">70/30 Split</span>
                  </div>
                </div>

                <p className="text-sm text-[#737373] mb-6">
                  10 Base ecosystem tokens with gas-free transactions via Plasma integration for efficient portfolio management.
                </p>

                <Link
                  href="/dashboard/investor"
                  className="block w-full py-3 bg-[#0052FF] text-white rounded-xl text-center font-semibold hover:bg-[#0046DB] transition-colors group-hover:shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Thesis 35 Vault */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative p-8 bg-white backdrop-blur-sm rounded-2xl border-2 border-gray-200 hover:border-[#FF6B35] hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#FF6B35]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center">
                      <Target className="w-7 h-7 text-[#FF6B35]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0F0F0F]">Thesis 35 Vault</h3>
                      <p className="text-sm text-[#737373]">Multi-Asset Treasury</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-xs font-semibold">
                    Building
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#737373]">Target APY</span>
                    <span className="text-xl font-bold text-[#2E865F] tabular-nums">14-18%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#737373]">Min. Investment</span>
                    <span className="font-semibold text-[#0F0F0F] tabular-nums">$5,000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#737373]">Strategy</span>
                    <span className="font-medium text-[#0F0F0F]">35/65 Split</span>
                  </div>
                </div>

                <p className="text-sm text-[#737373] mb-6">
                  Institutional treasury with BTC, SOL, ETH, TAO exposure combined with Drift yield engine for enhanced returns.
                </p>

                <button
                  disabled
                  className="block w-full py-3 bg-gray-200 text-gray-500 rounded-xl text-center font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </motion.div>
          </div>

          {/* Third-Party Vaults Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-[#0F0F0F] mb-2">We Also List Third-Party Vaults</h4>
                <p className="text-[#737373]">
                  Access vetted DeFi vaults from top protocols across multiple chains. All third-party vaults undergo rigorous due diligence and security audits before listing on our platform.
                </p>
              </div>
              <Link
                href="/dashboard/investor/vaults"
                className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#CC5629] transition-colors whitespace-nowrap"
              >
                Explore All Vaults
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Why Invest With Us?
            </h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">
              Secure, transparent, and optimized for maximum returns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-6 bg-white backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-[#FF6B35] hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">{feature.title}</h3>
                <p className="text-[#737373]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Steps */}
      <section className="py-20 px-6 relative bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Start Investing in 4 Steps
            </h2>
            <p className="text-xl text-[#525252]">
              Simple, secure, and fast
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investmentSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {index < investmentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-linear-to-r from-[#0A4A7A] to-transparent" />
                )}

                <div className="relative p-6 bg-white backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-[#0A4A7A] hover:shadow-lg transition-all duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-[#FF6B35] to-[#CC5629] rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {item.step}
                  </div>

                  <div className="mt-4">
                    <div className="w-12 h-12 bg-[#FFE8E0] rounded-lg flex items-center justify-center text-[#FF6B35] mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">{item.title}</h3>
                    <p className="text-[#737373] text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-6">
                Built for Smart Investors
              </h2>
              <p className="text-xl text-[#525252] mb-8">
                Everything you need to grow your wealth in DeFi
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2E865F] shrink-0" />
                    <span className="text-[#525252]">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative p-8 bg-white rounded-3xl border-2 border-[#0A4A7A] shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Portfolio Value</span>
                    <span className="text-[#0A4A7A] font-bold tabular-nums">$125,430</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Total Earned</span>
                    <span className="text-[#2E865F] font-bold tabular-nums">+$15,230</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Active Vaults</span>
                    <span className="text-[#0A4A7A] font-bold tabular-nums">5</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                    <span className="text-[#525252]">Avg APY</span>
                    <span className="text-[#FF6B35] font-bold tabular-nums">28.5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-linear-to-br from-[#0A4A7A] to-[#083A5E] rounded-3xl border-2 border-[#0D5C94] text-center shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Grow Your Wealth?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Join thousands of investors earning passive income through DeFi
              </p>

              <Link
                href="/dashboard/investor"
                className="inline-flex items-center space-x-2 px-10 py-5 bg-[#FF6B35] text-white rounded-full font-bold text-lg hover:bg-[#CC5629] hover:shadow-xl transition-all duration-300 group"
              >
                <span>Access Treasury Dashboard</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>

              <p className="text-sm text-gray-300 mt-6">
                No minimum investment • Withdraw anytime • Fully transparent
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
