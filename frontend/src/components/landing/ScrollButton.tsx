'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from '@/components/icons';

interface ScrollButtonProps {
  targetSection: string;
  color?: string;
  label?: string;
}

export default function ScrollButton({ targetSection, color = '#00E0FF', label }: ScrollButtonProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.button
      onClick={scrollToSection}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
    >
      {label && (
        <motion.span
          className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color }}
        >
          {label}
        </motion.span>
      )}
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform"
        style={{
          borderColor: color,
          backgroundColor: `${color}10`,
        }}
      >
        <ChevronDown 
          className="w-6 h-6"
          style={{ color }}
        />
      </motion.div>
    </motion.button>
  );
}
