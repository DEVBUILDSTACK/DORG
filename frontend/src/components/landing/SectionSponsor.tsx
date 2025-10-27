'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Handshake, Rocket, Users, TrendingUp } from '@/components/icons';
import ScrollButton from './ScrollButton';

export default function SectionSponsor() {
  return (
    <section
      id="section-3"
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C14] via-[#2D1B69] to-[#101120]">
        {/* Glowing particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 5)]
                } 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gradient waves */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(255, 107, 107, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 50%, rgba(78, 205, 196, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 50%, rgba(255, 107, 107, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Partner With Innovation
          </motion.h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            Join leading enterprises in shaping the future of decentralized education and finance.
          </p>

          {/* Key Benefits */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-[#4ECDC4]" />
              <span className="text-gray-300">Access to 10K+ talented developers</span>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-[#4ECDC4]" />
              <span className="text-gray-300">Brand visibility & thought leadership</span>
            </div>
            <div className="flex items-center space-x-3">
              <Rocket className="w-5 h-5 text-[#4ECDC4]" />
              <span className="text-gray-300">Co-innovation opportunities</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/sponsor"
              className="group px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(78,205,196,0.6)] transition-all duration-300 flex items-center space-x-2"
            >
              <Handshake className="w-5 h-5" />
              <span>Become a Sponsor</span>
            </Link>

            <Link
              href="/sponsor#partners"
              className="px-8 py-4 border border-[#4ECDC4]/50 text-[#4ECDC4] rounded-full hover:bg-[#4ECDC4]/10 transition-all duration-300"
            >
              View Partners
            </Link>
          </div>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square">
            {/* Central hub */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Orbiting logos placeholder */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-120px) rotate(-${i * 60}deg)`,
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Handshake className="w-8 h-8 text-[#4ECDC4]" />
                </motion.div>
              ))}

              {/* Center piece */}
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF6B6B]/30 to-[#4ECDC4]/30 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(78,205,196,0.3)]">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Rocket className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Next Section */}
      <ScrollButton targetSection="section-4" color="#4ECDC4" label="Next: About Us" />
    </section>
  );
}
