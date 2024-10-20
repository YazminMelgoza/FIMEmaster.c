/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app.{js,jsx,ts,tsx}",

    "./app/**/*.{js,jsx,ts,tsx}",  // Incluye todos los archivos en 'app'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
