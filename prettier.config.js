/** @type {import('prettier').Config} */
module.exports = {
	useTabs: true,
	singleQuote: true,
	plugins: [require('prettier-plugin-tailwindcss')],
	pluginSearchDirs: false,
};
