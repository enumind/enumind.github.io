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

  const github = document.querySelector('[data-github-link]');
  if (github && config.githubUrl) github.href = config.githubUrl;

  const contact = document.querySelector('[data-contact-link]');
  if (contact && config.contactEmail) {
    contact.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent('EnuMind inquiry')}`;
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
