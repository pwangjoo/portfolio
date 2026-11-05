// 사이트 전체에서 쓰는 작은 태그. 모양(크기·글씨·여백)은 하나로 두고 색만 variant로 바꾼다.
// 테두리 없는 태그도 투명 테두리를 둬서, 테두리가 있는 태그와 높이가 같다.
//   filled: 회색 바탕(기술·역할·영역), onSurface: 회색 상자 안에서 쓰는 바탕색 버전,
//   outline: 회색 테두리(방법·기획·PM 등), accent: 강조색 테두리(개발 · SCIE 등)
export type TagVariant = "filled" | "onSurface" | "outline" | "accent";

const variants: Record<TagVariant, string> = {
  filled: "border-transparent bg-surface text-muted",
  onSurface: "border-transparent bg-background text-muted",
  outline: "border-line text-muted",
  accent: "border-accent/40 text-accent",
};

export default function Tag({
  variant = "filled",
  className = "",
  children,
}: {
  variant?: TagVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] leading-4 whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
