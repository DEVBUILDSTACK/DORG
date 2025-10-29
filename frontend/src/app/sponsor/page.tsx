'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
      color: "from-[#FF6B6B] to-[#FF8E53]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Brand Visibility",
      description: "Showcase your brand to a highly engaged community of builders and investors.",
      color: "from-[#4ECDC4] to-[#45B7D1]"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Co-Innovation",
      description: "Collaborate on cutting-edge projects and shape the future of decentralized technology.",
      color: "from-[#95E1D3] to-[#38ADA9]"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Thought Leadership",
      description: "Position your organization as an industry leader through exclusive content and events.",
      color: "from-[#FFA07A] to-[#FF6B6B]"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Targeted Reach",
      description: "Engage with a focused audience passionate about blockchain, DeFi, and Web3 development.",
      color: "from-[#A8E6CF] to-[#56CCF2]"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Measurable Impact",
      description: "Track engagement metrics and ROI with detailed analytics and reporting.",
      color: "from-[#FFD93D] to-[#FFA07A]"
    }
  ];

  const targetEnterprises = [
    {
      name: "ELIZAos AI",
      category: "AI Infrastructure",
      description: "Advanced AI operating systems for decentralized applications",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-[#8B5CF6] to-[#6D28D9]"
    },
    {
      name: "Google Cloud & Skills",
      category: "Cloud & Education",
      description: "Cloud infrastructure and developer education programs",
      icon: <Globe className="w-6 h-6" />,
      color: "from-[#4285F4] to-[#34A853]"
    },
    {
      name: "Jupiter DEX & Portfolio",
      category: "DeFi Exchange",
      description: "Leading DEX aggregator and portfolio management on Solana",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-[#FFA500] to-[#FF6B6B]"
    },
    {
      name: "Phantom Wallet",
      category: "Wallet Infrastructure",
      description: "Premier multi-chain crypto wallet for Solana ecosystem",
      icon: <Zap className="w-6 h-6" />,
      color: "from-[#AB9FF2] to-[#7B61FF]"
    },
    {
      name: "SQDS & GRID + FUSE",
      category: "SOL-Aligned Wallets",
      description: "Multi-sig solutions and parent card infrastructure for Solana",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-[#00D4AA] to-[#00A896]"
    },
    {
      name: "Farcaster & Neynar",
      category: "Social & MiniApps",
      description: "Decentralized social protocol and MiniApp infrastructure",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-[#8A63D2] to-[#6B46C1]"
    },
    {
      name: "BASE Foundation",
      category: "L2 Infrastructure",
      description: "Ethereum L2 scaling solution by Coinbase",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-[#0052FF] to-[#0041CC]"
    },

     {
      name: "INGRAM",
      category: "L2 Infrastructure",
      description: "Automating tedium Humanizing B2B.",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-[#0052FF] to-[#0041CC]"
    },

     {
      name: "Plasma",
      category: " stablecoins",
      description: "Redefining how money moves.",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-[#0052FF] to-[#0041CC]"
    },
     {
      name: "Aave",
      category: "Defi Protocol",
      description: "Defi Largest  Lending Protocol.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-[#0052FF] to-[#0041CC]"
    },
     {
      name: "Wormhole",
      category: "File Sharing",
      description: "Simple , Secure, and Fast.",
      icon: <Share2 className="w-6 h-6" />,
      color: "from-[#0052FF] to-[#0041CC]"
    }
    ,
     {
      name: "Resend",
      category: "Email Delivery",
      description: "Best wasy to reach humans instead of spam folders",
      icon: <Mail className="w-6 h-6" />,
      color: "from-[#0052FF] to-[#0041CC]"
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
      color: "from-[#E8E8E8] to-[#C0C0C0]",
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
      color: "from-[#FFD700] to-[#FFA500]",
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
      color: "from-[#C0C0C0] to-[#A8A8A8]",
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
    <div className="min-h-screen bg-gradient-to-br from-[#0B0C14] via-[#2D1B69] to-[#0B0C14]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0C14]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
            Learn2Launch
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="#contact"
              className="px-6 py-2 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-semibold hover:shadow-[0_0_20px_rgba(78,205,196,0.6)] transition-all duration-300"
            >
              Get in Touch
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
              🤝 Partnership Opportunities
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1] bg-clip-text text-transparent">
              Partner With the Future
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join leading enterprises in empowering the next generation of Web3 developers, 
              DeFi innovators, and blockchain builders.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link
                href="#tiers"
                className="group px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(78,205,196,0.6)] transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Partnership Tiers</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="px-8 py-4 border border-[#4ECDC4]/50 text-[#4ECDC4] rounded-full hover:bg-[#4ECDC4]/10 transition-all duration-300 flex items-center space-x-2"
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
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#4ECDC4]/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
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
                    <li>Monthly yield share as Grant</li>
                    <li>Fractionally self-configured return of principal</li>
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
                    <li>Monthly yield share as Grant; fractionally self-configured return of principal</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Enterprises Section */}
      <section id="partners" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Target Partnership Enterprises
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                className="group p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#4ECDC4]/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${enterprise.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {enterprise.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{enterprise.name}</h3>
                <div className="text-sm text-[#4ECDC4] mb-2">{enterprise.category}</div>
                <p className="text-gray-400 text-sm">{enterprise.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers Section */}
      <section id="tiers" className="py-20 px-6 relative">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Partnership Tiers
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                className={`relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border ${
                  tier.popular ? 'border-[#4ECDC4] shadow-[0_0_30px_rgba(78,205,196,0.3)]' : 'border-white/10'
                } transition-all duration-300 hover:scale-105`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full text-white text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 mx-auto`}>
                  <Award className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white text-center mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent">
                  {tier.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`block w-full py-3 text-center rounded-full font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white hover:shadow-[0_0_20px_rgba(78,205,196,0.6)]'
                      : 'border border-[#4ECDC4]/50 text-[#4ECDC4] hover:bg-[#4ECDC4]/10'
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
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sponsorship Opportunities
              </h2>
              <p className="text-xl text-gray-400 mb-8">
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
                    <CheckCircle className="w-5 h-5 text-[#4ECDC4] flex-shrink-0" />
                    <span className="text-gray-300">{opportunity}</span>
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
              <div className="relative p-8 bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 rounded-3xl border border-[#4ECDC4]/30 backdrop-blur-sm">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(78,205,196,0.5)]"
                >
                  <Handshake className="w-10 h-10 text-white" />
                </motion.div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Active Partners</span>
                    <span className="text-[#4ECDC4] font-bold">50+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Events Hosted</span>
                    <span className="text-[#4ECDC4] font-bold">120+</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Reach</span>
                    <span className="text-[#4ECDC4] font-bold">10K+ Users</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-gray-300">Avg Engagement</span>
                    <span className="text-[#4ECDC4] font-bold">85%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 rounded-3xl border border-[#4ECDC4]/30 backdrop-blur-sm text-center"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Partner?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how we can create value together
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:partnerships@learn2launch.com"
                  className="inline-flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(78,205,196,0.8)] transition-all duration-300 group"
                >
                  <Mail className="w-6 h-6" />
                  <span>partnerships@learn2launch.com</span>
                </a>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                We typically respond within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Learn2Launch. Building partnerships for the future.</p>
        </div>
      </footer>
    </div>
  );
}
