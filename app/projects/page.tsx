'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Tasktism - Executive Function Co-Pilot',
      category: 'AI',
      tags: ['Flutter', 'Firebase', 'Google Gemini API', 'TypeScript', 'BLoC'],
      description: 'Full-stack AI mobile app designed to serve as an intelligent assistant for users with executive function challenges.',
      highlights: [
        'Architected from concept to near-complete beta',
        'Integrated Google Gemini Pro API for auto-scheduling and task management',
        'Dynamic personality engine with personalized coaching',
        'Production-ready with 200+ unit/widget tests',
        'Complex backend dependency management on GCP',
      ],
      status: 'In Beta',
      color: 'cyan',
    },
    {
      id: 2,
      title: 'Bstock - Inventory Management System',
      category: 'Full-Stack',
      tags: ['Python', 'Flutter', 'PostgreSQL', 'Docker', 'REST API'],
      description: 'Real-time inventory management system from concept to fully deployed containerized application.',
      highlights: [
        'End-to-end MVP development',
        'Modern decoupled architecture (Python backend, Flutter frontend)',
        'Containerized deployment on Render with Neon PostgreSQL',
        'Barcode scanning, sales tracking, tiered permissions',
        'Supports unlimited users across 3 roles (Admin, Supervisor, Clerk)',
      ],
      status: 'Deployed',
      color: 'green',
    },
    {
      id: 3,
      title: 'Vexle - Conversational AI Bot',
      category: 'AI',
      tags: ['Python', 'Google Gemini API', 'NLP', 'Telegram API', 'TTS'],
      description: 'Multi-modal conversational AI bot with dynamic personality engine and mood-based responses.',
      highlights: [
        'Integrated Google Gemini API for advanced query processing',
        'Web search and text-to-speech capabilities',
        'Proprietary "mood decay algorithm" for dynamic personality shifts',
        'Fine-tuned on 50,000+ messages to mimic speaking patterns',
        'Serves as general AI assistant with contextual awareness',
      ],
      status: 'Active',
      color: 'amber',
    },
    {
      id: 4,
      title: '6-Axis Wireless Robotic Arm',
      category: 'Hardware',
      tags: ['Arduino C++', 'Flutter', 'Bluetooth', 'Robotics', 'CAD'],
      description: '6-axis robotic arm built from scratch with custom mobile app control interface.',
      highlights: [
        'Architected and constructed from scratch',
        'Integrated stepper and servo motors into custom chassis',
        'Developed dedicated Flutter mobile app for wireless control',
        'Real-time Bluetooth communication with Arduino',
        'Precise multi-axis motion control in C++',
      ],
      status: 'Completed',
      color: 'blue',
    },
    {
      id: 5,
      title: 'Private Cloud Infrastructure',
      category: 'DevOps',
      tags: ['Ubuntu Server', 'Docker', 'Nginx', 'Cloudflare', 'Nextcloud'],
      description: 'Resilient self-hosted production environment providing 1TB multi-user private cloud storage.',
      highlights: [
        'Architected on repurposed hardware',
        'Secure ingress with Nginx Proxy Manager and Cloudflare Tunnels',
        'Zero-trust overlay isolating origin server',
        'Containerized services with Docker Compose',
        'Centralized routing and SSL termination',
      ],
      status: 'Production',
      color: 'cyan',
    },
    {
      id: 6,
      title: 'Digital Text Preservation Platform',
      category: 'AI',
      tags: ['Python', 'OCR', 'AI/ML', 'JSON', 'HTML/CSS'],
      description: 'Complete data pipeline for digitizing 250+ page corpus with 99%+ accuracy.',
      highlights: [
        'Engineered end-to-end OCR pipeline',
        'Fine-tuned AI models for text recognition',
        '99%+ accuracy achieved',
        'Automated workflow saving months of manual entry',
        'Dynamic HTML/CSS generation from structured JSON',
      ],
      status: 'Completed',
      color: 'green',
    },
  ];

  const categories = ['all', 'AI', 'Full-Stack', 'Hardware', 'DevOps'];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-20">
      <div className="content-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-terminal-cyan mb-6 glow">
            Projects
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-terminal-cyan to-terminal-green mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            A showcase of systems I've engineered across AI, full-stack development, robotics, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 border-2 transition-all duration-300 ${
                filter === cat
                  ? 'bg-terminal-cyan text-terminal-black border-terminal-cyan'
                  : 'border-terminal-cyan/30 text-terminal-cyan hover:border-terminal-cyan'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border-2 border-terminal-${project.color}/20 hover:border-terminal-${project.color} transition-all duration-300 p-8 bg-terminal-darkGray/30 group`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`font-display text-2xl font-bold text-terminal-${project.color} mb-2 group-hover:glow transition-all`}>
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500">{project.category}</span>
                </div>
                <span className={`px-3 py-1 text-xs bg-terminal-${project.color}/20 text-terminal-${project.color} border border-terminal-${project.color}/30`}>
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6">{project.description}</p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-terminal-green font-bold mb-3 text-sm">Key Achievements:</h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start">
                      <span className="text-terminal-cyan mr-2 mt-1">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-terminal-gray text-gray-400 border border-terminal-cyan/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
