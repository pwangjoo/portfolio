"use client";

import { countMonths, formatPeriod, formatShortMonths, type Period } from "@/lib/career";
import { useToday } from "@/lib/useToday";

// "2025.06 - 현재 (1Y 5M)" 형태로 기간과 개월 수를 함께 표시한다. note는 괄호 안에 덧붙는다.
export default function PeriodText({ period, note, buildTime }: { period: Period; note?: string; buildTime: number }) {
  const today = useToday(buildTime);
  const duration = formatShortMonths(countMonths([period], today));
  return (
    <>
      {formatPeriod(period)} <span className="opacity-70">({note ? `${duration}, ${note}` : duration})</span>
    </>
  );
}
