'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import VerticalKnowMoreButton from '@/components/landing/VerticalKnowMoreButton';
import SectionStudent from '@/components/landing/SectionStudent';
import SectionDeveloper from '@/components/landing/SectionDeveloper';
import SectionInvestor from '@/components/landing/SectionInvestor';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [0, 1, 2];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((sectionIndex) => {
        const sectionElement = document.getElementById(`section-${sectionIndex}`);
        if (sectionElement) {
          const { offsetTop, offsetHeight } = sectionElement;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionIndex);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Fixed Vertical "Know More" Button */}
      <VerticalKnowMoreButton activeSection={activeSection} />

      {/* Main Content with Scroll Snapping */}
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <SectionStudent />
        <SectionDeveloper />
        <SectionInvestor />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

