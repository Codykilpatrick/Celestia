import type { Config } from 'tailwindcss';
import {violet, mauve} from '@radix-ui/colors'

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
        "mauve-1": mauve.mauve1,
        "mauve-2": mauve.mauve2,
        "mauve-3": mauve.mauve3,
        "mauve-4": mauve.mauve4,
        "mauve-5": mauve.mauve5,
        "mauve-6": mauve.mauve6,
        "mauve-7": mauve.mauve7,
        "mauve-8": mauve.mauve8,
        "mauve-9": mauve.mauve9,
        "mauve-10": mauve.mauve10,
        "mauve-11": mauve.mauve11,
        "mauve-12": mauve.mauve12,
        "violet-1": violet.violet1,
        "violet-2": violet.violet2,
        "violet-3": violet.violet3,
        "violet-4": violet.violet4,
        "violet-5": violet.violet5,
        "violet-6": violet.violet6,
        "violet-7": violet.violet7,
        "violet-8": violet.violet8,
        "violet-9": violet.violet9,
        "violet-10": violet.violet10,
        "violet-11": violet.violet11,
        "violet-12": violet.violet12,
      }
    },
  },
  plugins: [],
};

export default config;
