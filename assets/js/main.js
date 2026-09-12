/* ============================================================
   MAIN.JS
   Progressive enhancement for navigation, galleries and motion
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const body = document.body;
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const skipLink = document.querySelector('.skip-link');
  const nav = document.querySelector('.site-nav');
  const navBrand = document.querySelector('.nav-brand');
  const navToggle = document.querySelector('.nav-toggle');
  const navToggleLabel = navToggle?.querySelector('span:first-child');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const hero = document.querySelector('.hero');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileNavQuery = window.matchMedia('(max-width: 820px)');
  let reduceMotion = reducedMotionQuery.matches;

  /* Native dialog gives the viewer platform-level modality and focus containment. */
  const lightbox = document.createElement('dialog');
  lightbox.className = 'project-lightbox';
  lightbox.setAttribute('aria-label', 'Expanded project image viewer');
  lightbox.innerHTML = `
    <button class="project-lightbox-close" type="button" aria-label="Close expanded image">&times;</button>
    <button class="project-lightbox-nav project-lightbox-prev" type="button" aria-label="Previous image">&#8592;</button>
    <div class="project-lightbox-content">
      <img alt="">
      <div class="project-lightbox-meta" aria-live="polite" aria-atomic="true">
        <span class="project-lightbox-caption"></span>
        <span class="project-lightbox-count"></span>
      </div>
    </div>
    <button class="project-lightbox-nav project-lightbox-next" type="button" aria-label="Next image">&#8594;</button>`;
  body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.project-lightbox-caption');
  const lightboxCount = lightbox.querySelector('.project-lightbox-count');
  const lightboxClose = lightbox.querySelector('.project-lightbox-close');
  const lightboxPrevious = lightbox.querySelector('.project-lightbox-prev');
  const lightboxNext = lightbox.querySelector('.project-lightbox-next');
  let lightboxSlides = [];
  let lightboxIndex = 0;
  let lightboxTrigger = null;
  let lightboxOnChange = null;

  const renderLightbox = (index) => {
    if (!lightboxSlides.length) return;
    lightboxIndex = (index + lightboxSlides.length) % lightboxSlides.length;
    const slide = lightboxSlides[lightboxIndex];
    const image = slide.querySelector('img');
    const label = slide.dataset.galleryLabel || image.alt;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = label;
    lightboxCount.textContent = `${String(lightboxIndex + 1).padStart(2, '0')} / ${String(lightboxSlides.length).padStart(2, '0')}`;
    lightboxPrevious.hidden = lightboxSlides.length < 2;
    lightboxNext.hidden = lightboxSlides.length < 2;
    lightboxOnChange?.(lightboxIndex, false);
  };

  const openLightbox = (slides, index, trigger, onChange) => {
    if (typeof lightbox.showModal !== 'function') return;
    lightboxSlides = slides;
    lightboxTrigger = trigger;
    lightboxOnChange = onChange;
    renderLightbox(index);
    body.classList.add('lightbox-open');
    lightbox.showModal();
    window.requestAnimationFrame(() => lightboxClose.focus());
  };

  const closeLightbox = () => {
    if (!lightbox.open) return;
    lightbox.close();
  };

  lightbox.addEventListener('close', () => {
    body.classList.remove('lightbox-open');
    const activeTrigger = lightboxSlides[lightboxIndex]?.querySelector('.project-gallery-open');
    (activeTrigger || lightboxTrigger)?.focus();
  });

  lightbox.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLightbox();
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrevious.addEventListener('click', () => renderLightbox(lightboxIndex - 1));
  lightboxNext.addEventListener('click', () => renderLightbox(lightboxIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      renderLightbox(lightboxIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      renderLightbox(lightboxIndex + 1);
    }
  });

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll('.project-gallery-slide'));
    const previous = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    const count = gallery.querySelector('.project-gallery-count');
    const caption = gallery.querySelector('.project-gallery-caption');
    const track = gallery.querySelector('.project-gallery-track');
    const status = document.createElement('span');
    let activeIndex = 0;
    let pointerStart = null;

    if (!slides.length) return;

    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    gallery.appendChild(status);
    caption?.removeAttribute('aria-live');
    gallery.classList.toggle('has-multiple', slides.length > 1);
    gallery.setAttribute('aria-roledescription', 'carousel');

    const showSlide = (index, announce = true) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        const opener = slide.querySelector('.project-gallery-open');
        const label = slide.dataset.galleryLabel || `Image ${slideIndex + 1}`;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${slideIndex + 1} of ${slides.length}: ${label}`);
        slide.inert = !isActive;
        if (opener) opener.tabIndex = isActive ? 0 : -1;
      });

      const label = slides[activeIndex].dataset.galleryLabel || '';
      const position = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      if (count) count.textContent = position;
      if (caption) caption.textContent = label;
      if (announce) status.textContent = `${label}. Image ${activeIndex + 1} of ${slides.length}.`;
    };

    previous?.addEventListener('click', () => showSlide(activeIndex - 1));
    next?.addEventListener('click', () => showSlide(activeIndex + 1));

    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(activeIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(activeIndex + 1);
      }
    });

    slides.forEach((slide, slideIndex) => {
      const opener = slide.querySelector('.project-gallery-open');
      opener?.addEventListener('click', () => openLightbox(slides, slideIndex, opener, showSlide));
    });

    track?.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });

    track?.addEventListener('pointerup', (event) => {
      if (!pointerStart || event.pointerId !== pointerStart.id) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
      showSlide(activeIndex + (deltaX < 0 ? 1 : -1));
    });

    track?.addEventListener('pointercancel', () => {
      pointerStart = null;
    });

    showSlide(0, false);
  });

  const setPageInert = (isInert) => {
    [main, footer, skipLink].forEach((element) => {
      if (element) element.inert = isInert;
    });
  };

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!navToggle || !navLinks) return;
    const wasOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    body.classList.remove('menu-open');
    setPageInert(false);
    if (navToggleLabel) navToggleLabel.textContent = 'Menu';
    if (wasOpen && restoreFocus) navToggle.focus();
  };

  const openMenu = () => {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-open');
    body.classList.add('menu-open');
    setPageInert(true);
    if (navToggleLabel) navToggleLabel.textContent = 'Close';
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });

    navAnchors.forEach((link) => link.addEventListener('click', () => closeMenu()));

    nav.addEventListener('keydown', (event) => {
      if (navToggle.getAttribute('aria-expanded') !== 'true') return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [navBrand, navToggle, ...navAnchors].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    mobileNavQuery.addEventListener('change', (event) => {
      if (!event.matches) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || navToggle.getAttribute('aria-expanded') !== 'true') return;
      event.preventDefault();
      closeMenu({ restoreFocus: true });
    });
  }

  const revealAll = () => revealTargets.forEach((target) => target.classList.add('is-visible'));

  if (reduceMotion) {
    revealAll();
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
    revealAll();
  }

  reducedMotionQuery.addEventListener('change', (event) => {
    reduceMotion = event.matches;
    if (reduceMotion) {
      root.style.setProperty('--hero-shift', '0px');
      revealAll();
    }
  });

  const sectionMap = navAnchors
    .map((link) => {
      const id = link.getAttribute('href');
      return id?.startsWith('#') ? { link, section: document.querySelector(id) } : null;
    })
    .filter((item) => item?.section);

  const setCurrentSection = (activeLink) => {
    navAnchors.forEach((link) => {
      const isCurrent = link === activeLink;
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window && sectionMap.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const active = sectionMap.find((item) => item.section === visible.target);
      if (active) setCurrentSection(active.link);
    }, {
      rootMargin: '-28% 0px -58% 0px',
      threshold: [0, 0.1, 0.25]
    });

    sectionMap.forEach((item) => sectionObserver.observe(item.section));
  }

  let ticking = false;
  let heroHeight = hero?.offsetHeight || window.innerHeight;

  const updateScrollEffects = () => {
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    root.style.setProperty('--scroll-progress', progress.toFixed(4));
    nav?.classList.toggle('is-scrolled', scrollY > 12);

    if (!reduceMotion && hero) {
      const heroProgress = Math.min(1, Math.max(0, scrollY / heroHeight));
      root.style.setProperty('--hero-shift', `${heroProgress * 22}px`);
    }

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollEffects);
  };

  window.addEventListener('resize', () => {
    heroHeight = hero?.offsetHeight || window.innerHeight;
  }, { passive: true });

  updateScrollEffects();
  window.addEventListener('scroll', onScroll, { passive: true });
});
