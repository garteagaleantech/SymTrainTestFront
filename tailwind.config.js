module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  important: 'html',
  theme: {
    fontFamily: {
      body: ['Roboto']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
};
