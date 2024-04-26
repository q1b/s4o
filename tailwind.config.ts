import { fontFamily } from 'tailwindcss/defaultTheme';
import F from '@tailwindcss/forms';
import { themePreset } from './tailwind.theme';
import type { Config } from 'tailwindcss';

const config = {
	presets: [themePreset],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Manrope Variable', ...fontFamily.sans]
			}
		}
	},
	plugins: [F]
} satisfies Config;

export default config;
