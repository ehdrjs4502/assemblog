/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://ac9f-211-226-166-75.ngrok-free.app/:path*",
      },
    ];
  },
}

module.exports = nextConfig
