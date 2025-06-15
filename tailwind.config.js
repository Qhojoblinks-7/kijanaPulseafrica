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
        sans: ['Inter', 'sans-serif'],        // For clear body text
      },
      colors: {
        // --- Primary Brand Color (Vibrant & Professional) ---
        // Concept: A strong, energetic color that immediately signifies the brand and its connection to African sports.
        // This could be a deep, vibrant blue or a bold, professional green.
        // My interpretation based on previous context and common branding: Deep Vibrant Blue
        'gamepulse-blue': '#1282A2',       // Primary Blue - formerly your 'gamepulse-blue' from last config
        'gamepulse-blue-dark': '#034078',  // Deeper shade for gradients/hover
        'gamepulse-blue-light': '#B4CED9', // Lighter shade for accents/text, good for subtle backgrounds or inactive states

        // --- Secondary Accent Color (Complementary & Dynamic) ---
        // Concept: A contrasting, yet harmonious vibrant color, adding depth and visual interest.
        // This could be a warm orange or a striking yellow/gold.
        // My interpretation: Striking Yellow/Gold, aligning with your previous 'gamepulse-yellow'
        'gamepulse-yellow': '#FCCA46',     // Secondary Accent - striking yellow/gold

        // --- Neutral Palette (Clean & High-Contrast for Readability) ---
        // Concept: A range of grays, blacks, and whites for clean backdrop, readability.
        'gamepulse-dark': '#0A1128',       // Deepest dark for main backgrounds (like the body/app container)
        'neutral-black': '#000000',        // Pure black for very high contrast text
        'neutral-dark-gray': '#333333',    // Dark gray for primary text on light backgrounds
        'neutral-medium-gray': '#6B7280',  // Medium gray for secondary text, borders (Tailwind's gray-500/600 equivalent)
        'neutral-light-gray': '#F3F4F6',   // Very light gray for subtle backgrounds or disabled states (Tailwind's gray-100/200 equivalent)
        'neutral-white': '#FFFFFF',        // Pure white for main content backgrounds or text on dark backgrounds

        // --- Support/Alert Colors (Standardized for User Feedback) ---
        'success-green': '#00C9A7',        // Green for success messages
        'warning-orange': '#FF9800',       // Orange for warnings (distinct from accent yellow)
        'error-red': '#E71D36',            // Red for error messages
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
        'fade-in': 'fadeIn 0.3s ease-out', // Assuming 'fadeIn' is a standard Tailwind keyframe or defined elsewhere if used
        'fade-in-down-slow': 'fade-in-down-slow 1s ease-out forwards',
        'fade-in-up-slow': 'fade-in-up-slow 1s ease-out forwards',
        'bounce-custom': 'bounce-custom 1.5s infinite ease-in-out',
        'pulse-slow': 'pulse-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}