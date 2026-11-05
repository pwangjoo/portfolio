"use client";

import { useEffect, useState } from "react";
import type { Bullet, Project } from "@/data/portfolio";
import PeriodText from "@/components/PeriodText";
import TechTags from "@/components/TechTags";
import TrackBadge from "@/components/TrackBadge";
import { splitDevRoles } from "@/lib/projectName";

// 개발 / 연구개발 / 기획·PM은 구분(track)으로 거른다.
const filters = [
  { label: "전체", match: () => true },
  { label: "개발", match: (p: Project) => p.track === "dev" },
  { label: "연구개발", match: (p: Project) => p.track === "rnd" },
  { label: "기획·PM", match: (p: Project) => p.track === "planning" },
];

export default function ProjectList({ projects, buildTime }: { projects: Project[]; buildTime: number }) {
  const [active, setActive] = useState(0);
  const visible = projects.filter(filters[active].match);
  // Experience 등에서 #project-{id} 링크로 들어오면 그 항목을 펼치고 그 위치로 스크롤한다.
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const pick = (hash: string) => {
      if (hash.startsWith("#project-")) setTarget(hash.slice(1));
    };
    // 주소에 해시를 달고 처음 들어온 경우. 렌더 직후 상태를 바꾸지 않도록 다음 프레임으로 미룬다.
    const frame = requestAnimationFrame(() => pick(window.location.hash));
    // 같은 링크를 다시 눌러도 해시가 바뀌지 않으니 hashchange 대신 클릭을 듣는다.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#project-"]');
      if (link) pick(link.getAttribute("href")!);
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!target) return;
    const item = document.getElementById(target);
    if (!item) {
      // 지금 필터에 가려져 있으면 전체로 풀고, 다시 렌더된 뒤 이 효과가 다시 돈다.
      if (projects.some((p) => `project-${p.id}` === target)) setActive(0);
      else setTarget(null);
      return;
    }
    const details = item.querySelector("details");
    if (details) details.open = true;
    item.scrollIntoView({ behavior: "smooth", block: "start" });
    setTarget(null);
  }, [target, active, projects]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((f, i) => (
          <button
            key={f.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              active === i
                ? "border-accent bg-accent text-background"
                : "border-line text-muted hover:border-accent hover:text-foreground"
            }`}
          >
            {f.label} <span className="tabular-nums opacity-70">{projects.filter(f.match).length}</span>
          </button>
        ))}
      </div>
      <p className="mb-3 text-xs text-muted">항목을 누르면 상세 내용을 볼 수 있습니다.</p>
      <ul className="divide-y divide-line border-t border-line">
        {visible.map((p) => {
          // "(Backend)" 같은 역할 표기는 이름에서 떼어 태그로 보여준다.
          const { title, roles } = splitDevRoles(p.name);
          return (
            <li key={p.id} id={`project-${p.id}`} className="scroll-mt-20">
              {/* 같은 name을 가진 details는 하나만 열린다. */}
              <details name="project" className="project-details group">
                <summary className="grid cursor-pointer list-none gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 [&::-webkit-details-marker]:hidden">
                  <div>
                    <p className="font-medium">
                      <span className="mr-2 inline-block text-muted transition-transform group-open:rotate-90">▸</span>
                      {title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-5">
                      <TrackBadge track={p.track} />
                      {roles.map((r) => (
                        <span key={r} className="rounded bg-surface px-2 py-0.5 text-[11px] text-muted">
                          {r}
                        </span>
                      ))}
                      {/* 개발 계열 배지와 겹치는 "개발" 영역 태그는 숨긴다. */}
                      {p.areas
                        .filter((a) => !(a === "개발" && p.track !== "planning"))
                        .map((a) => (
                          <span key={a} className="rounded bg-surface px-2 py-0.5 text-[11px] text-muted">
                            {a}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pl-5 text-xs tabular-nums text-muted sm:flex-col sm:items-end sm:gap-1 sm:pl-0">
                    <span>
                      <PeriodText periods={[p]} buildTime={buildTime} />
                    </span>
                    <span>{p.companies.join(" · ")}</span>
                    <span>기여도 {p.contribution}</span>
                  </div>
                </summary>
                <div className="mb-5 ml-5 space-y-5 rounded-lg bg-surface px-5 py-4 text-[13px] leading-6">
                  {p.stack && (
                    <div>
                      <h4 className="mb-1.5 font-semibold text-accent">사용 기술</h4>
                      <TechTags keys={p.stack} onSurface />
                    </div>
                  )}
                  <DetailBlock title="프로젝트 소개" bullets={p.intro} />
                  <DetailBlock title="역할" bullets={p.roles} />
                  <DetailBlock title="성과" bullets={p.results} />
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function DetailBlock({ title, bullets }: { title: string; bullets: Bullet[] }) {
  if (bullets.length === 0) return null;
  return (
    <div>
      <h4 className="mb-1.5 font-semibold text-accent">{title}</h4>
      <ul className="list-disc space-y-1 pl-5">
        {bullets.map((b) =>
          typeof b === "string" ? (
            <li key={b}>{b}</li>
          ) : (
            <li key={b.text}>
              {b.text}
              <ul className="mt-1 list-[circle] space-y-0.5 pl-5 text-muted">
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
