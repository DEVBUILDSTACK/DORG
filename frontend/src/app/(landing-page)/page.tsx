'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import SectionStudent from '@/components/landing/SectionStudent';
import SectionDeveloper from '@/components/landing/SectionDeveloper';
import SectionInvestor from '@/components/landing/SectionInvestor';
import SectionSponsor from '@/components/landing/SectionSponsor';
import SectionAbout from '@/components/landing/SectionAbout';
import SectionHowItWorks from '@/components/landing/SectionHowItWorks';
import SectionFeatures from '@/components/landing/SectionFeatures';
import Footer from '@/components/landing/Footer';
import MetadataCollector from '@/components/features/MetadataCollector';
import { useAuth } from '@/hooks/useAuth';

export default function LandingPage() {
  const router = useRouter();
  const { authenticated, ready, user } = useAuth();
  const [showMetadataCollector, setShowMetadataCollector] = useState(false);
  const [hasCheckedMetadata, setHasCheckedMetadata] = useState(false);
  const [metadataJustSaved, setMetadataJustSaved] = useState(false);

  useEffect(() => {
    console.log('Landing Page Auth Check:', { 
      ready, 
      authenticated, 
      user: !!user, 
      hasCheckedMetadata, 
      showMetadataCollector,
      metadataJustSaved,
      userRole: user?.customMetadata?.role 
    });
    
    // Wait until Privy is ready
    if (!ready) {
      setShowMetadataCollector(false);
      return;
    }

    // If not authenticated, ensure metadata collector is hidden
    if (!authenticated) {
      setShowMetadataCollector(false);
      setHasCheckedMetadata(false);
      setMetadataJustSaved(false);
      return;
    }

    // Only check metadata once for authenticated users
    if (authenticated && user && !hasCheckedMetadata) {
      const userRole = user.customMetadata?.role;
      console.log('Checking user role from metadata:', userRole);
      
      if (userRole) {
        // User has a role, redirect to their dashboard
        console.log(`User has role: ${userRole}, redirecting to /dashboard/${userRole}`);
        setShowMetadataCollector(false);
        router.push(`/dashboard/${userRole}`);
      } else if (!metadataJustSaved) {
        // User doesn't have a role and hasn't just saved it, show metadata form
        console.log('No role found and not just saved, showing metadata collector');
        setShowMetadataCollector(true);
      }
      
      setHasCheckedMetadata(true);
    }
  }, [ready, authenticated, user, hasCheckedMetadata, router, showMetadataCollector, metadataJustSaved]);

  const handleMetadataComplete = async (role: string) => {
    console.log('Metadata saved successfully with role:', role);
    setMetadataJustSaved(true);
    setShowMetadataCollector(false);
    
    // Wait a moment for Privy to sync the metadata
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Redirecting to dashboard:', `/dashboard/${role}`);
    router.push(`/dashboard/${role}`);
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B0C14] via-[#101120] to-[#0A0A0F] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative group mb-6 inline-block">
            <div className="absolute inset-0 bg-linear-to-r from-[#00E0FF]/30 to-[#8B5CF6]/30 rounded-3xl blur-xl animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-[#00E0FF] to-[#8B5CF6] rounded-3xl shadow-2xl shadow-[#00E0FF]/30">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent mb-4">
            Loading...
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-[#00E0FF] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-[#FF007A] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />

      <main className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <SectionStudent />
        <SectionDeveloper />
        <SectionInvestor />
        <SectionSponsor />
        <SectionAbout />
        <SectionHowItWorks />
        <SectionFeatures />
      </main>

      <Footer />

      {/* Only render MetadataCollector when authenticated and ready */}
      {ready && authenticated && (
        <MetadataCollector
          isOpen={showMetadataCollector}
          onClose={() => {}}
          onComplete={handleMetadataComplete}
        />
      )}
    </div>
  );
}
