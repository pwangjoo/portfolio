"use client";

import { education, experiences } from "@/data/portfolio";
import { countMonths, formatMonths } from "@/lib/career";
import { useToday } from "@/lib/useToday";

export default function CareerText({ kind, buildTime }: { kind: "devYears" | "total"; buildTime: number }) {
  const today = useToday(buildTime);

  if (kind === "devYears") {
    const devMonths = countMonths(
      experiences.filter((e) => e.developer),
      today,
    );
    return <>{Math.floor(devMonths / 12) + 1}</>;
  }

  const work = countMonths(experiences, today);
  const withGrad = countMonths([...experiences, ...education.filter((e) => e.countsAsCareer)], today);
  return (
    <>
      총 경력 {formatMonths(work)} (대학원 포함 {formatMonths(withGrad)})
    </>
  );
}
