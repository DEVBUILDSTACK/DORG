'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award,
  ChevronRight,
  DollarSign,
  Users,
  CheckCircle,
  Globe,
  ArrowUpRight,
  Shield,
  Rocket,
  Target,
  Code,
  Star
} from '@/components/icons';

export default function BuilderMarketplacePage() {
  const regions = [
    { 
      name: "India", 
      flag: "🇮🇳",
      stats: {
        activeDevs: "2,500+",
        avgMonthly: "$3,200",
        topEarner: "$12.5K",
        totalEarned: "$2.8M"
      }
    },
    { 
      name: "Pakistan", 
      flag: "🇵🇰",
      stats: {
        activeDevs: "1,800+",
        avgMonthly: "$2,950",
        topEarner: "$11.2K",
        totalEarned: "$1.9M"
      }
    },
    { 
      name: "Philippines", 
      flag: "🇵🇭",
      stats: {
        activeDevs: "1,200+",
        avgMonthly: "$2,750",
        topEarner: "$9.8K",
        totalEarned: "$1.5M"
      }
    }
  ];

  const bundleTiers = [
    {
      name: "Bronze Builder",
      emoji: "🥉",
      range: "$3K-$8K",
      duration: "6 weeks",
      requirements: [
        "Basic Web3 knowledge",
        "1+ year coding experience",
        "English proficiency",
        "Part-time availability"
      ],
      projectTypes: [
        "Frontend components",
        "Smart contract testing",
        "Documentation",
        "Basic DApps"
      ],
      bonus: "2.25%",
      color: "from-[#CD7F32] to-[#B87333]",
      popular: false
    },
    {
      name: "Silver Squad",
      emoji: "🥈",
      range: "$15K-$25K",
      duration: "3 months",
      requirements: [
        "Intermediate Web3 exp.",
        "2+ years coding",
        "Team collaboration",
        "Full-time dedication"
      ],
      projectTypes: [
        "Full-stack DApps",
        "DEX integrations",
        "Smart contract dev",
        "Cross-chain bridges"
      ],
      bonus: "3.75%",
      color: "from-[#808080] to-[#C0C0C0]",
      popular: true
    },
    {
      name: "Gold Guild",
      emoji: "🥇",
      range: "$50K-$150K",
      duration: "6 months",
      requirements: [
        "Advanced Web3 mastery",
        "4+ years experience",
        "Team leadership",
        "Architecture skills"
      ],
      projectTypes: [
        "Protocol development",
        "L2 solutions",
        "Custom bridges",
        "Security audits"
      ],
      bonus: "4.25%",
      color: "from-[#FFD700] to-[#FFA500]",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      country: "India 🇮🇳",
      role: "Full-Stack Web3 Developer",
      earnings: "$3,400/month",
      rating: 4.9,
      projects: 12,
      quote: "The tier system gives clear goals. Started at Bronze, now in Silver - my income doubled in 4 months!"
    },
    {
      name: "Ali Hassan",
      country: "Pakistan 🇵🇰",
      role: "Smart Contract Developer",
      earnings: "$2,850/month",
      rating: 4.8,
      projects: 8,
      quote: "Transparent earnings & regular payouts. Better than any local tech job. Moving to Gold tier soon!"
    },
    {
      name: "Maria Santos",
      country: "Philippines 🇵🇭",
      role: "DeFi Integration Specialist",
      earnings: "$3,100/month",
      rating: 4.9,
      projects: 15,
      quote: "The bonus system is amazing. Earned +3.75% extra last month for high-quality deliveries."
    }
  ];

  const trustSignals = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team-Based Only",
      description: "Work in collaborative squads, not solo"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Transparent P&L",
      description: "Clear breakdown of earnings & bonuses"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Teams",
      description: "12+ countries, 24/7 collaboration"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Projects",
      description: "Pre-vetted, secure opportunities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C14] via-[#2D1B69] to-[#0B0C14]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0C14]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            Learn2Launch
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/developer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Developer Hub
            </Link>
            <Link 
              href="/dashboard/developer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="#apply"
              className="px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-semibold hover:shadow-[0_0_20px_rgba(78,205,196,0.6)] transition-all duration-300"
            >
              Start Building
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][Math.floor(Math.random() * 4)]
                } 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block px-4 py-2 bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 rounded-full text-[#4ECDC4] text-sm font-medium"
            >
              🚀 150+ Builders Already Earning
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1] bg-clip-text text-transparent">
              Build & Earn in Web3
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join elite builder teams earning $3K-$150K. 
              Clear tiers, transparent earnings, weekly payouts.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link
                href="#tiers"
                className="group px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(78,205,196,0.6)] transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Earning Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#learn"
                className="px-8 py-4 border border-[#4ECDC4]/50 text-[#4ECDC4] rounded-full hover:bg-[#4ECDC4]/10 transition-all duration-300 flex items-center space-x-2"
              >
                <Code className="w-5 h-5" />
                <span>View Sample Projects</span>
              </Link>
            </div>

            {/* Regional Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#4ECDC4]/50 transition-all duration-300"
                >
                  <div className="text-2xl font-bold mb-4">
                    {region.flag} {region.name}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Active Devs</div>
                      <div className="text-lg font-bold text-white">{region.stats.activeDevs}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Avg Monthly</div>
                      <div className="text-lg font-bold text-[#4ECDC4]">{region.stats.avgMonthly}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Top Earner</div>
                      <div className="text-lg font-bold text-[#FF6B6B]">{region.stats.topEarner}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Total Earned</div>
                      <div className="text-lg font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">{region.stats.totalEarned}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bundle Tiers */}
      <section id="tiers" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Builder Bundle
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Clear progression path with increasing rewards.
              Start anywhere based on your experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {bundleTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border ${
                  tier.popular ? 'border-[#4ECDC4] shadow-[0_0_30px_rgba(78,205,196,0.3)]' : 'border-white/10'
                } transition-all duration-300 hover:scale-105`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full text-white text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <span className="text-4xl">{tier.emoji}</span>
                  <h3 className="text-2xl font-bold text-white mt-4">{tier.name}</h3>
                  <div className="text-3xl font-bold mt-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
                    {tier.range}
                  </div>
                  <div className="text-gray-400 mt-1">
                    {tier.duration}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-[#4ECDC4] mb-2">Requirements</div>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-[#4ECDC4] mb-2">Project Types</div>
                    <ul className="space-y-2">
                      {tier.projectTypes.map((type, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Rocket className="w-5 h-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-gray-400">Performance Bonus</span>
                      <span className="text-[#4ECDC4] font-bold">+{tier.bonus}</span>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/developer?tier=${tier.name.toLowerCase().replace(' ', '-')}`}
                    className={`block w-full py-3 text-center rounded-full font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white hover:shadow-[0_0_20px_rgba(78,205,196,0.6)]'
                        : 'border border-[#4ECDC4]/50 text-[#4ECDC4] hover:bg-[#4ECDC4]/10'
                    }`}
                  >
                    {tier.popular ? 'Join Silver Squad' : 'Apply Now'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* P&L Breakdown */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a1b23] to-[#0B0C14]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real Earnings Breakdown
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transparent P&L from a Silver tier builder. 
              No hidden fees, clear bonus structure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Base Monthly Rate</span>
                  <span className="text-2xl font-bold text-white">$12,500</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quality Bonus (+2.25%)</span>
                    <span className="text-[#4ECDC4]">+$281</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Speed Bonus (+1.5%)</span>
                    <span className="text-[#4ECDC4]">+$187</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Team Lead Bonus</span>
                    <span className="text-[#4ECDC4]">+$875</span>
                  </div>
                  <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                    <span className="text-gray-300">Total Monthly</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
                      $13,843
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-sm text-gray-400">Avg. Weekly</div>
                  <div className="text-xl font-bold text-white">$3,460</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-sm text-gray-400">Monthly Growth</div>
                  <div className="text-xl font-bold text-[#4ECDC4]">+10.7%</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 rounded-xl border border-[#4ECDC4]/30">
                  <h3 className="text-xl font-bold text-white mb-4">Bonus Structure</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-[#4ECDC4] mt-1" />
                      <div>
                        <div className="text-white font-semibold">Quality Bonus</div>
                        <p className="text-sm text-gray-400">Earn up to +2.25% for high-quality code & documentation</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Rocket className="w-5 h-5 text-[#4ECDC4] mt-1" />
                      <div>
                        <div className="text-white font-semibold">Speed Bonus</div>
                        <p className="text-sm text-gray-400">+1.5% for completing sprints ahead of schedule</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-[#4ECDC4] mt-1" />
                      <div>
                        <div className="text-white font-semibold">Special Bonuses</div>
                        <p className="text-sm text-gray-400">Team lead, mentorship & innovation bonuses available</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by 150+ Builders
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join developers from your region already building & earning
            </p>
          </motion.div>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {trustSignals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 flex items-center justify-center mb-4">
                  {signal.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{signal.title}</h3>
                <p className="text-gray-400 text-sm">{signal.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-[#4ECDC4]">{testimonial.country}</div>
                  </div>
                </div>

                <blockquote className="text-gray-300 mb-4">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-[#4ECDC4] font-bold">{testimonial.earnings}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{testimonial.rating}★</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{testimonial.projects} projects</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 rounded-3xl border border-[#4ECDC4]/30 backdrop-blur-sm text-center"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Start Building?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Apply now and start earning within 48 hours
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/dashboard/developer"
                  className="inline-flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(78,205,196,0.8)] transition-all duration-300"
                >
                  <span>Apply as Builder</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <a
                  href="#schedule"
                  className="inline-flex items-center justify-center space-x-2 px-10 py-5 border border-[#4ECDC4]/50 text-[#4ECDC4] rounded-full font-bold text-lg hover:bg-[#4ECDC4]/10 transition-all duration-300"
                >
                  <span>Schedule Demo</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                <div className="text-center">
                  <div className="text-[#4ECDC4] font-bold mb-1">$0</div>
                  <div className="text-sm text-gray-400">Upfront Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-[#4ECDC4] font-bold mb-1">48h</div>
                  <div className="text-sm text-gray-400">To Start</div>
                </div>
                <div className="text-center">
                  <div className="text-[#4ECDC4] font-bold mb-1">2 Weeks</div>
                  <div className="text-sm text-gray-400">First Payout</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Learn2Launch. Building the future of Web3 together.</p>
        </div>
      </footer>
    </div>
  );
}