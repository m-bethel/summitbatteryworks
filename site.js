// Hex-offset ring grid with a filled "peak" (1-2-3 dots), as on the card.
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var filled = { "2,500": 1, "3,450": 1, "3,550": 1, "4,400": 1, "4,500": 1, "4,600": 1 };
  document.querySelectorAll(".pattern").forEach(function (svg) {
    var rows = parseInt(svg.getAttribute("data-rows") || "5", 10);
    var h = 40 + rows * 88;
    svg.setAttribute("viewBox", "0 0 1000 " + h);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Grid of battery cells forming a peak");
    for (var r = 0; r < rows; r++) {
      var y = 60 + r * 88;
      var off = r % 2 ? 50 : 0;
      for (var i = -1; i <= 10; i++) {
        var x = off + i * 100;
        var c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", 38);
        var f = filled[r + "," + x];
        if (f) { c.setAttribute("fill", "var(--fill)"); c.setAttribute("stroke", "none"); }
        else { c.setAttribute("fill", "none"); c.setAttribute("stroke", "var(--ring)"); c.setAttribute("stroke-width", 6); }
        svg.appendChild(c);
      }
    }
  });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); };
      var fallback = function () {
        var li = btn.closest("li"); var v = li && li.querySelector(".v");
        if (v && window.getSelection) { var rg = document.createRange(); rg.selectNodeContents(v); var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg); }
        btn.textContent = "Selected";
      };
      try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
    });
  });
})();
