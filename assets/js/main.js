/**
 * ColorSure — minimal site interactions
 * Mobile nav, FAQ accordion, contact form validation/success, optional scroll reveal
 */
(function () {
  "use strict";

  /* --- Mobile navigation --- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !open);
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 900px)").matches) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  /* --- FAQ accordion --- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var trigger = item.querySelector(".faq__trigger");
    var panel = item.querySelector(".faq__panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq__item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var t = other.querySelector(".faq__trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", !isOpen);
    });
  });

  /* --- Contact form --- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var required = form.querySelectorAll("[required]");

      required.forEach(function (field) {
        var wrap = field.closest(".form__field");
        if (!wrap) return;
        var err = wrap.querySelector(".form__error");
        var empty = !field.value || !String(field.value).trim();
        var emailInvalid =
          field.type === "email" &&
          field.value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

        if (empty || emailInvalid) {
          valid = false;
          wrap.classList.add("is-invalid");
          if (err) {
            err.textContent = emailInvalid
              ? "Please enter a valid email address."
              : "This field is required.";
          }
        } else {
          wrap.classList.remove("is-invalid");
        }
      });

      var success = document.getElementById("form-success");
      if (valid) {
        form.style.display = "none";
        if (success) {
          success.classList.add("is-visible");
          if (success.hasAttribute("tabindex")) success.focus();
        }
      }
    });
  }

  /* --- Subtle reveal on scroll --- */
  if ("IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length) {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }
      );
      revealEls.forEach(function (el) {
        obs.observe(el);
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
