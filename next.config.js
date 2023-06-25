/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://0b86-211-226-166-75.ngrok-free.app/:path*",
      },
    ];
  },
}

module.exports = nextConfig
