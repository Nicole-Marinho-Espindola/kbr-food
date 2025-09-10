/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}', 
    './src/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './navigation/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        lightBlue: "#EDEDF4",
        lightOrange: "#F79D5C",
        orange: "#F3752B",
        pink: "#F52F57",
        darkPink: "#A20021",
        lightGray: "#333"
      },
    },
  },
  plugins: [],
};
