(function () {
  "use strict";

  function setCounts(visitas, descargas) {
    var v = document.getElementById("visitas");
    var d = document.getElementById("descargas");
    if (v && typeof visitas === "number") v.textContent = visitas.toLocaleString();
    if (d && typeof descargas === "number") d.textContent = descargas.toLocaleString();
  }

  async function loadCounters() {
    var visitas = null;
    var descargas = null;

    try {
      var res = await fetch("https://kuida-landing.goatcounter.com/counter/" + encodeURIComponent(location.pathname) + ".json");
      if (res.ok) {
        var data = await res.json();
        if (data && typeof data.count === "number") visitas = data.count;
      }
    } catch (e) {
      /* sin visitas visibles, seguimos */
    }

    try {
      var resD = await fetch("https://api.github.com/repos/matalb23/kuida-landing/releases");
      if (resD.ok) {
        var releases = await resD.json();
        descargas = releases.reduce(function (total, rel) {
          return total + rel.assets.reduce(function (sum, asset) {
            return sum + asset.download_count;
          }, 0);
        }, 0);
      }
    } catch (e) {
      /* sin contador de descargas, seguimos */
    }

    setCounts(visitas, descargas);
  }

  if (document.getElementById("visitas") || document.getElementById("descargas")) {
    loadCounters();
  }
})();
