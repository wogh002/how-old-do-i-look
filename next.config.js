// 넥스트는 웹팩을 기본 번들러로 사용합니다.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  // 프록시 서버 
  async rewrites() {
    return [
      {
        destination: 'https://dapi.kakao.com/:path*',
        source: '/:path*',
      },
    ];
  },
}

module.exports = nextConfig


