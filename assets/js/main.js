/* ============================================================
   MAIN.JS
   Scroll-reveal using IntersectionObserver
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
});
