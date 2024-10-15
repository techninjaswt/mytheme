(function () {
	const lookbookSwipers = document.querySelectorAll(".lookbook__swiper");
	const lookbookSlidesWrapper = document.querySelectorAll(".lookbook__slides");

	const initLookbook = () => {
		gsap.registerPlugin(ScrollTrigger);
		const slidesAll =
			document.currentScript.parentElement.querySelectorAll(".lookbook__slide");
		const thisWrapper =
			document.currentScript.parentElement.querySelector(".lookbook__wrapper");
		const thisPin =
			document.currentScript.parentElement.querySelector(".lookbook__slides");

		ScrollTrigger.matchMedia({
			"(min-width: 991px)": function () {
				const slides = gsap.utils.toArray(slidesAll);
				let maxWidth = 0;

				slides.forEach((slide) => {
					maxWidth += slide.offsetWidth;
				});

				gsap.to(slides, {
					x: () => `-${maxWidth - window.innerWidth / 1.03}`,
					ease: "linear",
					scrollTrigger: {
						trigger: thisWrapper,
						pin: thisPin,
						scrub: 1,
						start: () => "top top",
						end: () => `+=${maxWidth / 2}`,
					},
				});
			},
		});
	};

	const resizeLookbook = () => {
		const lookbookSection = document.querySelector(".section-lookbook");

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;

			if (entry.contentRect.width < 991) {
				// for mobile 100vh viewport
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//

				lookbookSwipers.forEach((swiper) => {
					swiper
						.querySelector(".lookbook__slides")
						.classList.add("swiper-wrapper");
					swiper
						.querySelectorAll(".lookbook__slide")
						.forEach((slide) => slide.classList.add("swiper-slide"));

					const lookbookSwiper = new Swiper(swiper, {
						loop: false,
						freeMode: {
							enabled: true,
							momentum: true,
						},
						initialSlide: 0,
						breakpoints: {
							320: {
								slidesPerView: "auto",
							},
							640: {
								slidesPerView: "auto",
							},
						},
					});
				});
			} else {
				// for mobile 100vh viewport
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
				//

				lookbookSwipers.forEach((swiper) => {
					swiper.swiper?.destroy(true, true);
					swiper
						.querySelector(".lookbook__slides")
						.classList.remove("swiper-wrapper");
					swiper
						.querySelectorAll(".lookbook__slide")
						.forEach((slide) => slide.classList.remove("swiper-slide"));
				});
			}
		});

		sectionResizeObserver.observe(lookbookSection);
	};

	resizeLookbook();
	initLookbook();

	document.addEventListener("shopify:section:load", function () {
		resizeLookbook();
		initLookbook();
	});
	
	document.addEventListener("shopify:section:reorder", function () {
		resizeLookbook();
		initLookbook();
	});
	
})();
