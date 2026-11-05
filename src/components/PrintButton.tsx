"use client";

// 브라우저 인쇄 창을 연다. "PDF로 저장"을 고르면 인쇄용 스타일(globals.css의 @media print)이 적용된 PDF가 된다.
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="PDF로 저장"
      title="PDF로 저장"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M8 2v8M4.8 7 8 10.2 11.2 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 11v1.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
