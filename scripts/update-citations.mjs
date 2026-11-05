// Google Scholar 인용 수를 SerpAPI로 가져와 src/data/citations.json을 갱신한다.
// GitHub Actions의 주기 실행에서 쓴다. SERPAPI_KEY가 없거나 조회에 실패하면 기존 값을 그대로 두고 정상 종료해,
// 사이트 배포가 막히지 않게 한다.
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const AUTHOR_ID = "7KcG2ioAAAAJ";
const FILE = new URL("../src/data/citations.json", import.meta.url);

// 사이트의 논문 id → Scholar 논문 제목의 앞부분(소문자, 영문·숫자만 비교).
// 앞부분으로 비교해 학위논문("Hierarchical semantic aware ...")이 저널 논문과 섞이지 않게 한다.
const TITLE_PREFIX = {
  "semantic-style-transfer": "semantic aware neural style transfer",
  "realistic-fast-style-transfer": "realistic fast neural style transfer",
  "weakly-supervised-localization": "improved techniques for weakly supervised object localization",
  "low-shot-face-generation": "face generation for low shot learning",
};

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const today = () => {
  const d = new Date(Date.now() + 9 * 60 * 60 * 1000); // KST
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${String(d.getUTCDate()).padStart(2, "0")}`;
};

// Scholar 논문 목록을 기존 데이터에 반영한다. 찾지 못한 논문은 이전 값을 유지한다.
// 같은 논문이 여러 번 잡히면(arXiv 판 등) 가장 큰 값을 쓴다.
export function applyArticles(prev, articles, asOf) {
  const counts = { ...prev.counts };
  const missing = [];
  for (const [id, prefix] of Object.entries(TITLE_PREFIX)) {
    const hits = articles.filter((a) => normalize(a.title ?? "").startsWith(prefix));
    if (hits.length === 0) {
      missing.push(id);
      continue;
    }
    counts[id] = Math.max(...hits.map((a) => Number(a.cited_by?.value) || 0));
  }
  const next = { source: "Google Scholar", asOf, counts };
  // 날짜만 바뀐 경우는 커밋하지 않도록 수치·출처가 바뀌었는지 따로 알려준다.
  const changed = prev.source !== next.source || JSON.stringify(prev.counts) !== JSON.stringify(next.counts);
  return { next, changed, missing };
}

async function main() {
  const prev = JSON.parse(readFileSync(FILE, "utf8"));
  const key = process.env.SERPAPI_KEY;
  if (!key) {
    console.log("SERPAPI_KEY가 없어 인용 수 갱신을 건너뜁니다.");
    return;
  }

  let articles;
  try {
    const url = `https://serpapi.com/search.json?engine=google_scholar_author&author_id=${AUTHOR_ID}&num=100&api_key=${key}`;
    const res = await fetch(url);
    const body = await res.json();
    if (!res.ok || body.error) throw new Error(body.error ?? `HTTP ${res.status}`);
    articles = body.articles ?? [];
  } catch (err) {
    console.log(`인용 수 조회 실패, 기존 값을 유지합니다: ${err.message}`);
    return;
  }

  const { next, changed, missing } = applyArticles(prev, articles, today());
  if (missing.length) console.log(`Scholar에서 찾지 못한 논문(이전 값 유지): ${missing.join(", ")}`);
  writeFileSync(FILE, JSON.stringify(next, null, 2) + "\n");
  console.log(`인용 수 갱신: ${JSON.stringify(next.counts)}${changed ? "" : " (변경 없음)"}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
