import { useEffect, useState } from "react";

// 정적 빌드라 HTML에는 빌드 시점 값이 들어가고, 브라우저에서 방문 날짜 기준으로 다시 계산한다.
// buildTime은 서버에서 넘겨받아 첫 렌더가 빌드 결과와 일치하도록 한다.
export function useToday(buildTime: number) {
  const [now, setNow] = useState(buildTime);
  useEffect(() => setNow(Date.now()), []);
  return new Date(now);
}
