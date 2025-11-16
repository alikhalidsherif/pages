'use client';

import { motion } from 'framer-motion';

export default function Lab() {
  const insights = [
    {
      title: 'The Philosophy of Systems Thinking',
      date: '2024',
      category: 'Methodology',
      excerpt: 'How approaching problems as interconnected systems rather than isolated components leads to more robust solutions.',
      tags: ['Architecture', 'Design', 'Engineering'],
    },
    {
      title: 'From Hardware to AI: A Journey',
      date: '2024',
      category: 'Personal',
      excerpt: 'My evolution from building physical robots to architecting intelligent software systems, and what I learned along the way.',
      tags: ['Robotics', 'AI', 'Career'],
    },
    {
      title: 'Containerization for Solo Developers',
      date: '2024',
      category: 'DevOps',
      excerpt: 'Why Docker became my secret weapon for managing complex projects and maintaining production-grade infrastructure on a budget.',
      tags: ['Docker', 'DevOps', 'Infrastructure'],
    },
  ];

  const experiments = [
    {
      name: 'Mood-Based AI Personalities',
      status: 'Active',
      description: 'Experimenting with dynamic AI personality engines that shift behavior based on conversational context and decay algorithms.',
      tech: ['Python', 'Google Gemini API', 'NLP'],
    },
    {
      name: 'Serverless Edge Computing',
      status: 'Research',
      description: 'Exploring edge computing architectures for real-time IoT applications with minimal latency.',
      tech: ['Cloudflare Workers', 'MQTT', 'Arduino'],
    },
    {
      name: 'Multi-Modal RAG Systems',
      status: 'Planning',
      description: 'Designing retrieval-augmented generation systems that handle text, images, and structured data.',
      tech: ['Vector DB', 'LLMs', 'OCR'],
    },
  ];

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
            The Lab
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-terminal-cyan to-terminal-green mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            A space for experiments, insights, and the intersection of ideas. Where engineering meets philosophy.
          </p>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-terminal-amber p-12 mb-16 text-center bg-terminal-darkGray/50"
        >
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="font-display text-3xl font-bold text-terminal-amber mb-4">
            Under Construction
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This section is being crafted. Soon, you'll find insights on systems thinking, AI development,
            hardware engineering, and the lessons learned from building complex systems from scratch.
          </p>
        </motion.div>

        {/* Planned Insights Preview */}
        <section className="mb-20">
          <h2 className="font-display text-3xl font-bold text-terminal-green mb-8">
            Upcoming Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-terminal-cyan/20 hover:border-terminal-cyan transition-all duration-300 p-6 bg-terminal-darkGray/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-terminal-cyan/20 text-terminal-cyan text-xs">
                    {insight.category}
                  </span>
                  <span className="text-gray-500 text-xs">{insight.date}</span>
                </div>
                <h3 className="text-terminal-cyan font-bold text-lg mb-3">{insight.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{insight.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-terminal-gray text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Active Experiments */}
        <section>
          <h2 className="font-display text-3xl font-bold text-terminal-amber mb-8">
            Active Experiments
          </h2>
          <div className="space-y-6">
            {experiments.map((experiment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-l-4 border-terminal-amber pl-6 py-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-terminal-amber font-bold text-xl">{experiment.name}</h3>
                  <span className={`px-3 py-1 text-xs ${
                    experiment.status === 'Active'
                      ? 'bg-terminal-green/20 text-terminal-green border border-terminal-green/30'
                      : experiment.status === 'Research'
                      ? 'bg-terminal-blue/20 text-terminal-blue border border-terminal-blue/30'
                      : 'bg-terminal-gray text-gray-400 border border-gray-600'
                  }`}>
                    {experiment.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{experiment.description}</p>
                <div className="flex flex-wrap gap-2">
                  {experiment.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-terminal-darkGray text-terminal-cyan text-xs border border-terminal-cyan/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
