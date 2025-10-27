'use client';

import Navbar from '@/components/landing/Navbar';
import SectionStudent from '@/components/landing/SectionStudent';
import SectionDeveloper from '@/components/landing/SectionDeveloper';
import SectionInvestor from '@/components/landing/SectionInvestor';
import SectionSponsor from '@/components/landing/SectionSponsor';
import SectionAbout from '@/components/landing/SectionAbout';
import SectionHowItWorks from '@/components/landing/SectionHowItWorks';
import SectionFeatures from '@/components/landing/SectionFeatures';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content with Scroll Snapping */}
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <SectionStudent />
        <SectionDeveloper />
        <SectionInvestor />
        <SectionSponsor />
        <SectionAbout />
        <SectionHowItWorks />
        <SectionFeatures />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
