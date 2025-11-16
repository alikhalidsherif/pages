'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/alikhalidsherif', icon: 'GH' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/alikhalidsherif', icon: 'LI' },
    { name: 'Email', url: 'mailto:ali@ashreef.com', icon: '@' },
  ];

  return (
    <footer className="bg-terminal-darkGray border-t border-terminal-cyan/20">
      <div className="content-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-terminal-cyan mb-4">AshReef Labs</h3>
            <p className="text-gray-400 text-sm">
              Engineering systems that think, move, and adapt.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-terminal-green font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Experience', 'Lab', 'Contact'].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-terminal-cyan transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-terminal-amber font-bold mb-4">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-terminal-cyan transition-colors text-sm group"
                >
                  <span className="w-8 h-8 border border-terminal-cyan/30 group-hover:border-terminal-cyan flex items-center justify-center text-xs font-mono">
                    {social.icon}
                  </span>
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-terminal-cyan/20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {currentYear} AshReef Labs. All rights reserved.</p>
          <p className="terminal-text mt-2 md:mt-0">
            <span className="text-terminal-cyan">&gt;_</span> Built with Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
