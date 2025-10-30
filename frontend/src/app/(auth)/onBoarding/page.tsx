"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { authenticated, login, ready, user } = useAuth();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    }
  }, [ready, authenticated, login]);

  useEffect(() => {
    if (authenticated && user) {
      router.push('/dashboard/student');
    }
  }, [authenticated, user, router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0A4A7A]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2E865F]/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomDuration = 3 + Math.random() * 4;
          
          return (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-[#0A4A7A]/30 rounded-full opacity-20 animate-float-${i % 3}`}
              data-x={randomX}
              data-y={randomY}
            />
          );
        })}
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="relative group mb-6 inline-block">
            <div className="absolute inset-0 bg-[#0A4A7A]/20 rounded-3xl blur-xl animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-[#0A4A7A] to-[#0D5C94] rounded-3xl shadow-2xl shadow-[#0A4A7A]/30">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-[#0A4A7A]"
          >
            Welcome to Learn2Launch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#5A6C7D] text-lg max-w-md mx-auto"
          >
            {!ready ? 'Initializing...' : !authenticated ? 'Opening authentication...' : 'Setting up your dashboard...'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center space-x-2"
          >
            <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse animation-delay-200" />
            <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse animation-delay-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <div className="w-4 h-4 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-400">Powered by Privy</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
