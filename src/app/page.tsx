import Image from "next/image";
import {
  about,
  education,
  experienceOverview,
  experiences,
  languages,
  news,
  otherExperiences,
  profile,
  projects,
  projectsDuring,
  skillGroups,
  tech,
} from "@/data/portfolio";
import { splitDevRoles } from "@/lib/projectName";
import type { Skill } from "@/data/portfolio";
import CareerText from "@/components/CareerText";
import ProjectList from "@/components/ProjectList";
import PeriodText from "@/components/PeriodText";
import Nav from "@/components/Nav";
import MiscList from "@/components/MiscList";
import Section from "@/components/Section";
import TrackBadge from "@/components/TrackBadge";
import ResumeDoc from "@/components/doc/ResumeDoc";
import { asset } from "@/lib/asset";
import type { Period } from "@/lib/career";

// 정적 빌드 시점. 클라이언트 컴포넌트가 첫 렌더에서 같은 날짜로 계산하도록 넘겨준다.
const buildTime = Date.now();

const sections = [
  { id: "experience", label: "경력" },
  { id: "projects", label: "프로젝트" },
  { id: "skills", label: "기술" },
  { id: "misc", label: "기타" },
  { id: "news", label: "언론 보도" },
];

export default function Home() {
  return (
    <>
      {/* 맨 위로 이동용 앵커. sticky 헤더는 항상 화면 안에 있어 앵커로 쓰면 스크롤되지 않는다. */}
      <div id="top" />
      <Nav
        current="/"
        sections={sections}
        pdf={{ label: "이력서 PDF 다운로드", file: "resume.pdf", name: "박주현_이력서", buildTime }}
      />
      {/* 인쇄(PDF 저장) 때는 웹 화면 대신 문서형 이력서만 출력한다. */}
      <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 print:hidden">
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <Section id="misc" title="기타" titleEn="MISCELLANEOUS">
          <MiscList groups={[{ title: "경험", items: otherExperiences }]} />
        </Section>
        <NewsSection />
        <footer className="mt-16 flex gap-4 border-t border-line pt-6 text-xs text-muted">
          <a href="#top" className="hover:text-accent">
            ↑ To the Top
          </a>
          <a href="#contact" className="hover:text-accent">
            Contact
          </a>
        </footer>
      </main>
      <ResumeDoc buildTime={buildTime} />
    </>
  );
}

function Hero() {
  return (
    <section className="grid gap-10 pt-12 md:grid-cols-[200px_1fr] md:gap-12">
      <div>
        <Image
          src={asset(profile.image)}
          alt={profile.nameKo}
          width={200}
          height={200}
          priority
          className="h-40 w-40 rounded-full md:h-44 md:w-44"
        />
        <h1 className="mt-6 text-[22px] font-bold text-accent">
          {profile.nameKo}
          <span className="ml-2 text-xs font-medium tracking-wide text-muted">{profile.name}</span>
        </h1>
        {/* 최종 학력. 전체 학력은 CV 페이지에 있다. */}
        {/* 좁은 칸에서 중간에 접히지 않도록 "기관 · 전공"을 줄을 나눠 적고, 각 줄은 줄 바꿈하지 않는다.
            칸보다 조금 길어도 오른쪽 본문과의 간격(gap-12) 안에 들어간다. */}
        <p className="mt-1 text-xs leading-5 text-muted">
          {[education[0].shortLabel ?? education[0].label, ...education[0].detail.split(" · ")].map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </p>
        <address
          id="contact"
          className="mt-4 scroll-mt-20 border-l-2 border-foreground pl-3 text-xs not-italic leading-6"
        >
          Tel. <a href={`tel:${profile.tel}`}>{profile.tel}</a>
          <br />
          E.{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
            {profile.email}
          </a>
        </address>
      </div>

      <div className="space-y-8">
        <SubBlock title="소개" titleEn="ABOUT">
          <div className="space-y-3 leading-6">
            {about.map((p) => {
              const [before, after] = p.split("{devYears}");
              return (
                <p key={p}>
                  {after === undefined ? (
                    p
                  ) : (
                    <>
                      {before}
                      <CareerText kind="devYears" buildTime={buildTime} />
                      {after}
                    </>
                  )}
                </p>
              );
            })}
          </div>
        </SubBlock>

        <SubBlock title="경력 요약" titleEn="OVERVIEW">
          <p className="mb-2 text-[11px] text-muted">
            <CareerText kind="total" buildTime={buildTime} /> · <CareerText kind="breakdown" buildTime={buildTime} />
          </p>
          <PeriodList items={experienceOverview} />
        </SubBlock>

        <SubBlock title="어학" titleEn="LANGUAGE">
          <ul className="space-y-1">
            {languages.map((l) => (
              <li key={l.label} className="flex flex-col xs:flex-row xs:flex-wrap xs:justify-between xs:gap-x-4">
                <span>• {l.label}</span>
                <span className="text-xs text-muted">{l.detail}</span>
              </li>
            ))}
          </ul>
        </SubBlock>
      </div>
    </section>
  );
}

function SubBlock({
  title,
  titleEn,
  aside,
  children,
}: {
  title: string;
  titleEn?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-[15px] font-semibold text-accent">
          {title}
          {titleEn && <span className="ml-1.5 text-[10px] font-medium tracking-wide text-muted">{titleEn}</span>}
        </h3>
        {aside}
      </div>
      {children}
    </div>
  );
}

function PeriodList({ items }: { items: { label: string; note?: string; periods: Period[] }[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col xs:flex-row xs:flex-wrap xs:justify-between xs:gap-x-4">
          <span>• {item.label}</span>
          <span className="text-xs tabular-nums text-muted">
            <PeriodText periods={item.periods} note={item.note} buildTime={buildTime} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" title="경력" titleEn="EXPERIENCE">
      <div className="space-y-12">
        {experiences.map((exp) => (
          <article key={exp.company}>
            <div className="flex flex-col gap-0.5 border-b border-line pb-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
              <h3 className="text-base font-semibold">{exp.company}</h3>
              <p className="text-xs text-muted">{exp.contract ? `${exp.role} · ${exp.contract}` : exp.role}</p>
            </div>
            {/* 재직 구간마다 그 기간에 수행한 프로젝트를 적는다. 누르면 Projects의 해당 항목이 열린다.
                전체 기간 합계는 Experience Overview에 있다. */}
            <ul className="mt-4 space-y-5">
              {exp.periods.map((p) => (
                <li key={p.start} className="border-l-2 border-line pl-4">
                  <div className="flex flex-wrap items-center gap-x-2 text-xs tabular-nums text-muted">
                    {p.label && <span className="text-foreground">{p.label}</span>}
                    <PeriodText periods={[p]} buildTime={buildTime} />
                    <TrackBadge track={p.track} />
                  </div>
                  <p className="mt-1 text-xs text-muted">{p.summary ?? exp.summary}</p>
                  <ul className="mt-2 space-y-1">
                    {projectsDuring(exp.company, p).map((project) => (
                      <li key={project.id}>
                        <a
                          href={`#project-${project.id}`}
                          className="group inline-flex items-baseline gap-1.5 text-sm font-medium hover:text-accent"
                        >
                          <span className="text-muted transition-colors group-hover:text-accent">→</span>
                          {splitDevRoles(project.name).title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" title="프로젝트" titleEn="PROJECTS">
      <ProjectList projects={projects} buildTime={buildTime} />
    </Section>
  );
}

function SkillsSection() {
  return (
    <Section id="skills" title="기술" titleEn="SKILLS">
      <div className="divide-y divide-line">
        {skillGroups.map((group) => (
          <div key={group.title} className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[120px_1fr] md:gap-5">
            <h3 className="text-[13px] font-semibold text-muted md:pt-3">{group.title}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.skills.map((skill) => (
                <SkillCard key={skill.tech} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const t: { name: string; icon: string; invertOnDark?: boolean } = tech[skill.tech];
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5">
      <Image
        src={asset(t.icon)}
        alt=""
        width={40}
        height={40}
        className={`h-6 w-6 object-contain ${t.invertOnDark ? "invert-on-dark" : ""}`}
      />
      <span className="min-w-0 flex-1 truncate text-[13px]">{t.name}</span>
      <div className="flex shrink-0 gap-1" role="img" aria-label={`숙련도 ${skill.level} / 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`h-2 w-3 rounded-full ${n <= skill.level ? "bg-accent" : "bg-accent/20"}`} />
        ))}
      </div>
    </div>
  );
}

function NewsSection() {
  return (
    <Section id="news" title="언론 보도" titleEn="NEWS">
      <ul className="space-y-3">
        {news.map((n) => (
          <li key={n.url}>
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-line px-4 py-3 transition-colors hover:border-accent"
            >
              <p className="font-medium">{n.title}</p>
              <p className="mt-1 text-xs text-muted">{n.source}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
