import { violetDark, mauveDark, } from '@radix-ui/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'mauve-dark-1': mauveDark.mauve1,
        'mauve-dark-2': mauveDark.mauve2,
        'mauve-dark-3': mauveDark.mauve3,
        'mauve-dark-4': mauveDark.mauve4,
        'mauve-dark-5': mauveDark.mauve5,
        'mauve-dark-6': mauveDark.mauve6,
        'mauve-dark-7': mauveDark.mauve7,
        'mauve-dark-8': mauveDark.mauve8,
        'mauve-dark-9': mauveDark.mauve9,
        'mauve-dark-10': mauveDark.mauve10,
        'mauve-dark-11': mauveDark.mauve11,
        'mauve-dark-12': mauveDark.mauve12,
        'violet-dark-1': violetDark.violet1,
        'violet-dark-2': violetDark.violet2,
        'violet-dark-3': violetDark.violet3,
        'violet-dark-4': violetDark.violet4,
        'violet-dark-5': violetDark.violet5,
        'violet-dark-6': violetDark.violet6,
        'violet-dark-7': violetDark.violet7,
        'violet-dark-8': violetDark.violet8,
        'violet-dark-9': violetDark.violet9,
        'violet-dark-10': violetDark.violet10,
        'violet-dark-11': violetDark.violet11,
        'violet-dark-12': violetDark.violet12,
      },
    },
  },
  plugins: [],
};

export default config;
