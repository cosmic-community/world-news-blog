/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0f172a',
          accent: '#e11d48',
          muted: '#64748b',
        },
        category: {
          politics: '#2563eb',
          technology: '#7c3aed',
          climate: '#059669',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}