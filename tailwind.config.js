/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary': {
        400: '#278D8D',
      },
      'secondary': {
        200: '#FFDF8F',
        400: '#FDD287',
      },

      'tertiary': {
        200: '#BFF3FE',
        400: '#B1F3DE',

      },
      'quaternary': {
        400: '#303036',
      },
      'text': {
        50: '#FFFFFE',
        100: '#000000'
      }
    },
  },
  plugins: [],
}

