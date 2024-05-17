const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [
    require("@tailwindcss/forms"),
  ],
  theme: {
    extend: {
      colors: {
        'remae': '#94b882',
      },
      fontFamily: {
        'tenor': ['Tenor Sans', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    }
  },
};
