/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      },
      boxShadow: {
        soft: '0 10px 35px rgba(2, 6, 23, 0.08)'
      }
    }
  },
  plugins: []
};
