import { education, experiences, trackLabel } from "@/data/portfolio";
import { countMonths, formatMonths } from "@/lib/career";

// 화면(CareerText)과 PDF 문서가 같은 값을 쓰도록 경력 수치를 한곳에서 계산한다.
export function getCareerStats(today: Date) {
  const periods = experiences.flatMap((e) => e.periods);
  const dev = countMonths(
    periods.filter((p) => p.track === "dev"),
    today,
  );
  const planning = countMonths(
    periods.filter((p) => p.track === "planning"),
    today,
  );
  const withGrad = [...periods, ...education.filter((e) => e.countsAsCareer)];
  return {
    devYears: Math.floor(dev / 12) + 1,
    total: `총 경력 ${formatMonths(countMonths(periods, today))} (대학원 포함 ${formatMonths(countMonths(withGrad, today))})`,
    breakdown: `${trackLabel.dev} ${formatMonths(dev)} · ${trackLabel.planning} ${formatMonths(planning)}`,
  };
}

// About 문단의 {devYears} 자리표시자를 연차로 바꾼다.
export const fillAbout = (text: string, devYears: number) => text.replace("{devYears}", String(devYears));
