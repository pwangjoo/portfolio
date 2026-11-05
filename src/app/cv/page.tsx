import type { Metadata } from "next";
import { education } from "@/data/portfolio";
import {
  citationSource,
  citationsAsOf,
  me,
  misc,
  publications,
  researchProjects,
  researchStages,
} from "@/data/research";
import Nav from "@/components/Nav";
import PeriodText from "@/components/PeriodText";
import MiscList from "@/components/MiscList";
import Section from "@/components/Section";
import TechTags from "@/components/TechTags";
import CvDoc from "@/components/doc/CvDoc";

export const metadata: Metadata = {
  title: "박주현 Curriculum Vitae",
  description: "박주현의 학력, 연구 프로젝트와 논문",
};

// 정적 빌드 시점. 클라이언트 컴포넌트가 첫 렌더에서 같은 날짜로 계산하도록 넘겨준다.
const buildTime = Date.now();

const sections = [
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "misc", label: "Misc" },
];

export default function CvPage() {
  return (
    <>
      <div id="top" />
      <Nav current="/cv/" sections={sections} printLabel="CV PDF로 저장" />
      {/* 인쇄(PDF 저장) 때는 웹 화면 대신 문서형 CV만 출력한다. */}
      <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 print:hidden">
        <Section id="education" title="Education" first>
          <ul className="space-y-4">
            {education.map((e) => (
              <li
                key={e.label}
                className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4"
              >
                <div>
                  <p className="font-medium">{e.label}</p>
                  <p className="text-xs text-muted">{e.detail}</p>
                </div>
                <p className="shrink-0 text-xs tabular-nums text-muted">
                  <PeriodText
                    periods={[e]}
                    note={e.note}
                    buildTime={buildTime}
                  />
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="projects" title="Research Projects">
          <div className="space-y-10">
            {researchStages.map(({ stage, label }) => (
              <div key={stage}>
                <h3 className="mb-4 text-[13px] font-semibold text-muted">
                  {label}
                </h3>
                <ul className="space-y-5">
                  {researchProjects
                    .filter((r) => r.stage === stage)
                    .map((r) => (
                      <li key={r.title} className="border-l-2 border-line pl-4">
                        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <p className="font-medium">
                            {r.title}{" "}
                            <span className="ml-1 text-xs font-normal text-muted">
                              {r.titleEn}
                            </span>
                          </p>
                          <p className="shrink-0 text-xs tabular-nums text-muted">
                            <PeriodText periods={[r]} buildTime={buildTime} />
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <TechTags keys={r.stack} />
                          {r.methods?.map((m) => (
                            <span
                              key={m}
                              className="rounded border border-line px-2 py-0.5 text-[11px] text-muted"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="publications" title="Publications">
          <ul className="space-y-4">
            {publications.map((p) => (
              <li
                key={p.title}
                className="rounded-lg border border-line px-4 py-4"
              >
                <p className="text-xs text-muted">
                  <span className="font-semibold text-accent">
                    {p.venue} {p.year}
                  </span>{" "}
                  · {p.authorship}
                </p>
                <p className="mt-1.5 font-medium leading-6">{p.title}</p>
                <p className="mt-1 text-xs text-muted">
                  {p.authors.map((a, i) => (
                    <span key={a}>
                      {i > 0 && ", "}
                      <span
                        className={
                          a === me
                            ? "font-semibold text-foreground underline underline-offset-2"
                            : ""
                        }
                      >
                        {a}
                      </span>
                    </span>
                  ))}
                </p>
                {p.note && <p className="mt-1 text-xs text-muted">{p.note}</p>}
                {(!!p.citations || p.doi || p.arxiv) && (
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    {!!p.citations && (
                      <span className="rounded bg-surface px-2 py-0.5 text-muted">
                        인용{" "}
                        <span className="font-semibold text-foreground">
                          {p.citations}
                        </span>
                      </span>
                    )}
                    {p.doi && (
                      <a
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        DOI ↗
                      </a>
                    )}
                    {p.arxiv && (
                      <a
                        href={`https://arxiv.org/abs/${p.arxiv}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        arXiv ↗
                      </a>
                    )}
                  </p>
                )}
                <p className="mt-3 text-[13px] leading-6">{p.summary}</p>
                <details className="project-details group mt-2">
                  <summary className="cursor-pointer list-none text-xs text-accent [&::-webkit-details-marker]:hidden">
                    <span className="mr-1 inline-block transition-transform group-open:rotate-90">
                      ▸
                    </span>
                    초록 보기
                  </summary>
                  <div className="mt-2 space-y-2 rounded-md bg-surface px-4 py-3 text-xs leading-5 text-muted">
                    {p.abstract.en && <p>{p.abstract.en}</p>}
                    {p.abstract.ko && <p>{p.abstract.ko}</p>}
                  </div>
                </details>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-muted">
            인용 수는 {citationSource} 기준이며 {citationsAsOf}에 조회했습니다.
            검색 서비스마다 집계 방식이 달라 수치가 다를 수 있습니다.
          </p>
        </Section>

        <Section id="misc" title="Miscellaneous">
          <MiscList groups={misc} />
        </Section>

        <footer className="mt-16 flex gap-4 border-t border-line pt-6 text-xs text-muted">
          <a href="#top" className="hover:text-accent">
            ↑ To the Top
          </a>
        </footer>
      </main>
      <CvDoc buildTime={buildTime} />
    </>
  );
}
