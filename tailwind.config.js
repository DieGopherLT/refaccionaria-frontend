module.exports = {
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx', './src/App.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'app': '2fr 8fr'
      },
      flex: {
        'icon': '0 0 2rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
