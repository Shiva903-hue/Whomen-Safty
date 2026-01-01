/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FCA5A5',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
        },
        safe: {
          DEFAULT: '#10B981',
          light: '#6EE7B7',
        },
      },
    },
  },
  plugins: [],
}
