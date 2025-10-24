'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface VerticalKnowMoreButtonProps {
  activeSection: number;
}

export default function VerticalKnowMoreButton({
  activeSection,
}: VerticalKnowMoreButtonProps) {
  const sections = [
    { id: 0, label: 'Student', color: '#00E0FF', href: '/courses' },
    { id: 1, label: 'Developer', color: '#8B5CF6', href: '/dashboard/developer' },
    { id: 2, label: 'Investor', color: '#FACC15', href: '/vaults' },
  ];

  const currentSection = sections[activeSection] || sections[0];

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40"
    >
      <Link
        href={currentSection.href}
        className="flex flex-col items-center space-y-2"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        <motion.span
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium"
          style={{ color: currentSection.color }}
        >
          Know More
        </motion.span>
        
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight 
            className="w-4 h-4"
            style={{ color: currentSection.color }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
