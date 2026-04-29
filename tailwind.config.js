/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fbf7f0',
          100: '#f4eadb',
          500: '#8a5a35',
          700: '#5c3824',
          900: '#251711',
        },
        leaf: '#3f6f4f',
        crema: '#d7a86e',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
