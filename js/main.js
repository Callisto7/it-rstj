(function ($) {
  "use strict";

  $(window).on("load", function () {
    /** ===== МЕНЮ ===== */
    function close_toggle() {
      if ($(window).width() <= 768) {
        $(".navbar-collapse a").on("click", () => {
          $(".navbar-collapse").collapse("hide");
        });
      } else {
        $(".navbar .navbar-inverse a").off("click");
      }
    }

    close_toggle();
    $(window).resize(close_toggle);

    $(".mobile-menu-close").on("click", () => {
      $("#navbarCollapse").removeClass("show");
    });

    $(".navbar-toggler").on("click", () => {
      $("#navbarCollapse").css("display", "block");
    });

    /** ===== КАРУСЕЛИ ===== */
    const carouselOptions = {
      loop: true,
      rewind: true,
      nav: false,
      dots: false,
      center: false,
      margin: 24,
      slideSpeed: 8000,
      stopOnHover: true,
      responsiveClass: true,
      responsiveRefreshRate: true,
      responsive: {
        0: { items: 1.2 },
        640: { items: 1.3 },
        768: { items: 2 },
        1024: { items: 3 },
        1440: { items: 3 },
      },
    };

    const $testimonials = $("#testimonials .owl-carousel");
    if ($testimonials.length) {
      $testimonials.owlCarousel({
        ...carouselOptions,
        autoplay: true,
        autoplayTimeout: 5000,
      });

      $(".carousel-next").on("click", function () {
        $testimonials.trigger("next.owl.carousel");
      });
    }

    const $team = $(".team-items .owl-carousel");
    if ($team.length) {
      $team.owlCarousel({
        ...carouselOptions,
        autoplay: false,
      });

      $(".carousel-next").on("click", function () {
        $team.trigger("next.owl.carousel");
      });
    }

    $(".owl-carousel").not("#testimonials .owl-carousel, .team-items .owl-carousel").each(function () {
      const $carousel = $(this);
      $carousel.owlCarousel({
        ...carouselOptions,
        autoplay: false,
      });
      $(".carousel-next").on("click", function () {
        $carousel.trigger("next.owl.carousel");
      });
    });

    const $casesCarousel = $(".items-cases");
    if ($casesCarousel.length) {
      $casesCarousel.owlCarousel({
        ...carouselOptions,
        autoplay: false,
      });

      $(".next-cases").on("click", function () {
        $casesCarousel.trigger("next.owl.carousel");
      });
    }

    // Кастомная карусель (дублирование элементов)
    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".item");
    if (track && items.length) {
      items.forEach((item) => {
        track.appendChild(item.cloneNode(true));
      });
    }

    /** ===== АККОРДЕОН ===== */
    const $accordionHeaders = $(".accordion-header");
    const $accordionBodies = $(".accordion-body");

    if ($accordionHeaders.length && $accordionBodies.length) {
      $accordionHeaders.eq(0).addClass("active");
      $accordionBodies.eq(0).addClass("open").css("max-height", $accordionBodies.eq(0)[0].scrollHeight + "px");

      $accordionHeaders.on("click", function () {
        const $this = $(this);
        const index = $this.data("index");
        const $body = $accordionBodies.eq(index);
        const $header = $accordionHeaders.eq(index);
        const isOpen = $body.hasClass("open");

        $accordionBodies.removeClass("open").css("max-height", "0");
        $accordionHeaders.removeClass("active");

        if (!isOpen) {
          $body.addClass("open").css("max-height", $body[0].scrollHeight + "px");
          $header.addClass("active");

          setTimeout(() => {
            const offset =
              parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-offset")) || 0;
            const top = $header.offset().top - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }, 200);
        }
      });
    }

    /** ===== МАСКА ТЕЛЕФОНА ===== */
    $(".art-stranger").mask("+7 (999) 999-99-99");

    $.fn.setCursorPosition = function (pos) {
      const el = $(this).get(0);
      if (el.setSelectionRange) {
        el.setSelectionRange(pos, pos);
      } else if (el.createTextRange) {
        const range = el.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };

    $('input[type="tel"]').on("click", function () {
      $(this).setCursorPosition(4);
    });

    /** ===== ОТЗЫВЫ (РАСКРЫТИЕ КАРТОЧЕК) ===== */
    document.querySelectorAll(".testimonial-card").forEach((card) => {
      const textCard = card.querySelector(".testimonial-text-card");
      if (textCard) {
        textCard.addEventListener("click", () => {
          document.querySelectorAll(".testimonial-card").forEach((otherCard) => {
            if (otherCard !== card) {
              otherCard.classList.remove("expanded");
              const otherText = otherCard.querySelector(".testimonial-text-card");
              otherText?.classList.remove("expanded");
            }
          });

          textCard.classList.toggle("expanded");
          card.classList.toggle("expanded");
        });
      }
    });

    /** ===== МОДАЛКИ ===== */
    const modal = document.getElementById("projectModal");
    const successModal = document.getElementById("successModal");

    if (modal && successModal) {
      const openButtons = document.querySelectorAll(".open-modal");
      const closeBtn = modal.querySelector(".close-button");
      const form = modal.querySelector(".callback-form");
      const successCloseBtn = successModal.querySelector(".success-close");
      const successButton = successModal.querySelector(".success-button");

      openButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          modal.style.display = "block";
        });
      });

      closeBtn?.addEventListener("click", () => {
        modal.style.display = "none";
      });

      successCloseBtn?.addEventListener("click", () => {
        successModal.style.display = "none";
      });

      successButton?.addEventListener("click", () => {
        successModal.style.display = "none";
      });

      window.addEventListener("click", (event) => {
        if (event.target === modal || event.target === modal.querySelector(".modal-wrapper")) {
          modal.style.display = "none";
        }
        if (event.target === successModal || event.target === successModal.querySelector(".modal-wrapper")) {
          successModal.style.display = "none";
        }
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          modal.style.display = "none";
          successModal.style.display = "none";
        }
      });

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        modal.style.display = "none";
        successModal.style.display = "block";
      });
    }
  });
})(jQuery);
