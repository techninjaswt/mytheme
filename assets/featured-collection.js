(function() {
  let featuredCollectionSlider;

  const stopVideo = (section) => {
    const videos = section.querySelectorAll('video');

		if (videos) {
			videos.forEach(video => {
				video.pause();
			});
		}
  }

  const playVideo = (section) => {
    const videos = section.querySelectorAll('video');
		const slides = section.querySelectorAll('.featured-collection__slider .swiper-slide');

		if (videos.length > 0 && slides.length > 0) {
			slides.forEach(slide => {
				if (slide.querySelector('video')) {
					if (slide.classList.contains('swiper-slide-visible')) 
            slide.querySelector('video').play();
					else 
            slide.querySelector('video').pause();
				}
			});
		}
  }

  const initSlider = () => {
    const featuredCollectionSliders = document.querySelectorAll('.js-collection-slider');

    featuredCollectionSliders.forEach((slider, index) => {
      featuredCollectionSlider = new Swiper(slider, {
        slidesPerView: 1,
        effect: 'fade',
        navigation: {
          nextEl: '.featured-collection__slider-nav .swiper-button-next',
          prevEl: '.featured-collection__slider-nav .swiper-button-prev',
        },
        breakpoints: {
          990: {
            autoplay: {
              delay: slider.dataset.duration * 1000,
              disableOnInteraction: false
            }
          }
        },
        on: {
          afterInit: function() {
            const bullets = this.el.closest('.featured-collection__container').querySelectorAll('.featured-collection__tabs-item');
            const slider = this.el.closest('.featured-collection__container').querySelector('.featured-collection__slider');

            this.el.closest('.featured-collection').addEventListener(slider.closest('.featured-collection').classList.contains('featured-collection--static') ? 'mouseover' : 'click', (e) => {
              let target = e.target;

              if (target.classList.contains('featured-collection__tabs-item')) {
                for (let i = 0; i < bullets.length; i++) {
                  bullets[i].classList.remove('featured-collection__tabs-item--active');
                }
                target.classList.add('featured-collection__tabs-item--active');

                if (this.el !== undefined) {
                  this.slideTo(Array.from(bullets).indexOf(e.target));
                }
              }
            });

            if (window.matchMedia("(min-width: 990px)").matches) {
              slider.addEventListener('mouseenter', () => {
                if (this.el !== undefined) {
                  const activeBullet = this.el.closest('.featured-collection__container').querySelector('.featured-collection__tabs-item--active span');

                  activeBullet.style.animationPlayState = 'paused';
                  this.autoplay.pause();
                }
              });

              slider.addEventListener('mouseleave', () => {
                if (this.el !== undefined) {
                  const activeBullet = this.el.closest('.featured-collection__container').querySelector('.featured-collection__tabs-item--active span');

                  activeBullet.style.animationPlayState = 'running';
                  this.autoplay.resume();
                }
              });
            }

            /* Stop autoplay if section_type = 'static' */
            if (slider.closest('.featured-collection').classList.contains('featured-collection--static')) {
              this.autoplay.stop();
            } else {
              this.autoplay.start();
            }
          },
          slideChange: function() {
            const bullets = this.el.closest('.featured-collection__container').querySelectorAll('.featured-collection__tabs-item');

            for (let i = 0; i < bullets.length; i++) {
              bullets[i].classList.remove('featured-collection__tabs-item--active');
            }

            bullets[this.activeIndex].classList.add('featured-collection__tabs-item--active');

            playVideo(this.el.closest('.featured-collection'));
          }
        }
      });
    });
  }

  const destroySlider = () => {
    if (featuredCollectionSlider !== undefined) {
      featuredCollectionSlider.destroy(true, true);
    }
  };

  const initSection = () => {
    const featuredCollectionSection = document.querySelectorAll('.featured-collection-section');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
					if (entry.isIntersecting) 
						playVideo(entry.target);
					else 
						stopVideo(entry.target);
			})
		});
    
    const sectionResizeObserver = new ResizeObserver((entries) => {
      destroySlider();
      initSlider();
      
      const [entry] = entries;
      playVideo(entry.target);
    });

    destroySlider();
    initSlider();

    featuredCollectionSection.forEach(section => {
      sectionObserver.observe(section);
      sectionResizeObserver.observe(section);
    });
  }

  document.addEventListener('shopify:section:load', function () {
    initSection();
  });

  initSection();
})();