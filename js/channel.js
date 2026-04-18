function thumbnailHTML(project) {
  const bg = PORTFOLIO_DATA.playlistColors[project.playlist] || PORTFOLIO_DATA.categoryColors[project.category] || '#e5e5e5';
  if (project.thumbnail) {
    return `<img src="${project.thumbnail}" alt="${project.title}"
      onerror="this.style.display='none';this.nextSibling.style.display='flex'">
      <div class="thumbnail-placeholder" style="display:none;background:${bg}"></div>`;
  }
  if (project.pdf) {
    return `<canvas class="pdf-thumbnail" data-pdf="${project.pdf}"></canvas>`;
  }
  return `<div class="thumbnail-placeholder" style="background:${bg}"></div>`;
}

async function renderPDFThumbnails() {
  if (typeof pdfjsLib === 'undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const canvases = document.querySelectorAll('canvas.pdf-thumbnail');
  for (const canvas of canvases) {
    if (canvas.dataset.rendered) continue;
    canvas.dataset.rendered = '1';
    try {
      const pdf = await pdfjsLib.getDocument(canvas.dataset.pdf).promise;
      const page = await pdf.getPage(1);
      const containerWidth = canvas.parentElement.clientWidth || 320;
      const baseViewport = page.getViewport({ scale: 1 });
      const scaled = page.getViewport({ scale: containerWidth / baseViewport.width });
      canvas.width = scaled.width;
      canvas.height = scaled.height;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.objectFit = 'cover';
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled }).promise;
    } catch {
      canvas.style.display = 'none';
    }
  }
}

function projectCardHTML(project) {
  return `
    <div class="project-card" onclick="location.href='video.html?id=${project.id}'">
      <div class="project-card-thumbnail">${thumbnailHTML(project)}</div>
      <div class="project-card-title">${project.title}</div>
      <div class="project-card-meta">
        <div class="project-card-tags">${project.tags.map(t => `<span class="yt-tag">${t}</span>`).join('')}</div>
        ${project.start_date} ~ ${project.end_date}
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
        <div class="channel-meta">${channel.handle} · ${channel.role}</div>
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
    const bg = PORTFOLIO_DATA.playlistColors[featured.playlist] || PORTFOLIO_DATA.categoryColors[featured.category] || '#e5e5e5';
    html += `
      <div class="featured-section">
        <div class="featured-thumbnail" onclick="location.href='video.html?id=${featured.id}'">
          ${featured.pdf
            ? `<canvas class="pdf-thumbnail" data-pdf="${featured.pdf}"></canvas>`
            : `<div class="thumbnail-placeholder" style="background:${bg}"></div>`}
        </div>
        <div class="featured-info">
          <div class="project-category">${featured.category}</div>
          <h2>${featured.title}</h2>
          <div class="project-date">${featured.start_date} ~ ${featured.end_date}</div>
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
  const sorted = [...PORTFOLIO_DATA.projects].sort((a, b) => b.start_date.localeCompare(a.start_date));
  return `<div class="all-videos-grid">${sorted.map(projectCardHTML).join('')}</div>`;
}

function playlistsContentHTML() {
  let html = '';
  PORTFOLIO_DATA.playlistOrder.forEach(cat => {
    const projects = PORTFOLIO_DATA.projects.filter(p => p.playlist === cat);
    if (projects.length === 0) return;
    const bg = PORTFOLIO_DATA.playlistColors[cat] || '#e5e5e5';
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
  renderPDFThumbnails();
}

document.addEventListener('DOMContentLoaded', () => {
  initComponents();
  renderSidebar('home');
  renderChannelHeader();
  renderTabContent('home');
});
