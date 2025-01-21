import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'dynamic-green': '#66f770',
				'faded-blue': '#4a5073',
				'background': '#191c2b',
			},
		},
	},
	plugins: [],
}
export default config
