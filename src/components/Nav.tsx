import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import ThemeToggle from "@/components/ThemeToggle";

const pages = [
  { href: "/", label: "이력서" },
  { href: "/cv/", label: "연구 이력" },
];

// 상단 메뉴. 왼쪽은 페이지 전환(Resume / Curriculum Vitae), 오른쪽은 현재 페이지의 섹션 바로가기와 버튼.
// 섹션 바로가기는 좁은 화면에서는 숨긴다.
export default function Nav({
  current,
  sections,
  pdf,
}: {
  current: string;
  sections: { id: string; label: string }[];
  // 다운로드 버튼이 내려받을 PDF. file은 out/ 기준 파일명, downloadName은 저장될 이름이다.
  pdf: { label: string; file: string; downloadName: string };
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/85 backdrop-blur print:hidden">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <ul className="flex items-center gap-1 text-[13px]">
          {pages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                aria-current={p.href === current ? "page" : undefined}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  p.href === current ? "bg-surface font-semibold text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="hidden gap-5 text-xs text-muted sm:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <PrintButton {...pdf} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
