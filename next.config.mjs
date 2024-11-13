/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // SWC 최적화 활성화
  output: "standalone",
  compiler: {
    styledComponents: true, // styled-components 사용 설정
  },
  experimental: {
    forceSwcTransforms: true, // Babel 설정이 있을 경우에도 SWC 사용 강제
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /.svg$/,
      use: ["@svgr/webpack"],
    });
    config.cache = false;

    return config;
  },
};

export default nextConfig;
