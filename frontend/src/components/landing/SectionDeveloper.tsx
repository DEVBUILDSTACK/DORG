'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Zap } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionDeveloper() {
  return (
    <section
      id="section-1"
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C14] via-[#1a0b2e] to-[#101120]">
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Flowing code lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#8B5CF6]/30 font-mono text-xs whitespace-nowrap"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-100, 800],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            >
              {[
                '{ defi: "lending" }',
                '{ vault: "yield" }',
                '{ dex: "swap" }',
                '{ oracle: "price" }',
                '{ staking: "rewards" }',
                '{ liquidity: "pool" }',
                '{ governance: "vote" }',
                '{ nft: "collateral" }',
                '{ margin: "trading" }',
                '{ perp: "AMM" }',
              ][Math.floor(Math.random() * 10)]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          <div className="relative w-full aspect-square">
            {/* Terminal-like interface */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="w-full bg-gradient-to-br from-[#1a0b2e] to-[#0B0C14] border border-[#8B5CF6]/30 rounded-xl p-6 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                {/* Terminal header */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                {/* Code lines */}
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-[#8B5CF6]">$ npm run dev</div>
                  <div className="text-gray-400">Building smart contracts...</div>
                  <div className="text-green-400">✓ Compiled successfully</div>
                  <div className="text-[#FF007A]">{'> '}<span className="text-white">Deploying to testnet</span></div>
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[#8B5CF6]"
                  >
                    ▊
                  </motion.div>
                </div>
              </div>

              {/* Floating icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#FF007A] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 order-1 md:order-2"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #FF007A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Code the Future of Finance.
          </motion.h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            Develop smart contracts, APIs, and analytics powering next-gen
            vaults.
          </p>

          <div className="inline-block px-4 py-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-full text-[#8B5CF6] text-sm">
            🔞 Age 18+ Required
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/developer"
              className="px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#FF007A] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300 flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Learn More</span>
            </Link>

            <Link
              href="/dashboard/developer"
              className="px-8 py-4 border border-[#8B5CF6]/50 text-[#8B5CF6] rounded-full hover:bg-[#8B5CF6]/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Next Section */}
      <ScrollButton targetSection="section-2" color="#8B5CF6" label="Next: For Treasury" />
    </section>
  );
}
