'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from '@/components/icons';
import Link from 'next/link';
import ScrollButton from './ScrollButton';

export default function SectionHowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Learn & Build',
      description: 'Master blockchain fundamentals through structured courses and hands-on projects with institutional guidance'
    },
    {
      number: '02', 
      title: 'Launch & Showcase',
      description: 'Deploy your projects and present them to our network of institutional investors and partners'
    },
    {
      number: '03',
      title: 'Connect & Scale',
      description: 'Access funding opportunities, join accelerator programs, and scale your innovations'
    }
  ];

  return (
    <section
      id="section-4"
      className="snap-start min-h-screen flex items-center justify-center relative overflow-hidden py-32 bg-white"
    >
      <div className="absolute inset-0 bg-linear-to-br from-[rgba(10,74,122,0.02)] to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-[#1F2937]">
            How It Works
          </h2>
          
          <p className="text-lg text-[#5A6C7D] max-w-3xl mx-auto">
            Your pathway from blockchain developer to funded founder in three structured phases
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-6 lg:-right-8 z-10">
                  <ArrowRight className="w-6 h-6 text-[#2E865F]" />
                </div>
              )}

              <div className="p-8 rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl font-bold text-[#2E865F] mb-6">
                  {step.number}
                </div>
                
                <h3 className="text-2xl font-semibold text-[#FF6B35] mb-4">
                  {step.title}
                </h3>
                
                <p className="text-[#5A6C7D]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/onBoarding"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-[#E65A2D] transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      <ScrollButton targetSection="section-5" />
    </section>
  );
}