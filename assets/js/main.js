/* ============================================================
   MAIN.JS
   Restrained scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const targets = document.querySelectorAll(
    '.capability-item, .project-feature, .experience-item, .toolkit-group'
  );


  if (!targets.length) {
    return;
  }


  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  if (prefersReducedMotion) {

    targets.forEach(function (target) {
      target.classList.add('visible');
    });

    return;
  }


  targets.forEach(function (target) {
    target.classList.add('reveal');
  });


  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08
    }
  );


  targets.forEach(function (target) {
    observer.observe(target);
  });

});