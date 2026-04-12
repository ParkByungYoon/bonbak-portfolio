# YouTube Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a YouTube-UI clone portfolio website in pure HTML/CSS/JS that showcases ML engineering projects with a PDF slide viewer.

**Architecture:** Two HTML pages (`index.html` for channel view, `video.html` for project detail) share a common header and sidebar injected by `components.js`. All project data lives in `data.js` as a single source of truth. `video.html` uses PDF.js 3.11 (CDN) to render project PDFs as a paginated slide viewer.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JavaScript ES6+, PDF.js 3.11.174 (CDN)

---

## File Map

| File | Responsibility |
|------|---------------|
| `js/data.js` | All project data + channel info + category metadata |
| `js/components.js` | Header + sidebar DOM injection + toast utility |
| `js/channel.js` | Channel page rendering: banner, tabs, featured, category rows |
| `js/video.js` | Project detail: PDF viewer, likes, share, download, related sidebar |
| `css/reset.css` | Browser normalize |
| `css/youtube.css` | Shared YouTube design tokens, header, sidebar, utilities |
| `css/channel.css` | Channel page–specific styles |
| `css/video.css` | Video page–specific styles |
| `index.html` | Channel page shell |
| `video.html` | Project detail page shell |

---

## Task 1: Directory scaffold + data.js

**Files:**
- Create: `js/data.js`
- Create: `assets/thumbnails/`, `assets/pdfs/`, `assets/icons/`, `libs/pdf.js/`

- [ ] **Step 1: Create directories**

```bash
mkdir -p css js assets/thumbnails assets/pdfs assets/icons libs/pdf.js
```

- [ ] **Step 2: Create `js/data.js`**

```javascript
const PORTFOLIO_DATA = {
  channel: {
    name: "홍길동",
    handle: "@gildong-ml",
    description: "머신러닝 엔지니어 지망생 · 추천시스템 / RAG / 멀티모달 프로젝트",
    subscriberCount: "ML Engineer",
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
      likes: 0,
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
      likes: 0,
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
      likes: 0,
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
      likes: 0,
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
      likes: 0,
    },
  ],
};
```

- [ ] **Step 3: Verify data.js loads in browser**

Create `test.html` at project root, load data.js, open browser console and check:
```javascript
// In browser console after opening test.html with <script src="js/data.js"></script>
console.assert(PORTFOLIO_DATA.projects.length === 5, "should have 5 projects");
console.assert(PORTFOLIO_DATA.projects.filter(p => p.featured).length === 1, "should have 1 featured");
console.assert(PORTFOLIO_DATA.categoryOrder.length === 4, "should have 4 categories");
// All 3 asserts should pass silently (no AssertionError in console)
```

- [ ] **Step 4: Delete `test.html`, commit**

```bash
rm test.html
git add js/data.js
git commit -m "feat: add project data with 5 sample projects and category metadata"
```

---

## Task 2: CSS foundation

**Files:**
- Create: `css/reset.css`
- Create: `css/youtube.css`

- [ ] **Step 1: Create `css/reset.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { font-size: 16px; }

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { color: inherit; text-decoration: none; }

button {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

img { display: block; max-width: 100%; }

ul, ol { list-style: none; }

input { font-family: inherit; }
```

- [ ] **Step 2: Create `css/youtube.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

:root {
  --yt-header-height: 56px;
  --yt-sidebar-width: 72px;
  --yt-red: #ff0000;
  --yt-text-primary: #0f0f0f;
  --yt-text-secondary: #606060;
  --yt-bg: #ffffff;
  --yt-hover-bg: rgba(0, 0, 0, 0.05);
  --yt-border: #e5e5e5;
  --yt-btn-bg: #f2f2f2;
  --yt-btn-hover: #e5e5e5;
  --yt-tag-bg: #f2f2f2;
}

/* ── Base ── */
body {
  font-family: 'Roboto', Arial, sans-serif;
  background: var(--yt-bg);
  color: var(--yt-text-primary);
  overflow-x: hidden;
}

/* ── Header ── */
#yt-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--yt-header-height);
  background: var(--yt-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 200;
  border-bottom: 1px solid var(--yt-border);
}

.yt-header-start {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 200px;
}

.yt-header-center {
  flex: 1;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.yt-header-end {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  justify-content: flex-end;
}

.yt-icon-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--yt-text-primary);
  transition: background 0.1s;
}
.yt-icon-button:hover { background: var(--yt-hover-bg); }
.yt-icon-button svg { width: 24px; height: 24px; fill: var(--yt-text-primary); }

.yt-logo { display: flex; align-items: center; gap: 4px; }
.yt-logo-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.yt-searchbar {
  flex: 1;
  display: flex;
  border: 1px solid var(--yt-border);
  border-radius: 40px;
  overflow: hidden;
  height: 40px;
}
.yt-searchbar input {
  flex: 1;
  padding: 0 16px;
  border: none;
  outline: none;
  font-size: 16px;
  background: var(--yt-bg);
  color: var(--yt-text-primary);
}
.yt-search-btn {
  width: 64px;
  background: #f8f8f8;
  border-left: 1px solid var(--yt-border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.yt-search-btn svg { width: 20px; height: 20px; fill: var(--yt-text-primary); }

.yt-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
}

/* ── Sidebar ── */
#yt-sidebar {
  position: fixed;
  top: var(--yt-header-height);
  left: 0;
  width: var(--yt-sidebar-width);
  height: calc(100vh - var(--yt-header-height));
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0;
  z-index: 100;
  background: var(--yt-bg);
}
#yt-sidebar::-webkit-scrollbar { display: none; }

.yt-sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 4px;
  border-radius: 10px;
  margin: 0 4px;
  gap: 6px;
  font-size: 10px;
  cursor: pointer;
  transition: background 0.1s;
  color: var(--yt-text-primary);
}
.yt-sidebar-item:hover { background: var(--yt-hover-bg); }
.yt-sidebar-item.active { background: var(--yt-btn-bg); font-weight: 500; }
.yt-sidebar-item svg { width: 24px; height: 24px; fill: var(--yt-text-primary); }

.yt-sidebar-divider {
  height: 1px;
  background: var(--yt-border);
  margin: 12px 0;
}

/* ── Page container ── */
#yt-page-container {
  display: flex;
  margin-top: var(--yt-header-height);
  padding-left: var(--yt-sidebar-width);
}
#yt-main-content { flex: 1; min-width: 0; }

/* ── Shared components ── */
.yt-tag {
  display: inline-block;
  padding: 4px 8px;
  background: var(--yt-tag-bg);
  border-radius: 4px;
  font-size: 12px;
  color: var(--yt-text-secondary);
  margin: 2px;
}

.yt-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  background: var(--yt-btn-bg);
  color: var(--yt-text-primary);
  transition: background 0.1s;
}
.yt-btn:hover { background: var(--yt-btn-hover); }
.yt-btn.primary { background: #0f0f0f; color: #fff; }
.yt-btn.primary:hover { background: #272727; }
.yt-btn svg { width: 20px; height: 20px; fill: currentColor; }

/* ── Toast ── */
#yt-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 500;
  transition: transform 0.3s ease;
  pointer-events: none;
}
#yt-toast.show { transform: translateX(-50%) translateY(0); }
```

- [ ] **Step 3: Verify CSS**

Create `test.html`, link both CSS files, open in browser:
- No console errors
- Roboto font loads (check Network tab: `fonts.googleapis.com` request succeeds)
- Body background is white, no overflow

Delete `test.html` after verifying.

- [ ] **Step 4: Commit**

```bash
git add css/reset.css css/youtube.css
git commit -m "feat: add CSS foundation with YouTube design tokens"
```

---

## Task 3: Shared components (components.js)

**Files:**
- Create: `js/components.js`

- [ ] **Step 1: Create `js/components.js`**

```javascript
function renderHeader() {
  const header = document.createElement('header');
  header.id = 'yt-header';
  header.innerHTML = `
    <div class="yt-header-start">
      <button class="yt-icon-button" title="메뉴">
        <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </button>
      <a href="index.html" class="yt-logo">
        <svg height="20" viewBox="0 0 90 20" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="27" height="18" rx="4" fill="#ff0000"/>
          <polygon points="11,5 11,15 20,10" fill="#ffffff"/>
          <text x="32" y="15" font-family="'Roboto',Arial,sans-serif" font-weight="700" font-size="13" fill="#0f0f0f">Portfolio</text>
        </svg>
      </a>
    </div>
    <div class="yt-header-center">
      <div class="yt-searchbar">
        <input type="text" placeholder="검색" disabled>
        <button class="yt-search-btn" disabled>
          <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </button>
      </div>
    </div>
    <div class="yt-header-end">
      <button class="yt-icon-button" title="동영상 만들기" disabled>
        <svg viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
      </button>
      <button class="yt-icon-button" title="알림" disabled>
        <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
      </button>
      <div class="yt-avatar" title="프로필">ML</div>
    </div>
  `;
  document.body.prepend(header);
}

function renderSidebar(activePage) {
  const items = [
    {
      key: 'home',
      label: '홈',
      href: 'index.html',
      icon: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    },
    {
      key: 'shorts',
      label: 'Shorts',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 15H5V8h10v7z"/></svg>`,
    },
    {
      key: 'subscriptions',
      label: '구독',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm10 10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zM10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm10-10h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/></svg>`,
    },
    {
      key: 'library',
      label: '보관함',
      href: '#',
      icon: `<svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>`,
    },
  ];

  const nav = document.createElement('nav');
  nav.id = 'yt-sidebar';
  nav.innerHTML = items.map((item, i) => `
    ${i > 0 ? '<div class="yt-sidebar-divider"></div>' : ''}
    <a href="${item.href}" class="yt-sidebar-item ${activePage === item.key ? 'active' : ''}">
      ${item.icon}
      <span>${item.label}</span>
    </a>
  `).join('');

  const container = document.getElementById('yt-page-container');
  container.prepend(nav);
}

function renderToast() {
  if (document.getElementById('yt-toast')) return;
  const toast = document.createElement('div');
  toast.id = 'yt-toast';
  document.body.appendChild(toast);
}

function showToast(message, duration = 3000) {
  const toast = document.getElementById('yt-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function initComponents() {
  renderHeader();
  renderToast();
  // renderSidebar() must be called separately after #yt-page-container is in DOM
}
```

- [ ] **Step 2: Verify no syntax errors**

Open browser console, paste the entire file contents. Check:
- No `SyntaxError` is thrown
- `typeof renderHeader === 'function'` → `true`
- `typeof showToast === 'function'` → `true`

- [ ] **Step 3: Commit**

```bash
git add js/components.js
git commit -m "feat: add shared header, sidebar, and toast components"
```

---

## Task 4: Channel page HTML + CSS

**Files:**
- Create: `index.html`
- Create: `css/channel.css`

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ML Portfolio</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/youtube.css">
  <link rel="stylesheet" href="css/channel.css">
</head>
<body>
  <div id="yt-page-container">
    <main id="yt-main-content">
      <div id="channel-header"></div>
      <div id="channel-tabs"></div>
      <div id="channel-content"></div>
    </main>
  </div>

  <script src="js/data.js"></script>
  <script src="js/components.js"></script>
  <script src="js/channel.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `css/channel.css`**

```css
/* ── Channel Banner ── */
.channel-banner {
  width: 100%;
  height: 180px;
  overflow: hidden;
}
.channel-banner-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}
.channel-banner img { width: 100%; height: 100%; object-fit: cover; }

/* ── Channel Info ── */
.channel-info-row {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  padding: 16px 24px 16px;
}
.channel-avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: 700;
  border: 4px solid var(--yt-bg);
  margin-top: -40px;
}
.channel-details { flex: 1; padding-bottom: 4px; }
.channel-name { font-size: 24px; font-weight: 700; line-height: 1.2; }
.channel-meta { font-size: 14px; color: var(--yt-text-secondary); margin-top: 4px; }
.channel-description {
  font-size: 14px;
  color: var(--yt-text-secondary);
  margin-top: 4px;
  max-width: 600px;
}

/* ── Channel Tabs ── */
.channel-tabs-container {
  border-bottom: 1px solid var(--yt-border);
  padding: 0 24px;
  display: flex;
}
.channel-tab {
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--yt-text-secondary);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.1s, border-color 0.1s;
  cursor: pointer;
}
.channel-tab:hover { color: var(--yt-text-primary); background: var(--yt-hover-bg); }
.channel-tab.active { color: var(--yt-text-primary); border-bottom-color: var(--yt-text-primary); }

/* ── Content Inner ── */
.channel-content-inner { padding: 24px; }

/* ── Featured Project ── */
.featured-section {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
}
.featured-thumbnail {
  width: 426px;
  flex-shrink: 0;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #e5e5e5;
  transition: opacity 0.15s;
}
.featured-thumbnail:hover { opacity: 0.92; }
.featured-thumbnail .thumbnail-placeholder,
.featured-thumbnail img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.featured-info { flex: 1; padding-top: 4px; }
.featured-info .project-category {
  font-size: 12px;
  color: var(--yt-text-secondary);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.featured-info h2 { font-size: 18px; font-weight: 500; line-height: 1.4; margin-bottom: 8px; }
.featured-info .project-date { font-size: 13px; color: var(--yt-text-secondary); margin-bottom: 12px; }
.featured-info .project-description {
  font-size: 14px;
  color: var(--yt-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.featured-info .project-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 16px; }

/* ── Category Row ── */
.category-section { margin-bottom: 40px; }
.category-section-title { font-size: 16px; font-weight: 500; margin-bottom: 12px; }
.category-cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

/* ── All Videos Grid ── */
.all-videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

/* ── Playlist View ── */
.playlist-section { margin-bottom: 40px; }
.playlist-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--yt-btn-bg);
  border-radius: 12px;
  margin-bottom: 12px;
}
.playlist-thumb {
  width: 120px;
  height: 68px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}
.playlist-meta-title { font-weight: 500; font-size: 15px; }
.playlist-meta-count { font-size: 13px; color: var(--yt-text-secondary); margin-top: 2px; }

/* ── Project Card ── */
.project-card { cursor: pointer; }
.project-card-thumbnail {
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  background: #e5e5e5;
  margin-bottom: 8px;
  transition: opacity 0.15s;
}
.project-card:hover .project-card-thumbnail { opacity: 0.9; }
.project-card-thumbnail img,
.project-card-thumbnail .thumbnail-placeholder {
  width: 100%; height: 100%;
  object-fit: cover;
}
.project-card-thumbnail .thumbnail-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: rgba(255,255,255,0.8);
  text-align: center;
  padding: 4px;
}
.project-card-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.project-card-meta { font-size: 12px; color: var(--yt-text-secondary); line-height: 1.4; }
.project-card-category-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  background: var(--yt-tag-bg);
  color: var(--yt-text-secondary);
  margin-bottom: 2px;
}
```

- [ ] **Step 3: Open `index.html` in browser. Verify:**
- No console errors
- White page with Roboto font (check Network tab shows Google Fonts request)
- Page is blank — content divs exist but are empty (channel.js not yet created)

- [ ] **Step 4: Commit**

```bash
git add index.html css/channel.css
git commit -m "feat: add channel page HTML skeleton and styles"
```

---

## Task 5: Channel page logic (channel.js)

**Files:**
- Create: `js/channel.js`

- [ ] **Step 1: Create `js/channel.js`**

```javascript
function thumbnailHTML(project) {
  const bg = PORTFOLIO_DATA.categoryColors[project.category] || '#e5e5e5';
  // Set hasImage to true after adding real images to assets/thumbnails/
  const hasImage = false;
  if (hasImage) {
    return `<img src="${project.thumbnail}" alt="${project.title}"
      onerror="this.style.display='none';this.nextSibling.style.display='flex'">
      <div class="thumbnail-placeholder" style="display:none;background:${bg}"></div>`;
  }
  return `<div class="thumbnail-placeholder" style="background:${bg}"></div>`;
}

function projectCardHTML(project) {
  return `
    <div class="project-card" onclick="location.href='video.html?id=${project.id}'">
      <div class="project-card-thumbnail">${thumbnailHTML(project)}</div>
      <div class="project-card-title">${project.title}</div>
      <div class="project-card-meta">
        <span class="project-card-category-badge">${project.category}</span><br>
        ${project.date}
      </div>
    </div>
  `;
}

function renderChannelHeader() {
  const { channel } = PORTFOLIO_DATA;
  document.getElementById('channel-header').innerHTML = `
    <div class="channel-banner">
      <div class="channel-banner-placeholder"></div>
    </div>
    <div class="channel-info-row">
      <div class="channel-avatar-placeholder">${channel.name.charAt(0)}</div>
      <div class="channel-details">
        <h1 class="channel-name">${channel.name}</h1>
        <div class="channel-meta">${channel.handle} · ${channel.subscriberCount}</div>
        <p class="channel-description">${channel.description}</p>
      </div>
      <button class="yt-btn primary">구독</button>
    </div>
  `;
}

function renderTabs(activeTab) {
  document.getElementById('channel-tabs').innerHTML = `
    <div class="channel-tabs-container">
      <button class="channel-tab ${activeTab === 'home' ? 'active' : ''}" data-tab="home">홈</button>
      <button class="channel-tab ${activeTab === 'videos' ? 'active' : ''}" data-tab="videos">동영상</button>
      <button class="channel-tab ${activeTab === 'playlists' ? 'active' : ''}" data-tab="playlists">재생목록</button>
    </div>
  `;
  document.querySelectorAll('.channel-tab').forEach(btn => {
    btn.addEventListener('click', () => renderTabContent(btn.dataset.tab));
  });
}

function homeContentHTML() {
  const featured = PORTFOLIO_DATA.projects.find(p => p.featured);
  let html = '';

  if (featured) {
    const bg = PORTFOLIO_DATA.categoryColors[featured.category] || '#e5e5e5';
    html += `
      <div class="featured-section">
        <div class="featured-thumbnail" onclick="location.href='video.html?id=${featured.id}'">
          <div class="thumbnail-placeholder" style="background:${bg}"></div>
        </div>
        <div class="featured-info">
          <div class="project-category">${featured.category}</div>
          <h2>${featured.title}</h2>
          <div class="project-date">${featured.date}</div>
          <p class="project-description">${featured.description}</p>
          <div class="project-tags">
            ${featured.tags.map(t => `<span class="yt-tag">${t}</span>`).join('')}
          </div>
          <button class="yt-btn primary"
            onclick="event.stopPropagation();location.href='video.html?id=${featured.id}'">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            자세히 보기
          </button>
        </div>
      </div>
    `;
  }

  PORTFOLIO_DATA.categoryOrder.forEach(cat => {
    const projects = PORTFOLIO_DATA.projects.filter(p => p.category === cat);
    if (projects.length === 0) return;
    html += `
      <div class="category-section">
        <h3 class="category-section-title">${cat}</h3>
        <div class="category-cards-row">
          ${projects.map(projectCardHTML).join('')}
        </div>
      </div>
    `;
  });

  return html;
}

function videosContentHTML() {
  const sorted = [...PORTFOLIO_DATA.projects].sort((a, b) => b.date.localeCompare(a.date));
  return `<div class="all-videos-grid">${sorted.map(projectCardHTML).join('')}</div>`;
}

function playlistsContentHTML() {
  let html = '';
  PORTFOLIO_DATA.categoryOrder.forEach(cat => {
    const projects = PORTFOLIO_DATA.projects.filter(p => p.category === cat);
    if (projects.length === 0) return;
    const bg = PORTFOLIO_DATA.categoryColors[cat] || '#e5e5e5';
    html += `
      <div class="playlist-section">
        <div class="playlist-header">
          <div class="playlist-thumb" style="background:${bg}">▶</div>
          <div>
            <div class="playlist-meta-title">${cat}</div>
            <div class="playlist-meta-count">프로젝트 ${projects.length}개</div>
          </div>
        </div>
        <div class="category-cards-row">
          ${projects.map(projectCardHTML).join('')}
        </div>
      </div>
    `;
  });
  return html;
}

function renderTabContent(tab) {
  renderTabs(tab);
  let html = '';
  if (tab === 'home') html = homeContentHTML();
  else if (tab === 'videos') html = videosContentHTML();
  else if (tab === 'playlists') html = playlistsContentHTML();
  document.getElementById('channel-content').innerHTML =
    `<div class="channel-content-inner">${html}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initComponents();
  renderSidebar('home');
  renderChannelHeader();
  renderTabContent('home');
});
```

- [ ] **Step 2: Open `index.html` in browser. Verify all of the following:**
- Header: red YouTube icon + "Portfolio" text, search bar, icons on right
- Left sidebar: 홈/Shorts/구독/보관함 icons (stacked with labels)
- Purple gradient channel banner
- Channel avatar circle with initial letter, name, handle, description, 구독 button
- 탭: 홈/동영상/재생목록 buttons, 홈 is underlined/active
- Featured project: large gradient thumbnail left, title/description/tags/button right
- 4 category sections below with project cards
- Clicking a card navigates to `video.html?id=...`
- Click 동영상 tab: all 5 cards in a grid sorted newest-first
- Click 재생목록 tab: 4 category groups with colored header bars

- [ ] **Step 3: Commit**

```bash
git add js/channel.js
git commit -m "feat: implement channel page with featured project, tabs, and category rows"
```

---

## Task 6: Video page HTML + CSS

**Files:**
- Create: `video.html`
- Create: `css/video.css`

- [ ] **Step 1: Create `video.html`**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>프로젝트 — ML Portfolio</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/youtube.css">
  <link rel="stylesheet" href="css/video.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
</head>
<body>
  <div id="yt-page-container">
    <main id="yt-main-content">
      <div id="video-layout">

        <div id="video-primary">
          <!-- PDF Viewer -->
          <div id="pdf-viewer-container">
            <canvas id="pdf-canvas"></canvas>
            <div id="pdf-controls">
              <button id="pdf-prev" class="yt-icon-button" title="이전 슬라이드">
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <span id="pdf-page-info">— / —</span>
              <button id="pdf-next" class="yt-icon-button" title="다음 슬라이드">
                <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              </button>
              <div style="flex:1"></div>
              <button id="theater-btn" class="yt-icon-button" title="영화관 모드 (T)">
                <svg viewBox="0 0 24 24"><path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/></svg>
              </button>
              <button id="fullscreen-btn" class="yt-icon-button" title="전체화면 (F)">
                <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
              </button>
            </div>
          </div>

          <!-- Project Info -->
          <div id="video-info">
            <h1 id="project-title">로딩 중...</h1>
            <div id="project-meta"></div>
            <div id="action-buttons">
              <button class="yt-btn" id="like-btn">
                <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                <span id="like-count">0</span>
              </button>
              <button class="yt-btn" id="share-btn">
                <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                공유
              </button>
              <button class="yt-btn" id="download-btn">
                <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                저장
              </button>
            </div>
            <div id="project-description-box">
              <div id="project-description"></div>
              <div id="project-tags"></div>
            </div>
          </div>
        </div>

        <!-- Related Projects Sidebar -->
        <div id="video-secondary">
          <div id="related-projects-list"></div>
        </div>

      </div>
    </main>
  </div>

  <script src="js/data.js"></script>
  <script src="js/components.js"></script>
  <script src="js/video.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create `css/video.css`**

```css
/* ── Video Layout ── */
#video-layout {
  display: flex;
  gap: 24px;
  padding: 24px;
  max-width: 1800px;
}
#video-primary { flex: 1; min-width: 0; }
#video-secondary { width: 402px; flex-shrink: 0; }

/* ── Theater mode ── */
body.theater-mode #yt-sidebar,
body.theater-mode #video-secondary { display: none; }
body.theater-mode #yt-page-container { padding-left: 0; }

/* ── PDF Viewer ── */
#pdf-viewer-container {
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}
#pdf-canvas {
  display: block;
  width: 100%;
  max-height: calc(100vh - 200px);
  object-fit: contain;
  background: #111;
}
#pdf-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  font-size: 14px;
  flex-shrink: 0;
}
#pdf-controls .yt-icon-button { color: white; }
#pdf-controls .yt-icon-button svg { fill: white; }
#pdf-controls .yt-icon-button:hover { background: rgba(255,255,255,0.1); }
#pdf-page-info { font-size: 14px; min-width: 60px; text-align: center; }

#pdf-viewer-container:fullscreen,
#pdf-viewer-container:-webkit-full-screen {
  background: #000;
  display: flex;
  flex-direction: column;
}
#pdf-viewer-container:fullscreen #pdf-canvas,
#pdf-viewer-container:-webkit-full-screen #pdf-canvas {
  flex: 1;
  max-height: none;
  height: 100%;
}

/* ── Project Info ── */
#video-info { margin-top: 16px; }
#project-title { font-size: 20px; font-weight: 700; line-height: 1.4; margin-bottom: 8px; }
#project-meta { font-size: 14px; color: var(--yt-text-secondary); margin-bottom: 12px; }

/* ── Action Buttons ── */
#action-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
#like-btn.liked { background: #0f0f0f; color: white; }
#like-btn.liked svg { fill: white; }

/* ── Description Box ── */
#project-description-box {
  background: var(--yt-btn-bg);
  border-radius: 12px;
  padding: 16px;
}
#project-description {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  white-space: pre-wrap;
}
#project-tags { display: flex; flex-wrap: wrap; gap: 4px; }

/* ── Related Projects ── */
#related-projects-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.related-card {
  display: flex;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
  padding: 4px;
  transition: background 0.1s;
}
.related-card:hover { background: var(--yt-hover-bg); }
.related-card-thumbnail {
  width: 168px;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}
.related-card-thumbnail .thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: rgba(255,255,255,0.8);
  text-align: center;
  padding: 4px;
}
.related-card-info { flex: 1; min-width: 0; }
.related-card-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
}
.related-card-meta { font-size: 12px; color: var(--yt-text-secondary); }
```

- [ ] **Step 3: Open `video.html?id=recommender-system` in browser. Verify:**
- No console errors (PDF.js CDN script loads — check Network tab)
- Layout: left sidebar + main area with black PDF box + right sidebar column
- PDF viewer box is black with control bar at bottom (◀ — / — ▶ + theater/fullscreen buttons)
- "로딩 중..." title visible below PDF box
- Action buttons row (좋아요/공유/저장) visible
- Right column is empty (video.js not yet created)

- [ ] **Step 4: Commit**

```bash
git add video.html css/video.css
git commit -m "feat: add video page HTML structure and CSS"
```

---

## Task 7: Video page JS — data loading + PDF viewer

**Files:**
- Create: `js/video.js`

- [ ] **Step 1: Create `js/video.js`**

```javascript
// ── PDF.js worker ─────────────────────────
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// ── State ─────────────────────────────────
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let currentProject = null;

// ── Project loading ───────────────────────
function loadProject() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) return null;
  return PORTFOLIO_DATA.projects.find(p => p.id === id) || null;
}

function renderProjectInfo(project) {
  document.title = `${project.title} — ML Portfolio`;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-meta').innerHTML =
    `<strong>${PORTFOLIO_DATA.channel.name}</strong> · ${project.date} · ${project.category}`;
  document.getElementById('project-description').textContent = project.description;
  document.getElementById('project-tags').innerHTML =
    project.tags.map(t => `<span class="yt-tag">${t}</span>`).join('');
}

function showNotFound() {
  document.getElementById('project-title').textContent = '프로젝트를 찾을 수 없습니다.';
  document.getElementById('pdf-page-info').textContent = '—';
  document.getElementById('pdf-viewer-container').style.background =
    'linear-gradient(135deg,#e5e5e5,#ccc)';
}

// ── PDF viewer ────────────────────────────
async function loadPDF(url) {
  try {
    pdfDoc = await pdfjsLib.getDocument(url).promise;
    totalPages = pdfDoc.numPages;
    currentPage = 1;
    await renderPage(currentPage);
    updatePageInfo();
  } catch {
    // PDF file not present yet — show category color as placeholder
    const bg = PORTFOLIO_DATA.categoryColors[currentProject.category] || '#333';
    const container = document.getElementById('pdf-viewer-container');
    container.style.background = bg;
    document.getElementById('pdf-canvas').style.display = 'none';
    document.getElementById('pdf-page-info').textContent = 'PDF 준비 중';
  }
}

async function renderPage(pageNum) {
  const page = await pdfDoc.getPage(pageNum);
  const canvas = document.getElementById('pdf-canvas');
  const container = document.getElementById('pdf-viewer-container');

  // Fit page width to container, respect aspect ratio
  const containerWidth = container.clientWidth;
  const viewport = page.getViewport({ scale: 1 });
  const scale = containerWidth / viewport.width;
  const scaledViewport = page.getViewport({ scale });

  canvas.width = scaledViewport.width;
  canvas.height = scaledViewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: scaledViewport }).promise;
}

function updatePageInfo() {
  document.getElementById('pdf-page-info').textContent = `${currentPage} / ${totalPages}`;
  document.getElementById('pdf-prev').disabled = currentPage <= 1;
  document.getElementById('pdf-next').disabled = currentPage >= totalPages;
}

async function goToPrev() {
  if (!pdfDoc || currentPage <= 1) return;
  currentPage--;
  await renderPage(currentPage);
  updatePageInfo();
}

async function goToNext() {
  if (!pdfDoc || currentPage >= totalPages) return;
  currentPage++;
  await renderPage(currentPage);
  updatePageInfo();
}

// ── Fullscreen ────────────────────────────
function toggleFullscreen() {
  const el = document.getElementById('pdf-viewer-container');
  if (!document.fullscreenElement) {
    el.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// ── Theater mode ──────────────────────────
function toggleTheater() {
  document.body.classList.toggle('theater-mode');
  if (pdfDoc) setTimeout(() => renderPage(currentPage), 300);
}

// ── Likes ─────────────────────────────────
function initLikes(project) {
  const storeKey = `likes_${project.id}`;
  const likedKey = `liked_${project.id}`;
  const count = parseInt(localStorage.getItem(storeKey) ?? project.likes, 10);
  const isLiked = localStorage.getItem(likedKey) === 'true';

  const btn = document.getElementById('like-btn');
  const countEl = document.getElementById('like-count');
  countEl.textContent = count;
  if (isLiked) btn.classList.add('liked');

  btn.addEventListener('click', () => {
    const wasLiked = btn.classList.contains('liked');
    const cur = parseInt(countEl.textContent, 10);
    const next = wasLiked ? Math.max(0, cur - 1) : cur + 1;
    btn.classList.toggle('liked');
    countEl.textContent = next;
    localStorage.setItem(storeKey, next);
    localStorage.setItem(likedKey, String(!wasLiked));
  });
}

// ── Share ─────────────────────────────────
function initShare() {
  document.getElementById('share-btn').addEventListener('click', async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast('링크가 클립보드에 복사되었습니다.');
  });
}

// ── Download ──────────────────────────────
function initDownload(project) {
  document.getElementById('download-btn').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = project.pdf;
    a.download = `${project.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('PDF 다운로드를 시작합니다.');
  });
}

// ── Related projects ──────────────────────
function renderRelatedProjects(project) {
  const sameCategory = PORTFOLIO_DATA.projects.filter(
    p => p.category === project.category && p.id !== project.id
  );
  const others = PORTFOLIO_DATA.projects.filter(p => p.category !== project.category);
  const combined = [...sameCategory, ...others].slice(0, 8);

  const container = document.getElementById('related-projects-list');
  if (combined.length === 0) {
    container.innerHTML = `<p style="color:var(--yt-text-secondary);font-size:14px">관련 프로젝트가 없습니다.</p>`;
    return;
  }
  container.innerHTML = combined.map(p => {
    const bg = PORTFOLIO_DATA.categoryColors[p.category] || '#e5e5e5';
    return `
      <div class="related-card" onclick="location.href='video.html?id=${p.id}'">
        <div class="related-card-thumbnail">
          <div class="thumbnail-placeholder" style="background:${bg}"></div>
        </div>
        <div class="related-card-info">
          <div class="related-card-title">${p.title}</div>
          <div class="related-card-meta">${p.category} · ${p.date}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Event listeners ───────────────────────
function initEventListeners() {
  document.getElementById('pdf-prev').addEventListener('click', goToPrev);
  document.getElementById('pdf-next').addEventListener('click', goToNext);
  document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
  document.getElementById('theater-btn').addEventListener('click', toggleTheater);

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft')  goToPrev();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    if (e.key === 't' || e.key === 'T') toggleTheater();
  });
}

// ── Init ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initComponents();
  renderSidebar('home');

  currentProject = loadProject();
  if (!currentProject) { showNotFound(); return; }

  renderProjectInfo(currentProject);
  initLikes(currentProject);
  initShare();
  initDownload(currentProject);
  renderRelatedProjects(currentProject);
  initEventListeners();
  loadPDF(currentProject.pdf);
});
```

- [ ] **Step 2: Open `video.html?id=recommender-system` in browser (requires internet for PDF.js CDN). Verify:**
- Title shows "협업 필터링 기반 영화 추천 시스템"
- Meta shows channel name, date, category
- PDF viewer shows gradient placeholder (PDF file doesn't exist yet — this is expected)
- 좋아요 button: click → count goes to 1, button turns black/filled; click again → goes to 0
- Refresh: like state persists (or resets to 0 depending on initial state — check localStorage in DevTools)
- 공유 button: toast "링크가 클립보드에 복사되었습니다." appears
- 저장 button: browser attempts download (fails since file missing — that's OK)
- Right sidebar shows 4 related project cards (other projects)
- Theater mode button (T key or button): sidebar + right panel disappear, main area expands
- Fullscreen button (F key): PDF container goes fullscreen
- ← → keys: no crash (PDF not loaded, silent no-op)

- [ ] **Step 3: Open `video.html?id=nonexistent` in browser. Verify:**
- Title shows "프로젝트를 찾을 수 없습니다."
- PDF area shows grey gradient
- No JS errors in console

- [ ] **Step 4: Full integration test**

Navigate:
1. `index.html` → click featured project card → arrives at `video.html?id=recommender-system` ✓
2. Click a related card → navigates to that project's detail page ✓
3. Click 홈 in sidebar → returns to `index.html` ✓
4. On `index.html`: click 동영상 tab → 5 cards in grid ✓
5. On `index.html`: click 재생목록 tab → 4 category groups ✓

- [ ] **Step 5: Commit**

```bash
git add js/video.js
git commit -m "feat: complete video page with PDF viewer, likes, share, download, related projects"
```

---

## Adding Real Content (after implementation)

When ready to add your real projects:

1. **Replace sample data** in `js/data.js` — update `name`, `handle`, `description`, titles, descriptions, tags, dates
2. **Add thumbnail images** to `assets/thumbnails/` — filenames must match `project.thumbnail` values
3. **Add PDF files** to `assets/pdfs/` — filenames must match `project.pdf` values
4. **Enable real thumbnails** in `js/channel.js` — set `const hasImage = true;` in `thumbnailHTML()`
5. **Set featured project** — set `featured: true` on one project in `data.js` (only one should be true)

## Deployment

```bash
# GitHub Pages: push to main, enable Pages in Settings > Pages > Source: root /
# Netlify: drag-and-drop the portfolio/ folder to app.netlify.com/drop
# Vercel: npx vercel (run from the portfolio/ directory)

# Note: PDF.js CDN requires internet connection.
# For offline/intranet use, download to libs/pdf.js/ and update the src attributes in video.html.
```
