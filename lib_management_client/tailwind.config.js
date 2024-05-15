/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#7e22ce',
        light: '#ffffff',
      },
    },
  },
  plugins: [require("daisyui")],
}

