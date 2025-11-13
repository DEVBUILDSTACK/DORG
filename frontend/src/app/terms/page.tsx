'use client';

import { motion } from 'framer-motion';
import { Footer, Navbar } from '@/components/landing';
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  Shield, 
  Users, 
  Gavel, 
  BookOpen,
  Globe,
  CreditCard,
  Ban
} from 'lucide-react';

export default function Terms() {
  const lastUpdated = "November 13, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content: `By accessing and using Learn2Launch ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: "description",
      title: "Service Description",
      icon: BookOpen,
      content: `Learn2Launch is a decentralized finance (DeFi) education and development platform that provides:`,
      list: [
        "Educational courses and tutorials on blockchain technology and DeFi",
        "Development tools and infrastructure for building DeFi applications",
        "Treasury management solutions for organizations and individuals",
        "Community features for collaboration and networking",
        "Project showcasing and portfolio management tools"
      ]
    },
    {
      id: "eligibility",
      title: "User Eligibility",
      icon: Users,
      content: `To use Learn2Launch, you must:`,
      list: [
        "Be at least 12 years of age (users under 18 require parental consent)",
        "Have the legal authority to enter into this agreement",
        "Not be prohibited from using our services under applicable laws",
        "Provide accurate and truthful information during registration",
        "Maintain the security and confidentiality of your account credentials"
      ]
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: Shield,
      content: `As a user of Learn2Launch, you agree to:`,
      list: [
        "Use the platform in compliance with all applicable laws and regulations",
        "Respect the intellectual property rights of others",
        "Not engage in any harmful, fraudulent, or illegal activities",
        "Maintain the security of your wallet and private keys",
        "Report security vulnerabilities or suspicious activities",
        "Respect other users and maintain professional conduct"
      ]
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: Ban,
      content: `The following activities are strictly prohibited:`,
      list: [
        "Attempting to hack, disrupt, or compromise platform security",
        "Creating fake accounts or impersonating others",
        "Sharing or distributing malicious software or code",
        "Engaging in market manipulation or fraudulent trading",
        "Violating any applicable laws or regulations",
        "Harassing, threatening, or abusing other users",
        "Attempting to gain unauthorized access to user accounts or data"
      ]
    },
    {
      id: "wallet-blockchain",
      title: "Wallet and Blockchain Interactions",
      icon: CreditCard,
      content: `Important information about blockchain interactions:`,
      list: [
        "You are solely responsible for your wallet security and private keys",
        "All blockchain transactions are irreversible once confirmed",
        "Learn2Launch does not control blockchain networks or transaction fees",
        "We are not responsible for failed transactions or network issues",
        "Smart contract interactions carry inherent risks",
        "You should understand the risks before engaging with DeFi protocols"
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: Scale,
      content: `Regarding intellectual property rights:`,
      list: [
        "Learn2Launch owns all proprietary content, trademarks, and copyrights",
        "Users retain rights to their original content and projects",
        "You grant us a license to display and distribute your shared content",
        "Respect third-party intellectual property rights",
        "Report any copyright infringement to our team",
        "Open source code contributions are governed by respective licenses"
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: `Important disclaimers about our services:`,
      list: [
        "Educational content is for informational purposes only",
        "We do not provide financial, investment, or legal advice",
        "Platform services are provided 'as is' without warranties",
        "We are not liable for investment losses or trading decisions",
        "Third-party integrations are outside our control",
        "Users should conduct their own research before making decisions"
      ]
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Gavel,
      content: `To the fullest extent permitted by law:`,
      list: [
        "Learn2Launch is not liable for indirect or consequential damages",
        "Our total liability is limited to the amount paid for services",
        "We are not responsible for third-party actions or services",
        "Users assume risks associated with blockchain and DeFi activities",
        "Force majeure events are outside our liability",
        "Some jurisdictions may not allow liability limitations"
      ]
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      icon: Shield,
      content: `Your privacy and data protection:`,
      list: [
        "Our Privacy Policy governs data collection and use",
        "We implement industry-standard security measures",
        "You control your personal information and can request deletion",
        "We comply with applicable privacy regulations (GDPR, CCPA)",
        "Blockchain data is publicly available and immutable",
        "We never store or access your private keys"
      ]
    },
    {
      id: "modifications",
      title: "Modifications to Terms",
      icon: FileText,
      content: `We may update these terms:`,
      list: [
        "Terms may be modified to reflect changes in our services",
        "Users will be notified of significant changes",
        "Continued use constitutes acceptance of modified terms",
        "We recommend reviewing terms periodically",
        "Previous versions are available upon request"
      ]
    },
    {
      id: "termination",
      title: "Account Termination",
      icon: Ban,
      content: `Account termination conditions:`,
      list: [
        "You may close your account at any time",
        "We may suspend accounts for terms violations",
        "Data export options are available before account closure",
        "Some information may be retained for legal compliance",
        "Blockchain transactions remain on public ledgers",
        "Termination does not affect existing obligations"
      ]
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      icon: Globe,
      content: `Legal jurisdiction and dispute resolution:`,
      list: [
        "These terms are governed by applicable international laws",
        "Disputes will be resolved through binding arbitration when possible",
        "Users may have additional rights under local consumer protection laws",
        "We encourage good faith resolution of disputes",
        "Legal proceedings may be necessary in some cases",
        "Jurisdiction is determined by user location and applicable law"
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
              <Scale className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35]">
                Legal Terms & Conditions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight"
            >
              Terms of Service
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#5A6C7D] max-w-3xl mx-auto leading-relaxed"
            >
              Please read these terms carefully before using Learn2Launch. 
              By using our platform, you agree to these terms and conditions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Last Updated: {lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16 bg-[#FAFBFC]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-8">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
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
                      <p className="text-[#5A6C7D] leading-relaxed mb-4">
                        {section.content}
                      </p>
                      {section.list && (
                        <ul className="space-y-3">
                          {section.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0" />
                              <span className="text-[#5A6C7D] leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
                <Scale className="w-8 h-8 text-[#2E865F]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
                Questions About Terms?
              </h2>
              <p className="text-[#5A6C7D] mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service or need legal clarification, 
                please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:legal@learn2launch.com"
                  className="px-6 py-3 bg-[#2E865F] text-white rounded-xl font-semibold hover:bg-[#2E865F]/90 transition-colors duration-300"
                >
                  Contact Legal Team
                </a>
                <a
                  href="/privacy"
                  className="px-6 py-3 bg-white text-[#2E865F] rounded-xl font-semibold border-2 border-[#2E865F] hover:bg-[#2E865F]/5 transition-colors duration-300"
                >
                  View Privacy Policy
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}