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

    // Для блока с отзывами
    $("#testimonials .owl-carousel").owlCarousel({
      loop: true,
      rewind: true,
      nav: false,
      dots: false,
      center: false,
      margin: 24,
      slideSpeed: 8000,
      stopOnHover: true,
      autoplay: true, // autoplay включен
      autoplayTimeout: 5000,
      responsiveClass: true,
      responsiveRefreshRate: true,
      responsive: {
        0: { items: 1.2 },
        640: { items: 1.3 },
        768: { items: 2 },
        1024: { items: 3 },
        1440: { items: 3 },
      },
    });

    // Для всех остальных owl-carousel, где autoplay не нужен
    $(".owl-carousel")
      .not("#testimonials .owl-carousel")
      .each(function () {
        $(this).owlCarousel({
          loop: true,
          rewind: true,
          nav: false,
          dots: false,
          center: false,
          margin: 24,
          slideSpeed: 8000,
          stopOnHover: true,
          autoplay: false, // autoplay отключен
          responsiveClass: true,
          responsiveRefreshRate: true,
          responsive: {
            0: { items: 1.2 },
            640: { items: 1.3 },
            768: { items: 2 },
            1024: { items: 3 },
            1440: { items: 3 },
          },
        });
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

    // Открытие по умолчанию
    $accordionHeaders.eq(0).addClass("active");
    $accordionBodies
      .eq(0)
      .addClass("open")
      .css("max-height", $accordionBodies.eq(0)[0].scrollHeight + "px");

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
          const offset =
            parseInt(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--header-offset"
              )
            ) || 0;
          const top = $header.offset().top - offset;

          window.scrollTo({
            top,
            behavior: "smooth",
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
    document.querySelectorAll(".testimonial-card").forEach((card) => {
      const textCard = card.querySelector(".testimonial-text-card");

      textCard.addEventListener("click", () => {
        // Закрываем все карточки
        document.querySelectorAll(".testimonial-card").forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove("expanded");
            const otherText = otherCard.querySelector(".testimonial-text-card");
            otherText.classList.remove("expanded");
          }
        });

        // Переключаем текущую карточку
        textCard.classList.toggle("expanded");
        card.classList.toggle("expanded");
      });
    });
    const modal = document.getElementById("projectModal");
    const openBtn = document.getElementById("openModal");
    const closeBtn = modal.querySelector(".close-button");

    const successModal = document.getElementById("successModal");
    const successCloseBtn = successModal.querySelector(".success-close");
    const successButton = successModal.querySelector(".success-button");

    const form = modal.querySelector(".callback-form");

    openBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    successCloseBtn.addEventListener("click", function () {
      successModal.style.display = "none";
    });

    successButton.addEventListener("click", function () {
      successModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (
        event.target === modal ||
        event.target === modal.querySelector(".modal-wrapper")
      ) {
        modal.style.display = "none";
      }
      if (
        event.target === successModal ||
        event.target === successModal.querySelector(".modal-wrapper")
      ) {
        successModal.style.display = "none";
      }
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
        successModal.style.display = "none";
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Здесь может быть валидация и отправка на сервер

      // Закрываем первую модалку
      modal.style.display = "none";

      // Открываем модалку "спасибо"
      successModal.style.display = "block";
    });
  });
})(jQuery);
