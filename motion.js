(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  // Reveal meaningful content in a staggered sequence as it enters the viewport.
  const revealTargets = [
    'main > section', '.hero-copy > *', '.hero-visual', '.metrics > div',
    '.feature-card', '.step', '.auth-intro > *', '.auth-card > *',
    '.welcome-row > *', '.summary-card', '.dashboard-panel',
    '.profile-card', '.exercise-card', '.session-overview > *'
  ].join(',');
  const targets = [...document.querySelectorAll(revealTargets)];
  targets.forEach((el, index) => {
    if (el.closest('header, footer')) return;
    el.classList.add('motion-reveal');
    if (el.matches('.feature-card, .step, .metrics > div')) {
      el.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
    }
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });
    targets.forEach(el => { if (el.classList.contains('motion-reveal')) observer.observe(el); });
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }

  let ticking = false;
  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${ratio})`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateScrollUI); ticking = true; }
  }, { passive: true });
  updateScrollUI();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.desktop-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
      menuButton.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'باز کردن منو');
      menuButton.textContent = '☰';
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
      }
    });
  }
})();
