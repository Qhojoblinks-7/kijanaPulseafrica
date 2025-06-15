// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Using Google Fonts for a modern, clean look
        heading: ['Montserrat', 'sans-serif'], // For impactful headlines
        sans: ['Inter', 'sans-serif'],       // For clear body text
      },
      colors: {
        'gamepulse-orange': '#FF7F00', // Vibrant accent color, symbolizing energy
        'gamepulse-blue': '#007FFF',   // Strong, clear color for professionalism and tech
        'gamepulse-teal': '#00A88F',   // Earthy, growth-oriented color
        'gamepulse-dark': '#1A1A2E',   // Deep, rich background for contrast and sophistication
      },
      keyframes: {
        'fade-in-down-slow': {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up-slow': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-custom': { // Gentle bounce for CTA icon
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-slow': { // Subtle pulse for UI hint
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.3' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-down-slow': 'fade-in-down-slow 1s ease-out forwards',
        'fade-in-up-slow': 'fade-in-up-slow 1s ease-out forwards',
        'bounce-custom': 'bounce-custom 1.5s infinite ease-in-out',
        'pulse-slow': 'pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}