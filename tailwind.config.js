/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html"],
  safelist: [
    {
      pattern: /bg-\[.*\]/,
    },
    {
      pattern: /text-\[.*\]/,
    },
    {
      pattern: /p[trblxy]?-?\[.*\]/,
    },
    {
      pattern: /m[trblxy]?-?\[.*\]/,
    },
    {
      pattern: /rounded-\[.*\]/,
    },
    {
      pattern: /w-\[.*\]/,
    },
    {
      pattern: /h-\[.*\]/,
    },
    {
      pattern: /z-\[.*\]/,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
}
