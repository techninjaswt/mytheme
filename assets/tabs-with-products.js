(function() {
  const initTabsWithProducts = () => {
    const tabsParent = $(".tabs-with-products");
    const toggleBtn = tabsParent.find(".twp__toggle");
    const tabs = tabsParent.find(".twp__tabs-item");
    const scrollWrapper = tabsParent.find(".twp__inner-scroll-wrapper");

    toggleBtn.off('click');
    toggleBtn.on("click", function() {
      if ($(this).prev().is(':visible')) {
        $(this).prev().removeClass('opened');
        $(this).prev().stop().slideUp(300);
        $(this).parent().prev().css('background-color', `rgba(var(--color-overlay), ${$(this).parent().prev().data('overlay')})`);
      } else {
        $(this).prev().addClass('opened');
        $(this).prev().stop().slideDown(300);
        $(this).parent().prev().css('background-color', `rgba(var(--color-overlay), ${($(this).parent().prev().data('overlay') + 0.1).toFixed(1)}`);
      }
    });

    $(document).on("mouseup", function(e) {
      const elem = $(".twp__inner-scroll-wrapper.opened");

      if (elem &&
        !elem.is(e.target) &&
        !elem.next().is(e.target) &&
        elem.has(e.target).length === 0 &&
        elem.next().has(e.target).length === 0
      ) {
        elem.removeClass('opened');
        elem.hide();
        elem.parent().prev().css('background-color', `rgba(var(--color-overlay), ${elem.parent().prev().data('overlay')})`);
      }
    });

    tabs.on("click", function() {
      const tabsContent = $(this).closest('.twp__tabs').next().find(".twp__content-item");
      const elem = $(".twp__inner-scroll-wrapper.opened");

      if (!$(this).is("[data-active]")) {
        tabsContent.eq($(this).index()).find('.twp__overlay').css('background-color', `rgba(var(--color-overlay), ${tabsContent.eq($(this).index()).find('.twp__overlay').data('overlay')})`);

        $(this).parent().find("[data-active]").removeAttr("data-active");
        $(this).attr("data-active", "");
        tabsContent.hide().eq($(this).index()).fadeIn(300).css("display", "flex");

        scrollWrapper.hide();
      }
    });

    tabsParent.each(function(index, elem) {
      const tabsSlider = elem.querySelector(".twp__tabs");
      const tabsPrev = elem.querySelector(".twp__prev");
      const tabsNext = elem.querySelector(".twp__next");

      let slider = new Swiper(tabsSlider, {
        slidesPerView: 'auto',
        spaceBetween: 32,
        freeMode: true,
        navigation: {
          nextEl: tabsNext,
          prevEl: tabsPrev,
        },
        breakpoints: {
          990: {
            spaceBetween: 64
          }
        }
      });
    });
  }

  initTabsWithProducts();

  document.addEventListener("shopify:section:load", function () {
    initTabsWithProducts();
  });
})();