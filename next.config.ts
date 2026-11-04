import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 HTML로 빌드해 out/ 디렉터리를 그대로 호스팅한다.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
