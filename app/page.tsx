'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import RoboticArm3D from '@/components/RoboticArm3D';
import Terminal from '@/components/Terminal';
import ParticleSystem from '@/components/ParticleSystem';
import GripperEffects from '@/components/GripperEffects';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import EasterEggs from '@/components/EasterEggs';
import WelcomeGuide from '@/components/WelcomeGuide';
import { useState, useRef, useCallback } from 'react';
import * as THREE from 'three';

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [gripperPosition, setGripperPosition] = useState<THREE.Vector3 | undefined>();
  const [camera, setCamera] = useState<THREE.Camera | undefined>();

  const handleGripperUpdate = useCallback((position: THREE.Vector3) => {
    setGripperPosition(position);
  }, []);

  const handleCameraUpdate = useCallback((cam: THREE.Camera) => {
    setCamera(cam);
  }, []);

  const handleParticleBurst = useCallback((x: number, y: number) => {
    // Particle burst is handled by both components
  }, []);

  return (
    <div className="relative">
      {/* Particle System - 2D canvas overlay */}
      <ParticleSystem />

      {/* Gripper Effects - 2D canvas overlay */}
      <GripperEffects
        gripperPosition={gripperPosition}
        camera={camera}
        onParticleBurst={handleParticleBurst}
      />

      {/* Performance Monitor */}
      <PerformanceMonitor />

      {/* Easter Eggs Handler */}
      <EasterEggs />

      {/* Welcome Guide */}
      <WelcomeGuide />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <RoboticArm3D />
        </div>

        <div className="content-container z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 glitch glow" data-text="AshReef Labs">
                AshReef Labs
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl text-terminal-cyan mb-8 terminal-text"
            >
              engineering systems that <span className="text-terminal-green">think</span>,{' '}
              <span className="text-terminal-amber">move</span>, and{' '}
              <span className="text-terminal-blue">adapt</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-400 mb-12"
            >
              <p className="mb-2">Ali Khalid Ahmed</p>
              <p className="text-sm">Full-Stack Developer • AI Engineer • Robotics Specialist</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/projects"
                className="px-8 py-3 bg-terminal-cyan text-terminal-black font-bold hover:bg-terminal-green transition-all duration-300 hover:shadow-lg hover:shadow-terminal-cyan/50"
              >
                View Projects
              </Link>
              <button
                onClick={() => setShowTerminal(true)}
                className="px-8 py-3 border-2 border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-black transition-all duration-300"
              >
                <span className="terminal-text">&gt;_ Launch Terminal</span>
              </button>
              <Link
                href="/about"
                className="px-8 py-3 border-2 border-terminal-amber text-terminal-amber hover:bg-terminal-amber hover:text-terminal-black transition-all duration-300"
              >
                About Me
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-terminal-cyan rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-terminal-cyan rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Stats */}
      <section className="py-20 bg-terminal-darkGray/50">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years Experience', value: '4+' },
              { label: 'Languages Spoken', value: '6' },
              { label: 'Projects Completed', value: '20+' },
              { label: 'Technologies', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 border border-terminal-cyan/20 hover:border-terminal-cyan transition-all duration-300"
              >
                <div className="text-4xl font-bold text-terminal-cyan mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Modal */}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
    </div>
  );
}
