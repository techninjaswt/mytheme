(function () {
	const initCollapsibleContent = () => {
		$(".collapsible-content__toggle").unbind("click").on("click", function () {
			const parent = $(this).parent();

			if (!parent.hasClass("active")) {
				parent
					.siblings(".collapsible-content__item.active")
					.removeClass("active");
				parent.addClass("active");
				$(this)
					.closest(".collapsible-content__items")
					.find(".collapsible-content__answer")
					.stop()
					.slideUp(300);
				$(this).next().stop().slideDown(300);
			} else {
				parent.removeClass("active");
				$(this).next().stop().slideUp(300);
			}
		});

		$(".collapsible-content__item").mouseenter(function (event) {
			$(this).removeClass("collapsible-content__item--opacity");
			$(this)
				.siblings()
				.addClass("collapsible-content__item--opacity");
			$(this).mouseleave(() => {
				$(this)
					.siblings()
					.removeClass("collapsible-content__item--opacity");
			});
		});
	};

	document.addEventListener("shopify:section:load", function () {
		initCollapsibleContent();
	});

	initCollapsibleContent();
})();
