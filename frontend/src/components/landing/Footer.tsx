'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Github, MessageCircle } from '@/components/icons';
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
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Left: Logo & Tagline */}
          <div className="md:col-span-2 space-y-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent">
              Learn2Launch
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Connecting Education, Innovation & Investment in the decentralized future. 
              Empowering the next generation of blockchain builders.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:border-[#00E0FF]/50 focus:outline-none transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] text-white rounded-lg text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {[
                { name: 'For Students', href: '/student' },
                { name: 'For Developers', href: '/developer' },
                { name: 'For Investors', href: '/investor' },
                { name: 'For Sponsors', href: '/sponsor' },
                { name: 'Courses', href: '/courses' },
                { name: 'Projects', href: '/projects' },
                { name: 'Mentorship', href: '/mentorship' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00E0FF] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {[
                { name: 'Blog', href: '/blog' },
                { name: 'Events', href: '/events' },
                { name: 'Hackathons', href: '/hackathons' },
                { name: 'Success Stories', href: '/success-stories' },
                { name: 'Help Center', href: '/help' },
                { name: 'API Docs', href: '/docs' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00E0FF] transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Legal */}
          <div>
            {/* Prominent About L2L placed before social icons */}
            <h3 className="text-white font-bold mb-2">About L2L</h3>
            <p className="text-gray-300 text-sm mb-4 max-w-xs">
              Learn2Launch “and its affiliated offering” is not just a marketplace. It’s the economic operating system for global builders — combining transparent project financing, localized education, and decentralized revenue sharing.
            </p>

            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00E0FF] hover:border-[#00E0FF]/50 hover:shadow-[0_0_15px_rgba(0,224,255,0.3)] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
            
            {/* Legal Links */}
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-400 transition-colors duration-300 text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/5 mb-8">
          {[
            { number: '10,000+', label: 'Active Learners', icon: '👥' },
            { number: '500+', label: 'Projects Launched', icon: '🚀' },
            { number: '$50M+', label: 'Total Funding', icon: '💰' },
            { number: '95%', label: 'Success Rate', icon: '📈' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent group-hover:from-[#FACC15] group-hover:to-[#FF007A] transition-all duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 text-xs md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left text-gray-500 text-sm space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Learn2Launch. All Rights Reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-xs">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Platform Status: Operational</span>
            </span>
            <span>Built with ❤️ for the Web3 community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
