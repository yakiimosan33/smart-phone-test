/* Responsive unit update */
(function () {
  const setResponsiveUnit = () => {
    const vw = window.innerWidth;
    const rv = vw / 100; // 1% of viewport width
    document.documentElement.style.setProperty('--rv', `${rv}px`);
  };
  setResponsiveUnit();
  window.addEventListener('resize', setResponsiveUnit);
})();

/* Fade-in on scroll */
(function ($) {
  const $fadeElems = $('.js-fade');
  const reveal = () => {
    const windowBottom = $(window).scrollTop() + $(window).height();
    $fadeElems.each(function () {
      const $this = $(this);
      if ($this.offset().top < windowBottom - 100) {
        $this.removeClass('is-m-hide').addClass('is-m-show');
      }
    });
  };
  $fadeElems.addClass('is-m-hide');
  $(window).on('scroll resize', reveal);
  reveal();
})(jQuery);

/* Swiper init for testimonials */
(function () {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
})();