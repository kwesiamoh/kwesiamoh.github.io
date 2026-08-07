/* ============================================================
   MAIN.JS
   Restrained scroll reveal using IntersectionObserver
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) {
    return;
  }


  /* Respect the user's operating-system motion preference */

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


  if (prefersReducedMotion) {

    revealElements.forEach(function (element) {
      element.classList.add('visible');
    });

    return;
  }


  /* Reveal elements once when they enter the viewport */

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
      threshold: 0.1
    }
  );


  revealElements.forEach(function (element) {
    observer.observe(element);
  });

});