import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Dark terminal aesthetic
        terminal: {
          black: '#0a0e14',
          darkGray: '#131820',
          gray: '#1f2430',
          lightGray: '#2d3540',
          cyan: '#f5f5f0',
          green: '#ff3b3b',
          amber: '#4a90e2',
          red: '#ff3333',
          blue: '#39bae6',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(245, 245, 240, 0.5), 0 0 10px rgba(245, 245, 240, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(245, 245, 240, 0.8), 0 0 30px rgba(245, 245, 240, 0.5)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-2px, 2px)' },
          '66%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
