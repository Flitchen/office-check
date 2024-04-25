/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#B00000",
        lightBlack: "#1B1818",
        lightGray: "#ACACAC",
        primaryGreen: "#02BF37",
      },
    },
  },
  plugins: [],
};
