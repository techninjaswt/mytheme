(() => {
	const categoriesList = () => {
		const categoriesSection = document.querySelector(".categories-list");
		const categoriesItems = document.querySelectorAll(
			".categories-list__item-inner",
		);
		const resizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			if (entry.contentRect.width > 1200) {
				categoriesItems.forEach((item) => {
					item.addEventListener("mouseover", () => {
						item.classList.remove(`${item.getAttribute("data-base")}`);
						item.classList.add(`${item.getAttribute("data-hover")}`);
						if (item.querySelector("video")) item.querySelector("video").play();
					});
					item.addEventListener("mouseout", () => {
						item.classList.remove(`${item.getAttribute("data-hover")}`);
						item.classList.add(`${item.getAttribute("data-base")}`);
						if (item.querySelector("video")) item.querySelector("video").pause();
					});
				});
			}
		});
		resizeObserver.observe(categoriesSection);

		const stopVideo = () => {
			const videos = categoriesSection.querySelectorAll("video");
			if (videos.length > 0) {
				videos.forEach((video) => {
					video.pause();
				});
			}
		};

		stopVideo();
	};

	categoriesList();

	document.addEventListener("shopify:section:load", categoriesList);
})();
