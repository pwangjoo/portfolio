// 포트폴리오에 표시되는 모든 콘텐츠. 내용 수정은 이 파일만 고치면 된다.

import type { Period } from "@/lib/career";

export const profile = {
  name: "Park JooHyun",
  nameKo: "박주현",
  location: "Seoul, South Korea",
  tel: "010-7371-0345",
  email: "pwangjoo@naver.com",
  image: "/profile.png",
};

// {devYears}는 개발 경력으로 계산한 연차로 바뀐다.
export const about = [
  "{devYears}년차 Full-Stack 개발자입니다. Computer Vision & Graphics를 전공해 ML 프로젝트 기획자로 커리어를 시작했고, 대규모 프로젝트의 PM 역할을 수행했습니다. 메드고에서는 서버 운영, 주니어 개발자 관리, 시스템 QA, 기술 발표, 플랫폼 총괄 개발을 담당했으며, 현재 관악연구소에서 백엔드 개발과 DB 관리를 맡고 있습니다.",
  "대학원에서의 연구 경험을 기반으로 넓고 깊은 지식, 대기업에서의 기획 경험을 기반으로 탄탄한 업무 설계, 스타트업에서의 실무 경험을 기반으로 빠르고 안정적인 개발, 외주 경험을 바탕으로 유연한 소통이 제 주요 장점입니다.",
];

// countsAsCareer: "대학원 포함" 경력에 더해지는 기간.
export const education: (Period & { label: string; note?: string; countsAsCareer?: boolean })[] = [
  { label: "연세대학교 공과대학 석사", start: "2017.03", end: "2019.02", countsAsCareer: true },
  { label: "연세대학교 공과대학 학사", start: "2014.03", end: "2017.02", note: "조기 졸업" },
];

export const languages = [{ label: "영어", detail: "OPIc AL / TOEIC Speaking Lv.7" }];

// end를 비워두면 "현재"로 표시되고 오늘까지 경력에 들어간다.
// developer: 연차("N년차 개발자") 계산에 포함할지 여부.
export type Experience = Period & {
  company: string;
  role: string;
  developer: boolean;
  // stack은 태그로, detail은 설명 텍스트로 표시된다.
  tasks: { title: string; stack?: string[]; detail?: string }[];
};

export const experiences: Experience[] = [
  {
    company: "관악연구소",
    role: "Backend Engineer",
    start: "2025.06",
    developer: true,
    tasks: [
      {
        title: "이미지 생성/편집 AI 플랫폼 (LG CNS COP) 개발 PL",
        stack: ["Spring Boot", "PostgreSQL", "GitLab"],
      },
      { title: "주식 정보 조회 앱 (GLAB) 백엔드 개발", stack: ["NestJS", "AWS ECS", "PostgreSQL", "Redis", "GitHub"] },
    ],
  },
  {
    company: "메드고",
    role: "CTO",
    start: "2021.04",
    end: "2025.05",
    developer: true,
    tasks: [
      { title: "전체 개발 총괄 / 플랫폼 개발 / 시스템 QA", stack: ["React Native", "Node.js", "GitHub"] },
      { title: "서버 운영", stack: ["AWS EC2", "MySQL"] },
    ],
  },
  {
    company: "CJ대한통운",
    role: "정보전략팀 사원",
    start: "2019.07",
    end: "2021.04",
    developer: false,
    tasks: [
      { title: "AI 프로젝트 기획 및 구현", detail: "ML을 활용한 배차 패턴 분석" },
      { title: "AI 프로젝트 기획 및 PM", detail: "송장 및 서류 인식 (OCR), 선박 도착시간 예측 (ETA)" },
    ],
  },
];

// 회사명·기간이 Experience와 어긋나지 않도록 experiences에서 만든다.
export const experienceOverview = experiences.map((exp) => ({
  label: exp.company,
  start: exp.start,
  end: exp.end,
}));

// 문자열은 단일 항목, 객체는 하위 목록이 있는 항목.
export type Bullet = string | { text: string; items: string[] };

export type Project = {
  name: string;
  contribution: string;
  areas: string[];
  start: string;
  end: string;
  intro: Bullet[];
  roles: Bullet[];
  results: Bullet[];
};

// 최신 프로젝트가 위로 오도록 정렬해 둔다.
export const projects: Project[] = [
  {
    name: "주식 정보 조회 앱 개발 (Back-end)",
    contribution: "80%",
    areas: ["개발", "운영"],
    start: "2026.01",
    end: "2026.11",
    intro: ["관악연구소의 주식 정보 조회 앱 (GLAB) 개발"],
    roles: [
      "개발 업무 전반의 기술적 의사결정 및 협업 리딩",
      { text: "백엔드 개발", items: ["서버 아키텍처 설계", "API 설계 및 개발", "신규 기능 설계 및 구현"] },
      { text: "데이터베이스 관리", items: ["스키마 설계", "쿼리 최적화"] },
      { text: "서비스 안정화", items: ["기술적 문제 해결", "기능 테스트 및 QA"] },
      { text: "AWS Cloud 관리 및 서버 관리", items: ["AWS 기반 서버 인프라 구성", "서버 운영 및 장애 대응"] },
    ],
    results: [],
  },
  {
    name: "이미지 생성/편집 AI 플랫폼 개발 (Back-end)",
    contribution: "100%",
    areas: ["개발"],
    start: "2025.01",
    end: "2026.01",
    intro: [
      "플랫폼 개발 및 SI 프로젝트 수행",
      { text: "LG CNS 발주 COP (Contents Optimization Platform)", items: ["생성형 AI 기반 마케팅 콘텐츠 생성 플랫폼"] },
      "메드고 재직 중 외주 형태로 참여를 시작해, 관악연구소 합류 후 이어서 수행",
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
          "이미지 생성 latency를 고려한 Queue 기반 비동기 처리 구조 설계",
          "요청 적체 및 외부 API 지연 시에도 서비스 응답성이 유지되도록 작업 처리 흐름 분리",
        ],
      },
      {
        text: "데이터베이스 관리",
        items: ["스키마 설계", "쿼리 최적화", "동시 요청 환경에서의 데이터 정합성 확보를 위한 DB Lock 처리"],
      },
      { text: "QA 및 서비스 안정화", items: ["기능 테스트 및 QA 총괄", "기술적 문제 해결"] },
    ],
    results: [
      "LG CNS 발주 COP SI 프로젝트 PL로서 납품 완료",
      "Queue 기반 비동기 처리로 외부 AI API의 긴 응답 시간에도 안정적인 이미지 생성 서비스 제공",
      "DB Lock 적용으로 동시 요청 시 발생할 수 있는 데이터 충돌 및 중복 처리 방지",
    ],
  },
  {
    name: "K Bio Health Care 개발 외주 (Front-end)",
    contribution: "100%",
    areas: ["개발"],
    start: "2024.07",
    end: "2024.09",
    intro: ["건강 데이터베이스 플랫폼의 앱 → 웹 전환"],
    roles: [
      { text: "웹사이트 전반의 HTML/CSS 코드 작성", items: ["로그인 웹", "클라이언트 (유저) 웹"] },
      "웹사이트 전반의 UI/UX 조율",
      "이메일 템플릿 작성",
      "샘플 페이지 AWS 퍼블리싱",
    ],
    results: [],
  },
  {
    name: "창업성장기술개발사업 디딤돌",
    contribution: "100%",
    areas: ["AI 프로젝트", "개발", "국가과제"],
    start: "2023.08",
    end: "2024.10",
    intro: ["탈모 환자의 두피 사진으로 탈모 진행 상태 추출", "환자의 진료 요청 메시지 감정 분석", "의사 웹에 종합 리포트 제공"],
    roles: [
      "프로젝트 전반의 기술 관리",
      { text: "프로젝트 전반의 개발", items: ["ML 학습", "결과물 API 작성", "리포트 제공을 위한 Full-stack 개발"] },
      "프로젝트 전반의 UI/UX 조율",
    ],
    results: ["바로필 의사 UX 보강", "관리자의 환자 응대 편리성 증대"],
  },
  {
    name: "경상북도 북부권 청년창업지원사업",
    contribution: "100%",
    areas: ["개발", "국가과제"],
    start: "2023.03",
    end: "2023.10",
    intro: ["바로필 데이터베이스 → 데이터 마켓 추출"],
    roles: ["바로필 데이터베이스 추출 및 정리", "데이터 마켓 생성", "앱 내 검색 기능 (Full-stack) 개발"],
    results: ["환자 앱 내 데이터 검색 편의성 증대", "향후 ML 활용을 위한 데이터베이스 생성"],
  },
  {
    name: "바로필 플랫폼 개발 (Full-stack)",
    contribution: "100%",
    areas: ["개발", "운영"],
    start: "2021.08",
    end: "2024.11",
    intro: ["메드고의 원격진료/약배달 플랫폼의 개발 및 유지보수"],
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
      "AWS Cloud 관리 및 서버 관리",
      "사내 전반의 IT 기술 담당 (사내 메신저, 도메인, 이메일 관리 등)",
    ],
    results: ["200여 개의 세부 프로젝트 진행 및 완료", "최대 12시간 내 모든 버그 대응"],
  },
  {
    name: "바로필 플랫폼 외주 관리",
    contribution: "100%",
    areas: ["운영"],
    start: "2021.04",
    end: "2021.07",
    intro: ["비대면 진료 / 약배달 플랫폼 최초 개발 일정 관리"],
    roles: ["외주 상세 일정 조율", "클라이언트 (CEO) 요청 정렬 및 외주 업무 분배"],
    results: ["바로필 최초 출시까지 개발사와의 원활한 소통 주도"],
  },
  {
    name: "선박 도착시간 예측 (ETA)",
    contribution: "50%",
    areas: ["AI 프로젝트"],
    start: "2020.08",
    end: "2020.12",
    intro: [
      "선박의 도착 예정 시간의 집계가 무분별해 포워딩 부문 (해외 물류)의 데이터 가시성 향상에 대한 요청 수주",
      "스크래핑 및 AI 학습을 통한 물류 도착 시간 정리 및 예측 시간 제공",
    ],
    roles: [
      {
        text: "프로젝트 기획",
        items: ["클라이언트 (사업 부문) needs 수용 및 소통", "프로젝트 설계", "업체 물색 및 계약", "부문 투자 타결"],
      },
      { text: "프로젝트 PM", items: ["프로젝트 일정 관리", "외주사 관리", "(C-level) 시작 / 중간 / 완료 보고"] },
    ],
    results: [
      { text: "성공적인 가시성 향상으로, 현업의 긍정적인 의견 다수 수취", items: ["업무 시간 단축", "잘못된 일정으로 인한 리스크 감소"] },
      "정정 ETA에 대한 98%의 정확도 수렴",
    ],
  },
  {
    name: "송장 및 서류 인식 (OCR)",
    contribution: "50%",
    areas: ["AI 프로젝트"],
    start: "2020.08",
    end: "2020.11",
    intro: [
      "무질서하게 프린트된 항공 및 선박 운송장 (B/L) 자동 입력",
      "수기로 입력하던 서류를 자동 입력해 인건비 절감 및 정리된 데이터 확보",
    ],
    roles: [
      {
        text: "프로젝트 기획",
        items: ["클라이언트 (사업 부문) needs 수용 및 소통", "프로젝트 설계", "업체 물색 및 계약", "부문 투자 타결"],
      },
      {
        text: "프로젝트 서브 PM (PM의 퇴사로 이후 메인 PM으로 인계받음)",
        items: ["일정 관리", "외주사 소통", "(C-level) 시작 / 중간 / 완료 보고"],
      },
    ],
    results: ["OCR 도입을 통한 인건비 절감 및 인력 재배치"],
  },
  {
    name: "ML을 활용한 배차 패턴 분석",
    contribution: "100%",
    areas: ["AI 프로젝트", "개발"],
    start: "2019.07",
    end: "2019.09",
    intro: [
      "Rule-based 자동 배차에 의존하던 기존 방식으로 인해 다수의 수작업 발생",
      "배차 패턴을 파악해 이에 준하는 자동 배차를 위한 기획 및 설계 진행",
    ],
    roles: [
      { text: "프로젝트 기획", items: ["needs 수용 및 설계", "프로젝트 설계"] },
      { text: "프로젝트 수행", items: ["ML을 이용한 배차 패턴 학습", "프로젝트 가능성 검증"] },
    ],
    results: ["프로젝트 가능성 검증"],
  },
];

// invertOnDark: 검은색 단색 아이콘은 다크 모드에서 색을 반전해 보이게 한다.
export type Skill = { name: string; icon: string; level: 1 | 2 | 3 | 4 | 5; invertOnDark?: boolean };

// 역할별로 묶고, 그룹 안에서는 숙련도 높은 순으로 둔다.
export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "/skills/react-native.svg", level: 4 },
      { name: "React Native (EAS)", icon: "/skills/react-native.svg", level: 4 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Express", icon: "/skills/express.png", level: 5 },
      { name: "Spring Boot", icon: "/skills/springboot.png", level: 4 },
      { name: "NestJS", icon: "/skills/nestjs.svg", level: 4 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: "/skills/postgresql.png", level: 4 },
      { name: "MySQL", icon: "/skills/mysql.png", level: 4 },
      { name: "Redis", icon: "/skills/redis.svg", level: 2 },
    ],
  },
  {
    title: "Cloud · DevOps",
    skills: [
      { name: "AWS", icon: "/skills/aws.svg", level: 4 },
      { name: "GitHub", icon: "/skills/github.svg", level: 4, invertOnDark: true },
    ],
  },
  {
    title: "AI · ML",
    skills: [
      { name: "Python", icon: "/skills/python.png", level: 3 },
      { name: "TensorFlow", icon: "/skills/tensorflow.svg", level: 3 },
      { name: "Colab", icon: "/skills/colab.png", level: 3 },
      { name: "MATLAB", icon: "/skills/matlab.png", level: 2 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Visual Studio Code", icon: "/skills/vscode.png", level: 5 },
      { name: "Notion", icon: "/skills/notion.png", level: 5 },
      { name: "Figma", icon: "/skills/figma.svg", level: 4 },
    ],
  },
];

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
