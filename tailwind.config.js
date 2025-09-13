/**
 * Tailwind CSS Configuration
 * Solid color design system (no gradients) for Zakaria Said portfolio.
 * Palette:
 *  Primary      #FFC300 (Gold)
 *  Secondary    #FFD60A (Accent Yellow)
 *  DarkBlue     #001D3D (Primary background)
 *  MediumBlue   #003566 (Section / Alt background, borders)
 *  DeepBlue     #000814 (High-emphasis text / headings)
 *  White        #FFFFFF (Body text on dark backgrounds)
 */

import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // Core semantic tokens
        primary: {
          DEFAULT: '#FFC300',        // Gold
          foreground: '#000814',     // DeepBlue on primary surfaces
          subtle: '#FFD60A',         // Slightly lighter accent usage
        },
        secondary: {
          DEFAULT: '#FFD60A',        // Accent yellow
          foreground: '#000814',
        },
        accent: {
          DEFAULT: '#003566',        // MediumBlue - emphasis or filled controls
          foreground: '#FFFFFF',
        },
        background: {
          DEFAULT: '#001D3D',        // DarkBlue main background
          alt: '#003566',             // MediumBlue panels / sections
          deep: '#000814',            // DeepBlue high-emphasis zones
        },
        foreground: {
          DEFAULT: '#FFFFFF',        // Primary readable text on dark backgrounds
          emphasis: '#000814',       // DeepBlue for text on light (yellow) surfaces
          muted: '#D0D7E2',          // Muted text
        },
        border: '#003566',           // MediumBlue for strokes / dividers
        card: {
          DEFAULT: '#003566',        // Solid card bg (alt background)
          foreground: '#FFFFFF',
        },
        badge: {
          DEFAULT: '#FFC300',
          foreground: '#000814',
        },
        input: {
          DEFAULT: '#003566',
          foreground: '#FFFFFF',
        },
        // Backward compat alias (optional future scaling)
        brand: {
          gold: '#FFC300',
          goldAccent: '#FFD60A',
          dark: '#001D3D',
          medium: '#003566',
          deep: '#000814',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [animate],
};
