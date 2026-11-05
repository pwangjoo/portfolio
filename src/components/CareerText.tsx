"use client";

import { getCareerStats } from "@/lib/careerStats";
import { useToday } from "@/lib/useToday";

export default function CareerText({
  kind,
  buildTime,
}: {
  kind: "devYears" | "total" | "breakdown";
  buildTime: number;
}) {
  const stats = getCareerStats(useToday(buildTime));
  return <>{stats[kind]}</>;
}
