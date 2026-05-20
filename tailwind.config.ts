import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2a4f8e',
        'primary-dark': '#1e3a5f',
        'accent': '#4f6dff',
        'accent-light': '#6b8dff',
        'cyan': '#66e5d9',
        'bg-light': '#f7f9fc',
        'bg-white': '#ffffff',
      },
      backgroundColor: {
        'premium': '#f7f9fc',
      },
      borderColor: {
        'soft': 'rgba(42,79,142,0.08)',
      },
      fontFamily: {
        'sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
      },
      opacity: {
        '8': '0.08',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slideUp': 'slideUp 0.6s ease-out',
        'slideDown': 'slideDown 0.6s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 109, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(79, 109, 255, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'premium': '0 20px 40px rgba(42, 79, 142, 0.08)',
        'premium-lg': '0 40px 80px rgba(42, 79, 142, 0.12)',
        'premium-hover': '0 30px 60px rgba(42, 79, 142, 0.15)',
        'glow': '0 0 30px rgba(79, 109, 255, 0.3)',
        'glow-lg': '0 0 60px rgba(79, 109, 255, 0.4)',
      },
      gradients: {
        'premium': 'linear-gradient(135deg, rgba(42, 79, 142, 0.8), rgba(79, 109, 255, 0.6))',
      },
    },
  },
  plugins: [],
};

export default config;
