/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        zinc: {
          950: '#09090b',
        },
        condux: {
          accent: '#10b981',
        }
      }
    },
  },
  plugins: [],
}
