// data.js — loaded as <script> before channel.js/video.js. Exposes PORTFOLIO_DATA as a browser global.
const PORTFOLIO_DATA = {
  channel: {
    name: "홍길동",
    handle: "@gildong-ml",
    description: "머신러닝 엔지니어 지망생 · 추천시스템 / RAG / 멀티모달 프로젝트",
    role: "ML Engineer",
  },

  categoryOrder: ["추천시스템", "RAG", "멀티모달", "머신러닝"],

  categoryColors: {
    "추천시스템": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "RAG":        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "멀티모달":   "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "머신러닝":   "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },

  projects: [
    {
      id: "recommender-system",
      title: "협업 필터링 기반 영화 추천 시스템",
      category: "추천시스템",
      date: "2024-03",
      thumbnail: "assets/thumbnails/recommender-system.jpg",
      pdf: "assets/pdfs/recommender-system.pdf",
      description: "MovieLens 데이터셋을 활용한 협업 필터링 추천 시스템. Matrix Factorization과 Neural CF를 비교 구현하여 RMSE 0.87 달성.",
      tags: ["Python", "PyTorch", "Matrix Factorization", "Neural CF"],
      featured: true,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "rag-chatbot",
      title: "RAG 기반 문서 질의응답 시스템",
      category: "RAG",
      date: "2024-06",
      thumbnail: "assets/thumbnails/rag-chatbot.jpg",
      pdf: "assets/pdfs/rag-chatbot.pdf",
      description: "LangChain과 FAISS를 활용한 RAG 파이프라인. PDF 문서를 청킹·임베딩하여 GPT-4 기반 질의응답 구현.",
      tags: ["LangChain", "FAISS", "GPT-4", "Python"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "multimodal-sentiment",
      title: "이미지-텍스트 멀티모달 감성 분석",
      category: "멀티모달",
      date: "2024-09",
      thumbnail: "assets/thumbnails/multimodal-sentiment.jpg",
      pdf: "assets/pdfs/multimodal-sentiment.pdf",
      description: "CLIP 기반 이미지-텍스트 융합 모델로 SNS 게시물의 감성을 분류. 단일 모달 대비 F1 score 8% 향상.",
      tags: ["CLIP", "PyTorch", "Transformers", "Multimodal"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "time-series-forecast",
      title: "시계열 예측 앙상블 모델",
      category: "머신러닝",
      date: "2024-11",
      thumbnail: "assets/thumbnails/time-series-forecast.jpg",
      pdf: "assets/pdfs/time-series-forecast.pdf",
      description: "LSTM, Transformer, XGBoost를 앙상블한 전력 수요 예측 모델. 단일 모델 대비 MAE 12% 개선.",
      tags: ["LSTM", "Transformer", "XGBoost", "Time Series"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
    {
      id: "churn-prediction",
      title: "고객 이탈 예측 분류 모델",
      category: "머신러닝",
      date: "2025-01",
      thumbnail: "assets/thumbnails/churn-prediction.jpg",
      pdf: "assets/pdfs/churn-prediction.pdf",
      description: "통신사 고객 데이터 기반 이탈 예측. SHAP을 활용한 피처 중요도 분석으로 비즈니스 인사이트 도출.",
      tags: ["Scikit-learn", "XGBoost", "SHAP", "Python"],
      featured: false,
      likes: 0, // initial fallback; actual count stored in localStorage as `likes_${id}`
    },
  ],
};
