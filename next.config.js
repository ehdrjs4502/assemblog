/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
const API_URL = process.env.API

const nextConfig = {
  reactStrictMode: false,
  async rewrites() { // URL 마스킹
    return [
      {
        source: "/server/:path*", // 사용할 주소  /:path* 뒤에 붙는 것을 다 포함한다는 의미
        destination: `${API_URL}:path*`, // 실제 api 주소
      },
    ];
  },
  images: { 
    domains: ['storage.googleapis.com'], // 외부 경로 이미지 사용하기 위함
  },
}

module.exports = removeImports({
  ...nextConfig,
  assetPrefix: '.',
});

