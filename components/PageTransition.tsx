'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.61, 1, 0.88, 1],
    },
  },
};

const curtainVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 0,
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.61, 1, 0.88, 1],
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="w-full"
      >
        {/* Transition Curtain Effect */}
        <motion.div
          variants={curtainVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-gradient-to-b from-terminal-cyan to-terminal-green z-50 origin-top pointer-events-none"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Alternative sliding transition
export function SlidePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Glitch-style transition
export function GlitchPageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          filter: 'blur(10px) hue-rotate(90deg)',
        }}
        animate={{
          opacity: 1,
          filter: 'blur(0px) hue-rotate(0deg)',
        }}
        exit={{
          opacity: 0,
          filter: 'blur(10px) hue-rotate(-90deg)',
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
