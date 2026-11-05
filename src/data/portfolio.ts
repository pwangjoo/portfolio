// 포트폴리오에 표시되는 모든 콘텐츠. 내용 수정은 이 파일만 고치면 된다.

import { overlaps, type Period } from "@/lib/career";

export const profile = {
  name: "Park JooHyun",
  nameKo: "박주현",
  nameEn: "JOO HYUN PARK",
  birth: "1994.12.05",
  degree: "공학 석사",
  degreeEn: "Master's Degree of Engineering",
  website: "https://pwangjoo.github.io/portfolio/",
  location: "Seoul, South Korea",
  tel: "010-7371-0345",
  email: "pwangjoo@naver.com",
  image: "/profile.png",
};

// {devYears}는 개발 경력으로 계산한 연차로 바뀐다.
export const about = [
  "{devYears}년차 Full-stack 개발자입니다. Computer Vision & Graphics를 전공해 ML 프로젝트 기획자로 커리어를 시작했고, 대규모 프로젝트의 PM 역할을 수행했습니다. 메드고에서는 서버 운영, 주니어 개발자 관리, 시스템 QA, 기술 발표, 플랫폼 개발 총괄을 담당했으며, 관악연구소에서는 백엔드 개발과 DB 관리를 담당했습니다.",
  "대학원에서의 연구 경험을 기반으로 넓고 깊은 지식, 대기업에서의 기획 경험을 기반으로 비즈니스를 이해하는 탄탄한 업무 설계, 스타트업에서의 실무 경험을 기반으로 빠르고 안정적인 개발, 외주 경험을 바탕으로 유연한 소통이 제 주요 장점입니다. 특히 문제의 원인을 데이터와 구조로 정의해 해결하는 문제 해결 능력이 탁월합니다.",
];

// detail: 학과·전공. countsAsCareer: "대학원 포함" 경력에 더해지는 기간.
// cvOnly: 이력서 PDF에서는 빼고 CV에만 보여준다.
export const education: (Period & {
  label: string;
  // 웹 프로필 칸(최종 학력)에만 쓰는 짧은 표기. 없으면 label을 쓴다.
  shortLabel?: string;
  labelEn: string;
  detail: string;
  note?: string;
  countsAsCareer?: boolean;
  cvOnly?: boolean;
})[] = [
  {
    label: "연세대학교 대학원 석사",
    shortLabel: "연세대학교 학·석사",
    labelEn: "YONSEI UNIVERSITY",
    detail: "글로벌융합기술원 · Computer Vision & Graphics Lab (CVML)",
    start: "2017.03",
    end: "2019.02",
    countsAsCareer: true,
  },
  {
    label: "연세대학교 공과대학 학사",
    labelEn: "YONSEI UNIVERSITY",
    detail: "공과대학 · 글로벌융합공학부",
    start: "2014.03",
    end: "2017.02",
    note: "조기 졸업",
  },
  {
    label: "American School of Bombay",
    labelEn: "HIGH SCHOOL",
    detail: "International Baccalaureate · Math / Physics / Chemistry HL",
    start: "2010.03",
    end: "2013.05",
    cvOnly: true,
  },
];

export const languages = [{ label: "영어", detail: "OPIc AL / TOEIC Speaking Lv.7" }];

// 기술 이름을 한곳에서 정의한다. Skills와 Experience·Project의 stack은 이 키로만 참조해 표기가 어긋나지 않게 한다.
// icon이 있는 기술만 Skills 카드로 쓸 수 있다. invertOnDark: 검은색 단색 아이콘은 다크 모드에서 색을 반전한다.
export const tech = {
  react: { name: "React", icon: "/skills/react.svg" },
  reactNative: { name: "React Native (EAS)", icon: "/skills/expo.svg", invertOnDark: true },
  typescript: { name: "TypeScript", icon: "/skills/typescript.svg" },
  javascript: { name: "JavaScript", icon: "/skills/javascript.svg" },
  java: { name: "Java", icon: "/skills/java.svg" },
  html: { name: "HTML" },
  css: { name: "CSS" },
  ejs: { name: "EJS" },
  express: { name: "Express", icon: "/skills/express.png" },
  springBoot: { name: "Spring Boot", icon: "/skills/springboot.png" },
  nestjs: { name: "NestJS", icon: "/skills/nestjs.svg" },
  postgresql: { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
  mysql: { name: "MySQL", icon: "/skills/mysql.svg" },
  redis: { name: "Redis", icon: "/skills/redis.svg" },
  aws: { name: "AWS", icon: "/skills/aws.svg" },
  awsEc2: { name: "AWS EC2" },
  awsEcs: { name: "AWS ECS" },
  github: { name: "GitHub", icon: "/skills/github.svg", invertOnDark: true },
  gitlab: { name: "GitLab", icon: "/skills/gitlab.svg" },
  python: { name: "Python", icon: "/skills/python.png" },
  tensorflow: { name: "TensorFlow", icon: "/skills/tensorflow.svg" },
  pytorch: { name: "PyTorch" },
  opencv: { name: "OpenCV" },
  colab: { name: "Colab", icon: "/skills/colab.png" },
  matlab: { name: "MATLAB", icon: "/skills/matlab.svg" },
  vscode: { name: "Visual Studio Code", icon: "/skills/vscode.svg" },
  notion: { name: "Notion", icon: "/skills/notion.svg" },
  figma: { name: "Figma", icon: "/skills/figma.svg" },
  claudeCode: { name: "Claude Code", icon: "/skills/claude.svg" },
  codex: { name: "OpenAI Codex", icon: "/skills/openai.svg", invertOnDark: true },
} satisfies Record<string, { name: string; icon?: string; invertOnDark?: boolean }>;

export type TechKey = keyof typeof tech;
type IconTechKey = { [K in TechKey]: (typeof tech)[K] extends { icon: string } ? K : never }[TechKey];

// 경력 구분. 바로필 개발을 시작한 devCareerStart 전까지는 기획·PM, 이후는 개발이다.
export type Track = "dev" | "planning";
export const devCareerStart = "2021.08.02";
export const trackLabel: Record<Track, string> = { dev: "개발", planning: "기획·PM" };

// 프로젝트는 연구 성격이 강한 것(ML 학습 등)을 연구개발로 따로 표시한다.
export type ProjectTrack = Track | "rnd";
export const projectTrackLabel: Record<ProjectTrack, string> = { ...trackLabel, rnd: "연구개발" };

// 회사와 재직 구간 모두 최신순(역순)으로 둔다.
// periods: 재직 구간 목록. 퇴사 후 재입사나 인턴→정규직 전환처럼 끊긴 기간은 구간을 나눠 적고,
//   쉬었던 기간은 경력에서 빠진다. label은 선택이다. end를 비워두면 "현재"로 표시되고 오늘까지 경력에 들어간다.
//   track: 구간별 경력 구분. "N년차 개발자"는 dev 구간만으로 계산한다.
//   summary: 구간의 업무가 회사 요약과 다를 때 덮어쓴다.
// summary: 이력서(PDF)에 쓰는 한 줄 업무 요약.
export type ExperiencePeriod = Period & { label?: string; track: Track; summary?: string };

export type Experience = {
  company: string;
  companyEn: string;
  role: string;
  // 고용 형태. 정규직이 아닐 때만 적는다. 예) "프리랜서"
  contract?: string;
  summary: string;
  periods: ExperiencePeriod[];
};

export const experiences: Experience[] = [
  {
    company: "관악연구소",
    companyEn: "GWANAK LAB",
    role: "Backend Engineer",
    contract: "프리랜서",
    summary: "백엔드 개발, 서버 및 데이터베이스 관리 및 프로젝트 의사결정 보조",
    periods: [{ start: "2025.06.01", end: "2026.11.12", track: "dev" }],
  },
  {
    company: "메드고",
    companyEn: "MEDGO",
    role: "CTO",
    summary: "플랫폼 개발 총괄",
    // 입사 직후 넉 달은 바로필 외주 개발을 관리하는 기획·PM 업무였다.
    periods: [
      { start: "2025.01.01", end: "2025.05.31", track: "dev", summary: "관악연구소 SI 수행" },
      { start: "2021.08.02", end: "2024.06.01", track: "dev" },
      { start: "2021.04.01", end: "2021.08.01", track: "planning", summary: "외주 개발 관리" },
    ],
  },
  {
    company: "K Bio Health Care",
    companyEn: "K BIO HEALTH CARE",
    role: "Frontend Developer",
    contract: "프리랜서",
    summary: "웹 퍼블리싱 외주",
    periods: [{ start: "2024.07.05", end: "2024.10.04", track: "dev" }],
  },
  {
    company: "CJ대한통운",
    companyEn: "CJ LOGISTICS",
    role: "정보전략팀 IT기획 정보지능화파트",
    summary: "AI 프로젝트 기획, 프로젝트 리딩 및 매니징",
    periods: [
      { label: "사원", start: "2019.09.23", end: "2021.04.01", track: "planning" },
      { label: "인턴", start: "2019.07.01", end: "2019.09.07", track: "planning", summary: "AI 프로젝트 기획 및 구현" },
    ],
  },
];

// 회사명·기간이 Experience와 어긋나지 않도록 experiences에서 만든다.
// 고용 형태는 기간 옆 괄호에 덧붙인다. 예) "(1Y 5M, 프리랜서)"
export const experienceOverview = experiences.map((exp) => ({
  label: exp.company,
  note: exp.contract,
  periods: exp.periods,
}));

// 문자열은 단일 항목, 객체는 하위 목록이 있는 항목.
export type Bullet = string | { text: string; items: string[] };

export type Project = {
  // 링크 주소(#project-{id})에 쓰는 고유 키.
  id: string;
  name: string;
  // 프로젝트를 수행한 곳. Experience의 company와 같은 이름을 쓰고, 기간이 겹치는 재직 구간 아래에 표시된다.
  companies: string[];
  track: ProjectTrack;
  contribution: string;
  areas: string[];
  start: string;
  end: string;
  stack?: TechKey[];
  intro: Bullet[];
  roles: Bullet[];
  results: Bullet[];
};

// 최신 프로젝트가 위로 오도록 정렬해 둔다.
export const projects: Project[] = [
  {
    id: "glab-stock",
    name: "주식 정보 조회 앱 개발 (Backend, DBA)",
    companies: ["관악연구소"],
    track: "dev",
    contribution: "80%",
    areas: ["개발", "운영"],
    start: "2026.01.05",
    end: "2026.11.12",
    stack: ["typescript", "nestjs", "postgresql", "redis", "awsEcs", "github"],
    intro: [
      "주식 시장에 대한 관심이 커지면서, 관련 정보를 한곳에서 제공하는 앱 (GLAB)의 필요성을 느껴 관악연구소 자체 서비스로 추진",
      "NestJS 기반 서버와 PostgreSQL · Redis 데이터 계층, AWS ECS 인프라를 설계 · 구축하고 운영",
    ],
    roles: [
      "개발 업무 전반의 기술적 의사결정 및 협업 리딩",
      { text: "백엔드 개발", items: ["서버 아키텍처 설계", "API 설계 및 개발", "신규 기능 설계 및 구현"] },
      { text: "데이터베이스 관리", items: ["스키마 설계", "쿼리 최적화"] },
      { text: "서비스 안정화", items: ["기술적 문제 해결", "기능 테스트 및 QA"] },
      { text: "AWS 인프라 및 서버 관리", items: ["AWS 기반 서버 인프라 구성", "서버 운영 및 장애 대응"] },
    ],
    results: [],
  },
  {
    id: "lgcns-cop",
    name: "이미지 생성/편집 AI 플랫폼 개발 (Backend, DBA)",
    companies: ["메드고", "관악연구소"],
    track: "dev",
    contribution: "100%",
    areas: ["개발"],
    start: "2025.01.03",
    end: "2026.01.02",
    stack: ["java", "springBoot", "postgresql", "gitlab"],
    intro: [
      {
        text: "LG CNS 발주 COP (Contents Optimization Platform) SI 프로젝트",
        items: ["생성형 AI로 마케팅 콘텐츠를 만드는 플랫폼", "메드고 재직 중 외주 형태로 참여를 시작해, 관악연구소 합류 후 이어서 수행"],
      },
      "외부 이미지 생성 AI의 긴 응답 시간에도 안정적으로 동작하도록 Queue 기반 비동기 구조로 백엔드를 설계 · 구현",
    ],
    roles: [
      {
        text: "COP 프로젝트 PL",
        items: ["프로젝트 전체 일정 및 진행 관리", "발주처 (LG CNS)와의 요구사항 조율 및 커뮤니케이션", "개발 업무 전반의 기술적 의사결정"],
      },
      { text: "백엔드 개발", items: ["서버 아키텍처 설계", "API 설계 및 개발", "신규 기능 설계 및 구현"] },
      {
        text: "생성형 AI 연동 및 비동기 처리",
        items: [
          "외부 AI API 연동을 통한 이미지 생성 기능 구현",
          "이미지 생성 지연을 고려한 Queue 기반 비동기 처리 구조 설계",
          "요청 적체 및 외부 API 지연 시에도 서비스 응답성이 유지되도록 작업 처리 흐름 분리",
        ],
      },
      {
        text: "데이터베이스 관리",
        items: ["스키마 설계", "쿼리 최적화", "동시 요청 환경에서의 데이터 정합성 확보를 위한 DB Lock 처리"],
      },
      { text: "QA 및 서비스 안정화", items: ["기능 테스트 및 QA 총괄", "기술적 문제 해결"] },
    ],
    results: [],
  },
  {
    id: "kbio",
    name: "K Bio Health Care 개발 외주 (Frontend)",
    companies: ["K Bio Health Care"],
    track: "dev",
    contribution: "100%",
    areas: ["개발"],
    start: "2024.07.05",
    end: "2024.10.04",
    stack: ["html", "css", "ejs"],
    intro: [
      "앱으로만 제공되던 건강 데이터베이스 플랫폼을 웹에서도 쓸 수 있도록 전환 요청",
      "로그인 웹과 클라이언트 (유저) 웹을 EJS · HTML/CSS로 퍼블리싱",
    ],
    roles: [
      { text: "웹사이트 전반의 HTML/CSS 코드 작성", items: ["로그인 웹", "클라이언트 (유저) 웹"] },
      "웹사이트 전반의 UI/UX 조율",
      "샘플 페이지 EJS 퍼블리싱",
    ],
    results: [],
  },
  {
    id: "didimdol",
    name: "창업성장기술개발사업 디딤돌",
    companies: ["메드고"],
    track: "rnd",
    contribution: "100%",
    areas: ["개발", "국가과제"],
    start: "2023.08.01",
    end: "2024.10.31",
    intro: [
      "비대면 탈모 진료에서 의사가 환자의 두피 사진과 진료 요청 메시지를 일일이 확인해 판단해야 하는 부담 해소",
      {
        text: "ML로 환자 데이터를 분석해 의사 웹에 종합 리포트 제공",
        items: ["두피 사진 → 탈모 진행 상태 추출", "진료 요청 메시지 → 환자 감정 분석"],
      },
    ],
    roles: [
      { text: "프로젝트 전반의 기술 관리", items: ["ML 학습", "결과물 제공 API 개발", "리포트 제공을 위한 Full-stack 개발"] },
    ],
    results: [],
  },
  {
    id: "gyeongbuk",
    name: "경상북도 북부권 청년창업지원사업",
    companies: ["메드고"],
    track: "rnd",
    contribution: "100%",
    areas: ["개발", "국가과제"],
    start: "2023.03.21",
    end: "2023.10.06",
    intro: [
      "바로필에 쌓인 데이터가 정리되지 않아 서비스 기능과 ML에 활용하기 어려움",
      "바로필 데이터베이스를 추출 · 정리해 데이터 마켓을 만들고, 이를 활용한 환자 앱 검색 기능 개발",
    ],
    roles: ["바로필 데이터베이스 추출 및 정리", "데이터 마켓 생성"],
    results: [],
  },
  {
    id: "barofil",
    name: "바로필 플랫폼 개발 (Frontend, Backend, DBA)",
    companies: ["메드고"],
    track: "dev",
    contribution: "100%",
    areas: ["개발", "운영"],
    start: "2021.08.02",
    end: "2024.06.01",
    stack: ["reactNative", "react", "ejs", "express", "mysql", "awsEc2", "github"],
    intro: [
      "외주로 출시한 비대면 진료 · 약 배달 플랫폼 (바로필)을 확장하고 안정적으로 운영하기 위해 사내 개발 체제로 전환",
      "홈페이지 · 의사/약사 웹 · iOS/Android 앱 · 서버 전반을 직접 개발 · 운영하고 v2 리뉴얼 주도",
    ],
    roles: [
      {
        text: "플랫폼 전반의 개발 및 유지보수",
        items: ["홈페이지", "의사 웹", "약사 웹", "iOS/Android 앱", "관리형 웹", "외부 API 서버", "로그인 서버", "스케줄러 서버"],
      },
      {
        text: "플랫폼의 리뉴얼 관리",
        items: [
          "홈페이지 v1 → v2",
          "바로필 앱 v1 → v2",
          "관리형 웹 v1 → v2",
          "로그인 서버 분리",
          "의사/약사 웹 v1 → v2 (진행 중 회사 사정으로 중단)",
        ],
      },
      "플랫폼 전반의 UI/UX 조율",
      "플랫폼 전체 출시 일정 관리",
      "주니어 개발자 관리 (업무 배정, 코드 리뷰 등)",
      "AWS 인프라 및 서버 관리",
      "사내 전반의 IT 기술 담당 (사내 메신저, 도메인, 이메일 관리 등)",
    ],
    results: ["200여 개의 세부 프로젝트 진행 및 완료", "최대 12시간 내 모든 버그 대응"],
  },
  {
    id: "barofil-outsourcing",
    name: "바로필 플랫폼 외주 관리",
    companies: ["메드고"],
    track: "planning",
    contribution: "100%",
    areas: ["운영"],
    start: "2021.04.01",
    end: "2021.07.30",
    intro: [
      "비대면 진료 · 약 배달 플랫폼 (바로필)의 최초 개발을 외주로 진행하며, 대표 (CEO)의 요구와 개발사 사이의 조율이 필요",
      "요구사항 정리 · 업무 분배 · 상세 일정 조율로 최초 출시까지 개발 일정 관리",
    ],
    roles: ["외주 상세 일정 조율", "클라이언트 (CEO) 요청 정리 및 외주 업무 분배"],
    results: [],
  },
  {
    id: "cj-accident",
    name: "사고 귀책 판정 자동화",
    companies: ["CJ대한통운"],
    track: "planning",
    contribution: "50%",
    areas: [],
    start: "2020.10.01",
    end: "2021.03.31",
    intro: [
      "택배 사고 판정에 13명의 인력이 투입되어 월 약 33,000건을 수작업으로 분류",
      "Rule-based와 AI-based를 병행한 Hybrid 방식으로 사고 귀책 판정을 자동화하거나 추천하는 시스템 기획",
    ],
    roles: [
      {
        text: "프로젝트 기획",
        items: [
          "현업 (CS팀) 인터뷰 및 사고 판정 업무 프로세스 분석",
          "사고 유형별 발생 현황 분석 및 단계적 자동화 전략 수립",
          "Hybrid 판정 모델 설계 (Rule-based 판정 + Random Forest / LSTM 기반 추천)",
          "분석 · 설계 · 개발 · 테스트 4개월 수행 일정 수립",
        ],
      },
      { text: "프로젝트 PM", items: ["현업 센터 방문 및 대상 업무 분석", "사고 판정 시스템 개선점 설문 및 업무 모니터링"] },
    ],
    results: [],
  },
  {
    id: "cj-unclaimed",
    name: "무적 화물 AI 전산화",
    companies: ["CJ대한통운"],
    track: "planning",
    contribution: "50%",
    areas: [],
    start: "2020.09.01",
    end: "2021.03.31",
    intro: [
      "주소나 운송장을 잃어 수취인을 알 수 없는 무적 화물이 월 11,788건 발생하고, 미결 건의 추정 사고 금액이 월 3억 원 규모",
      "영상 AI (Image Captioning, OCR)로 무적 화물 사진에서 키워드를 추출해 택배 시스템 (Nplus)에 자동 전산화하고 원송장 연결 지원",
    ],
    roles: [
      {
        text: "프로젝트 기획",
        items: [
          "구간별 · 품목별 무적 발생 현황 및 원인 분석",
          "목표 시스템 및 To-Be 업무 프로세스 설계",
          "투자 비용 산정 (14 M/M, 약 1.6억 원)",
          "곤지암 MegaHUB 대상 사전 시행 일정 수립",
        ],
      },
      {
        text: "프로젝트 PM",
        items: [
          "IT기획 측 PM으로 현업 (택배고객만족)과 공동 PM 수행",
          "프로젝트 조직 및 R&R 구성 (프로젝트 실행 / Nplus 인터페이스 / 무적 화물 전산화)",
          "AI 빅데이터 플랫폼 (DigitFarm) 분석 과제 제안 발표 및 수행사 기술 협의",
        ],
      },
    ],
    results: [],
  },
  {
    id: "cj-eta",
    name: "선박 도착시간 예측 (ETA)",
    companies: ["CJ대한통운"],
    track: "planning",
    contribution: "50%",
    areas: [],
    start: "2020.08.10",
    end: "2021.01.13",
    intro: [
      "선사에 의존해 수집하던 ETA가 실시간으로 갱신되지 않아, 포워딩 부문 (해외 물류)의 ETA 정확도 개선 요청 수주",
      "선박 위치 · 날씨 · 선사 정보 크롤링 및 ML 학습 (Random Forest, XGBoost)으로 AI ETA를 예측해 Q`Bridge에 제공",
    ],
    roles: [
      {
        text: "프로젝트 기획",
        items: [
          "클라이언트 (사업 부문) 요구사항 수렴 및 소통",
          "프로젝트 설계 (데이터 수집 → AI 예측 모델 → Q`Bridge 연동)",
          "업체 물색 및 계약",
          "부문 투자 타결",
        ],
      },
      { text: "프로젝트 PM", items: ["프로젝트 일정 관리", "외주사 관리", "C-level 대상 착수 / 중간 / 완료 보고", "사용자 오픈 공지 및 안내"] },
    ],
    results: [
      { text: "가시성 향상으로 현업의 긍정적인 피드백 다수 확보", items: ["업무 시간 단축", "잘못된 일정으로 인한 리스크 감소"] },
      "정정 ETA 기준 98% 정확도로 수렴",
      "Q`Bridge Cargo Tracking Ocean으로 AI ETA 서비스 오픈",
    ],
  },
  {
    id: "cj-ocr",
    name: "송장 및 서류 인식 (OCR)",
    companies: ["CJ대한통운"],
    track: "planning",
    contribution: "50%",
    areas: [],
    start: "2020.07.01",
    end: "2021.03.31",
    intro: [
      "고객에게 받은 항공 · 선박 운송장 (AWB, B/L), 면장, 포장명세서 등 준정형 서류를 수기로 입력하던 업무 자동화",
      "OCR (IQ Bot)과 RPA를 연계해 문서 인식부터 Q`Bridge 입력까지 자동화하고, 인건비 절감 및 정리된 데이터 확보",
    ],
    roles: [
      {
        text: "프로젝트 기획",
        items: [
          "클라이언트 (사업 부문) 요구사항 수렴 및 소통",
          "적용 대상 문서 선정 (문서 종류 · 월 건수 · 소요 시간 조사)",
          "프로젝트 설계",
          "업체 물색 및 계약",
          "부문 투자 타결",
        ],
      },
      {
        text: "프로젝트 PL",
        items: ["일정 관리", "외주사 소통", "현업과 OCR 학습 항목 정의 (6종 문서, 29개 항목)", "C-level 대상 착수 / 중간 / 완료 보고"],
      },
    ],
    results: ["Q`Bridge 문서 판독 시스템 구축 (OCR 결과 → Q`Bridge 입력 RPA 17건 연계)", "OCR 도입을 통한 인건비 절감 및 인력 재배치"],
  },
  {
    id: "cj-tms",
    name: "ML을 활용한 배차 패턴 분석 (TMS)",
    companies: ["CJ대한통운"],
    track: "rnd",
    contribution: "100%",
    areas: ["개발"],
    start: "2019.07.01",
    end: "2019.09.06",
    intro: [
      "JDA TMS 도입 후에도 운송 주문의 약 38%가 수작업 배차로 처리되어 일 1시간가량 배차 지연 발생",
      "배차 패턴을 학습해 수작업 원인을 정량화하고, 지능형 배차 체계 (배차 패턴 DB → 엔진 반영) 구축의 기반 마련",
    ],
    roles: [
      { text: "프로젝트 기획", items: ["AS-IS / TO-BE 분석 및 가설 수립", "지능형 배차 체계 단계별 로드맵 설계"] },
      {
        text: "프로젝트 수행",
        items: [
          "동탄 Logis Park 7개월간 운송 주문 데이터 수집 및 정제 (36개 요소 → 19개 요소 + 배차 라벨)",
          "Weka / Catboost로 5개 모델 비교 학습 후 Catboost 선정",
          "요소별 기여도 분석으로 수작업 원인 정량화",
          "배차 담당자 인터뷰로 분석 결과 검증",
        ],
      },
    ],
    results: [
      "Catboost 모델로 수작업 / 자동 배차 구분 정확도 95.86% 달성",
      "수작업 원인 상위 요소 (차량번호 24.77%, 착지코드 20.56%) 도출 및 담당자 인터뷰와 일치함을 검증",
    ],
  },
];

// 재직 구간에 수행한 프로젝트. 회사가 같고 기간이 겹치는 것만 최신순으로 고른다.
export const projectsDuring = (company: string, period: Period) =>
  projects.filter((p) => p.companies.includes(company) && overlaps(p, period));

export type Skill = { tech: IconTechKey; level: 1 | 2 | 3 | 4 | 5 };

// 역할별로 묶고, 그룹 안에서는 숙련도 높은 순으로 둔다.
// category: 이력서 PDF의 전문기술에서 개발언어 / 개발 스택 / 도구로 나누는 기준.
export type SkillCategory = "language" | "stack" | "tool";

export const skillGroups: { title: string; category: SkillCategory; skills: Skill[] }[] = [
  {
    title: "Language",
    category: "language",
    skills: [
      { tech: "typescript", level: 5 },
      { tech: "javascript", level: 5 },
      { tech: "java", level: 4 },
      { tech: "python", level: 3 },
    ],
  },
  {
    title: "Frontend",
    category: "stack",
    skills: [
      { tech: "react", level: 4 },
      { tech: "reactNative", level: 4 },
    ],
  },
  {
    title: "Backend",
    category: "stack",
    skills: [
      { tech: "express", level: 5 },
      { tech: "springBoot", level: 4 },
      { tech: "nestjs", level: 4 },
    ],
  },
  {
    title: "Database",
    category: "stack",
    skills: [
      { tech: "postgresql", level: 4 },
      { tech: "mysql", level: 4 },
      { tech: "redis", level: 2 },
    ],
  },
  {
    title: "Cloud · DevOps",
    category: "stack",
    skills: [
      { tech: "aws", level: 4 },
      { tech: "github", level: 4 },
      { tech: "gitlab", level: 4 },
    ],
  },
  {
    title: "AI · ML",
    category: "stack",
    skills: [
      { tech: "tensorflow", level: 3 },
      { tech: "colab", level: 3 },
      { tech: "matlab", level: 2 },
    ],
  },
  {
    title: "Tools",
    category: "tool",
    skills: [
      { tech: "notion", level: 5 },
      { tech: "figma", level: 4 },
      { tech: "claudeCode", level: 4 },
      { tech: "codex", level: 4 },
    ],
  },
];

// 기술 목록에 넣기 어려운 실무 경험. Skills 섹션 아래와 이력서의 전문기술에 표시된다.
export const otherExperiences = ["하드웨어 코딩 경험", "빅데이터 코딩 경험", "소프트웨어 플랫폼 개발 경험", "서버 운영 경험"];

// 최신 기사가 위로 오도록 둔다.
export const news = [
  {
    title: "기업 영업 찍어주고, ELS 위험 골라내고… 금융 AI의 진화",
    source: "동아일보",
    url: "https://www.donga.com/news/Economy/article/all/20260922/134714219/2",
  },
  {
    title: "CJ대한통운, 화물선 도착시간 예측 시스템 개발",
    source: "한국해운신문",
    url: "http://www.maritimepress.co.kr/news/articleView.html?idxno=303491",
  },
  {
    title: "CJ대한통운 RPA가 뭐길래…단순 반복 업무 2년치가 사라졌다",
    source: "CJ대한통운 뉴스룸",
    url: "https://www.cjlogistics.com/ko/newsroom/news/NR_00000835",
  },
];
