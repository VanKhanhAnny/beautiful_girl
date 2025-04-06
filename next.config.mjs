/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/agent",
  redirects: () => [{ source: "/", destination: "/agent", permanent: false, basePath: false }],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.deepgram.com",
        port: "",
        pathname: "/examples/avatars/**",
      },
    ],
    // Allow loading images from the '/public' directory
    unoptimized: true,
  },
};

export default nextConfig;
