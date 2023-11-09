import type { Config } from 'tailwindcss';
import { violetDark, mauveDark, grayDark } from '@radix-ui/colors';

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
        gradient: 'linear-gradient(to bottom, #17151f, #1c172b)',
      },
      colors: {
        'mauve-1': mauveDark.mauve1,
        'mauve-2': mauveDark.mauve2,
        'mauve-3': mauveDark.mauve3,
        'mauve-4': mauveDark.mauve4,
        'mauve-5': mauveDark.mauve5,
        'mauve-6': mauveDark.mauve6,
        'mauve-7': mauveDark.mauve7,
        'mauve-8': mauveDark.mauve8,
        'mauve-9': mauveDark.mauve9,
        'mauve-10': mauveDark.mauve10,
        'mauve-11': mauveDark.mauve11,
        'mauve-12': mauveDark.mauve12,
        'violet-1': violetDark.violet1,
        'violet-2': violetDark.violet2,
        'violet-3': violetDark.violet3,
        'violet-4': violetDark.violet4,
        'violet-5': violetDark.violet5,
        'violet-6': violetDark.violet6,
        'violet-7': violetDark.violet7,
        'violet-8': violetDark.violet8,
        'violet-9': violetDark.violet9,
        'violet-10': violetDark.violet10,
        'violet-11': violetDark.violet11,
        'violet-12': violetDark.violet12,
        'gray-1': grayDark.gray1,
        'gray-2': grayDark.gray2,
        'gray-3': grayDark.gray3,
        'gray-4': grayDark.gray4,
        'gray-5': grayDark.gray5,
        'gray-6': grayDark.gray6,
        'gray-7': grayDark.gray7,
        'gray-8': grayDark.gray8,
        'gray-9': grayDark.gray9,
        'gray-10': grayDark.gray10,
        'gray-11': grayDark.gray11,
        'gray-12': grayDark.gray12,
      },
    },
  },
  plugins: [],
};

export default config;
