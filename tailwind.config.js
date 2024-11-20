const { text } = require('stream/consumers');
const { getJSDocReadonlyTag } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['flex', 'h-screen', 'bg-gray-800', 'text-white'],
  theme: {
    extend: {
      colors: {
        primary: '#1F2D52',
        secondary: '#6C63FF',
        grey:'#64748B',
        danger: '#e3342f',
        'ssm-turquoise': '#40E0D0',

      }
    },
  },
  plugins: [],
};
