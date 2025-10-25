'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0C14]/90 backdrop-blur-md py-3 border-b border-white/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Logo Icon */}
          <motion.div
            className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E0FF]/20 to-[#8B5CF6]/20 border border-[#00E0FF]/30 flex items-center justify-center group-hover:border-[#FACC15]/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] rounded-sm"
              animate={{
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/40 to-[#8B5CF6]/40 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
          
          {/* Logo Text */}
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent group-hover:from-[#FACC15] group-hover:to-[#FF007A] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Learn2Launch
          </motion.div>
          
          {/* Beta Badge */}
          <motion.div
            className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-[#8B5CF6]/20 to-[#FF007A]/20 border border-[#8B5CF6]/30 rounded-full text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            v2.0
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-2">
          {[
            { name: 'Students', sectionId: 'section-0', icon: '🎓' },
            { name: 'Developers', sectionId: 'section-1', icon: '⚡' },
            { name: 'Investors', sectionId: 'section-2', icon: '💎' },
            { name: 'Sponsors', sectionId: 'section-3', icon: '🤝' },
          ].map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group px-4 py-2 rounded-lg text-gray-300 hover:text-[#00E0FF] transition-all duration-300 hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="flex items-center space-x-2">
                <span className="text-sm">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </span>
              
              {/* Hover line effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/10 to-[#8B5CF6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
              />
            </motion.button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Network Status Indicator */}
          {/* <motion.div
            className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            <span>Live on Base</span>
          </motion.div> */}

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/onBoarding"
              className="group relative px-5 py-2 border border-[#00E0FF]/50 text-[#00E0FF] rounded-full hover:bg-[#00E0FF]/10 hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00E0FF]/20 to-[#8B5CF6]/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
              />
              <span className="relative flex items-center space-x-2">
                <span className="font-medium">Get Started</span>
              </span>
            </Link>
            
            <Link
              href="/login"
              className="group relative px-5 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#00E0FF] text-white rounded-full hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FACC15] to-[#FF007A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative flex items-center space-x-2">
                <span className="font-medium">Connect Wallet</span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-gray-300 hover:text-[#00E0FF] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
              <motion.div className="w-5 h-0.5 bg-current" />
              <motion.div className="w-5 h-0.5 bg-current" />
              <motion.div className="w-5 h-0.5 bg-current" />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}