'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, Rocket } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionDeveloper() {
  return (
    <section
      id="section-1"
      className="snap-start min-h-screen flex items-center relative overflow-hidden bg-gray-50 py-20"
    >
      <div className="absolute inset-0 bg-linear-to-br from-white to-gray-50" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
              <Code className="w-4 h-4" />
              <span>For Builders</span>
            </div>

            <h1 className="text-hero font-bold text-[#1F2937] leading-tight">
              Build Decentralized Finance Solutions
            </h1>

            <p className="text-body-lg text-text-secondary leading-relaxed max-w-xl">
              Develop smart contracts, APIs, and analytics tools for next-generation decentralized applications. 
              Join a community of blockchain innovators.
            </p>

            <div className="inline-block px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-text-secondary text-sm">
              <span>Age 18+ Required</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/developer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-semibold transition-all duration-300 hover:bg-brand-primary-hover hover:shadow-brand-sm"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Building</span>
              </Link>

              <Link
                href="/dashboard/developer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#FF6B35] text-[#FF6B35] rounded-xl font-semibold transition-all duration-300 hover:bg-[#FFE8E0] hover:border-[#E65A2D]"
              >
                <span>View Dashboard</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="text-purple-600">$ npm run dev</div>
                <div className="text-text-secondary">Building smart contracts...</div>
                <div className="text-accent-green">✓ Compiled successfully</div>
                <div className="text-brand-primary">Deploying to testnet...</div>
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-brand-primary"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-brand-primary mb-1">8</div>
                  <div className="text-xs text-text-secondary">Contracts Deployed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-green mb-1">24</div>
                  <div className="text-xs text-text-secondary">API Integrations</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollButton targetSection="section-2" label="Next: For Treasury" />
    </section>
  );
}
