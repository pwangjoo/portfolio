import type { Metadata } from "next";
import { education } from "@/data/portfolio";
import {
  citationSource,
  citationsAsOf,
  me,
  misc,
  publications,
  publicationsOf,
  researchOf,
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
  { id: "education", label: "학력" },
  { id: "projects", label: "연구" },
  { id: "publications", label: "논문" },
  { id: "misc", label: "기타" },
];

export default function CvPage() {
  return (
    <>
      <div id="top" />
      <Nav
        current="/cv/"
        sections={sections}
        pdf={{
          label: "연구 이력 PDF 다운로드",
          file: "cv.pdf",
          downloadName: "박주현_연구이력.pdf",
        }}
      />
      {/* 인쇄(PDF 저장) 때는 웹 화면 대신 문서형 CV만 출력한다. */}
      <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 print:hidden">
        <Section id="education" title="학력" titleEn="EDUCATION" first>
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

        <Section
          id="projects"
          title="연구 프로젝트"
          titleEn="RESEARCH PROJECTS"
          compact
        >
          <div className="space-y-8">
            {researchStages.map(({ stage, label }) => (
              <div key={stage}>
                <h3 className="mb-4 text-[13px] font-semibold text-muted">
                  {label}
                </h3>
                <ul className="space-y-5">
                  {researchProjects
                    .filter((r) => r.stage === stage)
                    .map((r) => (
                      <li
                        key={r.id}
                        id={`research-${r.id}`}
                        className="scroll-mt-20 border-l-2 border-line pl-4"
                      >
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
                        {r.description && (
                          <p className="mt-2 text-[13px] leading-6 text-muted">
                            {r.description}
                          </p>
                        )}
                        {/* 이 연구로 나온 논문. 누르면 Publications의 해당 논문으로 이동한다. */}
                        {publicationsOf(r).length > 0 && (
                          <ul className="mt-2 space-y-0.5">
                            {publicationsOf(r).map((p) => (
                              <li key={p.id}>
                                <a
                                  href={`#pub-${p.id}`}
                                  className="group inline-flex items-baseline gap-1.5 text-xs text-muted hover:text-accent"
                                >
                                  <span className="transition-colors group-hover:text-accent">
                                    →
                                  </span>
                                  <span>
                                    {p.title}{" "}
                                    <span className="opacity-70">
                                      ({p.venue} {p.year})
                                    </span>
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="publications" title="논문" titleEn="PUBLICATIONS" compact>
          <ul className="space-y-4">
            {publications.map((p) => (
              <li
                key={p.id}
                id={`pub-${p.id}`}
                className="scroll-mt-20 rounded-lg border border-line px-4 py-4"
              >
                <p className="text-xs text-muted">
                  <span className="font-semibold text-accent">
                    {p.venue} {p.year}
                  </span>{" "}
                  {p.index && (
                    <>
                      ·{" "}
                      <span className="rounded border border-accent/40 px-1.5 py-px text-[11px] font-semibold text-accent">
                        {p.index}
                      </span>{" "}
                    </>
                  )}
                  · {p.authorship}
                  {/* 이 논문이 나온 연구 프로젝트로 돌아가는 링크. */}
                  {researchOf(p.id).map((r) => (
                    <span key={r.id}>
                      {" · "}
                      <a
                        href={`#research-${r.id}`}
                        className="hover:text-accent hover:underline"
                      >
                        {r.title} 연구
                      </a>
                    </span>
                  ))}
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
            인용 수 기준 - {citationSource} (기준 일자: {citationsAsOf})
          </p>
        </Section>

        <Section id="misc" title="기타" titleEn="MISCELLANEOUS" compact>
          <MiscList groups={misc} />
        </Section>

        <footer className="mt-12 flex gap-4 border-t border-line pt-6 text-xs text-muted">
          <a href="#top" className="hover:text-accent">
            ↑ To the Top
          </a>
        </footer>
      </main>
      <CvDoc buildTime={buildTime} />
    </>
  );
}
