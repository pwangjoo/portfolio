# 박주현 포트폴리오

Notion 포트폴리오를 옮긴 Next.js 정적 사이트입니다.

## 개발

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ 에 정적 HTML 생성
```

## 콘텐츠 수정

모든 내용은 `src/data/portfolio.ts` 한 파일에 있습니다. 이미지는 `public/` 아래에 있습니다.

## 배포

`output: "export"` 설정으로 `out/` 디렉터리를 그대로 정적 호스팅(Vercel, GitHub Pages, S3 등)에 올리면 됩니다.
