(function () {
	const stopVideo = (section) => {
    const videos = section.querySelectorAll('video');

		if (videos) {
			videos.forEach(video => {
				video.pause();
			});
		}
  }

	const playVideo = (section, width) => {
    const videos = section.querySelectorAll('video');
		const cards = section.querySelectorAll('.gallery-with-text__card');

		if (videos && cards) {
			cards.forEach(card => {
				if (card.querySelector('video')) {
					if (card.classList.contains('active') || width < 990) 
						card.querySelector('video').play();
					else 
						card.querySelector('video').pause();
				}
			});
		}
  }

	const galleryTextSlide = () => {
		$(".gallery-with-text__card").hover(function () {
			let $this = $(this);
			$this.addClass("active");
			$this.siblings(".gallery-with-text__card").removeClass("active");
			setTimeout(function () {
				$this
					.children(".gallery-with-text__info")
					.children(".link--overlay")
					.addClass("active");
				$this
					.siblings(".gallery-with-text__card")
					.children(".gallery-with-text__info")
					.children(".link--overlay")
					.removeClass("active");
			}, 100);

			playVideo($this.closest('.gallery-with-text-section')[0], document.documentElement.clientWidth);
		});
	};

	const initSection = () => {
		const sections = document.querySelectorAll('.gallery-with-text-section');

		const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
					if (entry.isIntersecting) 
						playVideo(entry.target, entry.boundingClientRect.width);
					else 
						stopVideo(entry.target);
			})
		});

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;
			playVideo(entry.target, entry.contentRect.width);			
		})

		sections.forEach(section => {
      sectionObserver.observe(section);
			sectionResizeObserver.observe(section);
    });

		galleryTextSlide();
	}

	document.addEventListener("shopify:section:load", function () {
		initSection();
	});

	initSection();
})();
