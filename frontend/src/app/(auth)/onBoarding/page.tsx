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
    <div className="min-h-screen bg-linear-to-br from-[#0B0C14] via-[#101120] to-[#0A0A0F] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-[#00E0FF]/10 to-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-[#8B5CF6]/10 to-[#00E0FF]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="relative group mb-6 inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-[#00E0FF]/30 to-[#8B5CF6]/30 rounded-3xl blur-xl animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-[#00E0FF] to-[#8B5CF6] rounded-3xl shadow-2xl shadow-[#00E0FF]/30">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-linear-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent"
          >
            Welcome to Learn2Launch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg max-w-md mx-auto"
          >
            {!ready ? 'Initializing...' : !authenticated ? 'Opening authentication...' : 'Setting up your dashboard...'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center space-x-2"
          >
            <div className="w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-[#FF007A] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <div className="w-4 h-4 border-2 border-[#00E0FF] border-t-transparent rounded-full animate-spin" />
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
