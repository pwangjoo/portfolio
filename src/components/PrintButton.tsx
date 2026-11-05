"use client";

import { asset } from "@/lib/asset";

// PDF 다운로드 버튼. 배포 때 scripts/build-pdfs.mjs가 Chrome으로 미리 만든 PDF(out/resume.pdf 등)를 내려받는다.
// 방문자 브라우저의 인쇄 기능에 맡기면 Safari 등에서 QR 링크가 빠지기 때문이다.
// 개발 서버(next dev)에는 PDF 파일이 없으므로, 그때만 브라우저 인쇄 창을 대신 연다.
export default function PrintButton({
  label,
  file,
  downloadName,
}: {
  label: string;
  file: string;
  downloadName: string;
}) {
  return (
    <a
      href={asset(`/${file}`)}
      download={downloadName}
      onClick={(e) => {
        if (process.env.NODE_ENV === "development") {
          e.preventDefault();
          window.print();
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
