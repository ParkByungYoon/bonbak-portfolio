// data.js — loaded as <script> before channel.js/video.js. Exposes PORTFOLIO_DATA as a browser global.
const PORTFOLIO_DATA = {
  channel: {
    name: "박병윤",
    handle: "@bonbak",
    description: "저는 문제의 본질을 파악하고 근본적인 해결책을 제시하고자 노력합니다.",
    role: "ML Engineer",
  },

  categoryOrder: ["프로젝트"],

  categoryColors: {
    "프로젝트": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },

  playlistOrder: ["추천시스템", "멀티모달", "머신러닝"],

  playlistColors: {
    "추천시스템": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "멀티모달":   "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "머신러닝":   "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },

  projects: [
    {
      id: "new-fashion-product-performance-forecasting",
      title: "패션 신상품 수요 예측 모델 개발",
      category: "프로젝트",
      playlist: "멀티모달",
      start_date: "2025-01",
      end_date: "2025-03",
      thumbnail: "assets/thumbnails/recommender-system.jpg",
      pdf: "assets/pdfs/NFPPF.pdf",
      description: "2만개의 상품 이미지/텍스트/시계열 데이터 활용하여 상품의 판매량 예측, 기존 현업의 통계기법 대비 MSE 지표 기준 30% 이상의 오차 감소 달성",
      tags: ["Multi-Variate Time-Series", "CLIP"],
      featured: true,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "path-based-reasoning",
      title: "건물에너지 온톨로지 기반 질의응답 시스템 구축",
      category: "프로젝트",
      playlist: "멀티모달",
      start_date: "2024-01",
      end_date: "2024-12",
      thumbnail: "assets/thumbnails/rag-chatbot.jpg",
      pdf: "assets/pdfs/KGQA.pdf",
      description: "400만 엔티티 규모의 건물에너지 온톨로지를 기반으로 답변하는 RAG 구축, 실제 도메인 질의 600건에 대해 F1-score 0.8 이상 달성",
      tags: ["RAG", "LLM", "Knowledge Graph"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "recommandation-system-with-distillation",
      title: "어드레서블 광고를 위한 오디언스 세그먼트 생성",
      category: "프로젝트",
      playlist: "추천시스템",
      start_date: "2023-09",
      end_date: "2023-12",
      thumbnail: "assets/thumbnails/multimodal-sentiment.jpg",
      pdf: "assets/pdfs/DT.pdf",
      description: "4800명의 6개월 간 시청 데이터를 학습한 그래프 신경망으로 세그먼트 생성, IPTV 3사(SKB, KT, LGU+)의 사내 ERP 시스템 도입 및 모수 검증에 성공",
      tags: ["GNN", "Decision Tree", "Distillation"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "real-time-recommendation-system",
      title: "위치 기반 개인화 장소 추천 서비스 개발",
      category: "프로젝트",
      playlist: "추천시스템",
      start_date: "2022-01",
      end_date: "2022-06",
      thumbnail: "assets/thumbnails/time-series-forecast.jpg",
      pdf: "assets/pdfs/NFPPF.pdf",
      description: "50만개 리뷰를 바탕으로 맛집을 소개하는 서비스 개발, 2만개의 음식점을 사용자의 기호에 맞게 추천",
      tags: ["Metapath2Vec", "Hybrid RecSys"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    // {
    //   id: "churn-prediction",
    //   title: "다중 레이블 분류 오픈소스 프레임워크 개발",
    //   category: "프로젝트",
    //   playlist: "머신러닝",
    //   start_date: "2025-01",
    //   end_date: "2025-03",
    //   thumbnail: "assets/thumbnails/churn-prediction.jpg",
    //   pdf: "assets/pdfs/1.pdf",
    //   description: "scikit-multilearn 라이브러리의 하이퍼파라미터 탐색 로직 결함 해결\
    //   학술대회에서 기술적 가치 입증 및 MLC 커뮤니티 기여",
    //   tags: ["Multi-Label Classification(MLC)", "scikit-multilearn"],
    //   featured: false,
    //   likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    // },
  ],
};
