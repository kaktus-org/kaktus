/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        hunterGreen: "#355E3B",
        britishRacingGreen: '#004225',
        forestGreen: '#228B22',
        burntOrange: '#CC5500',
        gold: '#DEAA00',
        teal: '#008080',
        lightBlue: '#ADD8E6',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['responsive', 'hover', 'focus', 'group-hover'],
      translate: ['responsive', 'hover', 'focus', 'group-hover'],
      transitionProperty: ['responsive', 'hover', 'focus', 'group-hover'],
      transitionDuration: ['responsive', 'hover', 'focus', 'group-hover'],
      transitionTimingFunction: ['responsive', 'hover', 'focus', 'group-hover'],
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano"),
  ],
};
