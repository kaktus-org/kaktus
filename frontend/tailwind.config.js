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
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano"),
  ],
};
