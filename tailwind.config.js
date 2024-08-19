import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['cupcake', 'sunset'],
  },
};
