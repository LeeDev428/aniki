import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Yellow - Main brand color
        primary: {
          50: '#fffef7',
          100: '#fffaeb',
          200: '#fff3c4',
          300: '#fce588',
          400: '#F4C430', // Main primary
          500: '#e6b000',
          600: '#c99700',
        },
        // Legacy honey colors (for backward compatibility)
        honey: {
          50: '#fffef7',
          100: '#fff3c4',
          200: '#fce588',
          300: '#fcd34d',
          400: '#F4C430',
          500: '#e6b000',
          600: '#c99700',
        },
        // Dark Contrast - For headers, text, dark backgrounds
        dark: {
          DEFAULT: '#1A2438',
          50: '#f4f6f9',
          100: '#e3e7ed',
          200: '#c7d0dc',
          300: '#9aa8bd',
          400: '#6b7d99',
          500: '#4f6179',
          600: '#3d4d63',
          700: '#333f52',
          800: '#1A2438', // Main dark
          900: '#0f1520',
        },
        // Accent 1 - Pink/Coral for highlights, badges, special elements
        accent: {
          50: '#fff1f3',
          100: '#ffe4e8',
          200: '#ffccd5',
          300: '#ffa3b3',
          400: '#FF6B81', // Main accent
          500: '#f43f5e',
          600: '#e11d48',
        },
        // Accent 2 - Blue for links, info, secondary actions
        accent2: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#3A86FF', // Main accent2
          500: '#2563eb',
          600: '#1d4ed8',
        },
        // Cream background
        cream: '#faf8f5',
        warm: {
          100: '#f5f3ef',
          200: '#ebe7df',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        jp: ['"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(244, 196, 48, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 107, 129, 0.3)',
        'glow-accent2': '0 0 20px rgba(58, 134, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
