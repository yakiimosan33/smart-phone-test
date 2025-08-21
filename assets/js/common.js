(function() {
  'use strict';

  // Responsive variable --rv based on viewport width
  function setResponsiveVariable() {
    var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // base on 100vw = 100 units, clamp to reasonable range
    var unit = vw / 100; // 1vw equivalent
    // Optional clamp for desktop/large screens for readability
    var clamped = Math.max(3.2, Math.min(unit, 12));
    document.documentElement.style.setProperty('--rv', clamped + 'px');
  }

  setResponsiveVariable();
  window.addEventListener('resize', setResponsiveVariable);

  // Smooth scroll for internal anchors
  document.addEventListener('click', function(e) {
    var target = e.target.closest('a[href^="#"]');
    if (!target) return;
    var id = target.getAttribute('href');
    if (id.length <= 1) return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var header = document.getElementById('header');
    var headerH = header ? header.offsetHeight : 0;
    var top = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 8);
    window.scrollTo({ top: top, behavior: 'smooth' });
  }, false);

  // Fade-in on scroll
  function onScrollReveal() {
    var nodes = document.querySelectorAll('.is-m-hide');
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < nodes.length; i++) {
      var rect = nodes[i].getBoundingClientRect();
      if (rect.top < vh * 0.85) {
        nodes[i].classList.remove('is-m-hide');
        nodes[i].classList.add('is-m-show');
      }
    }
  }
  window.addEventListener('scroll', onScrollReveal);
  window.addEventListener('load', onScrollReveal);

  // Header active state on scroll
  function updateHeaderShadow() {
    var header = document.getElementById('header');
    if (!header) return;
    if (window.pageYOffset > 4) {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', updateHeaderShadow);
  window.addEventListener('load', updateHeaderShadow);

  // Footer year
  var y = document.getElementById('js-year');
  if (y) y.textContent = new Date().getFullYear();

  // Swiper init (Voice)
  window.addEventListener('load', function() {
    if (typeof Swiper === 'undefined') return;
    var el = document.querySelector('.js-voice-swiper');
    if (!el) return;
    new Swiper(el, {
      loop: true,
      spaceBetween: 16,
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
      autoplay: { delay: 4000 },
      breakpoints: {
        0: { slidesPerView: 1 },
        750: { slidesPerView: 2 }
      }
    });
  });

  // FAQ accordion
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.js-acc-btn');
    if (!btn) return;
    var panel = btn.parentElement.querySelector('.js-acc-panel');
    if (!panel) return;
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      panel.hidden = true;
    } else {
      panel.hidden = false;
    }
  });
})();

