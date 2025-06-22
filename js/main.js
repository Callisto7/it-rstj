(function ($) {
  "use strict";

  $(window).on("load", function () {
    function close_toggle() {
      if ($(window).width() <= 768) {
        $(".navbar-collapse a").on("click", function () {
          $(".navbar-collapse").collapse("hide");
        });
      } else {
        $(".navbar .navbar-inverse a").off("click");
      }
    }
    close_toggle();
    $(window).resize(close_toggle);

    $(".mobile-menu-close").on("click", function () {
      var $menu = $("#navbarCollapse");
      $menu.removeClass("show");
    });

    $(".navbar-toggler").on("click", function () {
      var $menu = $("#navbarCollapse");
      $menu.css("display", "block");
    });


    var owl = $(".owl-carousel");
    owl.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      center: true,
      margin: 24,
      slideSpeed: 8000,
      stopOnHover: true,
      autoplay: false,
      responsiveClass: true,
      responsiveRefreshRate: true,
      responsive: {
        0: {
          items: 1.2,
        },
        640: {
          items: 1.2,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1440: {
          items: 3,
        },
      },
    });

    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".item");
    if (track && items.length) {
      items.forEach((item) => {
        track.appendChild(item.cloneNode(true));
      });
    }

    const $accordionHeaders = $(".accordion-header");
    const $accordionBodies = $(".accordion-body");

    $accordionHeaders.on("click", function () {
      const $this = $(this);
      const index = $this.data("index");

      $accordionHeaders.each(function (i) {
        const $header = $(this);
        const $body = $accordionBodies.eq(i);

        if (i === index) {
          const isOpen = $body.hasClass("open");
          $body.toggleClass("open", !isOpen);
          $header.toggleClass("active", !isOpen);
        } else {
          $body.removeClass("open");
          $header.removeClass("active");
        }
      });
    });
  });
})(jQuery);
