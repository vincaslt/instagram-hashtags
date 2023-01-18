/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-r': 'inset 0 0px 4px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
