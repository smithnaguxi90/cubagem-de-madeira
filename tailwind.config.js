/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: "#fbf7f3",
          100: "#f5ebe3",
          200: "#eadbc8",
          300: "#dec2a5",
          400: "#d0a27e",
          500: "#c5845a",
          600: "#b96843",
          700: "#9a5338",
          800: "#7e4432",
          900: "#66392c",
        },
      },
    },
  },
  plugins: [],
}