'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MetadataCollector from '@/components/features/MetadataCollector';
import { useAuth } from '@/hooks/useAuth';
import { getUserRole, saveUserRole, clearUserRole } from '@/lib/roleStorage';
import {
  BookOpen,
  Users,
  Code,
  Rocket,
  TrendingUp,
  Shield,
  DollarSign,
  Zap,
  Play,
  ArrowRight,
  BarChart,
  CheckCircle,
  Award,
  Target,
  Sparkles
} from '@/components/icons';

export default function LandingPage() {
  const { authenticated, ready, user } = useAuth();
  const router = useRouter();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'developer' | 'investor'>('student');

  useEffect(() => {
    if (!ready) return;

    if (authenticated && user) {
      // Try to get role from localStorage first (faster)
      const localRole = getUserRole();
      
      // Then check Privy metadata
      const privyRole = user.customMetadata?.role as string | undefined;

      // If we have a role from either source
      if (privyRole || localRole) {
        const role = privyRole || localRole;
        
        // Ensure both storage locations are synced
        if (privyRole && !localRole) {
          saveUserRole(privyRole as 'student' | 'developer' | 'investor');
        }

        // Redirect to the appropriate dashboard
        router.push(`/dashboard/${role}`);
      } else {
        // No role found in either location - show modal
        setShowRoleModal(true);
      }
    } else {
      // Clear localStorage if user is not authenticated
      clearUserRole();
    }
  }, [authenticated, ready, user, router]);

  const handleRoleSelected = () => {
    setShowRoleModal(false);
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE8E0] via-white to-[#F0F9FF]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const pathways = {
    student: {
      badge: { text: 'For Learners', icon: Users, bgColor: 'bg-[#FFE8E0]', textColor: 'text-[#FF6B35]' },
      title: 'Master Blockchain Development',
      description: 'Comprehensive DeFi education with hands-on training in smart contracts, Web3 protocols, and real-world project experience.',
      note: undefined,
      stats: [
        { label: 'Active Learners', value: '500+' },
        { label: 'Courses Available', value: '50+' },
        { label: 'Success Rate', value: '95%' }
      ],
      features: [
        { icon: BookOpen, text: 'Comprehensive Curriculum' },
        { icon: CheckCircle, text: 'Hands-on Projects' },
        { icon: Award, text: 'Industry Certifications' }
      ]
    },
    developer: {
      badge: { text: 'For Builders', icon: Code, bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
      title: 'Build Decentralized Finance Solutions',
      description: 'Create, deploy, and scale DeFi protocols with institutional-grade infrastructure, security standards, and technical support.',
      note: 'Age 18+ Required',
      stats: [
        { label: 'Contracts Deployed', value: '8' },
        { label: 'API Integrations', value: '24' },
        { label: 'Active Projects', value: '150+' }
      ],
      features: [
        { icon: Rocket, text: 'Rapid Deployment' },
        { icon: Shield, text: 'Security Audits' },
        { icon: Code, text: 'Open Source Tools' }
      ]
    },
    investor: {
      badge: { text: 'For Treasury', icon: TrendingUp, bgColor: 'bg-green-50', textColor: 'text-green-700' },
      title: 'DAT Proxy Powered Vaults',
      description: 'Secure treasury management with transparent vaults, stablecoin liquidity pools, and real-time analytics for institutional investors.',
      note: undefined,
      stats: [
        { label: 'Total Value Locked', value: '$50M+' },
        { label: 'Active Investors', value: '5,000+' },
        { label: 'Average APY', value: '18.5%' }
      ],
      features: [
        { icon: Shield, text: 'Secure & Transparent' },
        { icon: BarChart, text: 'Real-time Analytics' },
        { icon: DollarSign, text: 'High Yield Returns' }
      ]
    }
  };

  const currentPathway = pathways[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFBFC] to-white">
      <Navbar />
      
      <main className="relative pt-24">
        {/* Unified Hero Section */}
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFE8E0]/30 via-white to-[#F0F9FF]/30" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2E865F]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-lg border border-[#FF6B35]/20 mb-6"
              >
                <Sparkles className="w-5 h-5 text-[#FF6B35]" />
                <span className="text-sm font-semibold text-[#FF6B35]">
                  Your Gateway to DeFi Excellence
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1F2937] mb-6 leading-tight">
                Learn. Build. Invest.
                <br />
                <span className="text-[#FF6B35]">All in One Platform</span>
              </h1>

              <p className="text-xl text-[#5A6C7D] max-w-3xl mx-auto leading-relaxed">
                Connecting education, innovation, and institutional investment in decentralized finance.
                Choose your pathway and start your DeFi journey today.
              </p>
            </motion.div>

            {/* Pathway Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {(Object.keys(pathways) as Array<'student' | 'developer' | 'investor'>).map((key) => {
                  const pathway = pathways[key];
                  const Icon = pathway.badge.icon;
                  return (
                    <motion.button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                        activeTab === key
                          ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30'
                          : 'bg-white text-[#5A6C7D] border-2 border-gray-200 hover:border-[#FF6B35]/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{pathway.badge.text}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Pathway Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
                >
                  <div className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      {/* Left: Content */}
                      <div className="space-y-6">
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 ${currentPathway.badge.bgColor} rounded-full`}>
                          <currentPathway.badge.icon className={`w-5 h-5 ${currentPathway.badge.textColor}`} />
                          <span className={`text-sm font-semibold ${currentPathway.badge.textColor}`}>
                            {currentPathway.badge.text}
                          </span>
                        </div>

                        {currentPathway.note && (
                          <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 font-medium">
                            {currentPathway.note}
                          </div>
                        )}

                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] leading-tight">
                          {currentPathway.title}
                        </h2>

                        <p className="text-lg text-[#5A6C7D] leading-relaxed">
                          {currentPathway.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 gap-3">
                          {currentPathway.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-[#FFE8E0] transition-colors duration-300"
                              >
                                <FeatureIcon className="w-5 h-5 text-[#FF6B35]" />
                                <span className="text-[#1F2937] font-medium">{feature.text}</span>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 pt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:shadow-[#FF6B35]/40 transition-all duration-300 flex items-center space-x-2"
                          >
                            <span>Get Started</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-[#FF6B35] rounded-xl font-semibold border-2 border-[#FF6B35] hover:bg-[#FFE8E0] transition-all duration-300"
                          >
                            View Dashboard
                          </motion.button>
                        </div>
                      </div>

                      {/* Right: Stats */}
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-[#FFE8E0] to-white rounded-2xl p-8 border border-[#FF6B35]/20">
                          <h3 className="text-2xl font-bold text-[#1F2937] mb-6">Platform Stats</h3>
                          <div className="space-y-6">
                            {currentPathway.stats.map((stat, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + idx * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
                              >
                                <span className="text-[#5A6C7D] font-medium">{stat.label}</span>
                                <span className="text-2xl font-bold text-[#FF6B35]">{stat.value}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Element */}
                        <div className="bg-gradient-to-br from-[#2E865F]/10 to-white rounded-2xl p-6 border border-[#2E865F]/20">
                          <div className="flex items-center justify-center space-x-2 mb-4">
                            <Target className="w-6 h-6 text-[#2E865F]" />
                            <span className="text-lg font-semibold text-[#1F2937]">Join Our Community</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-white rounded-xl">
                              <div className="text-2xl font-bold text-[#2E865F]">10K+</div>
                              <div className="text-sm text-[#5A6C7D]">Members</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-xl">
                              <div className="text-2xl font-bold text-[#2E865F]">24/7</div>
                              <div className="text-sm text-[#5A6C7D]">Support</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="section-how-it-works" className="relative py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6">
                How It Works
              </h2>
              <p className="text-xl text-[#5A6C7D] max-w-3xl mx-auto">
                Three simple steps to transform your DeFi journey from learning to earning
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  number: '01',
                  title: 'Learn & Build',
                  description: 'Access comprehensive courses and institutional-grade development tools to master blockchain technology.',
                  icon: BookOpen,
                  color: '#2E865F'
                },
                {
                  number: '02',
                  title: 'Launch & Showcase',
                  description: 'Deploy your projects on our platform and present them directly to institutional investors and sponsors.',
                  icon: Rocket,
                  color: '#FF6B35'
                },
                {
                  number: '03',
                  title: 'Connect & Scale',
                  description: 'Receive funding, mentorship, and resources to scale your DeFi solutions and grow your career.',
                  icon: TrendingUp,
                  color: '#2E865F'
                }
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="text-6xl font-bold opacity-10" style={{ color: step.color }}>
                          {step.number}
                        </div>
                        <div className="flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFE8E0] to-[#FF6B35]/20 flex items-center justify-center mb-4">
                            <StepIcon className="w-6 h-6 text-[#FF6B35]" />
                          </div>
                          <h3 className="text-2xl font-bold text-[#1F2937] mb-3">
                            {step.title}
                          </h3>
                          <p className="text-[#5A6C7D] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    {idx < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-[#FF6B35]" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:shadow-[#FF6B35]/40 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="section-features" className="relative py-24 bg-[#FAFBFC] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B35]/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6">
                Why Choose Learn2Launch
              </h2>
              <p className="text-xl text-[#5A6C7D] max-w-3xl mx-auto">
                Experience the perfect blend of education, innovation, and investment opportunities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Accelerated Development',
                  description: 'Fast-track your blockchain journey with our structured curriculum and battle-tested infrastructure.',
                  color: '#FF6B35',
                  bgGradient: 'from-[#FFE8E0] to-white'
                },
                {
                  icon: Shield,
                  title: 'Security Standards',
                  description: 'Enterprise-grade security protocols and audit services to ensure your projects meet institutional requirements.',
                  color: '#2E865F',
                  bgGradient: 'from-green-50 to-white'
                },
                {
                  icon: Users,
                  title: 'Professional Network',
                  description: 'Connect with investors, mentors, and peers in a thriving community of blockchain innovators.',
                  color: '#FF6B35',
                  bgGradient: 'from-purple-50 to-white'
                }
              ].map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl p-8 shadow-lg border border-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full`}>
                      <div className="w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <FeatureIcon className="w-8 h-8" style={{ color: feature.color }} />
                      </div>
                      <h3 className="text-2xl font-bold text-[#1F2937] mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-[#5A6C7D] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#FF6B35] rounded-xl font-semibold border-2 border-[#FF6B35] hover:bg-[#FFE8E0] transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Explore All Features</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {showRoleModal && (
          <MetadataCollector
            isOpen={showRoleModal}
            onClose={() => setShowRoleModal(false)}
            onComplete={handleRoleSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
