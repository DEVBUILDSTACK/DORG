'use client';

import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Globe } from '@/components/icons';

export default function SectionAbout() {
  const features = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Democratizing access to decentralized finance education and institutional investment opportunities'
    },
    {
      icon: Users,
      title: 'Professional Community',
      description: 'Building a trusted ecosystem of developers, institutions, and qualified investors'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Fostering next-generation blockchain solutions with institutional standards'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connecting qualified talent and capital across international markets'
    }
  ];

  return (
    <section
      id="section-3"
      className="snap-start min-h-screen flex items-center relative overflow-hidden py-32 bg-[#FAFBFC]"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(255,107,53,0.03)] to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#1F2937]">
            About Learn2Launch
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto text-[#5A6C7D]">
            Bridging education, innovation, and institutional investment in decentralized finance. 
            Empowering the next generation of blockchain builders with professional standards and institutional backing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#FF6B35]/10">
                  <Icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-[#FF6B35]">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-[#5A6C7D]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-[#E5E7EB]"
        >
          {[
            { number: '10,000', label: 'Active Developers', suffix: '+' },
            { number: '500', label: 'Projects Launched', suffix: '+' },
            { number: '$50M', label: 'Total Value Locked', suffix: '+' },
            { number: '200', label: 'Institutional Partners', suffix: '+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-[#FF6B35] tabular-nums">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-sm text-[#5A6C7D]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}