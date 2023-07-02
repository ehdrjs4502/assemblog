/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/server/:path*", // 사용할 주소  /:path* 뒤에 붙는 것을 다 포함한다는 의미
        destination: "https://7846-211-226-166-75.ngrok-free.app/:path*", // 실제 api 주소
      },
    ];
  },
}

module.exports = nextConfig
