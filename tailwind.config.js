/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.liquid',
    './templates/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './assets/**/*.js',
  ],
  theme: {
    important: true,
    extend: {
      colors: {
        brand: '#E6BAA7',
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  prefix: 'tw-',
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
