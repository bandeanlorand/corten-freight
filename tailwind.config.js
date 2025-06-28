/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",       // Matches all HTML files in the root folder
    "./src/**/*.{html,js}",  // Optional, if you also have nested files inside /src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};