// "Miscellaneous" 섹션 본문. 묶음 제목 옆에 항목을 태그로 나열하고, 묶음 사이는 구분선 없이 간격으로만 나눈다. Resume와 CV 페이지가 같이 쓴다.
export default function MiscList({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className="space-y-3">
      {groups.map((g) => (
        <div key={g.title} className="grid gap-2 sm:grid-cols-[80px_1fr] sm:gap-5">
          <h3 className="text-[13px] font-semibold text-muted sm:pt-0.5">{g.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <span key={item} className="rounded bg-surface px-2 py-0.5 text-xs text-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
