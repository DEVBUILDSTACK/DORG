'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Handshake, Rocket, Users, TrendingUp } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionSponsor() {
  const partners = [
    { name: 'Enterprise', count: 50 },
    { name: 'Startups', count: 120 },
    { name: 'Academic', count: 30 }
  ];

  return (
    <section
      id="section-3"
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
                Strategic Partnership Opportunities
              </h2>
              <p className="text-lg text-[#5A6C7D]">
                Join institutional partners in advancing decentralized finance education and innovation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2E865F]/10">
                  <Users className="w-6 h-6 text-[#2E865F]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#FF6B35]">Access Qualified Talent</h3>
                  <p className="text-[#5A6C7D]">Connect with 10,000+ blockchain developers and engineers</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2E865F]/10">
                  <TrendingUp className="w-6 h-6 text-[#2E865F]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#FF6B35]">Market Leadership</h3>
                  <p className="text-[#5A6C7D]">Establish thought leadership in decentralized finance</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#2E865F]/10">
                  <Rocket className="w-6 h-6 text-[#2E865F]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[#FF6B35]">Innovation Pipeline</h3>
                  <p className="text-[#5A6C7D]">Early access to emerging technologies and solutions</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/sponsor"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold bg-[#FF6B35] text-white shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-[#E65A2D] transition-all duration-300"
              >
                <Handshake className="w-5 h-5" />
                <span>Partner With Us</span>
              </Link>

              <Link
                href="/sponsor#partners"
                className="inline-flex items-center px-8 py-4 rounded-xl font-semibold border border-[#D1D5DB] text-[#FF6B35] hover:bg-[#FFE8E0] transition-all duration-300"
              >
                View Partners
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
            <div className="grid grid-cols-3 gap-4 mb-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-sm text-center"
                >
                  <div className="text-3xl font-bold mb-2 text-[#FF6B35] tabular-nums">
                    {partner.count}+
                  </div>
                  <div className="text-sm text-[#5A6C7D]">
                    {partner.name}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-2xl border border-[#E5E7EB] bg-white shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-[#FF6B35]">Partnership Benefits</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[#F3F4F6]">
                  <span className="text-[#5A6C7D]">Brand Visibility</span>
                  <div className="w-24 h-2 rounded-full bg-[#F3F4F6]">
                    <div className="h-full rounded-full bg-[#2E865F] w-[95%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#F3F4F6]">
                  <span className="text-[#5A6C7D]">Talent Access</span>
                  <div className="w-24 h-2 rounded-full bg-[#F3F4F6]">
                    <div className="h-full rounded-full bg-[#2E865F] w-[90%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[#5A6C7D]">ROI Potential</span>
                  <div className="w-24 h-2 rounded-full bg-[#F3F4F6]">
                    <div className="h-full rounded-full bg-[#2E865F] w-[88%]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollButton targetSection="section-4" />
    </section>
  );
}
