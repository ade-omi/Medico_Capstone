/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme')


export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{ 
        lora: ['"Lora"', ...defaultTheme.fontFamily.sans],
        montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },borderRadius:{
        '4xl' : '50px',
        '5xl' : '70px', 
        '6xl' : '90px'
      },
    },
  },
  plugins: [],
}

