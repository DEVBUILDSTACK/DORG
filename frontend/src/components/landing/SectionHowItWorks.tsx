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
      description: 'Master blockchain fundamentals through hands-on courses and real-world projects',
      gradient: 'from-[#00E0FF] to-[#8B5CF6]',
      bgGradient: 'from-[#00E0FF]/10 to-[#8B5CF6]/10'
    },
    {
      number: '02', 
      title: 'Launch & Showcase',
      description: 'Deploy your projects and showcase them to our community of investors and mentors',
      gradient: 'from-[#8B5CF6] to-[#FF007A]',
      bgGradient: 'from-[#8B5CF6]/10 to-[#FF007A]/10'
    },
    {
      number: '03',
      title: 'Connect & Grow',
      description: 'Get matched with investors, join accelerator programs, and scale your innovations',
      gradient: 'from-[#FF007A] to-[#FACC15]',
      bgGradient: 'from-[#FF007A]/10 to-[#FACC15]/10'
    }
  ];

  return (
    <section
      id="section-4"
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C14] to-[#101120]">
        {/* Flowing connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FACC15" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M 100 300 Q 400 150 700 300 T 1200 300"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.path
            d="M 0 500 Q 300 350 600 500 T 1000 500"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>

        {/* Animated dots */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6]"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #00E0FF 0%, #8B5CF6 50%, #FACC15 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How It Works
          </motion.h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Your journey from blockchain beginner to funded founder in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connection Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10"
                >
                  <ArrowRight className="w-6 h-6 text-[#00E0FF]/60" />
                </motion.div>
              )}

              {/* Step Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative bg-gradient-to-br ${step.bgGradient} border border-white/10 rounded-2xl p-8 hover:border-[#00E0FF]/50 transition-all duration-300 h-full`}
              >
                {/* Step Number */}
                <div className={`inline-block text-4xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-6`}>
                  {step.number}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${step.gradient.includes('00E0FF') ? '#00E0FF' : step.gradient.includes('8B5CF6') ? '#8B5CF6' : '#FACC15'}10, transparent)`
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <Link
            href="/onBoarding"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(0,224,255,0.6)] transition-all duration-300 group"
          >
            <Play className="w-5 h-5" />
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}