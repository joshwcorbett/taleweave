import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'ui-serif', 'serif'],
      },
      colors: {
        gray: {
          ...colors.neutral,
        }
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            fontFamily: theme('fontFamily.serif'),
            a: {
              color: theme('colors.orange.300'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.orange.400'),
              },
            }
          },
        }
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
