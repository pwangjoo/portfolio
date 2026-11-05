// "YYYY.MM.DD" 또는 "YYYY.MM" 형식의 날짜. end가 없으면 현재 진행 중인 기간이다.
// 일을 생략하면 시작은 그 달 1일, 종료는 그 달 말일로 본다.
export type Period = { start: string; end?: string };

const DAY_MS = 24 * 60 * 60 * 1000;
// 그레고리력 평균 한 달 길이(365.2425 / 12).
const DAYS_PER_MONTH = 30.436875;

const toDayIndex = (date: string, edge: "start" | "end") => {
  const [y, m, d] = date.split(".").map(Number);
  if (d) return Date.UTC(y, m - 1, d) / DAY_MS;
  return (edge === "start" ? Date.UTC(y, m - 1, 1) : Date.UTC(y, m, 0)) / DAY_MS;
};

export function formatPeriod({ start, end }: Period) {
  return `${start} - ${end ?? "현재"}`;
}

// 여러 구간을 묶은 전체 범위(가장 이른 시작 ~ 가장 늦은 끝). 진행 중인 구간이 있으면 끝은 "현재"다.
export function spanOf(periods: Period[]): Period {
  const start = periods.reduce((a, b) => (toDayIndex(b.start, "start") < toDayIndex(a.start, "start") ? b : a)).start;
  if (periods.some((p) => !p.end)) return { start };
  const end = periods.reduce((a, b) => (toDayIndex(b.end!, "end") > toDayIndex(a.end!, "end") ? b : a)).end;
  return { start, end };
}

// 기간들이 차지하는 일수. 시작일과 종료일을 모두 포함하고, 겹치는 날(이직한 달 등)은 한 번만 센다.
// 진행 중이거나 종료일이 미래인 기간은 오늘까지만 센다.
function countDays(periods: Period[], today: Date) {
  const todayIndex = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / DAY_MS;
  const ranges = periods
    .map((p) => [toDayIndex(p.start, "start"), Math.min(p.end ? toDayIndex(p.end, "end") : todayIndex, todayIndex)])
    .filter(([s, e]) => s <= e)
    .sort((a, b) => a[0] - b[0]);

  let total = 0;
  let [curStart, curEnd] = [Infinity, -Infinity];
  for (const [s, e] of ranges) {
    if (s > curEnd + 1) {
      if (curEnd >= curStart) total += curEnd - curStart + 1;
      [curStart, curEnd] = [s, e];
    } else {
      curEnd = Math.max(curEnd, e);
    }
  }
  if (curEnd >= curStart) total += curEnd - curStart + 1;
  return total;
}

// 일수를 평균 한 달 길이로 나눠 반올림한 개월 수.
export function countMonths(periods: Period[], today: Date) {
  return Math.round(countDays(periods, today) / DAYS_PER_MONTH);
}

export function formatMonths(total: number) {
  const years = Math.floor(total / 12);
  const months = total % 12;
  if (years === 0) return `${months}개월`;
  return months === 0 ? `${years}년` : `${years}년 ${months}개월`;
}

// 기간 옆에 붙는 짧은 표기. 예) 16 → "1Y 4M"
export function formatShortMonths(total: number) {
  const years = Math.floor(total / 12);
  const months = total % 12;
  if (years === 0) return `${months}M`;
  return months === 0 ? `${years}Y` : `${years}Y ${months}M`;
}
