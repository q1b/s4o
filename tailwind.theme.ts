import { goldDark, gray, red, redDark } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import svgToDataUri from "mini-svg-data-uri";
// @ts-ignore
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const layers = Object.fromEntries(
	Object.entries(goldDark).map(([_, value], i) => [i + 1, [gray[`gray${i + 1}` as 'gray1'], value]])
);

/**
 *  {
 *      colorName: {
 *          shade: [light, dark]
 *      }
 *  }
 */
const themes = {
	layer: {
		0: ['#ffffff', '#0e0e0e'],
		13: ['#000000', '#ffffff'],
		...layers
	},
	border: '--layer-3',
	input: '--layer-6',
	ring: '--layer-8',
	background: {
		DEFAULT: ['--layer-0', '--layer-1'],
		alt: ['--layer-1', '--layer-2']
	},
	muted: {
		DEFAULT: '--layer-5',
		foreground: '--layer-11'
	},
	foreground: {
		DEFAULT: '--layer-12',
		alt: '--layer-13'
	},
	popover: {
		DEFAULT: '--layer-0',
		foreground: '--layer-12'
	},
	card: {
		DEFAULT: '--layer-0',
		alt: '--layer-1',
		foreground: '--layer-12'
	},
	primary: {
		DEFAULT: '--layer-13',
		foreground: '--layer-0'
	},
	secondary: {
		DEFAULT: '--layer-3',
		foreground: '--layer-12'
	},
	accent: {
		DEFAULT: '--layer-5',
		foreground: '--layer-12'
	},
	destructive: {
		DEFAULT: [red['red3'], redDark['red3']],
		foreground: [red['red10'], redDark['red12']]
	}
};

const getRgbChannels = (hex: string) => {
	hex = hex.replace('#', '');
	hex = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex;
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return `${r} ${g} ${b}`;
};

// Generate CSS variables
export function getCssVariableDeclarations(
	input: Record<string, string | string[] | Record<string, string | string[]>>,
	path: string[] = [],
	output: Record<string, string | string[] | Record<string, string | string[]>> = {},
	isDarkTheme = false
) {
	Object.entries(input).forEach(([key, value]) => {
		const newPath = path.concat(key);
		if (typeof value !== 'string' && !Array.isArray(value)) {
			getCssVariableDeclarations(value, newPath, output, isDarkTheme);
		} else {
			let newValue;
			if (Array.isArray(value)) newValue = !isDarkTheme ? value[0] : value[1];
			else newValue = value;

			if (newValue.startsWith('--')) {
				output[`--${key === 'DEFAULT' ? path.join('-') : newPath.join('-')}`] =
					'var(' + newValue + ')';
			} else {
				output[`--${key === 'DEFAULT' ? path.join('-') : newPath.join('-')}`] =
					getRgbChannels(newValue);
			}
		}
	});
	return output;
}

// Generate color extension object
export function getColorUtilitiesWithCssVariableReferences(
	input: Record<string, string | string[] | Record<string, string | string[]>>,
	path: string[] = []
): Record<string, string> {
	return Object.fromEntries(
		Object.entries(input).map(([key, value]) => {
			const newPath = path.concat(key);
			if (typeof value !== 'string' && !Array.isArray(value)) {
				return [key, getColorUtilitiesWithCssVariableReferences(value, newPath)];
			} else {
				return [
					key,
					`rgb(var(--${key === 'DEFAULT' ? path.join('-') : newPath.join('-')}) / <alpha-value>)`
				];
			}
		})
	);
}

const themePlugin = plugin(function ({ matchUtilities, theme, addBase }) {
	addBase({
		':root': {
			...getCssVariableDeclarations(themes, [], {}, false),
			'--radius': '0.5rem'
		},
		'.dark': getCssVariableDeclarations(themes, [], {}, true)
	});
	matchUtilities(
		{
		  "bg-grid": (value: any) => ({
			backgroundImage: `url("${svgToDataUri(
			  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
			)}")`,
		  }),
		  "bg-grid-small": (value: any) => ({
			backgroundImage: `url("${svgToDataUri(
			  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
			)}")`,
		  }),
		  "bg-dot": (value: any) => ({
			backgroundImage: `url("${svgToDataUri(
			  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
			)}")`,
		  }),
		  'bg-leaf': (value: any) => ({
			backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40" width="80" height="40"><path fill="${value}" d="M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z"></path></svg>`
			)}")`
			})
		},
		{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
	  );
},)

export const themePreset = {
	darkMode: 'selector',
	content: [],
	plugins: [themePlugin],
	theme: {
		extend: {
			colors: getColorUtilitiesWithCssVariableReferences(themes)
		}
	}
} as Config;
