'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  ];

  

  return (
    <footer className="relative bg-gradient-to-b from-[#101120] to-[#0B0C14] border-t border-white/5">
      {/* Gradient divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E0FF] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Left: Logo & Tagline */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent">
              Learn2Launch
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting Education, Innovation & Investment
            </p>
          </div>



          {/* Right: Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#00E0FF] hover:border-[#00E0FF]/50 hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Learn2Launch. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
