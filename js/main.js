(function () {
  "use strict";
  // Sin contadores visibles. Las visitas se miden en privado con GoatCounter
  // (script en cada página) y las descargas se ven en los releases de GitHub.

  // Carrusel de capturas: dots sincronizados con scroll-snap + flechas,
  // y reemplazo del placeholder cuando la captura real existe en assets/screenshots/
  document.querySelectorAll("[data-carousel]").forEach(initCarousel);

  function initCarousel(carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.prototype.slice.call(track.children);
    var dotsBox = carousel.querySelector("[data-carousel-dots]");
    var prevBtn = carousel.querySelector("[data-carousel-prev]");
    var nextBtn = carousel.querySelector("[data-carousel-next]");

    var dots = slides.map(function (slide, index) {
      var dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.setAttribute("aria-label", (index + 1) + "/" + slides.length);
      dot.addEventListener("click", function () {
        goTo(index);
      });
      dotsBox.appendChild(dot);
      return dot;
    });

    prevBtn.addEventListener("click", function () {
      goTo(nearestIndex() - 1);
    });
    nextBtn.addEventListener("click", function () {
      goTo(nearestIndex() + 1);
    });

    var ticking = false;
    track.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        setActive(nearestIndex());
        ticking = false;
      });
    }, { passive: true });

    function slideOffset(index) {
      return slides[index].offsetLeft - (track.clientWidth - slides[index].clientWidth) / 2;
    }

    function goTo(index) {
      var clamped = Math.max(0, Math.min(slides.length - 1, index));
      track.scrollTo({ left: slideOffset(clamped), behavior: "smooth" });
      setActive(clamped);
    }

    function nearestIndex() {
      var target = track.scrollLeft;
      var best = 0;
      var bestDistance = Infinity;
      slides.forEach(function (slide, index) {
        var distance = Math.abs(slideOffset(index) - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      return best;
    }

    function setActive(index) {
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    setActive(nearestIndex());
  }

  // Capturas manuales: si el PNG existe en assets/screenshots/, se muestra
  // en el slide; si no, queda el placeholder con el logo. Así el carrusel
  // se completa soltando las imágenes, sin tocar el HTML.
  document.querySelectorAll(".shot-fallback").forEach(function (fallback) {
    var src = fallback.getAttribute("data-src");
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      var img = document.createElement("img");
      img.className = "shot-image";
      img.src = src;
      img.alt = fallback.getAttribute("data-alt") || "";
      img.loading = "lazy";
      fallback.replaceWith(img);
    };
    probe.src = src;
  });
})();
