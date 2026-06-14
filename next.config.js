/** @type {import('next').NextConfig} */

const SITE_DOMAIN = process.env.SITE_DOMAIN || 'locationvoituretunisie24-7.com';

const nextConfig = {
    // standalone is for Docker/VPS self-hosting — Vercel manages its own output
    output: process.env.VERCEL ? undefined : 'standalone',
    async redirects() {
        return [
            {
                source: '/product/:slug',
                destination: '/rental/tunis/:slug',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'nhrentcar.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'nhrentcar.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};

module.exports = nextConfig;
