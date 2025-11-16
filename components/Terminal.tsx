'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'AshReef Labs Terminal v1.0.0',
    'Type "help" for available commands',
    '',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const commands: Record<string, () => string[]> = {
    help: () => [
      'Available commands:',
      '  about     - Learn about Ali Khalid Ahmed',
      '  skills    - List technical skills',
      '  projects  - View featured projects',
      '  contact   - Get contact information',
      '  experience - Show work experience',
      '  languages - Display spoken languages',
      '  clear     - Clear terminal',
      '  exit      - Close terminal',
      '',
    ],
    about: () => [
      'Ali Khalid Ahmed | AshReef Labs',
      '─────────────────────────────────',
      'Self-directed Developer and Systems Builder with 4+ years of experience',
      'Specializing in: AI Engineering, Robotics, Full-Stack Development',
      'Location: Addis Ababa, Ethiopia',
      '',
    ],
    skills: () => [
      'Technical Skills:',
      '─────────────────',
      'Languages: Python, C++, C, Dart, TypeScript, Node.js, SQL',
      'Frontend: Flutter, React, Next.js, Tailwind CSS',
      'Backend: Firebase, Docker, PostgreSQL, REST APIs',
      'AI/ML: NLP, OCR, Google Gemini API, Model Fine-Tuning',
      'Hardware: Arduino, Robotics, Custom Circuit Design',
      'DevOps: Docker Compose, Nginx, Linux Server Admin',
      '',
    ],
    projects: () => [
      'Featured Projects:',
      '──────────────────',
      '1. Tasktism - AI Executive Function Co-Pilot (Flutter, Firebase, Gemini API)',
      '2. Bstock - Real-Time Inventory Management System (Python, PostgreSQL, Flutter)',
      '3. Vexle - Conversational AI Bot with Personality Engine (Python, Gemini API)',
      '4. 6-Axis Wireless Robotic Arm (Arduino C++, Flutter, Bluetooth)',
      '5. Private Cloud Infrastructure (Docker, Nginx, Cloudflare)',
      '',
      'Visit /projects for full details',
      '',
    ],
    contact: () => [
      'Contact Information:',
      '────────────────────',
      'Email: ali@ashreef.com',
      'Alt Email: alikhalidsherif@gmail.com',
      'GitHub: github.com/alikhalidsherif',
      'LinkedIn: linkedin.com/in/alikhalidsherif',
      '',
    ],
    experience: () => [
      'AshReef Labs | Principal & Founder | 2021 - Present',
      '──────────────────────────────────────────────────────',
      '• Architected full-stack AI applications and cloud infrastructure',
      '• Developed mobile apps with 200+ unit tests and production-ready QA',
      '• Built containerized solutions using Docker and microservices',
      '• Designed and prototyped 20+ Arduino-based systems',
      '',
    ],
    languages: () => [
      'Spoken Languages:',
      '─────────────────',
      '• Amharic: Native',
      '• English: Fluent',
      '• Arabic: Fluent',
      '• Harari: Fluent',
      '• Turkish: Professional',
      '• Oromo: Conversational',
      '',
    ],
    clear: () => {
      setHistory(['']);
      return [];
    },
    exit: () => {
      onClose();
      return [];
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd];

    if (output) {
      const result = output();
      setHistory([...history, `$ ${cmd}`, ...result]);
    } else if (trimmedCmd === '') {
      setHistory([...history, '']);
    } else {
      setHistory([...history, `$ ${cmd}`, `Command not found: ${cmd}`, 'Type "help" for available commands', '']);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl h-[600px] bg-terminal-black border-2 border-terminal-cyan shadow-2xl shadow-terminal-cyan/20 flex flex-col"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-terminal-darkGray border-b border-terminal-cyan/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-terminal-red" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-terminal-amber" />
              <div className="w-3 h-3 rounded-full bg-terminal-green" />
            </div>
            <span className="text-terminal-cyan text-sm font-mono">ashreef@labs:~$</span>
            <button onClick={onClose} className="text-terminal-cyan hover:text-terminal-green">
              ✕
            </button>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
            {history.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith('$') ? 'text-terminal-green' : 'text-terminal-cyan'
                } whitespace-pre-wrap`}
              >
                {line}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          {/* Terminal Input */}
          <div className="px-4 py-3 bg-terminal-darkGray border-t border-terminal-cyan/30 flex items-center space-x-2">
            <span className="text-terminal-green font-mono">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-terminal-cyan font-mono outline-none"
              placeholder="Type a command..."
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
