(function () {
  const DELAY_MS = 200;

  const CLICK_SOUND_SRC = "../assets/click.mp3";

  const clickSound = new Audio(CLICK_SOUND_SRC);
  clickSound.preload = "auto";
  clickSound.volume = 1; 

  function getButtonFromEvent(e) {
    return e.target.closest("a.nav-item, a.fab");
  }
  function addPressed(btn)   { if (btn) btn.classList.add("pressed"); }
  function removePressed(btn){ if (btn) btn.classList.remove("pressed"); }

  function onPointerDown(e) {
    const btn = getButtonFromEvent(e);
    if (!btn) return;

    try {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    } catch (_) {}

    addPressed(btn);
  }

  function onPointerUpLike(e) {
    const btn = getButtonFromEvent(e);
    if (!btn) return;
    removePressed(btn);
  }

  function onClick(e) {
    const btn = getButtonFromEvent(e);
    if (!btn) return;

    const href = btn.getAttribute("href");
    if (!href || href === "#" || href.trim() === "") return;

    e.preventDefault();
    btn.classList.add("pressed");
    setTimeout(() => {
      btn.classList.remove("pressed");
      window.location.href = href;
    }, DELAY_MS);
  }

  function init() {
    const footer = document.querySelector("footer.footer");
    if (!footer) return;

    footer.addEventListener("pointerdown", onPointerDown, { passive: true });
    footer.addEventListener("pointerup", onPointerUpLike);
    footer.addEventListener("pointerleave", onPointerUpLike);
    footer.addEventListener("pointercancel", onPointerUpLike);

    footer.addEventListener("mousedown", onPointerDown);
    footer.addEventListener("mouseup", onPointerUpLike);
    footer.addEventListener("mouseleave", onPointerUpLike);
    footer.addEventListener("touchstart", onPointerDown, { passive: true });
    footer.addEventListener("touchend", onPointerUpLike);

    footer.addEventListener("click", onClick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
