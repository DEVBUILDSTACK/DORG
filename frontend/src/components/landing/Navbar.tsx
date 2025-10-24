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
          ? 'bg-[#0B0C14]/80 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent">
            Learn2Launch
          </div>
        </Link>

        {/* Center Links */}
        {/* <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#home"
            className="text-gray-300 hover:text-[#00E0FF] transition-colors"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-gray-300 hover:text-[#00E0FF] transition-colors"
          >
            About
          </Link>
          <Link
            href="#roles"
            className="text-gray-300 hover:text-[#00E0FF] transition-colors"
          >
            Roles
          </Link>
          <Link
            href="#contact"
            className="text-gray-300 hover:text-[#00E0FF] transition-colors"
          >
            Contact
          </Link>
        </div> */}

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="px-5 py-2 border border-[#00E0FF]/50 text-[#00E0FF] rounded-full hover:bg-[#00E0FF]/10 hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300"
          >
           Get Started
          </Link>
          <Link
            href="/login"
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white rounded-full hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            Connect Wallet
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
