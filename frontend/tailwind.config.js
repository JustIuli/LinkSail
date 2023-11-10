/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
 // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0174BE',
        primaryDark: '#0266a6'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

