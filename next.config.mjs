import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['static.wikia.nocookie.net'],
	},
};

export default nextConfig;
