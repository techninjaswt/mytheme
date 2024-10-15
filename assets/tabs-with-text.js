(function () {
	const initTabsWithProducts = () => {
		const tabsParent = $(".tabs-with-text");
		const tabs = tabsParent.find(".twt__tabs-item");

		tabs.on("click", function () {
			const tabsContent = $(this)
				.closest(".twt__tabs")
				.next()
				.find(".twt__content-item");

			if (!$(this).is("[data-active]")) {
				$(this).parent().find("[data-active]").removeAttr("data-active");
				$(this).attr("data-active", "");
				tabsContent
					.hide()
					.eq($(this).index())
					.fadeIn(300)
					.css("display", "flex");
			}
		});

		tabsParent.each(function (index, elem) {
			const tabsSlider = elem.querySelector(".twt__tabs");
			const tabsPrev = elem.querySelector(".twt__prev");
			const tabsNext = elem.querySelector(".twt__next");

			let slider = new Swiper(tabsSlider, {
				slidesPerView: "auto",
				spaceBetween: 32,
				freeMode: true,
				navigation: {
					nextEl: tabsNext,
					prevEl: tabsPrev,
				},
				breakpoints: {
					990: {
						spaceBetween: 64,
					},
				},
				on: {
					afterInit: function() {
						let slidesWidth = 0;
						const offset = window.matchMedia("(min-width: 990px)").matches ? 64 : 32;

						this.slides.forEach(elem => {
							slidesWidth += elem.offsetWidth + offset;
						});

						slidesWidth -= offset;

						if (slidesWidth < this.el.offsetWidth) {
							this.el.querySelector('.twt__nav').style.display = 'none';
						} else {
							this.el.querySelector('.twt__nav').style.display = 'flex';
						}
					}
				}
			});
		});
	};

	const initSection = () => {
		const sections = document.querySelectorAll('.tabs-with-text');

		const sectionResizeObserver = new ResizeObserver((entries) => {
			initTabsWithProducts();
		});

		initTabsWithProducts();

		sections.forEach(item => {
			sectionResizeObserver.observe(item);
		});
	};

	initSection();

	document.addEventListener("shopify:section:load", function () {
		initSection();
	});
})();
