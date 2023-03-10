const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'turqoise': '#5fa7a7',
        'turqoise-light': '#eef7f6',
        'turqoise-dark': '#293737'
      }
    },
  },
  plugins: [
    plugin(
      function({ addBase }) {
        addBase({
          'html': { fontSize: "14px" },
        })
      }
    )
  ],
}
