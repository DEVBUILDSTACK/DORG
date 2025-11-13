'use client';

import { motion } from 'framer-motion';
import { Footer, Navbar } from '@/components/landing';
import { 
  MessageCircle, 
  Mail, 
  BookOpen, 
  HelpCircle, 
  Search,
  Phone,
  Clock,
  Users,
  Bug,
  Lightbulb,
  Shield
} from 'lucide-react';
import { useState } from 'react';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      availability: '24/7 Available',
      color: 'bg-[#FF6B35]'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      action: 'Send Email',
      availability: 'Response within 24h',
      color: 'bg-[#2E865F]'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Explore our comprehensive guides and tutorials',
      action: 'Browse Docs',
      availability: 'Always Available',
      color: 'bg-blue-600'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other users and get community help',
      action: 'Join Forum',
      availability: 'Community Driven',
      color: 'bg-purple-600'
    }
  ];

  const faqCategories = [
    { id: 'all', name: 'All Topics', count: 24 },
    { id: 'account', name: 'Account & Profile', count: 8 },
    { id: 'courses', name: 'Courses & Learning', count: 6 },
    { id: 'wallet', name: 'Wallet & Blockchain', count: 5 },
    { id: 'technical', name: 'Technical Issues', count: 3 },
    { id: 'billing', name: 'Billing & Payments', count: 2 }
  ];

  const faqs = [
    {
      category: 'account',
      question: 'How do I create an account on Learn2Launch?',
      answer: 'You can create an account by clicking the "Sign Up" button and choosing to sign up with email, Google, or by connecting your wallet. For users under 18, parental consent is required.'
    },
    {
      category: 'account',
      question: 'Can I change my role after signing up?',
      answer: 'Yes, you can update your role (Student, Developer, or Treasury) in your account settings. This will change your dashboard and available features accordingly.'
    },
    {
      category: 'courses',
      question: 'Are the courses suitable for beginners?',
      answer: 'Absolutely! Our courses are designed for learners aged 12+ with no prior blockchain experience. We have beginner-friendly content that gradually builds up to advanced topics.'
    },
    {
      category: 'courses',
      question: 'Do I get certificates for completing courses?',
      answer: 'Yes, you receive digital certificates for completing courses. These certificates are stored on-chain and can be shared with employers or added to your professional profile.'
    },
    {
      category: 'wallet',
      question: 'What wallets are supported?',
      answer: 'We support major wallets including MetaMask, Coinbase Wallet, and WalletConnect-compatible wallets. We also provide embedded wallets for users who don\'t have an existing wallet.'
    },
    {
      category: 'wallet',
      question: 'Is my wallet information secure?',
      answer: 'Yes, we never store or have access to your private keys. All wallet interactions use secure, standard protocols, and you maintain full control of your digital assets.'
    },
    {
      category: 'technical',
      question: 'The website is loading slowly. What should I do?',
      answer: 'Try refreshing the page, clearing your browser cache, or switching to a different browser. If issues persist, check our status page or contact support.'
    },
    {
      category: 'technical',
      question: 'I\'m getting an error when trying to connect my wallet',
      answer: 'Ensure your wallet is unlocked and on the correct network. Try refreshing the page and reconnecting. If using MetaMask, make sure you\'re on the latest version.'
    },
    {
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, PayPal, and cryptocurrency payments. Premium features can be paid for with both traditional and crypto payment methods.'
    }
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const searchFilteredFaqs = filteredFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <HelpCircle className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35]">
                We're Here to Help
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight"
            >
              Support Center
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#5A6C7D] max-w-3xl mx-auto leading-relaxed"
            >
              Get help with your Learn2Launch experience. Find answers, contact support, 
              or connect with our community.
            </motion.p>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">How Can We Help?</h2>
              <p className="text-[#5A6C7D] max-w-2xl mx-auto">
                Choose the best way to get support based on your needs and urgency.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className={`w-16 h-16 ${option.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2">{option.title}</h3>
                    <p className="text-[#5A6C7D] mb-4 text-sm">{option.description}</p>
                    <div className="flex items-center justify-center space-x-2 mb-4 text-xs text-[#5A6C7D]">
                      <Clock className="w-3 h-3" />
                      <span>{option.availability}</span>
                    </div>
                    <button className={`w-full py-2 px-4 ${option.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300`}>
                      {option.action}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#FAFBFC]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Frequently Asked Questions</h2>
              <p className="text-[#5A6C7D] max-w-2xl mx-auto">
                Find quick answers to the most common questions about Learn2Launch.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative max-w-2xl mx-auto mb-8"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A6C7D]" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
              />
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#FF6B35] text-white'
                      : 'bg-white text-[#5A6C7D] hover:bg-[#FFE8E0]'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </motion.div>

            {/* FAQ List */}
            <div className="space-y-4">
              {searchFilteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-[#1F2937] pr-4">{faq.question}</h3>
                      <div className="w-6 h-6 text-[#FF6B35] transform group-open:rotate-180 transition-transform duration-300">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-[#5A6C7D] leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>

            {searchFilteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-[#5A6C7D] text-lg">No FAQs found matching your search.</p>
                <p className="text-[#5A6C7D] text-sm mt-2">Try different keywords or contact our support team.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Additional Resources</h2>
              <p className="text-[#5A6C7D] max-w-2xl mx-auto">
                Explore more resources to help you get the most out of Learn2Launch.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Bug,
                  title: 'Report a Bug',
                  description: 'Found an issue? Let us know so we can fix it quickly.',
                  link: '#',
                  color: 'text-red-600'
                },
                {
                  icon: Lightbulb,
                  title: 'Feature Request',
                  description: 'Suggest new features to improve the platform.',
                  link: '#',
                  color: 'text-yellow-600'
                },
                {
                  icon: Shield,
                  title: 'Security Issues',
                  description: 'Report security vulnerabilities responsibly.',
                  link: '#',
                  color: 'text-green-600'
                }
              ].map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    <IconComponent className={`w-12 h-12 ${resource.color} mx-auto mb-4`} />
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-2">{resource.title}</h3>
                    <p className="text-[#5A6C7D] mb-4 text-sm">{resource.description}</p>
                    <a
                      href={resource.link}
                      className="inline-flex items-center text-[#FF6B35] font-medium hover:text-[#FF6B35]/80 transition-colors duration-300"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-[#FAFBFC]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#FF6B35]/10 to-white rounded-2xl p-8 border border-[#FF6B35]/20 text-center"
            >
              <div className="w-16 h-16 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-[#FF6B35]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
                Still Need Help?
              </h2>
              <p className="text-[#5A6C7D] mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is ready to help you 
                with any questions or issues you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:support@learn2launch.com"
                  className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#FF6B35]/90 transition-colors duration-300"
                >
                  Contact Support
                </a>
                <a
                  href="/privacy"
                  className="px-6 py-3 bg-white text-[#FF6B35] rounded-xl font-semibold border-2 border-[#FF6B35] hover:bg-[#FFE8E0] transition-colors duration-300"
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