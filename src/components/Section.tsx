// 페이지의 큰 섹션(제목 + 본문). Resume와 CV 페이지가 같이 쓴다. first: 페이지 맨 위 섹션이라 위 여백을 줄인다.
export default function Section({
  id,
  title,
  first = false,
  children,
}: {
  id: string;
  title: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${first ? "pt-12" : "mt-16"}`}>
      <h2 className="border-b border-line pb-3 text-[22px] font-bold text-accent">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
