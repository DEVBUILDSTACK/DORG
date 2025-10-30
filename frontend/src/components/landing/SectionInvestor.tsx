'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Shield, DollarSign } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionInvestor() {
  return (
    <section
      id="section-2"
      className="snap-start min-h-screen flex items-center justify-center relative overflow-hidden py-32 bg-[#FAFBFC]"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(255,107,53,0.03)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#1F2937]">
                DAT Proxy Powered Vaults and Stablecoin Liquidity Pools
              </h2>
              <p className="text-lg text-[#5A6C7D]">
                Access live performance data, diversify smartly, and grow your portfolio with institutional-grade DeFi infrastructure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2E865F]/10">
                  <Shield className="w-6 h-6 text-[#2E865F]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#FF6B35]">Secure & Transparent</h3>
                  <p className="text-[#5A6C7D]">Bank-grade security with full transparency and real-time auditing</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2E865F]/10">
                  <TrendingUp className="w-6 h-6 text-[#2E865F]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#FF6B35]">Real-time Analytics</h3>
                  <p className="text-[#5A6C7D]">Live performance tracking and portfolio optimization tools</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2E865F]/10">
                  <DollarSign className="w-6 h-6 text-[#2E865F]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#FF6B35]">High Yield Returns</h3>
                  <p className="text-[#5A6C7D]">Competitive APY with automated yield optimization strategies</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/investor"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold bg-[#FF6B35] text-white shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-[#E65A2D] transition-all duration-300"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Explore Vaults</span>
              </Link>

              <Link
                href="/dashboard/investor"
                className="inline-flex items-center px-8 py-4 rounded-xl font-semibold border border-[#D1D5DB] text-[#1F2937] hover:bg-[#F3F4F6] hover:border-[#FF6B35] transition-all duration-300"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl border border-[#E5E7EB] bg-white shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-[#1F2937]">Live Performance</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5A6C7D]">Portfolio Value</span>
                  <span className="text-2xl font-bold text-[#1F2937]">$1,245,890</span>
                </div>

                <div className="grid grid-cols-7 gap-2 h-32 items-end">
                  {[65, 80, 70, 90, 75, 95, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-linear-to-t from-[#FF6B35] to-[#E65A2D] rounded-t"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
                    <div className="text-xs text-[#5A6C7D] mb-1">24h Change</div>
                    <div className="text-xl font-bold text-[#2E865F]">+12.5%</div>
                  </div>
                  <div className="p-4 rounded-lg border border-[#FF6B35]/30 bg-[#FFE8E0]">
                    <div className="text-xs text-[#5A6C7D] mb-1">Total ROI</div>
                    <div className="text-xl font-bold text-[#FF6B35]">+45.2%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border border-[#E5E7EB] bg-white shadow-sm text-center"
              >
                <div className="text-2xl font-bold mb-1 text-[#1F2937]">
                  $50M+
                </div>
                <div className="text-xs text-[#5A6C7D]">
                  Total Locked
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border border-[#E5E7EB] bg-white shadow-sm text-center"
              >
                <div className="text-2xl font-bold mb-1 text-[#1F2937]">
                  5,000+
                </div>
                <div className="text-xs text-[#5A6C7D]">
                  Investors
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl border border-[#E5E7EB] bg-white shadow-sm text-center"
              >
                <div className="text-2xl font-bold mb-1 text-[#FF6B35]">
                  18.5%
                </div>
                <div className="text-xs text-[#5A6C7D]">
                  Avg APY
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollButton targetSection="section-3" />
    </section>
  );
}
