/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exo: ['"Exo 2"', "sans-serif"],
        lexend: ['"Lexend Deca"', "sans-serif"],
      },
      colors: {
        primary: "#427898",
        secondary: "#b76729",
      },
    },
  },
  plugins: [],
};
