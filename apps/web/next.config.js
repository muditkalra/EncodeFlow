/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/types"],
    experimental: {
        optimizePackageImports: ['lucide-react']
    }
};

export default nextConfig;
