/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#6C2BD9',
        'brand-yellow': '#FFC700',
        'brand-gray': {
          100: '#F5F5F5',
          200: '#EFEFEF',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          800: '#424242',
        }
      }
    },
  },
  plugins: [],
}
