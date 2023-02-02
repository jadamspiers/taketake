/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '500px': '500px',
      },
      height: {
        '300px': '300px',
        '700px': '700px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}