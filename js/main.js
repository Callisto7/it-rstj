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
      rewind: true,
      nav: false,
      dots: false,
      center: false,
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
          items: 1.3,
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

    $accordionHeaders.eq(0).addClass("active");
    $accordionBodies.eq(0).addClass("open");

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

    $(".art-stranger").mask("+7 (999) 999-99-99");

    $.fn.setCursorPosition = function (pos) {
      if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
      } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };

    $('input[type="tel"]').click(function () {
      $(this).setCursorPosition(4); // set position number
    });
  });
})(jQuery);
