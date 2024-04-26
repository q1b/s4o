import { goldDark, gray, red, redDark } from '@radix-ui/colors';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const layers = Object.fromEntries(
	Object.entries(goldDark).map(([_, value], i) => [i + 1, [gray[`gray${i + 1}`], value]])
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

const themePlugin = plugin(function ({ addBase }) {
	addBase({
		':root': {
			...getCssVariableDeclarations(themes, [], {}, false),
			'--radius': '0.5rem'
		},
		'.dark': getCssVariableDeclarations(themes, [], {}, true)
	});
});

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
