'use client';

import { motion } from 'framer-motion';
import { Footer, Navbar } from '@/components/landing';
import { 
  Cookie, 
  Settings, 
  BarChart, 
  Shield, 
  Eye, 
  Trash2,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { useState } from 'react';

export default function Cookies() {
  const lastUpdated = "November 13, 2025";
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    preferences: true
  });

  const handleCookieToggle = (type: keyof typeof cookieSettings) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: Shield,
      required: true,
      description: 'These cookies are necessary for the website to function properly. They cannot be disabled.',
      examples: [
        'User authentication and session management',
        'Security and fraud prevention',
        'Load balancing and performance',
        'Basic website functionality'
      ],
      duration: 'Session or 1 year'
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: BarChart,
      required: false,
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: [
        'Page views and user behavior tracking',
        'Performance monitoring and optimization',
        'Error tracking and debugging',
        'Feature usage statistics'
      ],
      duration: '2 years'
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      icon: Settings,
      required: false,
      description: 'These cookies remember your preferences and personalize your experience.',
      examples: [
        'Theme and display preferences',
        'Language and region settings',
        'Dashboard layout preferences',
        'Notification settings'
      ],
      duration: '1 year'
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: Eye,
      required: false,
      description: 'These cookies are used to deliver relevant advertisements and track marketing effectiveness.',
      examples: [
        'Targeted advertising delivery',
        'Marketing campaign tracking',
        'Social media integration',
        'Third-party advertising services'
      ],
      duration: '1 year'
    }
  ];

  const saveCookiePreferences = () => {
    // In a real implementation, this would save to localStorage and update cookie consent
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings));
    alert('Cookie preferences saved successfully!');
  };

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
              <Cookie className="w-5 h-5 text-[#FF6B35]" />
              <span className="text-sm font-semibold text-[#FF6B35]">
                Cookie Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-6 leading-tight"
            >
              Cookie Policy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[#5A6C7D] max-w-3xl mx-auto leading-relaxed"
            >
              Learn about how we use cookies to enhance your experience on Learn2Launch 
              and manage your cookie preferences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Cookie className="w-5 h-5" />
                <span className="font-semibold">Last Updated: {lastUpdated}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What are Cookies */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#FFE8E0] to-white rounded-2xl p-8 border border-[#FF6B35]/20 mb-12"
            >
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center space-x-3">
                <Info className="w-6 h-6 text-[#FF6B35]" />
                <span>What Are Cookies?</span>
              </h2>
              <div className="text-[#5A6C7D] space-y-4">
                <p>
                  Cookies are small text files that are stored on your device when you visit websites. 
                  They help websites remember information about your visit, which can make your next 
                  visit easier and more useful.
                </p>
                <p>
                  At Learn2Launch, we use cookies to enhance your experience, provide personalized 
                  content, analyze usage patterns, and ensure the security of our platform. You have 
                  control over which cookies you accept.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cookie Settings */}
        <section className="py-16 bg-[#FAFBFC]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 text-center">
                Manage Your Cookie Preferences
              </h2>
              <p className="text-[#5A6C7D] text-center max-w-2xl mx-auto mb-8">
                Choose which types of cookies you want to allow. Essential cookies cannot be 
                disabled as they are required for basic website functionality.
              </p>
            </motion.div>

            <div className="space-y-6">
              {cookieTypes.map((cookieType, index) => {
                const IconComponent = cookieType.icon;
                const isEnabled = cookieSettings[cookieType.id as keyof typeof cookieSettings];
                
                return (
                  <motion.div
                    key={cookieType.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-[#FF6B35]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#1F2937] flex items-center space-x-2">
                              <span>{cookieType.name}</span>
                              {cookieType.required && (
                                <span className="text-xs bg-[#FF6B35] text-white px-2 py-1 rounded-full">
                                  Required
                                </span>
                              )}
                            </h3>
                            <p className="text-[#5A6C7D] mt-1">{cookieType.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-[#5A6C7D]">
                            {isEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            onClick={() => handleCookieToggle(cookieType.id as keyof typeof cookieSettings)}
                            disabled={cookieType.required}
                            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                              isEnabled 
                                ? 'bg-[#2E865F]' 
                                : 'bg-gray-300'
                            } ${cookieType.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                isEnabled ? 'transform translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-[#1F2937] mb-2">Examples:</h4>
                          <ul className="space-y-1">
                            {cookieType.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex} className="flex items-start space-x-2 text-sm text-[#5A6C7D]">
                                <div className="w-1 h-1 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-[#5A6C7D]">
                          <span><strong>Duration:</strong> {cookieType.duration}</span>
                          {isEnabled ? (
                            <div className="flex items-center space-x-1 text-[#2E865F]">
                              <CheckCircle className="w-4 h-4" />
                              <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-gray-500">
                              <XCircle className="w-4 h-4" />
                              <span>Disabled</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <button
                onClick={saveCookiePreferences}
                className="px-8 py-3 bg-[#FF6B35] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#FF6B35]/90 transition-all duration-300"
              >
                Save Cookie Preferences
              </button>
            </motion.div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-[#2E865F]/10 to-white rounded-2xl p-8 border border-[#2E865F]/20">
                <h3 className="text-xl font-bold text-[#1F2937] mb-4 flex items-center space-x-3">
                  <Trash2 className="w-6 h-6 text-[#2E865F]" />
                  <span>How to Delete Cookies</span>
                </h3>
                <div className="text-[#5A6C7D] space-y-3">
                  <p>You can delete cookies through your browser settings:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li>• <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                    <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li>• <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-[#1F2937] mb-4 flex items-center space-x-3">
                  <Info className="w-6 h-6 text-blue-600" />
                  <span>Third-Party Cookies</span>
                </h3>
                <div className="text-[#5A6C7D] space-y-3">
                  <p>
                    We may use third-party services that set their own cookies. These include:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Analytics providers (for website performance analysis)</li>
                    <li>• Authentication services (for secure login)</li>
                    <li>• Content delivery networks (for faster loading)</li>
                    <li>• Social media platforms (for social sharing features)</li>
                  </ul>
                  <p>
                    Each third-party service has its own privacy policy governing their use of cookies.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-[#1F2937] mb-4">Need Help?</h3>
                <p className="text-[#5A6C7D] mb-6">
                  If you have questions about our cookie policy or need assistance managing your preferences, 
                  we're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:privacy@learn2launch.com"
                    className="px-6 py-3 bg-[#2E865F] text-white rounded-xl font-semibold hover:bg-[#2E865F]/90 transition-colors duration-300"
                  >
                    Contact Privacy Team
                  </a>
                  <a
                    href="/privacy"
                    className="px-6 py-3 bg-white text-[#2E865F] rounded-xl font-semibold border-2 border-[#2E865F] hover:bg-[#2E865F]/5 transition-colors duration-300"
                  >
                    View Privacy Policy
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}