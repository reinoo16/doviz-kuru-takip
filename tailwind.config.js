/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',   // Extra small devices
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        green: '#B9E705',
        black: '#101010',
        white70: 'rgba(255,255,255,0.7)',
        white50: 'rgba(255,255,255,0.5)',
      }
    },
  },
  plugins: [],
}