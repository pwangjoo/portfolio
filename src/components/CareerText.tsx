"use client";

import { education, experiences } from "@/data/portfolio";
import { countMonths, formatMonths } from "@/lib/career";
import { useToday } from "@/lib/useToday";

export default function CareerText({ kind, buildTime }: { kind: "devYears" | "total"; buildTime: number }) {
  const today = useToday(buildTime);

  if (kind === "devYears") {
    const devMonths = countMonths(
      experiences.filter((e) => e.developer).flatMap((e) => e.periods),
      today,
    );
    return <>{Math.floor(devMonths / 12) + 1}</>;
  }

  const work = experiences.flatMap((e) => e.periods);
  const withGrad = [...work, ...education.filter((e) => e.countsAsCareer)];
  return (
    <>
      총 경력 {formatMonths(countMonths(work, today))} (대학원 포함 {formatMonths(countMonths(withGrad, today))})
    </>
  );
}
