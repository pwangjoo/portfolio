// "YYYY.MM" 형식의 연월. end가 없으면 현재 진행 중인 기간이다.
export type Period = { start: string; end?: string };

const toMonthIndex = (ym: string) => {
  const [y, m] = ym.split(".").map(Number);
  return y * 12 + (m - 1);
};

export function formatPeriod({ start, end }: Period) {
  return `${start} - ${end ?? "현재"}`;
}

// 기간들이 차지하는 개월 수. 겹치는 달(이직한 달 등)은 한 번만 센다.
// 끝난 기간은 종료 월까지 포함하고, 진행 중인 기간은 다 채운 지난달까지만 센다.
export function countMonths(periods: Period[], today: Date) {
  const lastFullMonth = today.getFullYear() * 12 + today.getMonth() - 1;
  const months = new Set<number>();
  for (const p of periods) {
    const end = Math.min(p.end ? toMonthIndex(p.end) : lastFullMonth, lastFullMonth);
    for (let i = toMonthIndex(p.start); i <= end; i++) months.add(i);
  }
  return months.size;
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
