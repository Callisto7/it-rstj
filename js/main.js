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

    /* Testimonials Carousel 
    ========================================================*/
    var owl = $("#testimonials");
    owl.owlCarousel({
      loop: true,
      nav: false,
      dots: true,
      center: true,
      margin: 15,
      slideSpeed: 1000,
      stopOnHover: true,
      autoPlay: true,
      responsiveClass: true,
      responsiveRefreshRate: true,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        960: { items: 1 },
        1200: { items: 1 },
        1920: { items: 1 },
      },
    });
    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".item");

    if (track && items.length) {
      items.forEach((item) => {
        track.appendChild(item.cloneNode(true));
      });
    }
  });
})(jQuery);
