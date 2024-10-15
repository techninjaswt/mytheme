(function() {
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
		const slides = section.querySelectorAll('.swiper-slide');

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
    const sliders = document.querySelectorAll('.carousel__slider');

    sliders.forEach((slider, index) => {
      let columns1360 = Number(slider.dataset.columns);
      let columns1200 = 3;
      if (columns1360 == 5) 
        columns1200 = 4;
      else if (columns1360 < 3) 
        columns1200 = columns1360;
      let columns990 = 3;
      if (columns1360 < 3) 
        columns990 = columns1200;
      let columns990PerView = Number(columns990 + 0.05);
      let columns576 = 2;
      if (columns1360 < 2) 
        columns576 = columns990;
      let columns576PerView = Number(columns576 + 0.05);

      const carouselSlider = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 8,
        watchSlidesProgress: true,
        speed: 1000,
        navigation: {
          nextEl: ".carousel__slider-nav .swiper-button-next",
          prevEl: ".carousel__slider-nav .swiper-button-prev",
        },
        breakpoints: {
          576: {
            slidesPerView: columns576PerView,
            slidesPerGroup: columns576
          },
          990: {
            slidesPerView: columns990PerView,
            slidesPerGroup: columns990
          },
          1200: {
            slidesPerView: columns1200,
            slidesPerGroup: columns1200
          },
          1360: {
            slidesPerView: columns1360,
            slidesPerGroup: columns1360
          }
        },
        on: {
          slideChange: function() {
            playVideo(this.el.closest('.section-carousel'));
          }
        }
      })
    })
  }

  const initSection = () => {
    const sections = document.querySelectorAll('.section-carousel');

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
			const [entry] = entries;
			playVideo(entry.target);			
		})

    sections.forEach(section => {
      sectionObserver.observe(section);
			sectionResizeObserver.observe(section);
    });

    initSlider();
  }

  initSection();

  document.addEventListener('shopify:section:load', function () {
    initSection();
  });
})()