'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Users } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'Accelerated Development',
      description: 'Professional frameworks and institutional-grade tools to build production-ready blockchain solutions'
    },
    {
      icon: Shield,
      title: 'Security Standards',
      description: 'Comprehensive security audits and industry best practices for enterprise-grade applications'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with verified developers, institutional mentors, and qualified investors globally'
    }
  ];

  return (
    <section
      id="section-5"
      className="snap-start min-h-screen flex items-center justify-center relative overflow-hidden py-32 bg-[#FAFBFC]"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(10,74,122,0.03)] to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#1F2937]">
            Why Choose Learn2Launch
          </h2>
          
          <p className="text-lg text-[#5A6C7D] max-w-3xl mx-auto">
            Institutional-grade infrastructure and professional support for blockchain innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#2E865F]/10">
                  <Icon className="w-7 h-7 text-[#2E865F]" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#FF6B35] mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-[#5A6C7D]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#5A6C7D] mb-6">
            Ready to build the future of finance?
          </p>
          <button className="px-8 py-3 border border-[#FF6B35] rounded-xl text-[#FF6B35] font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300">
            Explore All Features
          </button>
        </motion.div>
      </div>

      <ScrollButton targetSection="footer" />
    </section>
  );
}