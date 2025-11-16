'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-4 h-4 border-2 border-terminal-cyan rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(245, 245, 240, 0.3)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Trailing cursor */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-terminal-cyan rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          x: '-50%',
          y: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </>
  );
}
