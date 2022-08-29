/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'c1': '#fb923c',//orange
        'c2': '#c2410c',//orange 2 dark
        'c3': '#fec163', // blue
        'tc1': '#44403c',
       }
    },
  },
  plugins: [],
}
