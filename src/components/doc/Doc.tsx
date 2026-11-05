import { profile } from "@/data/portfolio";
import { asset } from "@/lib/asset";
import type { Period } from "@/lib/career";

// PDF(인쇄) 전용 문서 레이아웃의 공통 요소. 화면에서는 숨겨지고 인쇄할 때만 보인다(hidden print:block).

const formatDocDate = (time: number) => {
  const d = new Date(time);
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")}.`;
};

// 문서에서는 날짜 칸이 한 줄에 들어가도록 월까지만 쓴다. 예) "2025.06 ~ 2026.11"
const toMonth = (date: string) => date.split(".").slice(0, 2).join(".");
export const formatDocPeriod = ({ start, end }: Period) => `${toMonth(start)} ~ ${end ? toMonth(end) : "현재"}`;

// 최소 높이를 A4 한 쪽(297mm - 위아래 여백 18mm, globals.css의 @page)으로 잡아, 내용이 한 쪽 안에 들어가면 DocFooter가 바닥에 붙는다.
export function DocPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden min-h-[278mm] flex-col text-[8.5pt] leading-[1.5] text-[#111] print:flex">{children}</div>
  );
}

// 문서 맨 아래의 기타 영역. 처음 받은 이력서처럼 구분선 아래 한 줄씩 " | "로 이어 적는다.
export function DocFooter({ lines }: { lines: string[][] }) {
  return (
    <footer className="mt-auto break-inside-avoid border-t-[1.5px] border-[#111] pt-2">
      <h2 className="mb-1 text-[10.5pt] font-bold">
        기타 <span className="text-[9pt] font-medium">MISCELLANEOUS</span>
      </h2>
      {lines.map((items) => (
        <p key={items[0]} className="text-[7.5pt] text-[#333]">
          {items.join(" | ")}
        </p>
      ))}
    </footer>
  );
}

export function DocHeader({ title, titleEn, buildTime }: { title: string; titleEn: string; buildTime: number }) {
  return (
    <header className="mb-3 text-right">
      <h1 className="text-[16pt] font-bold leading-tight">
        {title} <span className="text-[11.5pt] font-medium">{titleEn}</span>
      </h1>
      <p className="mt-1 text-[6.5pt] tracking-wide text-[#555]">LAST UPDATED ON {formatDocDate(buildTime)}</p>
    </header>
  );
}

// 바로 뒤가 DocFooter인 마지막 섹션은 아래 여백을 없앤다. DocFooter가 mt-auto로 바닥에 붙으므로 간격은 남는다.
export function DocSection({ title, titleEn, children }: { title: string; titleEn: string; children: React.ReactNode }) {
  return (
    <section className="mb-3 border-t-[1.5px] border-[#111] pt-1.5 [&:has(+footer)]:mb-0">
      <h2 className="mb-1.5 break-after-avoid text-[10.5pt] font-bold">
        {title} <span className="text-[9pt] font-medium">{titleEn}</span>
      </h2>
      {children}
    </section>
  );
}

// 왼쪽 칸의 항목 이름. 한글 옆에 영문을 작게 붙인다.
export function DocLabel({ ko, en }: { ko: string; en: string }) {
  return (
    <>
      {ko} <span className="text-[6.5pt] tracking-wide text-[#555]">{en}</span>
    </>
  );
}

// 섹션 안의 소제목(예: 경력 구분 "개발" / "기획·PM"). 오른쪽으로 점선을 이어 묶음 경계를 드러낸다.
// 두 번째 묶음부터는 위 여백을 둬 앞 묶음과 떨어뜨린다.
export function DocGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-0.5 flex break-after-avoid items-center gap-2 text-[7.5pt] font-semibold text-[#333] [div+div>&]:mt-2">
      {children}
      <span className="flex-1 border-t border-dashed border-[#bbb]" />
    </p>
  );
}

// 한 행: 왼쪽(날짜·구분) | 가운데(제목) | 오른쪽(설명).
// wideRight: 가운데가 짧고 설명이 긴 행(학력 등)에서 설명이 줄바꿈되지 않도록 오른쪽 칸을 넓힌다.
export function DocRow({
  left,
  main,
  sub,
  right,
  wideRight = false,
  narrowMain = false,
  rightWidth,
}: {
  left: React.ReactNode;
  main: React.ReactNode;
  sub?: string;
  right?: React.ReactNode;
  wideRight?: boolean;
  // 가운데 칸이 짧을 때(회사명 등) 고정 폭으로 좁혀 오른쪽 칸을 넓힌다.
  narrowMain?: boolean;
  // 오른쪽 칸을 이 고정 폭으로 두고 나머지를 가운데 칸에 준다. 오른쪽 칸이 페이지 오른쪽 끝에 붙는다.
  rightWidth?: string;
}) {
  return (
    <div
      style={rightWidth ? { gridTemplateColumns: `6.75rem 1fr ${rightWidth}` } : undefined}
      className={`grid break-inside-avoid gap-x-4 ${narrowMain ? "grid-cols-[6.75rem_9.5rem_1fr]" : wideRight ? "grid-cols-[6.75rem_2fr_3fr]" : "grid-cols-[6.75rem_1fr_1fr]"}`}
    >
      <div className="tabular-nums text-[#333]">{left}</div>
      <div className={right === undefined ? "col-span-2" : ""}>
        {main}
        {sub && <span className="ml-1.5 text-[6.5pt] tracking-wide text-[#555]">{sub}</span>}
      </div>
      {right !== undefined && <div className="text-[7.5pt] text-[#333]">{right}</div>}
    </div>
  );
}

// 개인정보 블록 + 사이트로 바로 가는 QR(public/qr.svg, 네이버 단축 주소 → profile.website).
export function DocPersonal() {
  // [항목, 항목 영문, 값, 값 영문(흐리고 작게 덧붙임)]
  const rows: [string, string, string, string?][] = [
    ["이름", "NAME", profile.nameKo, profile.nameEn],
    ["연락처", "PHONE", profile.tel],
    ["이메일", "EMAIL", profile.email],
  ];
  return (
    <DocSection title="개인정보" titleEn="PERSONAL DETAIL">
      <div className="flex items-stretch justify-between gap-6">
        <div className="flex-1">
          {rows.map(([ko, en, value, valueEn]) => (
            <div key={en} className="grid grid-cols-[6.75rem_1fr] gap-x-4">
              <div>
                {ko} <span className="text-[6.5pt] tracking-wide text-[#555]">{en}</span>
              </div>
              <div className="break-all">
                {value}
                {valueEn && <span className="ml-1.5 text-[6.5pt] tracking-wide text-[#555]">{valueEn}</span>}
              </div>
            </div>
          ))}
        </div>
        {/* QR이 개인정보 줄 높이를 넘지 않도록 글씨는 아래가 아니라 왼쪽에 둔다. 섹션 높이가 다른 섹션과 같은 규칙을 따른다. */}
        <div className="flex shrink-0 items-end gap-1.5">
          <span className="text-[6pt] tracking-wide text-[#555]">PORTFOLIO</span>
          {/* PDF에서 QR을 누르면 사이트로 바로 이동한다(QR 자체는 네이버 단축 주소를 거친다). */}
          <a href={profile.website} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element -- 인쇄 전용 정적 SVG라 next/image가 필요 없다. */}
            <img src={asset("/qr.svg")} alt="포트폴리오 QR 코드" className="block h-[13mm] w-[13mm]" />
          </a>
        </div>
      </div>
    </DocSection>
  );
}
