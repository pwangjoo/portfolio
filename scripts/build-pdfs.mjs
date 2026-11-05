// 빌드된 정적 사이트(out/)를 Chrome으로 인쇄해 이력서·CV PDF를 out/에 만든다.
// 방문자 브라우저의 인쇄 기능에 맡기면 Safari 등에서 QR 링크가 빠지므로, 배포 때 링크가 살아 있는 PDF를 미리 만들어 둔다.
// 사용: npm run build 후 `node scripts/build-pdfs.mjs`. Chrome 경로는 CHROME_PATH로 바꿀 수 있다.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
// [페이지 경로, 만들 PDF 파일명]. 파일명은 PrintButton의 링크와 맞춘다.
const PAGES = [
  ["/", "resume.pdf"],
  ["/cv/", "cv.pdf"],
];

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain",
};

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser",
  ].filter(Boolean);
  for (const c of candidates) {
    if (c.startsWith("/") ? existsSync(c) : spawnSync("which", [c]).status === 0) return c;
  }
  throw new Error("Chrome을 찾지 못했습니다. CHROME_PATH 환경 변수로 경로를 지정해 주세요.");
}

// 배포 때와 같은 basePath 아래로 out/을 서빙한다. 빌드 결과물의 경로가 basePath를 포함하기 때문이다.
function serve() {
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (BASE_PATH && path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length) || "/";
    let file = normalize(join(OUT, path));
    if (!file.startsWith(OUT)) return res.writeHead(403).end();
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
    if (!existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

// Chrome을 비동기로 실행한다. 같은 프로세스의 서버가 Chrome 요청에 응답해야 하므로 spawnSync를 쓰면 안 된다.
function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (d) => (stderr += d));
    const timer = setTimeout(() => child.kill(), 120_000);
    child.on("error", reject);
    child.on("close", (status) => {
      clearTimeout(timer);
      resolve({ status, stderr });
    });
  });
}

const chrome = findChrome();
const server = await serve();
const origin = `http://127.0.0.1:${server.address().port}${BASE_PATH}`;
try {
  for (const [page, file] of PAGES) {
    const target = join(OUT, file);
    const result = await run(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        // CI 컨테이너에서는 샌드박스를 쓸 수 없는 경우가 있다.
        ...(process.env.CI ? ["--no-sandbox"] : []),
        "--no-pdf-header-footer",
        // 웹 폰트가 다 내려받아진 뒤에 인쇄하도록 여유를 준다.
        "--virtual-time-budget=10000",
        `--print-to-pdf=${target}`,
        `${origin}${page}`,
      ],
    );
    if (result.status !== 0 || !existsSync(target)) {
      throw new Error(`${page} PDF 생성 실패\n${result.stderr}`);
    }
    console.log(`${page} → out/${file} (${Math.round(statSync(target).size / 1024)} KB)`);
  }
} finally {
  server.close();
}
