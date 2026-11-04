import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${notoSansKr.variable} font-sans text-sm antialiased`}>{children}</body>
    </html>
  );
}
