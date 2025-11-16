'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EasterEggsProps {
  onKonamiActivate?: () => void;
  onWaveActivate?: () => void;
  onSlowMotionChange?: (active: boolean) => void;
}

export default function EasterEggs({
  onKonamiActivate,
  onWaveActivate,
  onSlowMotionChange,
}: EasterEggsProps) {
  const [konamiActive, setKonamiActive] = useState(false);
  const [slowMotionActive, setSlowMotionActive] = useState(false);
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);

  // Konami Code Detection
  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    const userInput: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      userInput.push(e.key);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }

      if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
        setKonamiActive(true);
        setShowKonamiMessage(true);
        onKonamiActivate?.();
        userInput.length = 0;

        setTimeout(() => {
          setKonamiActive(false);
          setShowKonamiMessage(false);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKonamiActivate]);

  // Slow Motion Detection (Hold Shift)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && !slowMotionActive) {
        setSlowMotionActive(true);
        onSlowMotionChange?.(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setSlowMotionActive(false);
        onSlowMotionChange?.(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [slowMotionActive, onSlowMotionChange]);

  // Double Click Detection
  useEffect(() => {
    let lastClickTime = 0;

    const handleClick = () => {
      const now = Date.now();
      if (now - lastClickTime < 300) {
        onWaveActivate?.();
      }
      lastClickTime = now;
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onWaveActivate]);

  return (
    <>
      {/* Konami Code Activated Message */}
      <AnimatePresence>
        {showKonamiMessage && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-12 py-8 rounded-lg shadow-2xl text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="text-6xl mb-4"
              >
                🤖
              </motion.div>
              <div className="text-3xl font-bold mb-2">KONAMI CODE ACTIVATED!</div>
              <div className="text-lg">Watch the arm go crazy!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slow Motion Indicator */}
      <AnimatePresence>
        {slowMotionActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-terminal-amber/90 text-terminal-black px-4 py-2 rounded-lg font-mono text-sm z-40 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <div className="text-xl">🐌</div>
              <span>SLOW MOTION MODE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami Effect Overlay */}
      {konamiActive && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 animate-pulse" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * window.innerWidth, y: -50 }}
              animate={{
                y: window.innerHeight + 50,
                x: Math.random() * window.innerWidth,
              }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
              className="absolute text-4xl"
            >
              {['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
