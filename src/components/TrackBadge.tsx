import { projectTrackLabel, type ProjectTrack } from "@/data/portfolio";

// 경력 구분(개발 / 연구개발 / 기획·PM) 배지. 개발만 강조색, 나머지는 회색 테두리로 둔다.
export default function TrackBadge({ track }: { track: ProjectTrack }) {
  return (
    <span
      className={`inline-block rounded border px-1.5 text-[10px] leading-4 ${
        track === "dev" ? "border-accent/40 text-accent" : "border-line text-muted"
      }`}
    >
      {projectTrackLabel[track]}
    </span>
  );
}
