"use client";

import { useState } from "react";
import type { Bullet, Project } from "@/data/portfolio";
import PeriodText from "@/components/PeriodText";

// 태그가 여러 개인 프로젝트는 해당하는 필터 모두에 노출된다.
const filters = [
  { label: "전체", match: () => true },
  { label: "개발/운영", match: (p: Project) => p.areas.includes("개발") || p.areas.includes("운영") },
  { label: "AI 프로젝트", match: (p: Project) => p.areas.includes("AI 프로젝트") },
];

export default function ProjectList({ projects, buildTime }: { projects: Project[]; buildTime: number }) {
  const [active, setActive] = useState(0);
  const visible = projects.filter(filters[active].match);

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
      <ul className="divide-y divide-line border-y border-line">
        {visible.map((p) => (
          <li key={p.name}>
            {/* 같은 name을 가진 details는 하나만 열린다. */}
            <details name="project" className="project-details group">
              <summary className="grid cursor-pointer list-none gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 [&::-webkit-details-marker]:hidden">
                <div>
                  <p className="font-medium">
                    <span className="mr-2 inline-block text-muted transition-transform group-open:rotate-90">▸</span>
                    {p.name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-5">
                    {p.areas.map((a) => (
                      <span key={a} className="rounded bg-surface px-2 py-0.5 text-[11px] text-muted">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pl-5 text-xs tabular-nums text-muted sm:flex-col sm:items-end sm:gap-1 sm:pl-0">
                  <span>
                    <PeriodText period={p} buildTime={buildTime} />
                  </span>
                  <span>기여도 {p.contribution}</span>
                </div>
              </summary>
              <div className="mb-5 ml-5 space-y-5 rounded-lg bg-surface px-5 py-4 text-[13px] leading-6">
                <DetailBlock title="프로젝트 소개" bullets={p.intro} />
                <DetailBlock title="역할" bullets={p.roles} />
                <DetailBlock title="성과" bullets={p.results} />
              </div>
            </details>
          </li>
        ))}
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
