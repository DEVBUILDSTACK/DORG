'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Users } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionStudent() {
  return (
    <section
      id="section-0"
      className="snap-start min-h-screen flex items-center relative overflow-hidden bg-white py-20"
    >
      <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-white" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE8E0] text-[#FF6B35] rounded-full text-sm font-medium">
              <Users className="w-4 h-4" />
              <span>For Learners</span>
            </div>

            <h1 className="text-hero font-bold text-[#1F2937] leading-tight">
              Master Blockchain Development
            </h1>

            <p className="text-body-lg text-text-secondary leading-relaxed max-w-xl">
              Comprehensive education in decentralized finance and smart contract development. 
              Build real-world projects and launch your career in Web3.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/student"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-semibold transition-all duration-300 hover:bg-brand-primary-hover hover:shadow-brand-sm"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Courses</span>
              </Link>

              <Link
                href="/dashboard/student"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#FF6B35] text-[#FF6B35] rounded-xl font-semibold transition-all duration-300 hover:bg-[#FFE8E0] hover:border-[#E65A2D]"
              >
                <span>View Dashboard</span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-1">500+</div>
                <div className="text-sm text-text-secondary">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-1">50+</div>
                <div className="text-sm text-text-secondary">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary mb-1">95%</div>
                <div className="text-sm text-text-secondary">Success Rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-linear-to-br from-[#FFE8E0] to-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Learning Progress</span>
                  <span className="text-brand-primary font-semibold">72%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '72%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-brand-primary rounded-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-brand-primary mb-1">24</div>
                    <div className="text-xs text-text-secondary">Courses Completed</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-accent-green mb-1">12</div>
                    <div className="text-xs text-text-secondary">Projects Built</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollButton targetSection="section-1" label="Next: For Builders" />
    </section>
  );
}
