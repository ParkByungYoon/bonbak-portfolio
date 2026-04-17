function renderHeader() {
  const header = document.createElement('header');
  header.id = 'yt-header';
  header.innerHTML = `
    <div class="yt-header-start">
      <button class="yt-icon-button" title="메뉴">
        <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </button>
      <a href="index.html" class="yt-logo">
        <span class="yt-logo-text">Portfolio</span>
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
