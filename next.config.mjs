/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'bvnp6cpie7oauwed.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
