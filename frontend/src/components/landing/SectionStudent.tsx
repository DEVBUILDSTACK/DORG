'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Trophy, ChevronDown } from 'lucide-react';

export default function SectionStudent() {
  return (
    <section
      id="section-0"
      className="snap-start h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0C14] to-[#101120]">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00E0FF] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
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
              background: 'linear-gradient(135deg, #00E0FF 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Learn. Build. Launch.
          </motion.h1>

          <p className="text-xl text-gray-400 leading-relaxed">
            Empowering students to master coding and finance through real-world
            learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/courses"
              className="group px-8 py-4 bg-[#00E0FF] text-[#0B0C14] rounded-full font-semibold hover:shadow-[0_0_30px_rgba(0,224,255,0.6)] transition-all duration-300 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explore Courses</span>
            </Link>

            <Link
              href="/leaderboard"
              className="px-8 py-4 border border-[#00E0FF]/50 text-[#00E0FF] rounded-full hover:bg-[#00E0FF]/10 hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300 flex items-center space-x-2"
            >
              <Trophy className="w-5 h-5" />
              <span>Join Leaderboard</span>
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
            {/* Glowing orb effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E0FF]/30 to-transparent rounded-full blur-3xl" />

            {/* Floating code blocks */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-64 h-64 border border-[#00E0FF]/30 rounded-2xl backdrop-blur-md bg-[#0B0C14]/50 p-6 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 bg-gradient-to-r from-[#00E0FF] to-transparent rounded"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2 text-[#00E0FF]/60">
          <span className="text-sm">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
