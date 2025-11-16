'use client';

import { motion } from 'framer-motion';

export default function About() {
  const skills = {
    'Problem-Solving': ['Critical Thinking', 'Diagnostics', 'Debugging', 'Root Cause Analysis', 'Systems Analysis'],
    'Adaptability': ['Rapid Skill Acquisition', 'Resilience', 'Cross-Cultural Communication', 'Self-Management'],
    'Creativity & Innovation': ['Systems Thinking', 'User-Centered Design', 'Prototyping', 'Process Automation'],
    'Technical Proficiency': ['Full-Stack Development', 'AI Implementation', 'Hardware Integration'],
  };

  const languages = [
    { name: 'Amharic', level: 'Native', percent: 100 },
    { name: 'English', level: 'Fluent', percent: 100 },
    { name: 'Arabic', level: 'Fluent', percent: 100 },
    { name: 'Harari', level: 'Fluent', percent: 100 },
    { name: 'Turkish', level: 'Professional', percent: 85 },
    { name: 'Oromo', level: 'Conversational', percent: 70 },
  ];

  const techStack = [
    { category: 'Languages', items: ['Python', 'C++', 'C', 'Dart', 'TypeScript', 'Node.js', 'SQL', 'Bash'] },
    { category: 'Frontend', items: ['Flutter', 'React', 'Next.js', 'BLoC', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend & Cloud', items: ['Firebase', 'Docker', 'PostgreSQL', 'REST APIs', 'WebSocket', 'Nginx'] },
    { category: 'AI & ML', items: ['NLP', 'OCR', 'Google Gemini API', 'Model Fine-Tuning', 'Data Analysis'] },
    { category: 'Hardware', items: ['Arduino', 'Sensor Integration', 'Robotics', 'Bluetooth', 'Custom Circuits'] },
    { category: 'DevOps & Tools', items: ['Git', 'Linux', 'Docker Compose', 'Cloudflare', 'VS Code', 'Portainer'] },
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
            About Me
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-terminal-cyan to-terminal-green mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Self-directed Developer and Systems Builder with <span className="text-terminal-green font-bold">4+ years</span> of
            project experience evolving from complex hardware prototyping to architecting full-stack AI applications.
            Applying a systems-thinking approach, I build complete solutions from concept to completion.
            Fluent in <span className="text-terminal-amber font-bold">six languages</span>, I excel at solving complex,
            multi-disciplinary problems.
          </p>
        </motion.div>

        {/* Core Competencies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-3xl font-bold text-terminal-green mb-8">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-terminal-cyan/20 p-6 hover:border-terminal-cyan transition-all duration-300 bg-terminal-darkGray/30"
              >
                <h3 className="text-terminal-cyan font-bold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-terminal-gray text-sm text-gray-300 border border-terminal-cyan/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technical Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-3xl font-bold text-terminal-amber mb-8">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-terminal-amber/20 p-6 hover:border-terminal-amber transition-all duration-300 bg-terminal-darkGray/30"
              >
                <h3 className="text-terminal-amber font-bold mb-4 text-lg">{stack.category}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="text-gray-400 text-sm flex items-center">
                      <span className="text-terminal-cyan mr-2">&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Languages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold text-terminal-blue mb-8">Spoken Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-terminal-blue/20 p-6 hover:border-terminal-blue transition-all duration-300 bg-terminal-darkGray/30"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-terminal-blue font-bold">{lang.name}</span>
                  <span className="text-gray-400 text-sm">{lang.level}</span>
                </div>
                <div className="w-full bg-terminal-gray h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-terminal-cyan to-terminal-blue"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
