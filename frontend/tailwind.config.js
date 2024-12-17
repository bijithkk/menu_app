/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        parkinsans: ["Parkinsans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        anton: ["Anton", "sans-serif"]
      },
    },
  },
  plugins: [],
}