/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Kantumruy Pro", "sans-serif"], 
        khmer: ["Kantumruy Pro", "sans-serif"],  
      },
      lineHeight: {
        "khmer": "1.9",       
        "khmer-heading": "2", 
      },
    },
  },

  plugins: [],
};