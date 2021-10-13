module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        gridTemplateColumns: {
            'app': '3fr 7fr'
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
