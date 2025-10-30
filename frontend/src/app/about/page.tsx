'use client';

import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Globe } from '@/components/icons';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'Democratizing access to decentralized finance education and institutional treasury allocation opportunities'
    },
    {
      icon: Users,
      title: 'Professional Community',
      description: 'Building a trusted ecosystem of developers, institutions, and treasury managers'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Fostering next-generation blockchain solutions with institutional standards'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connecting qualified talent and capital across international markets'
    }
  ];

  const stats = [
    { number: '10,000', label: 'Active Developers', suffix: '+' },
    { number: '500', label: 'Projects Launched', suffix: '+' },
    { number: '$50M', label: 'Total Value Locked', suffix: '+' },
    { number: '200', label: 'Institutional Partners', suffix: '+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-[#1F2937]">
              About Learn2Launch
            </h1>
            
            <p className="text-lg lg:text-xl max-w-3xl mx-auto text-[#5A6C7D] leading-relaxed">
              Bridging education, innovation, and institutional treasury management in decentralized finance. 
              Empowering the next generation of blockchain builders with professional standards and institutional backing.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#FF6B35]/10">
                    <Icon className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-[#FF6B35]">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-[#5A6C7D] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Our Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20 bg-[#FAFBFC] rounded-2xl p-8 lg:p-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#1F2937]">
              Our Story
            </h2>
            
            <div className="space-y-6 text-[#5A6C7D] leading-relaxed">
              <p className="text-base lg:text-lg">
                Learn2Launch was founded with a clear vision: to democratize access to blockchain education 
                and create pathways for talented developers to build meaningful projects with institutional backing.
              </p>
              
              <p className="text-base lg:text-lg">
                We recognized the gap between passionate builders and the resources they need to succeed. 
                Traditional venture capital and educational systems weren't designed for the decentralized 
                future we're building.
              </p>
              
              <p className="text-base lg:text-lg">
                Today, Learn2Launch serves as a bridge—connecting learners with cutting-edge education, 
                developers with project funding, and institutions with vetted allocation opportunities in 
                the blockchain space.
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-[#E5E7EB]"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#FF6B35] tabular-nums">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm lg:text-base text-[#5A6C7D]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision & Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20 grid md:grid-cols-2 gap-8"
          >
            <div className="p-8 rounded-2xl bg-linear-to-br from-[#FF6B35]/5 to-transparent border border-[#FF6B35]/20">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#1F2937]">
                Our Vision
              </h3>
              <p className="text-[#5A6C7D] leading-relaxed">
                To become the world's leading platform for blockchain education and institutional 
                DeFi treasury management, fostering innovation while maintaining the highest standards of 
                professionalism and transparency.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-linear-to-br from-[#2E865F]/5 to-transparent border border-[#2E865F]/20">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#1F2937]">
                Our Values
              </h3>
              <ul className="space-y-2 text-[#5A6C7D]">
                <li className="flex items-start">
                  <span className="text-[#2E865F] mr-2">✓</span>
                  <span>Transparency in all operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2E865F] mr-2">✓</span>
                  <span>Education as a fundamental right</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2E865F] mr-2">✓</span>
                  <span>Innovation with responsibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2E865F] mr-2">✓</span>
                  <span>Community-driven growth</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
