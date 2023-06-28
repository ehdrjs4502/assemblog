/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://1800-211-226-166-75.ngrok-free.app/:path*",
      },
    ];
  },
}

module.exports = nextConfig
