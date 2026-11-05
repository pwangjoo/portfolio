import { projectTrackLabel, type ProjectTrack } from "@/data/portfolio";
import Tag from "@/components/Tag";

// 경력 구분(개발 / 연구개발 / 기획·PM) 배지. 개발만 강조색, 나머지는 회색 테두리로 둔다.
export default function TrackBadge({ track }: { track: ProjectTrack }) {
  return <Tag variant={track === "dev" ? "accent" : "outline"}>{projectTrackLabel[track]}</Tag>;
}
