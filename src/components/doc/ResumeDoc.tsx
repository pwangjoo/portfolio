import {
  education,
  experiences,
  languages,
  otherExperiences,
  projects,
  projectTrackLabel,
  skillGroups,
  tech,
  trackLabel,
  type ProjectTrack,
  type Track,
} from "@/data/portfolio";
import { getCareerStats } from "@/lib/careerStats";
import { splitDevRoles } from "@/lib/projectName";
import type { TechKey } from "@/data/portfolio";
import {
  DocFooter,
  DocGroupLabel,
  DocHeader,
  DocLabel,
  DocPage,
  DocPersonal,
  DocRow,
  DocSection,
  formatDocPeriod,
} from "@/components/doc/Doc";

const versionControl: TechKey[] = ["github", "gitlab"];
const tracks: Track[] = ["dev", "planning"];
const projectTracks: ProjectTrack[] = ["dev", "rnd", "planning"];

// 이름 끝 괄호의 약어는 문서에서 영문으로 풀어 쓴다.
const abbreviations: Record<string, string> = {
  TMS: "Transportation Management System",
  OCR: "Optical Character Recognition",
  ETA: "Estimated Time of Arrival",
};

// "주식 정보 조회 앱 개발 (Backend, DBA)" → 이름과 "BACKEND / DBA"로 나누고,
// "선박 도착시간 예측 (ETA)" → 이름과 "ESTIMATED TIME OF ARRIVAL"로 나눠, 괄호 내용은 작고 흐린 영문으로 붙인다.
const splitRole = (name: string) => {
  const { title, roles } = splitDevRoles(name);
  if (roles.length) return { title, role: roles.join(" / ").toUpperCase() };
  const m = name.match(/^(.*?)\s*\(([^)]+)\)$/);
  if (m && abbreviations[m[2]]) return { title: m[1], role: abbreviations[m[2]].toUpperCase() };
  return { title: name, role: undefined };
};

// 이력서(Resume) PDF 레이아웃. 연구 이력은 CV(CvDoc)로 분리해 경력·프로젝트 중심으로 둔다.
// 언론 보도와 자기소개는 웹에만 두고 문서에는 넣지 않는다.
export default function ResumeDoc({ buildTime }: { buildTime: number }) {
  const stats = getCareerStats(new Date(buildTime));
  // 재직 구간마다 한 행씩, 최신 구간이 위로 오게 한다.
  const careerRows = experiences
    .flatMap((exp) => exp.periods.map((p) => ({ exp, p })))
    .sort((a, b) => b.p.start.localeCompare(a.p.start));

  return (
    <DocPage>
      <DocHeader title="이력서" titleEn="RESUME" buildTime={buildTime} />
      <DocPersonal />

      <DocSection title="학력" titleEn="EDUCATION">
        {education
          .filter((e) => !e.cvOnly)
          .map((e) => (
          <DocRow key={e.label} left={formatDocPeriod(e)} main={e.label} right={e.note ? `${e.detail} (${e.note})` : e.detail} wideRight />
        ))}
      </DocSection>

      <DocSection title="경력" titleEn="CAREER">
        <p className="mb-1 text-[7.5pt] text-[#555]">
          {stats.total} · {stats.breakdown}
        </p>
        {tracks.map((track) => (
          <div key={track}>
            <DocGroupLabel>{trackLabel[track]}</DocGroupLabel>
            {careerRows
              .filter(({ p }) => p.track === track)
              .map(({ exp, p }) => (
                <DocRow
                  key={p.start}
                  left={formatDocPeriod(p)}
                  main={exp.company}
                  // 영문명이 회사명과 같으면(예: K Bio Health Care) 두 번 쓰지 않는다.
                  sub={exp.companyEn.toUpperCase() === exp.company.toUpperCase() ? undefined : exp.companyEn}
                  // 직함(부서)은 항상 적고, 구간 라벨(인턴·사원 등)과 고용 형태는 뒤에 붙인다.
                  right={`${[exp.role, p.label].filter(Boolean).join(" ")}${exp.contract ? ` (${exp.contract})` : ""} - ${p.summary ?? exp.summary}`}
                  narrowMain
                />
              ))}
          </div>
        ))}
      </DocSection>

      <DocSection title="전문기술" titleEn="PROFESSIONAL SKILLS">
        {/* 첨부받은 이력서처럼 언어 / 개발언어 / 개발 스택 / 도구로 나누고, 스택은 분야별로 한 줄씩 적는다. */}
        {languages.map((l) => (
          <DocRow key={l.label} left={<DocLabel ko="언어" en="LANGUAGE" />} main={l.detail} />
        ))}
        {(
          [
            ["language", "개발언어", "CODING"],
            ["stack", "개발 스택", "STACK"],
            ["tool", "도구", "TOOL"],
          ] as const
        ).map(([category, ko, en]) => (
          <div key={category} className="mt-1">
            {skillGroups
              .filter((g) => g.category === category)
              .map((g, i) => {
                const names = g.skills.map((s) => tech[s.tech].name).join(" · ");
                return (
                  <DocRow
                    key={g.title}
                    left={i === 0 ? <DocLabel ko={ko} en={en} /> : null}
                    main={names}
                    // 개발 스택은 분야명(FRONTEND 등)을 기술 이름 뒤에 작은 영문으로 붙여, 다른 줄과 시작 위치를 맞춘다.
                    sub={category === "stack" ? g.title.toUpperCase() : undefined}
                  />
                );
              })}
          </div>
        ))}
      </DocSection>

      <DocSection title="프로젝트" titleEn="PROJECTS">
        {projectTracks.map((track) => (
          <div key={track}>
            <DocGroupLabel>{projectTrackLabel[track]}</DocGroupLabel>
            {projects
              .filter((p) => p.track === track)
              .map((p) => {
                // 버전 관리 도구는 전문기술에 이미 있으니, 한 줄에 들어가도록 프로젝트 기술 목록에서는 뺀다.
                const stack = p.stack?.filter((k) => !versionControl.includes(k));
                const { title, role } = splitRole(p.name);
                return (
                  <DocRow
                    key={p.name}
                    left={formatDocPeriod(p)}
                    main={title}
                    sub={role}
                    // 개발 프로젝트만 오른쪽에 기술 목록을 둔다. 연구개발·기획·PM은 오른쪽 칸 없이 이름이 한 줄을 다 쓴다.
                    right={track === "dev" && stack ? stack.map((k) => tech[k].name).join(" · ") : undefined}
                    // 기술 목록 칸은 가장 긴 줄에 맞춘 폭으로 오른쪽 끝에 두고, 남는 폭을 프로젝트명에 준다.
                    rightWidth="70mm"
                  />
                );
              })}
          </div>
        ))}
      </DocSection>

      <DocFooter lines={[otherExperiences]} />
    </DocPage>
  );
}
