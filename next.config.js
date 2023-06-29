/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://7846-211-226-166-75.ngrok-free.app/:path*",
      },
    ];
  },
}

module.exports = nextConfig
