/* ============================================================
   MAIN.JS
   Restrained progressive enhancement for motion and navigation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const body = document.body;
  const nav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const hero = document.querySelector('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll('.project-gallery-slide'));
    const previous = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    const count = gallery.querySelector('.project-gallery-count');
    const caption = gallery.querySelector('.project-gallery-caption');
    let activeIndex = 0;
    let autoplayId = null;

    if (!slides.length) return;
    gallery.classList.toggle('has-multiple', slides.length > 1);

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        slide.setAttribute('aria-hidden', String(slideIndex !== activeIndex));
      });
      if (count) count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      if (caption) caption.textContent = slides[activeIndex].dataset.galleryLabel || '';
    };

    previous?.addEventListener('click', () => showSlide(activeIndex - 1));
    next?.addEventListener('click', () => showSlide(activeIndex + 1));
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
      if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
    });

    const stopAutoplay = () => window.clearInterval(autoplayId);
    const startAutoplay = () => {
      stopAutoplay();
      if (!reduceMotion && slides.length > 1) {
        autoplayId = window.setInterval(() => showSlide(activeIndex + 1), 6500);
      }
    };

    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', startAutoplay);
    gallery.addEventListener('focusin', stopAutoplay);
    gallery.addEventListener('focusout', startAutoplay);
    showSlide(0);
    startAutoplay();
  });

  const closeMenu = () => {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('is-open', !isOpen);
      body.classList.toggle('menu-open', !isOpen);
    });

    navAnchors.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  if (reduceMotion) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -6% 0px'
    });

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  const sectionMap = navAnchors
    .map((link) => {
      const id = link.getAttribute('href');
      return id && id.startsWith('#')
        ? { link, section: document.querySelector(id) }
        : null;
    })
    .filter(Boolean)
    .filter((item) => item.section);

  if ('IntersectionObserver' in window && sectionMap.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((link) => link.classList.remove('is-active'));
        const active = sectionMap.find((item) => item.section === entry.target);
        if (active) active.link.classList.add('is-active');
      });
    }, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    });

    sectionMap.forEach((item) => sectionObserver.observe(item.section));
  }

  let ticking = false;

  const updateScrollEffects = () => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    root.style.setProperty('--scroll-progress', progress.toFixed(4));
    nav?.classList.toggle('is-scrolled', scrollY > 18);

    if (!reduceMotion && hero) {
      const heroHeight = hero.offsetHeight || window.innerHeight;
      const heroProgress = Math.min(1, Math.max(0, scrollY / heroHeight));
      root.style.setProperty('--hero-shift', `${heroProgress * 34}px`);
    }

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollEffects);
  };

  updateScrollEffects();
  window.addEventListener('scroll', onScroll, { passive: true });
});
