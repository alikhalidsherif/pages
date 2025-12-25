'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the guide before
    const hasSeenGuide = localStorage.getItem('ashreef-guide-seen');
    if (!hasSeenGuide) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const steps = [
    {
      title: 'Welcome to AshReef Labs!',
      description: 'A robotics-first portfolio showcasing shipped AI products and prototypes.',
      icon: '🤖',
    },
    {
      title: 'Control the Robotic Arm',
      description: 'Move your mouse to control the arm. Click to grab with the gripper!',
      icon: '🦾',
    },
    {
      title: 'Use the Terminal',
      description: 'Launch the terminal for fast access to skills, services, and project summaries.',
      icon: '⌨️',
    },
    {
      title: 'Track Performance',
      description: 'Press P to toggle live FPS and telemetry to see the rig running in real-time.',
      icon: '📊',
    },
    {
      title: 'Ready to Collaborate',
      description: 'Explore the Projects and Contact sections to start a build or engagement.',
      icon: '📬',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('ashreef-guide-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-terminal-black border-2 border-terminal-cyan shadow-2xl shadow-terminal-cyan/20 max-w-md w-full p-8 relative"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-terminal-cyan transition-colors"
            aria-label="Close guide"
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
            <h2 className="text-2xl font-bold text-terminal-cyan mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-400">{steps[currentStep].description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-terminal-cyan w-8'
                      : index < currentStep
                      ? 'bg-terminal-green'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-terminal-cyan text-terminal-black font-bold hover:bg-terminal-green transition-all"
              >
                {currentStep === steps.length - 1 ? "Let's Go!" : 'Next'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
