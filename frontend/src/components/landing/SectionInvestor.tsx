'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Shield } from 'lucide-react';

export default function SectionInvestor() {
  return (
    <section
      id="section-2"
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C14] via-[#1E3A8A]/20 to-[#101120]">
        {/* Glowing nodes */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  Math.random() > 0.5 ? '#FACC15' : '#1E3A8A'
                } 0%, transparent 70%)`,
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

        {/* Pulse wave effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(250, 204, 21, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(30, 58, 138, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(250, 204, 21, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #FACC15 0%, #1E3A8A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Invest Intelligently with AI-Powered Vaults.
          </motion.h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            Access live performance data, diversify smartly, and grow your
            portfolio.
          </p>

          {/* Key Features */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-[#FACC15]" />
              <span className="text-gray-300">Secure & Transparent</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-[#FACC15]" />
              <span className="text-gray-300">Real-time Analytics</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/investor"
              className="px-8 py-4 bg-gradient-to-r from-[#FACC15] to-[#1E3A8A] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] transition-all duration-300 flex items-center space-x-2"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Learn More</span>
            </Link>

            <Link
              href="/dashboard/investor"
              className="px-8 py-4 border border-[#FACC15]/50 text-[#FACC15] rounded-full hover:bg-[#FACC15]/10 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Right: Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full">
            {/* Dashboard mockup */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0B0C14] border border-[#FACC15]/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
              {/* Chart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Portfolio Value</span>
                  <span className="text-[#FACC15] font-bold">$1,245,890</span>
                </div>

                {/* Animated chart bars */}
                <div className="grid grid-cols-7 gap-2 h-32 items-end">
                  {[65, 80, 70, 90, 75, 95, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-gradient-to-t from-[#FACC15] to-[#1E3A8A] rounded-t"
                    />
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#1E3A8A]/10 border border-[#1E3A8A]/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400">24h Change</div>
                    <div className="text-lg font-bold text-green-400">+12.5%</div>
                  </div>
                  <div className="bg-[#FACC15]/10 border border-[#FACC15]/30 rounded-lg p-3">
                    <div className="text-xs text-gray-400">Total ROI</div>
                    <div className="text-lg font-bold text-[#FACC15]">+45.2%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -left-4 bg-gradient-to-br from-[#FACC15] to-[#1E3A8A] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              AI-Powered
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
