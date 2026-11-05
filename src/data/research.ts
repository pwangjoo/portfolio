// 학부·대학원 연구 이력. /research 페이지와 CV(PDF)에 쓰인다.

import type { Period } from "@/lib/career";
import type { TechKey } from "@/data/portfolio";
import citationData from "@/data/citations.json";

// stage: 대학원(실질적인 전공 연구) / 학부. 화면과 CV에서 이 단위로 묶는다.
// stack: 사용 기술(portfolio.ts의 tech 키), methods: 사용한 모델·기법.
export type ResearchStage = "graduate" | "undergraduate";
export const researchStages: { stage: ResearchStage; label: string }[] = [
  { stage: "graduate", label: "대학원 · Computer Vision & Graphics Lab (CVML)" },
  { stage: "undergraduate", label: "학부" },
];

export type ResearchProject = Period & {
  stage: ResearchStage;
  title: string;
  titleEn: string;
  stack: TechKey[];
  methods?: string[];
};

// 최신 연구가 위로 오도록 둔다.
export const researchProjects: ResearchProject[] = [
  {
    stage: "graduate",
    title: "스타일 전이",
    titleEn: "Style Transfer",
    start: "2017.03",
    end: "2018.12",
    stack: ["python", "pytorch", "tensorflow"],
    methods: ["GAN"],
  },
  {
    stage: "graduate",
    title: "로우샷 러닝",
    titleEn: "Low-shot Learning",
    start: "2017.03",
    end: "2017.07",
    stack: ["python", "tensorflow"],
    methods: ["GAN", "CNN"],
  },
  {
    stage: "undergraduate",
    title: "파장을 통한 3D 캡처",
    titleEn: "3D Capture with Wavelength",
    start: "2016.09",
    end: "2017.02",
    stack: ["matlab"],
  },
  {
    stage: "undergraduate",
    title: "무화면 3D 디스플레이",
    titleEn: "Glassless 3D Display",
    start: "2016.03",
    end: "2016.08",
    stack: ["matlab"],
  },
  {
    stage: "undergraduate",
    title: "안면 인식",
    titleEn: "Face Recognition",
    start: "2015.12",
    end: "2016.02",
    stack: ["matlab", "opencv"],
  },
  {
    stage: "undergraduate",
    title: "자율주행 자동차",
    titleEn: "Autonomous Vehicle",
    start: "2014.12",
    end: "2015.02",
    stack: ["matlab"],
  },
];

// id: 인용 수(citations.json)를 찾는 키. authors에서 본인 이름(me)은 강조해 표시한다.
// abstract는 있는 언어만 적는다.
export type Publication = {
  id: string;
  venue: string;
  year: number;
  authorship: string;
  authors: string[];
  title: string;
  note?: string;
  doi?: string;
  arxiv?: string;
  summary: string;
  summaryEn: string;
  abstract: { ko?: string; en?: string };
};

// 인용 수는 GitHub Actions가 매주 Google Scholar에서 갱신한다(scripts/update-citations.mjs).
// 값이 없거나 0인 논문은 인용 수를 표시하지 않는다.
const counts: Record<string, number | undefined> = citationData.counts;
export const citationSource = citationData.source;
export const citationsAsOf = citationData.asOf;

export const me = "J Park";

const publicationList: Publication[] = [
  {
    id: "semantic-style-transfer",
    venue: "Image and Vision Computing",
    year: 2019,
    authorship: "1저자",
    authors: ["J Park", "S Park", "H Shim"],
    title: "Semantic-aware Neural Style Transfer",
    note: "석사 학위논문 「Hierarchical Semantic Aware Neural Style Transfer」의 저널 게재본 (Vol. 87, pp. 13–23)",
    doi: "10.1016/j.imavis.2019.04.001",
    summary:
      "단어 임베딩으로 사진과 그림의 영역을 의미적으로 대응시키고, 도메인 적응으로 그림의 의미 영역을 추출해 기존 스타일 전이의 의미 불일치 문제 해결",
    summaryEn:
      "Proposed a semantic-aware style transfer that matches regions by word embeddings and applies domain adaptation to paintings, resolving the semantic mismatch of existing methods.",
    abstract: {
      en: "This study proposes a semantic-aware style transfer method for resolving semantic mismatch problems in existing algorithms. As the primary focus of this study, the consideration of semantic matching is expected to improve the quality of artistic style transfer. Here, each image is partitioned into several semantic regions for both a target photograph and a source painting. All partitioned regions of the target are then associated with one of the partitioned regions in the source according to their semantic interpretation. Given a pair of target and source regions, style is learned from the source region whereas content is learned from the target region. By integrating both the style and content components, we can successfully generate a stylized output. Unlike previous approaches, we obtain the best semantic match between regions using word embeddings. Thus, we guarantee that semantic matching is always established between the target and source. Moreover, it is unreliable to partition a painting using existing algorithms because of statistical gaps between the real photographs and paintings. To bridge such gaps, we apply a domain adaptation technique on the source painting to extract its semantic regions. We evaluated the effectiveness of the proposed algorithm based on a thorough experimental analysis and comparison. Through a user study, it is confirmed that semantic information considerably influences the quality assessment of style transfer.",
      ko: "스타일 전이는 영상 처리의 주된 분야로써, 기존의 영상을 다른 영상의 스타일과 유사하도록 수정하는 일을 말한다. 최근 딥 러닝의 발전과 함께 Gatys et al.은 CNN을 이용한 스타일 전이를 공개했다. 이로 인한 결과는 뛰어났지만, 여전히 추가로 수정을 필요로 하는 부분이 많았다. 그중, 이 학위 논문에서는 의미적 부조화에 대한 부분을 다룬다. 이 학위 논문에서는 스타일을 추출할 source 영상을 현실적으로 수정하고, 주어진 영상들로부터 의미적 정보를 추출한다. 이후, 추출된 의미적 정보를 대응시켜 의미상으로 합당한 스타일 전이를 가능케 한다. 이 학위 논문의 의의는 GAN을 이용해 source 영상으로부터 더 나은 의미적 정보를 추출하고, 계층적 단어 임베딩을 이용해 의미적 정보를 대응시켰으며, 최종 스타일 전이 결과의 질을 향상시키는 데에 있다.",
    },
  },
  {
    id: "realistic-fast-style-transfer",
    venue: "IPIU",
    year: 2018,
    authorship: "1저자",
    authors: ["J Park", "H Shim"],
    title: "Realistic Fast Neural Style Transfer using Generative Adversarial Network Discriminator Loss",
    summary: "느리고 왜곡이 생기는 기존 스타일 전이의 한계를, 미리 학습한 GAN을 활용해 빠르고 현실적인 스타일 전이로 개선",
    summaryEn: "Allowed neural style transfer to work both realistic and fast with occupation of GAN discriminator loss.",
    abstract: {
      ko: "스타일 전이에 대한 관심은 Gatys et al.이 처음 Convolutional Neural Network를 이용해 스타일을 이전하는 방법을 제안한 이후 급격하게 증가하고 있다. 이에 추가적으로 더 빠르게 만들거나, 더 면밀하게 스타일을 이전하고자 하는 연구하는 사례 또한 늘고 있다. 하지만, 현실적인 결과물을 뽑고자 하는 연구는 많지 않다. 이 논문에서는 Generative Adversarial Network의 판별기를 이용한 현실적인 스타일 이전법을 제안하고자 한다. 이 논문은 판별기가 실제 이미지와 스타일 전이를 통해 생성된 이미지를 구분하는 능력을 가지고 있음을 보이고, 이를 이전의 스타일 전이 네트워크와 접목하여 새로운 현실적 스타일 전이가 가능함을 주장한다.",
    },
  },
  {
    id: "weakly-supervised-localization",
    venue: "arXiv",
    year: 2018,
    authorship: "2저자",
    authors: ["J Choe", "J Park", "H Shim"],
    title: "Improved Techniques for Weakly-Supervised Object Localization",
    note: "프리프린트 (BMVC 2018 투고)",
    arxiv: "1802.07888",
    summary:
      "약지도 객체 위치 추정에서 객체의 덜 두드러지는 부분까지 학습하도록 데이터 증강과 CNN 학습 기법을 개선해, 기존 최고 성능 대비 Top-1 위치 정확도 21.4–37.3% 향상",
    summaryEn:
      "Improved weakly-supervised object localization with data augmentation and refined CNN training, raising Top-1 localization accuracy by 21.4–37.3% over the state of the art.",
    abstract: {
      en: "We propose an improved technique for weakly-supervised object localization. Conventional methods have a limitation that they focus only on most discriminative parts of the target objects. The recent study addressed this issue and resolved this limitation by augmenting the training data for less discriminative parts. To this end, we employ an effective data augmentation for improving the accuracy of the object localization. In addition, we introduce improved learning techniques by optimizing Convolutional Neural Networks (CNN) based on the state-of-the-art model. Based on extensive experiments, we evaluate the effectiveness of the proposed approach both qualitatively and quantitatively. Especially, we observe that our method improves the Top-1 localization accuracy by 21.4 - 37.3% depending on configurations, compared to the current state-of-the-art technique of the weakly-supervised object localization.",
    },
  },
  {
    id: "low-shot-face-generation",
    venue: "ICCVW",
    year: 2017,
    authorship: "공동 1저자",
    authors: ["J Choe", "S Park", "K Kim", "J Park", "D Kim", "H Shim"],
    title: "Face Generation for Low-Shot Learning Using Generative Adversarial Networks",
    doi: "10.1109/ICCVW.2017.229",
    summary: "적은 양의 데이터로 학습하는 로우샷 러닝에서, GAN으로 데이터셋을 확장해 안정적인 안면 인식 학습 구현",
    summaryEn:
      "To boost the small dataset given with low-shot learning task, we exploit GAN to generate more images from original dataset.",
    abstract: {
      en: "Recently, low-shot learning has been proposed for handling the lack of training data in machine learning. Despite of the importance of this issue, relatively less efforts have been made to study this problem. In this paper, we aim to increase the size of training dataset in various ways to improve the accuracy and robustness of face recognition. In detail, we adapt a generator from the Generative Adversarial Network (GAN) to increase the size of training dataset, which includes a base set, a widely available dataset, and a novel set, a given limited dataset, while adopting transfer learning as a backend. Based on extensive experimental study, we conduct the analysis on various data augmentation methods, observing how each affects the identification accuracy. Finally, we conclude that the proposed algorithm for generating faces is effective in improving the identification accuracy and coverage at the precision of 99% using both the base and novel set.",
    },
  },
];

export const publications = publicationList.map((p) => ({ ...p, citations: counts[p.id] }));

// 이수 과목·경험·수상. 한 줄에 한 묶음씩 표시한다.
export const misc: { title: string; items: string[] }[] = [
  {
    title: "이수",
    items: ["IB 이수", "UI / UX 이수", "경제학 이수", "알고리즘 이수", "머신러닝 전공", "어셈블리어 이수", "미국 / 인도 유학"],
  },
  {
    title: "수상",
    items: ["ICCVW 대회 수상", "브레인스토밍 관련 대회 수상"],
  },
];
