'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, MessageCircle } from '@/components/icons';
import { motion } from 'framer-motion';
import l2lLogo from '@/assets/images/l2l.jpg';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  ];

  return (
    <footer id="footer" className="relative bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-md ring-2 ring-[#FF6B35]/20">
                <Image
                  src={l2lLogo}
                  alt="Learn2Launch Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-2xl font-bold text-[#FF6B35]">
                Learn2Launch
              </div>
            </div>
            <p className="text-[#5A6C7D] text-sm leading-relaxed max-w-sm">
              Connecting education, innovation, and institutional allocation in decentralized finance. 
              Empowering the next generation of blockchain builders.
            </p>
            
            <div className="space-y-3">
              <h4 className="text-[#FF6B35] font-semibold text-sm">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-[#1F2937] placeholder-[#9CA3AF] text-sm focus:border-[#FF6B35] focus:outline-none transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md hover:bg-[#E65A2D] transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#FF6B35] font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { name: 'For Students', href: '/student' },
                { name: 'For Builders', href: '/developer' },
                { name: 'For Treasury', href: '/investor' },
                { name: 'For Sponsors', href: '/sponsor' },
                ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#5A6C7D] hover:text-[#FF6B35] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#FF6B35] font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {[
                { name: 'Blog', href: '/blog' },
                { name: 'Events', href: '/events' },
                { name: 'Hackathons', href: '/hackathons' },
                { name: 'Help Center', href: '/help' },
                ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#5A6C7D] hover:text-[#FF6B35] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#FF6B35] font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-9 h-9 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#5A6C7D] hover:text-[#FF6B35] hover:border-[#FF6B35] hover:shadow-sm transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
            
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#5A6C7D] transition-colors duration-300 text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        

        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left text-[#9CA3AF] text-sm space-y-4 md:space-y-0">
          <div className="order-2 md:order-1">
            © {new Date().getFullYear()} Learn2Launch. All Rights Reserved.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs order-1 md:order-2">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#2E865F] rounded-full animate-pulse"></div>
              <span className="whitespace-nowrap">Platform Status: Operational</span>
            </span>
            <span className="whitespace-nowrap">Built for the Web3 Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}