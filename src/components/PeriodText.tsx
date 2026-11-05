"use client";

import { countMonths, formatPeriod, formatShortMonths, spanOf, type Period } from "@/lib/career";
import { useToday } from "@/lib/useToday";

// "2025.06 - 현재 (1Y 5M)" 형태로 기간과 개월 수를 함께 표시한다. note는 괄호 안에 덧붙는다.
// 구간이 여러 개면 전체 범위를 보여주고, 개월 수는 쉬었던 기간을 뺀 실제 기간만 센다.
export default function PeriodText({
  periods,
  note,
  buildTime,
}: {
  periods: Period[];
  note?: string;
  buildTime: number;
}) {
  const today = useToday(buildTime);
  const duration = formatShortMonths(countMonths(periods, today));
  return (
    <>
      {formatPeriod(spanOf(periods))} <span className="opacity-70">({note ? `${duration}, ${note}` : duration})</span>
    </>
  );
}
