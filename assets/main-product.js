(function () {
  const initProductAccordion = () => {
		$(".about__accordion-toggle").click(function () {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$(this)
					.siblings(".about__accordion-description")
					.eq($(this).index())
					.stop()
					.slideDown(300);
			} else {
				$(this).removeClass("active");
				$(this).siblings(".about__accordion-description").stop().slideUp(300);
			}
		});
  };

  const initZoomImage = () => {
    const imagesWrapper = document.querySelector('.product-media-modal__content');
    const images = imagesWrapper.querySelectorAll('.js-image-zoom');

    images.forEach(el => {
      el.addEventListener('click', (e) => {
        imagesWrapper.classList.toggle('zoom');
      });
    })
  };

  document.addEventListener('shopify:section:load', function () {
    initProductAccordion();
    initZoomImage();
  });

  initProductAccordion();
  initZoomImage();
})();
