'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import l2lLogo from '@/assets/images/l2l.jpg';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { authenticated, user, ready, login, logout, getUserDisplayName } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserMenuOpen]);
 
  const handleGetStarted = () => {
    if (authenticated && user) {
      const userRole = user.customMetadata?.role || 'student';
      router.push(`/dashboard/${userRole}`);
    } else {
      login();
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
    router.push('/');
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Learners', href: '/student' },
    { name: 'Builders', href: '/developer' },
    { name: 'Treasury', href: '/investor' },
    { name: 'Payment', href: '/command-control' },
    { name: 'Sponsors', href: '/sponsor' },
  ];

  return (
    <>
      {/* Floating Navbar */}
      <nav
        className={`fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'top-2 md:top-3'
            : 'top-4 md:top-6'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-lg shadow-xl border border-gray-200/50 py-3'
              : 'bg-gray-700/60 backdrop-blur-md py-4 shadow-2xl border border-gray-600/30'
          }`}
        >
          <div className="px-4 md:px-6 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg ${isScrolled ? 'ring-2 ring-[#FF6B35]/30' : 'ring-2 ring-white/30'}`}>
                <Image
                  src={l2lLogo}
                  alt="Learn2Launch Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className={`text-lg md:text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Learn2Launch
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#FF6B35] hover:bg-[#FFE8E0]' 
                      : 'text-white hover:text-[#FF6B35] hover:bg-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA & Mobile Menu Button */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {ready && authenticated ? (
                <div className="hidden md:flex items-center space-x-3 user-menu-container relative">
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isScrolled 
                          ? 'text-gray-700 hover:bg-gray-100' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {getUserDisplayName?.() || 'User'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            <button
                              onClick={handleGetStarted}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <User className="w-4 h-4" />
                              <span>Dashboard</span>
                            </button>
                            <div className="border-t border-gray-100 my-1" />
                            <button
                              onClick={handleLogout}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="hidden md:block px-4 md:px-6 py-2 md:py-2.5 bg-linear-to-r from-[#FF6B35] to-[#E65A2D] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-[#E65A2D] hover:to-[#CC5629] hover:scale-105 transition-all duration-300 text-sm md:text-base"
                >
                  Get Started
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-20 left-4 right-4 md:left-8 md:right-8 z-50 lg:hidden"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[calc(100vh-7rem)] overflow-y-auto">
                <div className="p-6 space-y-2">
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-[#FF6B35] hover:bg-[#FFE8E0] transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4 border-t border-gray-200"
                  >
                    {ready && authenticated ? (
                      <div className="space-y-3">
                        <div className="px-4 py-2 text-sm text-gray-600">
                          Signed in as <span className="font-semibold text-gray-900">{getUserDisplayName?.() || 'User'}</span>
                        </div>
                        <button
                          onClick={handleGetStarted}
                          className="w-full px-6 py-3 bg-linear-to-r from-[#FF6B35] to-[#E65A2D] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-[#E65A2D] hover:to-[#CC5629] transition-all duration-300"
                        >
                          Go to Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-6 py-3 bg-gray-100 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleGetStarted}
                        className="w-full px-6 py-3 bg-linear-to-r from-[#FF6B35] to-[#E65A2D] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-[#E65A2D] hover:to-[#CC5629] transition-all duration-300"
                      >
                        Get Started
                      </button>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}