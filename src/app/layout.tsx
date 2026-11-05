import type { Metadata } from "next";
// Noto Sans KR은 npm 패키지(@fontsource)로 프로젝트에 포함한다. next/font/google은 빌드 때 Google Fonts에서 받아 오는데,
// 한글 폰트 응답의 파일 주소에 확장자가 없을 때가 있어 배포 빌드가 간헐적으로 실패했다.
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/500.css";
import "@fontsource/noto-sans-kr/600.css";
import "@fontsource/noto-sans-kr/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "박주현 포트폴리오",
  description: "Full-Stack 개발자 박주현의 포트폴리오",
};

// 첫 페인트 전에 테마를 정해 깜빡임을 막는다. 저장된 선택이 없으면 시스템 설정을 따른다.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme은 hydration 전에 스크립트가 넣으므로 속성 불일치 경고를 끈다.
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans text-sm antialiased">{children}</body>
    </html>
  );
}
