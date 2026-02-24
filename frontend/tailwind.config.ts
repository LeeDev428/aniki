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
        // Primary Pink - Main brand accent
        pink: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#fbd0d9',
          300: '#f7a8ba',
          400: '#f27a99',
          500: '#E85D84', // Main pink
          600: '#d43a6a',
          700: '#b22d56',
          800: '#94284a',
          900: '#7c2642',
        },
        // Peach/Orange - Secondary accent
        peach: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F97316', // Main peach/orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Charcoal - Deep dark (replaces pure black)
        charcoal: {
          DEFAULT: '#2D3142',
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d9d9de',
          300: '#b8b9c1',
          400: '#91929f',
          500: '#747584',
          600: '#5d5e6b',
          700: '#4c4d57',
          800: '#2D3142', // Main charcoal
          900: '#1a1b24',
        },
        // Cream/Off-white backgrounds
        cream: {
          DEFAULT: '#FFF9F5',
          50: '#FFFFFF',
          100: '#FFF9F5',
          200: '#FFF5EE',
          300: '#FFEDE3',
        },
        // Soft backgrounds
        soft: {
          pink: '#FFF0F3',
          peach: '#FFF4ED',
          white: '#FEFEFE',
        }
      },
      fontFamily: {
        display: ['Poppins', 'Fredoka', 'sans-serif'],
        body: ['Inter', 'Montserrat', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(232, 93, 132, 0.1)',
        'card-hover': '0 8px 30px rgba(232, 93, 132, 0.2)',
        'glow-pink': '0 0 20px rgba(232, 93, 132, 0.3)',
        'glow-peach': '0 0 20px rgba(249, 115, 22, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'heart-beat': 'heart-beat 0.6s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'heart-beat': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
