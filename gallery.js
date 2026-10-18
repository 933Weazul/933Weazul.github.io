// Tap-to-enlarge for screenshot galleries. No dependencies; links still open the full image without JS.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a'));
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var d = document.createElement('dialog');
  d.className = 'lb';
  d.setAttribute('aria-label', 'Screenshot viewer');
  d.innerHTML = '<div class="stage"><img alt=""><p></p></div>' +
    '<button class="x" aria-label="Close">\u00d7</button><button class="prev" aria-label="Previous">\u2039</button><button class="next" aria-label="Next">\u203a</button>';
  document.body.appendChild(d);
  var img = d.querySelector('img'), cap = d.querySelector('p'), i = 0;
  function show(n) {
    i = (n + links.length) % links.length;
    var a = links[i], t = a.querySelector('img');
    img.src = a.href; img.alt = t.alt; cap.textContent = a.parentNode.querySelector('figcaption').textContent;
  }
  links.forEach(function (a, n) {
    a.addEventListener('click', function (e) { e.preventDefault(); show(n); d.showModal(); });
  });
  d.querySelector('.x').onclick = function () { d.close(); };
  d.querySelector('.prev').onclick = function () { show(i - 1); };
  d.querySelector('.next').onclick = function () { show(i + 1); };
  d.addEventListener('click', function (e) { if (e.target === d || e.target.className === 'stage') d.close(); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  var x0 = null;
  d.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  d.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
  });
})();
