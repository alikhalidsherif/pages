'use client';

import { motion } from 'framer-motion';

export default function Experience() {
  const timeline = [
    {
      year: '2021 - Present',
      role: 'Principal & Founder',
      company: 'AshReef Labs',
      location: 'Addis Ababa, Ethiopia',
      description: 'Independent R&D initiative focused on architecting and deploying full-stack solutions across software, AI, and hardware.',
      achievements: [
        {
          title: 'System Administrator & DevOps Engineer',
          points: [
            'Architected resilient self-hosted production environment with 1TB multi-user private cloud storage',
            'Engineered secure ingress architecture using Nginx Proxy Manager and Cloudflare Tunnels',
            'Containerized all services with Docker and Docker Compose for isolation and rapid deployment',
          ],
        },
        {
          title: 'Lead Developer & AI Engineer (Tasktism)',
          points: [
            'Architected full-stack AI mobile app from concept to near-complete beta',
            'Integrated Google Gemini Pro API for auto-scheduling and personalized coaching',
            'Established rigorous QA protocol with 200+ unit/widget tests',
          ],
        },
        {
          title: 'Lead Architect & Developer (Bstock)',
          points: [
            'End-to-end MVP development of containerized inventory management system',
            'Modern decoupled architecture: Python backend (Docker), PostgreSQL (Neon), Flutter web frontend',
            'Implemented barcode scanning, sales tracking, and tiered permissions system',
          ],
        },
        {
          title: 'Robotics Engineer',
          points: [
            'Architected and constructed 6-axis robotic arm from scratch',
            'Developed Flutter mobile app for real-time wireless control via Bluetooth',
            'Programmed core control logic in C++ for precise multi-axis motion',
          ],
        },
        {
          title: 'Hardware Engineer & Prototyping Lead',
          points: [
            'Designed and built 20+ Arduino-based systems with 10+ sensor types',
            'Re-engineered commercial laptop into compact desktop (~40% size reduction)',
            'Established expertise in rapid prototyping and component-level modification',
          ],
        },
      ],
    },
  ];

  const recognition = [
    {
      title: 'University-Level Engineering Consultant',
      description: 'Consulted on senior university-level engineering projects, providing critical support in prototyping, hardware debugging, and circuit design.',
    },
    {
      title: 'Lead Engineer & STEM Mentor',
      organization: 'Spring of Knowledge Academy',
      achievements: [
        'Designed and prototyped award-winning projects (tethered quadcopter, carbon capture system)',
        'Mentored junior STEM teams on project design and experimental methodology',
        'Led teams to successful competitive placements',
      ],
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
            Experience
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-terminal-cyan to-terminal-green mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            A journey of building complex systems from hardware to cloud, AI to robotics.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terminal-cyan via-terminal-green to-terminal-amber" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-terminal-cyan border-4 border-terminal-black rounded-full -ml-2" />

              {/* Content */}
              <div className="ml-8 md:ml-0 md:w-1/2 md:pr-12">
                <div className="border-2 border-terminal-cyan/30 hover:border-terminal-cyan transition-all duration-300 p-8 bg-terminal-darkGray/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1 bg-terminal-cyan/20 text-terminal-cyan border border-terminal-cyan/30 text-sm font-mono">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-terminal-green mb-2">
                    {item.role}
                  </h3>
                  <p className="text-terminal-amber font-bold mb-1">{item.company}</p>
                  <p className="text-gray-500 text-sm mb-4">{item.location}</p>
                  <p className="text-gray-400 mb-6">{item.description}</p>

                  {/* Achievements */}
                  <div className="space-y-6">
                    {item.achievements.map((achievement, i) => (
                      <div key={i}>
                        <h4 className="text-terminal-cyan font-bold mb-3">{achievement.title}</h4>
                        <ul className="space-y-2">
                          {achievement.points.map((point, j) => (
                            <li key={j} className="text-sm text-gray-400 flex items-start">
                              <span className="text-terminal-green mr-2 mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recognition */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="font-display text-3xl font-bold text-terminal-amber mb-8">
            Technical Recognition & Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recognition.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-terminal-amber/30 hover:border-terminal-amber transition-all duration-300 p-6 bg-terminal-darkGray/30"
              >
                <h3 className="text-terminal-amber font-bold text-xl mb-2">{item.title}</h3>
                {item.organization && (
                  <p className="text-terminal-cyan text-sm mb-4">{item.organization}</p>
                )}
                {item.description && (
                  <p className="text-gray-400 text-sm">{item.description}</p>
                )}
                {item.achievements && (
                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <span className="text-terminal-amber mr-2">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
