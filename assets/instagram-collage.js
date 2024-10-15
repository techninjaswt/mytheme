(function () {
  const initSlider1 = () => {
    const sliders1 = document.querySelectorAll('.js-instagram-collage');

    if (sliders1 && sliders1.length > 0) {
      sliders1.forEach(el => {
        const speed1 = el.getAttribute('data-duration');

        let slider1 = new Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 1,
          loop: true,
          shortSwipes: false,
          longSwipes: false,
          allowTouchMove: false,
          autoplay: {
            delay: 2000
          },
          speed: speed1
        });
      });
    }
  }

  const initSlider2 = () => {
    const sliders2 = document.querySelectorAll('.js-instagram-collage-slow');

    if (sliders2 && sliders2.length > 0) {
      sliders2.forEach(el => {
        const speed2 = el.getAttribute('data-duration');

        let slider2 = new Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 1,
          loop: true,
          shortSwipes: false,
          longSwipes: false,
          allowTouchMove: false,
          autoplay: {
            delay: 2000
          },
          speed: speed2
        });
      });
    }
  }

  const initSliders = () => {
    initSlider1();
    initSlider2();
  }

  const initSection = () => {
    const instagramCollageSection = document.querySelectorAll('.instagram-collage-section');

    const sectionResizeObserver = new ResizeObserver((entries) => {
      $('.js-instagram-collage').each(function () {
        this.swiper.destroy();
      });

      $('.js-instagram-collage-slow').each(function () {
        this.swiper.destroy();
      });

      initSliders();
    });

    initSliders();

    instagramCollageSection.forEach(section => {
      sectionResizeObserver.observe(section);
    });

    instagramCollageSection.forEach(section => {
      section.querySelectorAll('.instagram-collage__slider').forEach((el, i, arr) => {
        el.addEventListener('mouseover', function() {
          arr.forEach(item => {
            if (item.swiper != undefined && item.swiper.autoplay.running) {
              item.swiper.autoplay.pause();
            }
          });
        });

        el.addEventListener('mouseout', function() {
          arr.forEach(item => {
            if (item.swiper != undefined && item.swiper.autoplay.paused) {
              item.swiper.autoplay.resume();
            }
          });
        });
      });
    });
  }

  document.addEventListener('shopify:section:load', function () {
    initSection();
  });

  initSection();
})();
