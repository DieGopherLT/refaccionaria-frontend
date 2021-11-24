module.exports = {
  purge: {
      content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx', './src/App.tsx'],
      safelist: [
          'bg-blue-500',
          'hover:bg-blue-700',
          'bg-green-500',
          'hover:bg-green-700',
          'bg-red-500',
          'hover:bg-red-700',
          'bg-gray-500',
          'hover:bg-gray-700',
          'bg-yellow-500',
          'hover:bg-yellow-700',
          'bg-indigo-500',
          'hover:bg-indigo-700',
          'bg-pink-500',
          'hover:bg-pink-700',
          'bg-purple-500',
          'hover:bg-purple-700',
      ]
  },
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
