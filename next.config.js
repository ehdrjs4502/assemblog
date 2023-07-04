/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: false,
  async rewrites() { // URL 마스킹
    return [
      {
        source: "/server/:path*", // 사용할 주소  /:path* 뒤에 붙는 것을 다 포함한다는 의미
        destination: "https://66e0-14-35-50-227.ngrok-free.app/:path*", // 실제 api 주소
      },
    ];
  },
}

module.exports = removeImports({
  ...nextConfig,
});
