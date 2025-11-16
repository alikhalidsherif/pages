'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMonitorProps {
  armData?: {
    joint1: number;
    joint2: number;
    joint3: number;
    baseRotation: number;
    position: { x: number; y: number; z: number };
  };
}

export default function PerformanceMonitor({ armData }: PerformanceMonitorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [fps, setFps] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  useEffect(() => {
    // Toggle with P key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    // FPS Counter
    let animationFrameId: number;

    const updateFps = () => {
      const currentTime = Date.now();
      const delta = currentTime - lastTime;

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        setFrameCount(0);
        setLastTime(currentTime);
      } else {
        setFrameCount((prev) => prev + 1);
      }

      animationFrameId = requestAnimationFrame(updateFps);
    };

    animationFrameId = requestAnimationFrame(updateFps);
    return () => cancelAnimationFrame(animationFrameId);
  }, [frameCount, lastTime]);

  const getFpsColor = () => {
    if (fps >= 55) return 'text-terminal-green';
    if (fps >= 30) return 'text-terminal-amber';
    return 'text-terminal-red';
  };

  const toRadians = (deg: number) => deg * (180 / Math.PI);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed top-20 right-4 z-40 bg-terminal-black/90 border-2 border-terminal-cyan shadow-lg shadow-terminal-cyan/20 p-4 font-mono text-xs backdrop-blur-sm"
          style={{ minWidth: '250px' }}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-terminal-cyan/30">
            <h3 className="text-terminal-cyan font-bold text-sm">PERFORMANCE</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-terminal-cyan hover:text-terminal-red transition-colors"
              aria-label="Close monitor"
            >
              ✕
            </button>
          </div>

          {/* FPS Display */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-400">FPS:</span>
              <span className={`font-bold text-lg ${getFpsColor()}`}>{fps}</span>
            </div>
            <div className="h-1 bg-terminal-darkGray rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getFpsColor().replace('text-', 'bg-')}`}
                style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Arm Data */}
          {armData && (
            <div className="space-y-2">
              <div className="text-terminal-cyan font-bold mb-2 text-xs">ARM TELEMETRY</div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-500">Joint 1 (Y)</div>
                  <div className="text-terminal-green font-bold">
                    {toRadians(armData.joint1).toFixed(1)}°
                  </div>
                </div>

                <div>
                  <div className="text-gray-500">Joint 2 (Z)</div>
                  <div className="text-terminal-green font-bold">
                    {toRadians(armData.joint2).toFixed(1)}°
                  </div>
                </div>

                <div>
                  <div className="text-gray-500">Joint 3 (X)</div>
                  <div className="text-terminal-green font-bold">
                    {toRadians(armData.joint3).toFixed(1)}°
                  </div>
                </div>

                <div>
                  <div className="text-gray-500">Base Rot</div>
                  <div className="text-terminal-green font-bold">
                    {toRadians(armData.baseRotation).toFixed(1)}°
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-terminal-cyan/20">
                <div className="text-gray-500 mb-1">Position</div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-gray-600 text-xs">X</div>
                    <div className="text-terminal-amber">{armData.position.x.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs">Y</div>
                    <div className="text-terminal-amber">{armData.position.y.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs">Z</div>
                    <div className="text-terminal-amber">{armData.position.z.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-terminal-cyan/20 text-gray-500 text-xs">
            Press <kbd className="px-1 py-0.5 bg-terminal-darkGray border border-terminal-cyan/30 text-terminal-cyan">P</kbd> to toggle
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
