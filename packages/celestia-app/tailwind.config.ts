import type { Config } from 'tailwindcss';
import { grayDark, plumDark } from '@radix-ui/colors';

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
        'plum-1': plumDark.plum1,
        'plum-2': plumDark.plum2,
        'plum-3': plumDark.plum3,
        'plum-4': plumDark.plum4,
        'plum-5': plumDark.plum5,
        'plum-6': plumDark.plum6,
        'plum-7': plumDark.plum7,
        'plum-8': plumDark.plum8,
        'plum-9': plumDark.plum9,
        'plum-10': plumDark.plum10,
        'plum-11': plumDark.plum11,
        'plum-12': plumDark.plum12,
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
