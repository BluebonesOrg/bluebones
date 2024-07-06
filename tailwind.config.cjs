import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [typography, daisyui],
    daisyui: {
        themes: [
            'cupcake',
            'black',
            {
                light: {
                    ...themes.light,
                    primary: '#03a9f4',
                },
            },
            'dark',
        ],
    },
};
