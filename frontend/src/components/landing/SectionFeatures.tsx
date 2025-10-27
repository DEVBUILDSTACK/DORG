'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap, Shield, Users, TrendingUp } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Development',
      description: 'Pre-built templates and tools to accelerate your blockchain project development',
      color: '#00E0FF'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built-in security audits and best practices to keep your projects safe',
      color: '#8B5CF6'
    },
    {
      icon: Users,
      title: 'Vibrant Community',
      description: 'Connect with like-minded developers, mentors, and investors worldwide',
      color: '#FACC15'
    },
    // {
    //   icon: TrendingUp,
    //   title: 'Real-time Analytics',
    //   description: 'Track your learning progress and project performance with detailed insights',
    //   color: '#FF007A'
    // },
    // {
    //   icon: Star,
    //   title: 'Expert Mentorship',
    //   description: 'Learn from industry veterans and get personalized guidance',
    //   color: '#00E0FF'
    // },
    // {
    //   icon: CheckCircle,
    //   title: 'Proven Success',
    //   description: 'Join hundreds of successful projects that got funded through our platform',
    //   color: '#8B5CF6'
    // }
  ];

  return (
    <section
      id="section-5"
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101120] via-[#0B0C14] to-[#1a0b2e]">
        {/* Feature connection network */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + (i % 3) * 35}%`,
                top: `${25 + Math.floor(i / 3) * 50}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              <div className="w-32 h-32 border border-[#00E0FF]/30 rounded-full" />
              
              {/* Connecting lines */}
              {i < 5 && (
                <motion.div
                  className="absolute top-1/2 left-full w-24 h-px bg-gradient-to-r from-[#00E0FF]/50 to-transparent"
                  animate={{
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Particle system */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#00E0FF]/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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
            Why Choose Learn2Launch?
          </motion.h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to go from idea to funded startup in the blockchain space
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                }}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${feature.color}20, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                />
                
                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                    border: `1px solid ${feature.color}30`,
                  }}
                >
                  <Icon 
                    className="w-7 h-7" 
                    style={{ color: feature.color }}
                  />
                  
                  {/* Icon glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${feature.color}40, transparent 60%)`,
                      filter: 'blur(10px)',
                    }}
                  />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4 relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Floating particles in card */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: feature.color,
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-400 mb-6">
            Ready to unlock your potential?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#00E0FF]/20 to-[#8B5CF6]/20 border border-[#00E0FF]/50 rounded-full text-[#00E0FF] font-semibold cursor-pointer hover:shadow-[0_0_30px_rgba(0,224,255,0.3)] transition-all duration-300"
          >
            Explore All Features
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}