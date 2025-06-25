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

// const $accordionHeaders = $(".accordion-header");
// const $accordionBodies = $(".accordion-body");

// $accordionHeaders.eq(0).addClass("active");
// $accordionBodies.eq(0).addClass("open");

// $accordionHeaders.on("click", function () {
//   const $this = $(this);
//   const index = $this.data("index");

//   $accordionHeaders.each(function (i) {
//     const $header = $(this);
//     const $body = $accordionBodies.eq(i);

//     if (i === index) {
//       const isOpen = $body.hasClass("open");
//       $body.toggleClass("open", !isOpen);
//       $header.toggleClass("active", !isOpen);

//       if (!isOpen) {
//         // Прокрутка с небольшой задержкой (чтобы отработала анимация открытия)
//         setTimeout(() => {
//           const headerOffset = $header.offset().top;

//           // Можно адаптировать offset если есть fixed-шапка (например, вычесть 80px)
//           $("html, body").animate({ scrollTop: headerOffset - 60 }, 300);
//         }, 200); // подстрой под свою анимацию
//       }
//     } else {
//       $body.removeClass("open");
//       $header.removeClass("active");
//     }
//   });
// });

// const $accordionHeaders = $(".accordion-header");
// const $accordionBodies = $(".accordion-body");

// $accordionHeaders.eq(0).addClass("active");
// $accordionBodies.eq(0).addClass("open").css("max-height", $accordionBodies.eq(0)[0].scrollHeight + "px");

// $accordionHeaders.on("click", function () {
//   const $this = $(this);
//   const index = $this.data("index");

//   $accordionHeaders.each(function (i) {
//     const $header = $(this);
//     const $body = $accordionBodies.eq(i);

//     if (i === index) {
//       const isOpen = $body.hasClass("open");

//       if (isOpen) {
//         $body.css("max-height", "0");
//         $body.removeClass("open");
//         $header.removeClass("active");
//       } else {
//         $body.css("max-height", $body[0].scrollHeight + "px");
//         $body.addClass("open");
//         $header.addClass("active");
//       }
//     } else {
//       $accordionBodies.eq(i).css("max-height", "0").removeClass("open");
//       $accordionHeaders.eq(i).removeClass("active");
//     }
//   });
// });
const $accordionHeaders = $(".accordion-header");
const $accordionBodies = $(".accordion-body");

// Открытие по умолчанию
$accordionHeaders.eq(0).addClass("active");
$accordionBodies.eq(0).addClass("open").css("max-height", $accordionBodies.eq(0)[0].scrollHeight + "px");

$accordionHeaders.on("click", function () {
  const $this = $(this);
  const index = $this.data("index");
  const $body = $accordionBodies.eq(index);
  const $header = $accordionHeaders.eq(index);

  const isOpen = $body.hasClass("open");

  // Закрываем все
  $accordionBodies.each(function (i, el) {
    $(el).removeClass("open").css("max-height", "0");
  });
  $accordionHeaders.removeClass("active");

  if (!isOpen) {
    $body.addClass("open");
    $header.addClass("active");

    // Устанавливаем нужную высоту
    const scrollHeight = $body[0].scrollHeight;
    $body.css("max-height", scrollHeight + "px");

    // Ждём чуть-чуть и плавно скроллим
    setTimeout(() => {
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || 0;
      const top = $header.offset().top - offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }, 200); // задержка чуть больше transition в CSS
  }
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
