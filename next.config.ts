import type { NextConfig } from "next";

// GitHub Pages 프로젝트 페이지(username.github.io/repo)는 하위 경로로 서빙된다.
// 워크플로가 NEXT_PUBLIC_BASE_PATH로 경로를 넘기고, 로컬에서는 비어 있다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // 정적 HTML로 빌드해 out/ 디렉터리를 그대로 호스팅한다.
  output: "export",
  // /research/ 를 research/index.html로 내보내 GitHub Pages에서 그대로 열리게 한다.
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
