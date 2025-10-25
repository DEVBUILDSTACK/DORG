'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
} from 'lucide-react';

export default function InvestorLandingPage() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Transparent",
      description: "All vaults are audited and secured by battle-tested smart contracts on the blockchain.",
      color: "from-[#FACC15] to-[#F59E0B]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "High-Yield Returns",
      description: "Access AI-powered vaults with optimized strategies for maximum returns.",
      color: "from-[#00E0FF] to-[#0099CC]"
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Diversified Portfolio",
      description: "Spread your investments across multiple strategies to minimize risk.",
      color: "from-[#8B5CF6] to-[#6D28D9]"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Track your investments with comprehensive analytics and performance metrics.",
      color: "from-[#FF007A] to-[#CC0062]"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Non-Custodial",
      description: "You maintain full control of your assets. Withdraw anytime, no lock-ups.",
      color: "from-[#FACC15] to-[#FF007A]"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Deposits",
      description: "Start earning immediately with instant deposits and automated compounding.",
      color: "from-[#00E0FF] to-[#8B5CF6]"
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
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C14] via-[#1E3A8A]/10 to-[#0B0C14]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0C14]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#FACC15] to-[#1E3A8A] bg-clip-text text-transparent">
            Learn2Launch
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard/investor"
              className="px-6 py-2 bg-gradient-to-r from-[#FACC15] to-[#1E3A8A] text-white rounded-full font-semibold hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#FACC15' : '#1E3A8A'} 0%, transparent 70%)`,
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 bg-[#FACC15]/10 border border-[#FACC15]/30 rounded-full text-[#FACC15] text-sm font-medium"
            >
              💎 For Investors
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#FACC15] via-[#FFFFFF] to-[#1E3A8A] bg-clip-text text-transparent">
              Invest Intelligently
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Access AI-powered DeFi vaults with real-time analytics. 
              Grow your portfolio with secure, high-yield investments.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link
                href="/dashboard/investor"
                className="group px-8 py-4 bg-gradient-to-r from-[#FACC15] to-[#1E3A8A] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Investing</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard/investor/portfolio"
                className="px-8 py-4 border border-[#FACC15]/50 text-[#FACC15] rounded-full hover:bg-[#FACC15]/10 transition-all duration-300 flex items-center space-x-2"
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
                { value: "1000+", label: "Active Investors" },
                { value: "50+", label: "Vaults Available" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                >
                  <div className="text-3xl font-bold text-[#FACC15]">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Invest With Us?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#FACC15]/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Steps */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Start Investing in 4 Steps
            </h2>
            <p className="text-xl text-gray-400">
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
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#FACC15] to-transparent" />
                )}

                <div className="relative p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#FACC15]/50 transition-all duration-300">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#FACC15] to-[#1E3A8A] rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>

                  <div className="mt-4">
                    <div className="w-12 h-12 bg-[#FACC15]/20 rounded-lg flex items-center justify-center text-[#FACC15] mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built for Smart Investors
              </h2>
              <p className="text-xl text-gray-400 mb-8">
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
                    <CheckCircle className="w-5 h-5 text-[#FACC15] flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
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
              <div className="relative p-8 bg-gradient-to-br from-[#FACC15]/20 to-[#1E3A8A]/20 rounded-3xl border border-[#FACC15]/30 backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Portfolio Value</span>
                    <span className="text-[#FACC15] font-bold">$125,430</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Total Earned</span>
                    <span className="text-green-400 font-bold">+$15,230</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Active Vaults</span>
                    <span className="text-[#1E3A8A] font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Avg APY</span>
                    <span className="text-[#FACC15] font-bold">28.5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-[#FACC15]/20 to-[#1E3A8A]/20 rounded-3xl border border-[#FACC15]/30 backdrop-blur-sm text-center"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Grow Your Wealth?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of investors earning passive income through DeFi
              </p>

              <Link
                href="/dashboard/investor"
                className="inline-flex items-center space-x-2 px-10 py-5 bg-gradient-to-r from-[#FACC15] to-[#1E3A8A] text-white rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(250,204,21,0.8)] transition-all duration-300 group"
              >
                <span>Access Investor Dashboard</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>

              <p className="text-sm text-gray-400 mt-6">
                No minimum investment • Withdraw anytime • Fully transparent
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Learn2Launch. Empowering intelligent investing.</p>
        </div>
      </footer>
    </div>
  );
}
