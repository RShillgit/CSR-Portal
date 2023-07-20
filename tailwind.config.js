/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "orange": "#C45829",
        "darkOrange": "#AB4214",
        "blue": "#1B4489"
      }
    },
  },
  plugins: [],
}

