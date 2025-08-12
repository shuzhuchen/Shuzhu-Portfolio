/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk-bold': ['"Space Grotesk"', 'sans-serif'],
        'outfit-medium': ['"Outfit"', 'sans-serif'],
        'inter-regular': ['"Inter"', 'sans-serif'],
        'outfit-semibold': ['"Outfit"', 'sans-serif'],
        'inter-semibold': ['"Inter"', 'sans-serif'],
        'fira-code': ['"Fira Code"', 'monospace'],
      },
      colors: {
        'theme-primary': '#78350f',
        'theme-secondary': '#92400e',
        'theme-muted': '#b45309',
        'theme-muted-light': '#fcd34d',
        'theme-accent': '#f59e0b',
        'theme-accent-alt': '#f97316',
        'theme-accent-soft': '#facc15',
        'theme-accent-hover': '#d97706',
        'theme-panel': '#4b2e1ecc',
        'theme-border': '#fbbf24',
        'theme-on-panel': '#fefce8',
        'theme-tag': '#fef9c3',
        'theme-tag-border': '#fde68a',
        'theme-tag-text': '#4b2e1e',
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}