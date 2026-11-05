"use client";

import { asset } from "@/lib/asset";

// PDF 다운로드 버튼. 배포 때 scripts/build-pdfs.mjs가 Chrome으로 미리 만든 PDF(out/resume.pdf 등)를 내려받는다.
// 방문자 브라우저의 인쇄 기능에 맡기면 Safari 등에서 QR 링크가 빠지기 때문이다.
// 개발 서버(next dev)에는 PDF 파일이 없으므로, 그때만 브라우저 인쇄 창을 대신 연다.
// 저장 파일명은 "{name}_{기준일자}.pdf"이다. 기준일자는 문서의 LAST UPDATED와 같은 빌드 날짜다.
export default function PrintButton({
  label,
  file,
  name,
  buildTime,
}: {
  label: string;
  file: string;
  name: string;
  buildTime: number;
}) {
  const d = new Date(buildTime);
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const fileName = `${name}_${stamp}`;
  return (
    <a
      href={asset(`/${file}`)}
      download={`${fileName}.pdf`}
      onClick={(e) => {
        if (process.env.NODE_ENV === "development") {
          e.preventDefault();
          // 인쇄 창은 페이지 제목을 저장 파일명으로 쓰므로, 인쇄하는 동안만 제목을 바꿔 둔다.
          const title = document.title;
          document.title = fileName;
          window.print();
          document.title = title;
        }
      }}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M8 2v8M4.8 7 8 10.2 11.2 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 11v1.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
