(function () {
	const stopVideo = (section) => {
		const videos = section.querySelectorAll("video");

		if (videos.length > 0) {
			videos.forEach((video) => {
				video.pause();
			});
		}
	};

	const playVideo = (section) => {
		const videos = section.querySelectorAll("video");

		if (videos.length > 0) {
			videos.forEach((video) => {
				video.play();
			});
		}
	};

	const initSection = () => {
		const sections = document.querySelectorAll(".image-with-text-section");

		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) playVideo(entry.target);
				else stopVideo(entry.target);
			});
		});

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			playVideo(entry.target);
		});

		sections.forEach((section) => {
			sectionObserver.observe(section);
			sectionResizeObserver.observe(section);
		});
	};

	initSection();

	document.addEventListener("shopify:section:load", function () {
		initSection();
	});
})();
