'use client';

import { motion } from 'framer-motion';
import { Footer, Navbar } from '@/components/landing';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Cookie, 
  UserCheck, 
  FileText,
  Calendar,
  Mail,
  Globe
} from 'lucide-react';

export default function Privacy() {
  const lastUpdated = "November 13, 2025";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, and profile information when you create an account",
            "Educational background and learning preferences",
            "Professional information (title, company, experience level)",
            "Social media links (optional)"
          ]
        },
        {
          subtitle: "Wallet and Blockchain Data",
          items: [
            "Wallet addresses and transaction history",
            "Smart contract interactions",
            "DeFi protocol usage data",
            "Treasury management activities"
          ]
        },
        {
          subtitle: "Usage Data",
          items: [
            "Course progress and completion rates",
            "Platform interaction patterns",
            "Feature usage analytics",
            "Performance metrics"
          ]
        }
      ]
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        {
          subtitle: "Platform Services",
          items: [
            "Provide personalized learning experiences",
            "Track educational progress and achievements",
            "Enable treasury management features",
            "Facilitate developer project showcasing"
          ]
        },
        {
          subtitle: "Communication",
          items: [
            "Send course updates and educational content",
            "Notify about platform features and improvements",
            "Provide customer support",
            "Share relevant DeFi and blockchain news"
          ]
        },
        {
          subtitle: "Platform Improvement",
          items: [
            "Analyze usage patterns to enhance user experience",
            "Develop new features based on user needs",
            "Improve security and performance",
            "Conduct research for educational content"
          ]
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing and Disclosure",
      icon: Eye,
      content: [
        {
          subtitle: "We Never Share",
          items: [
            "Your private keys or wallet credentials",
            "Personal financial information",
            "Private learning progress without consent",
            "Contact information with third parties for marketing"
          ]
        },
        {
          subtitle: "We May Share",
          items: [
            "Anonymized usage statistics for platform improvement",
            "Public project showcases (with your permission)",
            "Course completion certificates (at your request)",
            "Compliance information when legally required"
          ]
        },
        {
          subtitle: "Service Providers",
          items: [
            "Cloud hosting and infrastructure providers",
            "Analytics services (with anonymized data)",
            "Customer support tools",
            "Security and fraud prevention services"
          ]
        }
      ]
    },
    {
      id: "blockchain-data",
      title: "Blockchain and Wallet Data",
      icon: Lock,
      content: [
        {
          subtitle: "Public Blockchain Information",
          items: [
            "Wallet addresses and transaction history are publicly available on blockchain networks",
            "Smart contract interactions are recorded on-chain",
            "We do not control or modify blockchain data",
            "Public addresses may be linked to your Learn2Launch profile"
          ]
        },
        {
          subtitle: "Wallet Security",
          items: [
            "We never store or access your private keys",
            "Wallet connections use secure, standard protocols",
            "You maintain full control of your digital assets",
            "We recommend using hardware wallets for enhanced security"
          ]
        }
      ]
    },
    {
      id: "data-protection",
      title: "Data Protection and Security",
      icon: Shield,
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "End-to-end encryption for sensitive data",
            "Regular security audits and penetration testing",
            "Multi-factor authentication support",
            "Secure cloud infrastructure with industry-standard protocols"
          ]
        },
        {
          subtitle: "Data Storage",
          items: [
            "Data stored in secure, encrypted databases",
            "Regular backups with encryption",
            "Geographic data redundancy",
            "Compliance with international security standards"
          ]
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: Cookie,
      content: [
        {
          subtitle: "Essential Cookies",
          items: [
            "Authentication and session management",
            "Security and fraud prevention",
            "Platform functionality and preferences",
            "Load balancing and performance optimization"
          ]
        },
        {
          subtitle: "Analytics Cookies",
          items: [
            "Usage analytics to improve platform experience",
            "Performance monitoring and optimization",
            "User behavior analysis (anonymized)",
            "A/B testing for feature improvements"
          ]
        },
        {
          subtitle: "Cookie Control",
          items: [
            "You can manage cookie preferences in your browser",
            "Disabling cookies may affect platform functionality",
            "We respect Do Not Track browser settings",
            "Cookie consent can be updated in account settings"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      icon: FileText,
      content: [
        {
          subtitle: "Data Access Rights",
          items: [
            "Request a copy of your personal data",
            "Export your learning progress and achievements",
            "Download your project and portfolio data",
            "Access wallet interaction history"
          ]
        },
        {
          subtitle: "Data Control Rights",
          items: [
            "Update or correct your personal information",
            "Delete your account and associated data",
            "Opt out of marketing communications",
            "Manage privacy settings and preferences"
          ]
        },
        {
          subtitle: "Portability Rights",
          items: [
            "Export data in commonly used formats",
            "Transfer learning records to other platforms",
            "Download project portfolios and repositories",
            "Migrate wallet connections to other services"
          ]
        }
      ]
    },
    {
      id: "compliance",
      title: "Legal Compliance",
      icon: Globe,
      content: [
        {
          subtitle: "Regulatory Compliance",
          items: [
            "GDPR compliance for EU users",
            "CCPA compliance for California residents",
            "SOC 2 Type II certified infrastructure",
            "Regular compliance audits and assessments"
          ]
        },
        {
          subtitle: "Age Requirements",
          items: [
            "Platform open to users 12+ with parental consent",
            "Full feature access for users 18+",
            "Special protections for minor users",
            "Parental controls and oversight tools"
          ]
        }
      ]
    }
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
              <Shield className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35]">
                Your Privacy Matters
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight"
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#5A6C7D] max-w-3xl mx-auto leading-relaxed"
            >
              Learn how we protect your data, respect your privacy, and maintain transparency 
              in everything we do at Learn2Launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Last Updated: {lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-gradient-to-br from-[#FFE8E0] to-white rounded-2xl p-8 border border-[#FF6B35]/20 mb-12">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-[#FF6B35]" />
                  <span>Our Commitment to Privacy</span>
                </h2>
                <div className="text-[#5A6C7D] space-y-4">
                  <p>
                    At Learn2Launch, we believe that privacy is a fundamental right. This Privacy Policy 
                    explains how we collect, use, protect, and share your information when you use our 
                    decentralized finance (DeFi) education and development platform.
                  </p>
                  <p>
                    We are committed to transparency and giving you control over your data. This policy 
                    covers our web platform, mobile applications, and any related services we provide.
                  </p>
                  <p>
                    By using Learn2Launch, you agree to the collection and use of information in accordance 
                    with this Privacy Policy. If you do not agree with our policies and practices, 
                    do not use our services.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Sections */}
        <section className="py-16 bg-[#FAFBFC]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    id={section.id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-[#FF6B35]/10 to-[#2E865F]/10 p-6 border-b border-gray-200/50">
                      <h2 className="text-2xl font-bold text-[#1F2937] flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-[#FF6B35]" />
                        </div>
                        <span>{section.title}</span>
                      </h2>
                    </div>
                    
                    <div className="p-8">
                      <div className="space-y-8">
                        {section.content.map((subsection, subIndex) => (
                          <div key={subIndex}>
                            <h3 className="text-xl font-semibold text-[#1F2937] mb-4">
                              {subsection.subtitle}
                            </h3>
                            <ul className="space-y-3">
                              {subsection.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-[#5A6C7D] leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#2E865F]/10 to-white rounded-2xl p-8 border border-[#2E865F]/20 text-center"
            >
              <div className="w-16 h-16 bg-[#2E865F]/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#2E865F]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
                Questions About Privacy?
              </h2>
              <p className="text-[#5A6C7D] mb-6 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy, our data practices, 
                or would like to exercise your privacy rights, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:privacy@learn2launch.com"
                  className="px-6 py-3 bg-[#2E865F] text-white rounded-xl font-semibold hover:bg-[#2E865F]/90 transition-colors duration-300"
                >
                  Contact Privacy Team
                </a>
                <a
                  href="/support"
                  className="px-6 py-3 bg-white text-[#2E865F] rounded-xl font-semibold border-2 border-[#2E865F] hover:bg-[#2E865F]/5 transition-colors duration-300"
                >
                  General Support
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-[#FAFBFC]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-[#1F2937] mb-6 text-center">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sections.slice(0, 8).map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-200/50 hover:shadow-md hover:border-[#FF6B35]/30 transition-all duration-300 text-center group"
                  >
                    <span className="text-sm text-[#5A6C7D] group-hover:text-[#FF6B35] transition-colors duration-300">
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}