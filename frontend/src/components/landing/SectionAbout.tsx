'use client';

import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Globe } from '@/components/icons';

export default function SectionAbout() {
  const features = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Democratizing access to DeFi education and investment opportunities'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a thriving ecosystem of learners, builders, and investors'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Fostering the next generation of blockchain solutions'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Connecting talent and capital across borders'
    }
  ];

  return (
    <section
      id="section-3"
      className="snap-start h-screen flex items-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101120] via-[#0B0C14] to-[#1a0b2e]">
        {/* Side decorations */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#00E0FF]/5 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#8B5CF6]/5 to-transparent" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#101120] via-[#0B0C14] to-[#1a0b2e]">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div 
                className="w-8 h-8 border border-[#00E0FF]/30"
                style={{
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                  background: `linear-gradient(45deg, ${
                    Math.random() > 0.5 ? '#00E0FF' : '#8B5CF6'
                  }20, transparent)`
                }}
              />
            </motion.div>
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
            About Learn2Launch
          </motion.h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're bridging the gap between education, innovation, and investment in the decentralized world. 
            Our platform empowers the next generation of blockchain builders while connecting them with forward-thinking Treasury.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-[#00E0FF]/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#00E0FF]/20 to-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#00E0FF]" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { number: '10K+', label: 'Active Learners' },
            { number: '500+', label: 'Projects Launched' },
            { number: '$50M+', label: 'Total Value Locked' },
            { number: '200+', label: 'Global Partners' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}