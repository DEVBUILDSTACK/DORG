'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { 
  Handshake, 
  Rocket, 
  Users, 
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Globe,
  Zap,
  Target,
  Award,
  Building2,
  Sparkles,
  BarChart3,
  MessageSquare,
  Mail,
  DollarSign,
  Share2
} from '@/components/icons';

export default function SponsorLandingPage() {
  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Access Top Talent",
      description: "Connect with 10,000+ skilled developers, students, and innovators in Web3 and DeFi.",
      color: "from-[#0A4A7A] to-[#0D5C94]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Brand Visibility",
      description: "Showcase your brand to a highly engaged community of builders and treasury managers.",
      color: "from-[#2E865F] to-[#1E5A42]"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Co-Innovation",
      description: "Collaborate on cutting-edge projects and shape the future of decentralized technology.",
      color: "from-[#FF6B35] to-[#CC5629]"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Thought Leadership",
      description: "Position your organization as an industry leader through exclusive content and events.",
      color: "from-[#0A4A7A] to-[#2E865F]"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Reach",
      description: "Engage with a focused audience passionate about blockchain, DeFi, and Web3 development.",
      color: "from-[#2E865F] to-[#FF6B35]"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Measurable Impact",
      description: "Track engagement metrics and ROI with detailed analytics and reporting.",
      color: "from-[#FF6B35] to-[#0A4A7A]"
    }
  ];

  const targetEnterprises = [
    {
      name: "ELIZAos AI",
      category: "AI Infrastructure",
      description: "Advanced AI operating systems for decentralized applications",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-[#0A4A7A] to-[#083A5E]"
    },
    {
      name: "Google Cloud & Skills",
      category: "Cloud & Education",
      description: "Cloud infrastructure and developer education programs",
      icon: <Globe className="w-6 h-6" />,
      color: "from-[#2E865F] to-[#1E5A42]"
    },
    {
      name: "Jupiter DEX & Portfolio",
      category: "DeFi Exchange",
      description: "Leading DEX aggregator and portfolio management on Solana",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-[#FF6B35] to-[#CC5629]"
    },
    {
      name: "Phantom Wallet",
      category: "Wallet Infrastructure",
      description: "Premier multi-chain crypto wallet for Solana ecosystem",
      icon: <Zap className="w-6 h-6" />,
      color: "from-[#0A4A7A] to-[#2E865F]"
    },
    {
      name: "SQDS & GRID + FUSE",
      category: "SOL-Aligned Wallets",
      description: "Multi-sig solutions and parent card infrastructure for Solana",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-[#2E865F] to-[#0A4A7A]"
    },
    {
      name: "Farcaster & Neynar",
      category: "Social & MiniApps",
      description: "Decentralized social protocol and MiniApp infrastructure",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-[#FF6B35] to-[#0A4A7A]"
    },
    {
      name: "BASE Foundation",
      category: "L2 Infrastructure",
      description: "Ethereum L2 scaling solution by Coinbase",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-[#0A4A7A] to-[#083A5E]"
    },

     {
      name: "INGRAM",
      category: "L2 Infrastructure",
      description: "Automating tedium Humanizing B2B.",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-[#2E865F] to-[#1E5A42]"
    },

     {
      name: "Plasma",
      category: " stablecoins",
      description: "Redefining how money moves.",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-[#FF6B35] to-[#CC5629]"
    },
     {
      name: "Aave",
      category: "Defi Protocol",
      description: "Defi Largest  Lending Protocol.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-[#0A4A7A] to-[#2E865F]"
    },
     {
      name: "Wormhole",
      category: "File Sharing",
      description: "Simple , Secure, and Fast.",
      icon: <Share2 className="w-6 h-6" />,
      color: "from-[#2E865F] to-[#FF6B35]"
    }
    ,
     {
      name: "Resend",
      category: "Email Delivery",
      description: "Best wasy to reach humans instead of spam folders",
      icon: <Mail className="w-6 h-6" />,
      color: "from-[#FF6B35] to-[#0A4A7A]"
    }
  ];

  const partnershipTiers = [
    {
      name: "Platinum Partner",
      price: "Custom",
      features: [
        "Logo on homepage & all marketing materials",
        "Dedicated landing page on platform",
        "Co-branded courses & content",
        "Exclusive hackathon sponsorship",
        "Direct talent pipeline access",
        "Quarterly executive briefings",
        "Custom integration opportunities",
        "Priority support & account manager"
      ],
      color: "from-[#0A4A7A] to-[#083A5E]",
      popular: true
    },
    {
      name: "Gold Partner",
      price: "Custom",
      features: [
        "Logo on partner page",
        "Featured in monthly newsletter",
        "Co-branded workshop series",
        "Hackathon participation",
        "Talent recruitment access",
        "Quarterly reports",
        "Integration support"
      ],
      color: "from-[#FF6B35] to-[#CC5629]",
      popular: false
    },
    {
      name: "Silver Partner",
      price: "Custom",
      features: [
        "Logo on partner page",
        "Newsletter mentions",
        "Workshop participation",
        "Event sponsorship options",
        "Talent pool access",
        "Bi-annual reports"
      ],
      color: "from-[#2E865F] to-[#1E5A42]",
      popular: false
    }
  ];

  const sponsorshipOpportunities = [
    "Course & Content Sponsorship",
    "Hackathon & Competition Hosting",
    "Scholarship Programs",
    "Developer Workshops & Webinars",
    "Research & Innovation Labs",
    "Talent Recruitment Programs",
    "Co-Branded Certifications",
    "Community Events & Meetups"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAFBFC] to-white">
      <Navbar />
      
      <main className="relative pt-24">
      {/* Hero Section */}
      <section className="pt-8 pb-20 px-6 relative overflow-hidden bg-linear-to-br from-[#F5F5F5] to-white">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['#0A4A7A', '#2E865F', '#FF6B35'][Math.floor(Math.random() * 3)]
                } 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
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
              className="inline-block px-4 py-2 bg-[#FFE8E0] border border-[#FF6B35] rounded-full text-[#CC5629] text-sm font-medium"
            >
              🤝 Partnership Opportunities
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#0A4A7A]">
              Partner With the Future
            </h1>

            <p className="text-xl md:text-2xl text-[#525252] max-w-3xl mx-auto leading-relaxed">
              Join leading enterprises in empowering the next generation of Web3 developers, 
              DeFi innovators, and blockchain builders.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link
                href="#tiers"
                className="group px-8 py-4 bg-linear-to-r from-[#0A4A7A] to-[#2E865F] text-white rounded-full font-semibold hover:from-[#0D5C94] hover:to-[#1E5A42] transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Partnership Tiers</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-[#FF6B35] text-[#FF6B35] rounded-full hover:bg-[#FFE8E0] transition-all duration-300 flex items-center space-x-2"
              >
                <Handshake className="w-5 h-5" />
                <span>Book a Call</span>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto"
            >
              {[
                { value: "10K+", label: "Active Users" },
                { value: "500+", label: "Projects Built" },
                { value: "$5M+", label: "Total Value Locked" },
                { value: "50+", label: "Partner Companies" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-white backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="text-3xl font-bold tabular-nums text-[#FF6B35]">{stat.value}</div>
                  <div className="text-sm text-[#737373]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">
              Unlock unique opportunities to engage with the Web3 ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#FF6B35] hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-2">{benefit.title}</h3>
                <p className="text-[#525252]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sponsors Row (added) */}
      <section id="featured-sponsors" className="py-12 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Featured Sponsor Opportunities
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto mt-2">
              New program and grant models available for cohort, grant, and enterprise sponsorship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: IRL Cohort / FLP COHORT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="p-6 bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-white">IRL Cohort — Hybrid Delivery</h4>
                  <p className="text-sm text-gray-300 mt-2">
                    IRL cohort delivered as hybrid.
                    <br />
                    Launch: <a href="https://lwandisurf.org" target="_blank" rel="noreferrer" className="text-[#4ECDC4] underline">FLP COHORT</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: GRANT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD93D] to-[#FFA07A] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-white">GRANT — DECENSAT.org Affiliate</h4>
                  <ul className="text-sm text-gray-300 mt-2 list-disc list-inside space-y-1">
                    <li>Programmatic 12/15/18 month DECENSAT.org affiliate Grant</li>
                    <li>Monthly protocol share as Grant</li>
                    <li>Fractionally self-configured allocation structure</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Card 3: ENTERPRISE SPONSOR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-6 bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#00A896] flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-white">Enterprise Sponsor — DECENSAT.org</h4>
                  <ul className="text-sm text-gray-300 mt-2 list-disc list-inside space-y-1">
                    <li>DECENSAT.org — 12yr+ or 18yr+ targeting learning workshop scholarships for inclusive needs</li>
                    <li>Epoch-based learner cohorts and on-chain attested parent/guardian applicants</li>
                    <li>Programming co-curation and private cohort delivery; DECENSAT.org ecosystem Grant</li>
                    <li>Monthly protocol share as Grant; fractionally self-configured allocation structure</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Enterprises Section */}
      <section id="partners" className="py-20 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Target Partnership Enterprises
            </h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">
              We're actively seeking partnerships with industry-leading organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetEnterprises.map((enterprise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group p-6 bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-[#FF6B35] hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${enterprise.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white`}>
                  {enterprise.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F0F0F] mb-1">{enterprise.name}</h3>
                <div className="text-sm text-[#FF6B35] font-medium mb-2">{enterprise.category}</div>
                <p className="text-[#525252] text-sm">{enterprise.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers Section */}
      <section id="tiers" className="py-20 px-6 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Quick Featured Row above Partnership Tiers (IRL cohort / Grant / Enterprise Sponsor) */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h4 className="text-xl md:text-2xl font-semibold text-white">Sponsor Highlights</h4>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto mt-2">Three highlighted sponsor options for cohorts, grants, and enterprise sponsorships.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">IRL Cohort — Hybrid</div>
                    <div className="text-sm text-gray-300">IRL cohort delivered as hybrid. Launch: <a href="https://lwandisurf.org" target="_blank" rel="noreferrer" className="text-[#4ECDC4] underline">FLP COHORT</a></div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#FFD93D] to-[#FFA07A] flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">GRANT — DECENSAT.org</div>
                    <div className="text-sm text-gray-300">Programmatic 12/15/18 month affiliate grants, monthly yield share as grant, and fractionally self-configured return of principal.</div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#00D4AA] to-[#00A896] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">Enterprise Sponsor — DECENSAT.org</div>
                    <div className="text-sm text-gray-300">12yr+ or 18yr+ scholarship targeting; epoch-based learner cohorts, on-chain attested guardian applicants, co-curation and private cohort delivery.</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
              Partnership Tiers
            </h2>
            <p className="text-xl text-[#525252] max-w-2xl mx-auto">
              Flexible partnership options tailored to your organization's goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative p-8 bg-white rounded-3xl border-2 ${
                  tier.popular ? 'border-[#FF6B35] shadow-xl' : 'border-gray-200'
                } transition-all duration-300 hover:scale-105`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-[#FF6B35] to-[#CC5629] rounded-full text-white text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${tier.color} flex items-center justify-center mb-4 mx-auto`}>
                  <Award className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-[#0F0F0F] text-center mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-center mb-6 text-[#FF6B35]">
                  {tier.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#2E865F] shrink-0 mt-0.5" />
                      <span className="text-[#525252] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`block w-full py-3 text-center rounded-full font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-[#FF6B35] text-white hover:bg-[#CC5629]'
                      : 'border-2 border-[#0A4A7A] text-[#0A4A7A] hover:bg-[#F5F5F5]'
                  }`}
                >
                  Contact Us
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="py-20 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-6">
                Sponsorship Opportunities
              </h2>
              <p className="text-xl text-[#525252] mb-8">
                Multiple ways to engage with our vibrant community
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sponsorshipOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2E865F] shrink-0" />
                    <span className="text-[#525252]">{opportunity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative p-8 bg-linear-to-br from-[#FFE8E0] to-white rounded-3xl border-2 border-[#FF6B35]">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br from-[#FF6B35] to-[#CC5629] rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Handshake className="w-10 h-10 text-white" />
                </motion.div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-[#525252]">Active Partners</span>
                    <span className="text-[#FF6B35] font-bold tabular-nums">50+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-[#525252]">Events Hosted</span>
                    <span className="text-[#FF6B35] font-bold tabular-nums">120+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-[#525252]">Reach</span>
                    <span className="text-[#FF6B35] font-bold tabular-nums">10K+ Users</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-[#525252]">Avg Engagement</span>
                    <span className="text-[#FF6B35] font-bold tabular-nums">85%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-linear-to-br from-[#FFE8E0] to-white rounded-3xl border-2 border-[#FF6B35] text-center"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A4A7A] mb-4">
                Ready to Partner?
              </h2>
              <p className="text-xl text-[#525252] mb-8">
                Let's discuss how we can create value together
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:partnerships@learn2launch.com"
                  className="inline-flex items-center justify-center space-x-2 px-10 py-5 bg-[#FF6B35] text-white rounded-full font-bold text-lg hover:bg-[#CC5629] transition-all duration-300 group"
                >
                  <Mail className="w-6 h-6" />
                  <span>partnerships@learn2launch.com</span>
                </a>
              </div>

              <p className="text-sm text-[#737373] mt-6">
                We typically respond within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
