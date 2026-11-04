import Image from "next/image";
import {
  about,
  education,
  experienceOverview,
  experiences,
  languages,
  news,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio";
import type { Skill } from "@/data/portfolio";
import CareerText from "@/components/CareerText";
import ProjectList from "@/components/ProjectList";
import PeriodText from "@/components/PeriodText";
import ThemeToggle from "@/components/ThemeToggle";
import { asset } from "@/lib/asset";
import type { Period } from "@/lib/career";

// 정적 빌드 시점. 클라이언트 컴포넌트가 첫 렌더에서 같은 날짜로 계산하도록 넘겨준다.
const buildTime = Date.now();

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "news", label: "News" },
];

export default function Home() {
  return (
    <>
      {/* 맨 위로 이동용 앵커. sticky 헤더는 항상 화면 안에 있어 앵커로 쓰면 스크롤되지 않는다. */}
      <div id="top" />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <NewsSection />
        <footer className="mt-24 flex gap-4 border-t border-line pt-6 text-xs text-muted">
          <a href="#top" className="hover:text-accent">
            ↑ To the Top
          </a>
          <a href="#contact" className="hover:text-accent">
            Contact
          </a>
        </footer>
      </main>
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="hidden font-bold text-accent sm:block">
          {profile.nameKo}
        </a>
        <div className="flex w-full items-center gap-4 sm:w-auto sm:gap-6">
          <ul className="flex flex-1 justify-between text-xs text-muted sm:gap-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-foreground">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
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
        <h1 className="mt-6 text-[22px] font-bold text-accent">{profile.name}</h1>
        <address
          id="contact"
          className="mt-4 scroll-mt-20 border-l-2 border-foreground pl-3 text-xs not-italic leading-6"
        >
          {profile.location}
          <br />
          Tel. <a href={`tel:${profile.tel}`}>{profile.tel}</a>
          <br />
          E.{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
            {profile.email}
          </a>
        </address>
      </div>

      <div className="space-y-8">
        <SubBlock title="About Me">
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

        <SubBlock
          title="Experience Overview"
          aside={
            <InfoTip label="총 경력">
              <CareerText kind="total" buildTime={buildTime} />
            </InfoTip>
          }
        >
          <PeriodList items={experienceOverview} />
        </SubBlock>

        <SubBlock title="Education">
          <PeriodList items={education} />
        </SubBlock>

        <SubBlock title="Language">
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

function SubBlock({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-[15px] font-semibold text-accent">{title}</h3>
        {aside}
      </div>
      {children}
    </div>
  );
}

// 작은 ⓘ 아이콘. 마우스를 올리거나 탭(포커스)하면 내용이 말풍선으로 뜬다.
function InfoTip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={label}
        className="flex text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
      >
        {/* 폰트마다 모양이 달라지는 ⓘ 문자 대신 같은 모양의 SVG를 쓴다. */}
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
          <circle cx="8" cy="8" r="6.6" />
          <path d="M8 7.2v4" strokeLinecap="round" />
          <circle cx="8" cy="4.9" r="0.4" fill="currentColor" />
        </svg>
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface px-3 py-1.5 text-xs text-foreground opacity-0 shadow-lg transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {children}
      </span>
    </span>
  );
}

function PeriodList({ items }: { items: (Period & { label: string; note?: string })[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col xs:flex-row xs:flex-wrap xs:justify-between xs:gap-x-4">
          <span>• {item.label}</span>
          <span className="text-xs tabular-nums text-muted">
            <PeriodText period={item} note={item.note} buildTime={buildTime} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-24 scroll-mt-20">
      <h2 className="border-b border-line pb-3 text-[22px] font-bold text-accent">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-12">
        {experiences.map((exp) => (
          <article key={exp.company}>
            <div className="flex flex-col gap-0.5 border-b border-line pb-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
              <h3 className="text-base font-semibold">{exp.company}</h3>
              <p className="text-xs text-muted">
                {exp.role} ·{" "}
                <span className="tabular-nums">
                  <PeriodText period={exp} buildTime={buildTime} />
                </span>
              </p>
            </div>
            <ul className="mt-5 space-y-4">
              {exp.tasks.map((task) => (
                <li key={task.title} className="border-l-2 border-line pl-4">
                  <p className="font-medium">{task.title}</p>
                  {task.detail && <p className="mt-1 text-xs text-muted">{task.detail}</p>}
                  {task.stack && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {task.stack.map((s) => (
                        <span key={s} className="rounded bg-surface px-2 py-0.5 text-[11px] text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
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
    <Section id="projects" title="Projects">
      <ProjectList projects={projects} buildTime={buildTime} />
    </Section>
  );
}

function SkillsSection() {
  return (
    <Section id="skills" title="Skills">
      <div className="divide-y divide-line border-b border-line">
        {skillGroups.map((group) => (
          <div key={group.title} className="grid gap-3 py-5 md:grid-cols-[120px_1fr] md:gap-5">
            <h3 className="text-[13px] font-semibold text-muted md:pt-3">{group.title}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5">
      <Image
        src={asset(skill.icon)}
        alt=""
        width={40}
        height={40}
        className={`h-6 w-6 object-contain ${skill.invertOnDark ? "invert-on-dark" : ""}`}
      />
      <span className="min-w-0 flex-1 truncate text-[13px]">{skill.name}</span>
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
    <Section id="news" title="News">
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
