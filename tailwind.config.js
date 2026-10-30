/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#0d1b2a',
        'secondary': '#1b2838',
        'coral': '#f76c6c',
        'coral-light': '#ff8a8a',
        'sky': '#a8c0e8',
        'sky-light': '#d0e6f7',
        'warm': '#102a43',
        'muted': '#94a3b8',
        'hope': '#4ade80',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        // Entrance animations done in CSS so prerendered pages are visible
        // and animate at first paint, without waiting for JavaScript.
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-down': 'fade-down 0.6s ease-out both',
        'pop-in': 'pop-in 0.8s ease-out both',
        'nav-in': 'nav-in 0.5s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(247, 108, 108, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(247, 108, 108, 0.8)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        // End on `transform: none` so finished elements don't become a
        // containing block for fixed-position children (menus, lightbox).
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        // No opacity change: the main heading counts as painted immediately
        'pop-in': {
          '0%': { transform: 'scale(0.94)' },
          '100%': { transform: 'none' },
        },
        'nav-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'none' },
        },
      },
    },
  },
  plugins: [],
}
