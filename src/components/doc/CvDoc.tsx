import { education, tech } from "@/data/portfolio";
import { citationSource, citationsAsOf, me, misc, publications, researchProjects, researchStages } from "@/data/research";
import { DocFooter, DocGroupLabel, DocHeader, DocPage, DocPersonal, DocRow, DocSection, formatDocPeriod } from "@/components/doc/Doc";

// 연구 이력(CV) PDF 레이아웃. 학력·연구 프로젝트·논문을 중심으로 둔다.
export default function CvDoc({ buildTime }: { buildTime: number }) {
  return (
    <DocPage>
      <DocHeader title="이력" titleEn="CURRICULUM VITAE" buildTime={buildTime} />
      <DocPersonal />

      <DocSection title="학력" titleEn="EDUCATION">
        {education.map((e) => (
          <DocRow key={e.label} left={formatDocPeriod(e)} main={e.label} right={e.note ? `${e.detail} (${e.note})` : e.detail} wideRight />
        ))}
      </DocSection>

      <DocSection title="연구 분야 및 프로젝트" titleEn="RESEARCH AREA & PROJECTS">
        {researchStages.map(({ stage, label }) => (
          <div key={stage}>
            <DocGroupLabel>{label}</DocGroupLabel>
            {researchProjects
              .filter((r) => r.stage === stage)
              .map((r) => (
                <DocRow
                  key={r.title}
                  left={formatDocPeriod(r)}
                  main={r.title}
                  sub={r.titleEn.toUpperCase()}
                  right={[...r.stack.map((k) => tech[k].name), ...(r.methods ?? [])].join(" / ")}
                />
              ))}
          </div>
        ))}
      </DocSection>

      <DocSection title="논문" titleEn="PUBLICATIONS">
        <div className="space-y-2.5">
          {publications.map((p) => (
            <div key={p.title} className="grid break-inside-avoid grid-cols-[6.75rem_1fr] gap-x-4">
              <div className="text-[7.5pt] leading-snug">
                <p>
                  {p.venue} {p.year}
                </p>
                <p>{p.authorship}</p>
                {!!p.citations && <p>인용 {p.citations}회</p>}
                <p className="text-[#555]">
                  {p.authors.map((a, i) => (
                    <span key={a}>
                      {i > 0 && ", "}
                      <span className={`whitespace-nowrap ${a === me ? "text-[#111] underline" : ""}`}>{a}</span>
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="font-semibold">{p.title}</p>
                {p.note && <p className="text-[7pt] text-[#555]">{p.note}</p>}
                <p>{p.summary}</p>
                <p className="text-[7.5pt] text-[#555]">{p.summaryEn}</p>
                {p.doi && <p className="text-[7pt] text-[#555]">DOI {p.doi}</p>}
                {p.arxiv && <p className="text-[7pt] text-[#555]">arXiv:{p.arxiv}</p>}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[6.5pt] text-[#555]">
          인용 수: {citationSource} 기준 ({citationsAsOf} 조회)
        </p>
      </DocSection>

      <DocFooter lines={misc.map((m) => m.items)} />
    </DocPage>
  );
}
