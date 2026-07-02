(() => {
  const config = window.ENUMIND_CONFIG || {};

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  setText('[data-site-title]', config.siteTitle);
  setText('[data-tagline]', config.tagline);
  setText('[data-about]', config.about);
  setText('[data-footer-line]', config.footerLine);

  if (config.pageTitle) {
    document.title = config.pageTitle;
    const ogTitle = document.getElementById('og-title');
    const twitterTitle = document.getElementById('twitter-title');
    if (ogTitle) ogTitle.setAttribute('content', config.pageTitle);
    if (twitterTitle) twitterTitle.setAttribute('content', config.pageTitle);
  }

  if (config.description) {
    const description = document.getElementById('meta-description');
    const ogDescription = document.getElementById('og-description');
    const twitterDescription = document.getElementById('twitter-description');
    if (description) description.setAttribute('content', config.description);
    if (ogDescription) ogDescription.setAttribute('content', config.description);
    if (twitterDescription) twitterDescription.setAttribute('content', config.description);
  }

  const colors = config.colors || {};
  const root = document.documentElement.style;
  if (colors.background) root.setProperty('--bg', colors.background);
  if (colors.surface) root.setProperty('--surface', colors.surface);
  if (colors.text) root.setProperty('--text', colors.text);
  if (colors.muted) root.setProperty('--muted', colors.muted);
  if (colors.accent) root.setProperty('--accent', colors.accent);
  if (colors.line) root.setProperty('--line', colors.line);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

(() => {
  const products = Array.isArray(window.ENUMIND_PRODUCTS) ? window.ENUMIND_PRODUCTS : [];
  const section = document.querySelector('.products');
  const carousel = document.querySelector('[data-carousel]');
  const track = document.querySelector('[data-carousel-track]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  if (!section || !carousel || !track) return;

  const valid = products.filter((product) => product && product.name && product.link);

  if (!valid.length) {
    section.hidden = true;
    return;
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const createArrowIcon = () => {
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M6.25 13.75 13.75 6.25M8 6.25h5.75V12');
    svg.appendChild(path);
    return svg;
  };

  valid.forEach((product) => {
    const item = document.createElement('li');
    item.className = 'product-card';

    const surface = document.createElement('a');
    surface.className = 'product-card__surface';
    surface.href = product.link;
    surface.target = '_blank';
    surface.rel = 'noopener noreferrer';

    const logoFrame = document.createElement('span');
    logoFrame.className = 'product-card__logo-frame';

    const showFallback = () => {
      logoFrame.replaceChildren();
      logoFrame.classList.add('product-card__logo-frame--fallback');
      logoFrame.textContent = product.name.trim().charAt(0).toUpperCase();
    };

    if (product.logo) {
      const logo = document.createElement('img');
      logo.className = 'product-card__logo';
      logo.src = product.logo;
      logo.alt = '';
      logo.loading = 'lazy';
      logo.decoding = 'async';
      logo.addEventListener('error', showFallback, { once: true });
      logoFrame.appendChild(logo);
    } else {
      showFallback();
    }

    const name = document.createElement('span');
    name.className = 'product-card__name';
    name.textContent = product.name;

    surface.append(logoFrame, name);

    if (product.summary) {
      const summary = document.createElement('span');
      summary.className = 'product-card__summary';
      summary.textContent = product.summary;
      surface.appendChild(summary);
    }

    const cta = document.createElement('span');
    cta.className = 'product-card__cta';
    const ctaLabel = document.createElement('span');
    ctaLabel.textContent = product.linkLabel || 'Visit site';
    cta.append(ctaLabel, createArrowIcon());
    surface.appendChild(cta);

    item.appendChild(surface);
    track.appendChild(item);
  });

  if (valid.length < 2 || !prevBtn || !nextBtn) return;

  const EDGE_TOLERANCE = 8;

  const updateNav = () => {
    const overflowing = track.scrollWidth > track.clientWidth + EDGE_TOLERANCE;

    if (!overflowing) {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.hidden = track.scrollLeft <= EDGE_TOLERANCE;
    nextBtn.hidden = track.scrollLeft >= maxScroll - EDGE_TOLERANCE;
  };

  const scrollByPage = (direction) => {
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: 'smooth' });
  };

  prevBtn.addEventListener('click', () => scrollByPage(-1));
  nextBtn.addEventListener('click', () => scrollByPage(1));

  track.addEventListener('scroll', () => window.requestAnimationFrame(updateNav), { passive: true });
  window.addEventListener('resize', updateNav);

  if ('ResizeObserver' in window) {
    new ResizeObserver(updateNav).observe(track);
  }

  updateNav();
})();
