'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Lightbulb, 
  Globe, 
  Award, 
  Shield, 
  TrendingUp,
  BookOpen,
  Code,
  DollarSign,
  Zap,
  Heart
} from '@/components/icons';
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
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFBFC] to-white">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE8E0]/30 via-white to-[#F0F9FF]/30" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2E865F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg border border-[#FF6B35]/20 mb-6"
            >
              <Heart className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35]">
                Our Story & Mission
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight"
            >
              About Learn2Launch
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#5A6C7D] max-w-3xl mx-auto leading-relaxed"
            >
              Bridging education, innovation, and institutional treasury management in decentralized finance. 
              Empowering the next generation of blockchain builders with professional standards and institutional backing.
            </motion.p>
          </div>
        </section>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">

          {/* Features Grid */}
          <section className="py-16 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#FF6B35]/10 group-hover:bg-[#FF6B35]/20 transition-colors duration-300">
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
          </section>

          {/* Our Story Section */}
          <section className="py-16 bg-[#FAFBFC]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20 bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200/50"
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
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-[#E5E7EB]"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-[#FFE8E0] to-white rounded-xl border border-[#FF6B35]/20 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-4xl lg:text-5xl font-bold mb-2 text-[#FF6B35] tabular-nums">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-sm lg:text-base text-[#5A6C7D] font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Vision & Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-20 grid md:grid-cols-2 gap-8"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#FF6B35]/5 to-transparent border border-[#FF6B35]/20">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#1F2937]">
                Our Vision
              </h3>
              <p className="text-[#5A6C7D] leading-relaxed">
                To become the world's leading platform for blockchain education and institutional 
                DeFi treasury management, fostering innovation while maintaining the highest standards of 
                professionalism and transparency.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#2E865F]/5 to-transparent border border-[#2E865F]/20">
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

          {/* What Makes Us Different */}
          <section className="py-20 bg-white rounded-2xl mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2937] mb-6">
                What Makes Us Different
              </h2>
              <p className="text-xl text-[#5A6C7D] max-w-3xl mx-auto">
                Learn2Launch isn't just another educational platform. We're building the future of DeFi education and treasury management.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Comprehensive Education',
                  description: 'From beginner-friendly courses to advanced DeFi protocols, we cover the entire blockchain spectrum with hands-on projects and real-world applications.',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50'
                },
                {
                  icon: Code,
                  title: 'Developer Infrastructure',
                  description: 'Professional-grade development tools, deployment infrastructure, and institutional-quality security audits for your DeFi projects.',
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50'
                },
                {
                  icon: DollarSign,
                  title: 'Treasury Solutions',
                  description: 'Transparent vault management, stablecoin pools, and real-time analytics designed for institutional treasuries and DAOs.',
                  color: 'text-green-600',
                  bgColor: 'bg-green-50'
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-6"
                  >
                    <div className={`w-16 h-16 ${item.bgColor} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-4">{item.title}</h3>
                    <p className="text-[#5A6C7D] leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Team & Culture */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#FFE8E0] to-white rounded-2xl p-8 lg:p-12"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2937] mb-6">
                    Built by Builders, for Builders
                  </h2>
                  <div className="space-y-4 text-[#5A6C7D] leading-relaxed">
                    <p>
                      Our team consists of experienced blockchain developers, institutional finance professionals, 
                      and education experts who understand the challenges of building in the DeFi space.
                    </p>
                    <p>
                      We've been where you are—learning complex protocols, building ambitious projects, 
                      and seeking institutional backing. That's why Learn2Launch exists.
                    </p>
                    <p>
                      Every feature we build, every course we create, and every partnership we form 
                      is designed with the builder's journey in mind.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { icon: Award, label: 'Industry Recognition', value: '15+ Awards' },
                    { icon: Users, label: 'Team Members', value: '50+ Experts' },
                    { icon: Globe, label: 'Countries Served', value: '80+ Nations' },
                    { icon: Zap, label: 'Years of Experience', value: '10+ Combined' }
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm"
                      >
                        <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-[#FF6B35]" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-[#1F2937]">{stat.value}</div>
                          <div className="text-sm text-[#5A6C7D]">{stat.label}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Call to Action */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#2E865F]/10 to-white rounded-2xl p-8 lg:p-12 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1F2937] mb-6">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-[#5A6C7D] max-w-2xl mx-auto mb-8">
                Join thousands of developers, students, and treasury managers who are already 
                building the next generation of decentralized finance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/"
                  className="px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#FF6B35]/90 transition-all duration-300"
                >
                  Get Started Today
                </a>
                <a
                  href="/support"
                  className="px-8 py-4 bg-white text-[#FF6B35] rounded-xl font-semibold border-2 border-[#FF6B35] hover:bg-[#FFE8E0] transition-all duration-300"
                >
                  Contact Our Team
                </a>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
