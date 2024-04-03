/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'wolfey.s-ul.eu'
            },

        ]
    }
}

export default nextConfig;
