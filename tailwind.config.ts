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
			},
			animation: {
				first: "moveVertical 30s ease infinite",
				second: "moveInCircle 20s reverse infinite",
				third: "moveInCircle 40s linear infinite",
				fourth: "moveHorizontal 40s ease infinite",
				fifth: "moveInCircle 20s ease infinite",
			  },
			  keyframes: {
				moveHorizontal: {
				  "0%": {
					transform: "translateX(-50%) translateY(-10%)",
				  },
				  "50%": {
					transform: "translateX(50%) translateY(10%)",
				  },
				  "100%": {
					transform: "translateX(-50%) translateY(-10%)",
				  },
				},
				moveInCircle: {
				  "0%": {
					transform: "rotate(0deg)",
				  },
				  "50%": {
					transform: "rotate(180deg)",
				  },
				  "100%": {
					transform: "rotate(360deg)",
				  },
				},
				moveVertical: {
				  "0%": {
					transform: "translateY(-50%)",
				  },
				  "50%": {
					transform: "translateY(50%)",
				  },
				  "100%": {
					transform: "translateY(-50%)",
				  },
				},
			},
		}
	},
	plugins: [F]
} satisfies Config;

export default config;
