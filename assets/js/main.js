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

  const lightbox = document.createElement('div');
  lightbox.className = 'project-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Expanded project image');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <button class="project-lightbox-close" type="button" aria-label="Close expanded image">&times;</button>
    <button class="project-lightbox-nav project-lightbox-prev" type="button" aria-label="Previous image">&#8592;</button>
    <div class="project-lightbox-content">
      <img src="" alt="">
      <div class="project-lightbox-meta">
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
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = slide.dataset.galleryLabel || image.alt;
    lightboxCount.textContent = `${String(lightboxIndex + 1).padStart(2, '0')} / ${String(lightboxSlides.length).padStart(2, '0')}`;
    lightboxPrevious.hidden = lightboxSlides.length < 2;
    lightboxNext.hidden = lightboxSlides.length < 2;
    lightboxOnChange?.(lightboxIndex);
  };

  const openLightbox = (slides, index, trigger, onChange) => {
    lightboxSlides = slides;
    lightboxTrigger = trigger;
    lightboxOnChange = onChange;
    renderLightbox(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');
    const activeImage = lightboxSlides[lightboxIndex]?.querySelector('img');
    (activeImage || lightboxTrigger)?.focus();
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrevious.addEventListener('click', () => renderLightbox(lightboxIndex - 1));
  lightboxNext.addEventListener('click', () => renderLightbox(lightboxIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') renderLightbox(lightboxIndex - 1);
    if (event.key === 'ArrowRight') renderLightbox(lightboxIndex + 1);
    if (event.key === 'Tab') {
      const controls = [lightboxClose, lightboxPrevious, lightboxNext].filter((control) => !control.hidden);
      const currentIndex = controls.indexOf(document.activeElement);
      if (event.shiftKey && currentIndex <= 0) {
        event.preventDefault();
        controls[controls.length - 1].focus();
      } else if (!event.shiftKey && currentIndex === controls.length - 1) {
        event.preventDefault();
        controls[0].focus();
      }
    }
  });

  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll('.project-gallery-slide'));
    const previous = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    const count = gallery.querySelector('.project-gallery-count');
    const caption = gallery.querySelector('.project-gallery-caption');
    let activeIndex = 0;

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
    slides.forEach((slide, slideIndex) => {
      const image = slide.querySelector('img');
      if (!image) return;
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.alt}. Open full-size image`);
      image.addEventListener('click', () => openLightbox(slides, slideIndex, image, showSlide));
      image.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openLightbox(slides, slideIndex, image, showSlide);
      });
    });
    showSlide(0);
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
