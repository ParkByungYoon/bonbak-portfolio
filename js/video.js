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
    `<strong>${PORTFOLIO_DATA.channel.name}</strong> · ${project.start_date} ~ ${project.end_date} · ${project.category}`;
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
    // PDF file not present yet — show playlist color as placeholder
    const bg = PORTFOLIO_DATA.playlistColors[currentProject.playlist] || PORTFOLIO_DATA.categoryColors[currentProject.category] || '#333';
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
  const samePlaylist = PORTFOLIO_DATA.projects.filter(
    p => p.playlist === project.playlist && p.id !== project.id
  );
  const others = PORTFOLIO_DATA.projects.filter(p => p.playlist !== project.playlist);
  const combined = [...samePlaylist, ...others].slice(0, 8);

  const container = document.getElementById('related-projects-list');
  if (combined.length === 0) {
    container.innerHTML = `<p style="color:var(--yt-text-secondary);font-size:14px">관련 프로젝트가 없습니다.</p>`;
    return;
  }
  container.innerHTML = combined.map(p => {
    const bg = PORTFOLIO_DATA.playlistColors[p.playlist] || '#e5e5e5';
    return `
      <div class="related-card" onclick="location.href='video.html?id=${p.id}'">
        <div class="related-card-thumbnail">
          <div class="thumbnail-placeholder" style="background:${bg}"></div>
        </div>
        <div class="related-card-info">
          <div class="related-card-title">${p.title}</div>
          <div class="related-card-tags">${p.tags.map(t => `<span class="yt-tag">${t}</span>`).join('')}</div>
          <div class="related-card-meta">${p.start_date} ~ ${p.end_date}</div>
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
