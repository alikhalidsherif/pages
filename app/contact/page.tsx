'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      label: 'Email',
      value: 'ali@ashreef.com',
      link: 'mailto:ali@ashreef.com',
      icon: '@',
    },
    {
      label: 'Alt Email',
      value: 'alikhalidsherif@gmail.com',
      link: 'mailto:alikhalidsherif@gmail.com',
      icon: '@',
    },
    {
      label: 'GitHub',
      value: 'github.com/alikhalidsherif',
      link: 'https://github.com/alikhalidsherif',
      icon: 'GH',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/alikhalidsherif',
      link: 'https://linkedin.com/in/alikhalidsherif',
      icon: 'LI',
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
            Get In Touch
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-terminal-cyan to-terminal-green mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            Have a project in mind? Want to collaborate? Or just want to say hi?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-terminal-cyan mb-2 font-mono text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-terminal-darkGray border-2 border-terminal-cyan/30 focus:border-terminal-cyan outline-none px-4 py-3 text-gray-300 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-terminal-cyan mb-2 font-mono text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-terminal-darkGray border-2 border-terminal-cyan/30 focus:border-terminal-cyan outline-none px-4 py-3 text-gray-300 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-terminal-cyan mb-2 font-mono text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-terminal-darkGray border-2 border-terminal-cyan/30 focus:border-terminal-cyan outline-none px-4 py-3 text-gray-300 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-terminal-cyan mb-2 font-mono text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-terminal-darkGray border-2 border-terminal-cyan/30 focus:border-terminal-cyan outline-none px-4 py-3 text-gray-300 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 font-bold transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-terminal-green text-terminal-black'
                    : 'bg-terminal-cyan text-terminal-black hover:bg-terminal-green'
                } ${status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status === 'idle' && 'Send Message'}
                {status === 'sending' && 'Sending...'}
                {status === 'sent' && '✓ Message Sent!'}
                {status === 'error' && 'Error - Try Again'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="border-2 border-terminal-amber/30 p-8 bg-terminal-darkGray/50">
              <h2 className="font-display text-2xl font-bold text-terminal-amber mb-6">
                Direct Contact
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 text-gray-400 hover:text-terminal-cyan transition-colors group"
                  >
                    <div className="w-12 h-12 border-2 border-terminal-cyan/30 group-hover:border-terminal-cyan flex items-center justify-center text-sm font-mono text-terminal-cyan transition-all">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{info.label}</div>
                      <div className="font-mono text-sm">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="border-2 border-terminal-green/30 p-8 bg-terminal-darkGray/50">
              <h2 className="font-display text-2xl font-bold text-terminal-green mb-4">
                Based In
              </h2>
              <p className="text-gray-400">
                Addis Ababa, Ethiopia
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Open to remote opportunities worldwide
              </p>
            </div>

            <div className="border-2 border-terminal-blue/30 p-8 bg-terminal-darkGray/50">
              <h2 className="font-display text-2xl font-bold text-terminal-blue mb-4">
                Response Time
              </h2>
              <p className="text-gray-400">
                I typically respond within <span className="text-terminal-cyan font-bold">24-48 hours</span>.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For urgent matters, please mention it in the subject line.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
