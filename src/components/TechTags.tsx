import { tech, type TechKey } from "@/data/portfolio";

// 기술 키 목록을 이름 태그로 보여준다. Experience와 Projects에서 같은 모양으로 쓴다.
// onSurface: 회색 상자 안에 놓일 때 태그 배경이 묻히지 않도록 바탕색을 쓴다.
export default function TechTags({
  keys,
  onSurface = false,
  className = "",
}: {
  keys: TechKey[];
  onSurface?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {keys.map((k) => (
        <span key={k} className={`rounded px-2 py-0.5 text-[11px] text-muted ${onSurface ? "bg-background" : "bg-surface"}`}>
          {tech[k].name}
        </span>
      ))}
    </div>
  );
}
