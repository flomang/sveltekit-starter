/* jshint esversion: 9 */

const sveltePreprocess = require('svelte-preprocess');
const node = require('@sveltejs/adapter-node');
const ssr = require('@sveltejs/adapter-static');
const pkg = require('./package.json');
const { resolve } = require('path');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: 'postcss',
			},
			postcss: true,
		}),
	],
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#sveltekit-starter',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
			resolve: {
				alias: {
					$components: resolve(__dirname, './src/lib/shared/components'),
					$ui: resolve(__dirname, './src/lib/shared/ui'),
					$shared: resolve(__dirname, './src/lib/shared'),
					$models: resolve(__dirname, './src/lib/models'),
					$core: resolve(__dirname, './src/lib/core'),
					$utils: resolve(__dirname, './src/lib/utils'),
				},
			},
		},
	},
};