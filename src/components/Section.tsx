// 페이지의 큰 섹션(제목 + 본문). Resume와 CV 페이지가 같이 쓴다. first: 페이지 맨 위 섹션이라 위 여백을 줄인다.
// compact: 내용이 가벼운 페이지(CV)에서 섹션 사이 간격을 줄인다.
export default function Section({
  id,
  title,
  titleEn,
  first = false,
  compact = false,
  children,
}: {
  id: string;
  title: string;
  // 한글 제목 옆에 작게 붙는 영문. PDF의 "경력 CAREER" 표기와 맞춘다.
  titleEn?: string;
  first?: boolean;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${first ? "pt-12" : compact ? "mt-12" : "mt-16"}`}>
      <h2 className="border-b border-line pb-3 text-[22px] font-bold text-accent">
        {title}
        {titleEn && <span className="ml-2 text-xs font-medium tracking-wide text-muted">{titleEn}</span>}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
