(function(){
    const main = document.querySelector('main');
    const track = document.querySelector('.scroll-track');
    const thumb = document.querySelector('.scroll-thumb');
    if (!main || !track || !thumb) return;
    function updateIndicator(){
        const contentH = main.scrollHeight;
        const viewH = main.clientHeight;
        if (contentH <= viewH) {
            track.classList.add('hidden');
            return;
        } else {
            track.classList.remove('hidden');
        }
        const trackH = track.clientHeight;
        const thumbH = Math.max((viewH / contentH) * trackH, 20);
        thumb.style.height = thumbH + 'px';
        const maxScroll = contentH - viewH;
        const scrollTop = main.scrollTop;
        const maxThumbTop = trackH - thumbH;
        const thumbTop = (scrollTop / maxScroll) * maxThumbTop;
        thumb.style.transform = 'translateY(' + thumbTop + 'px)';
    }
    main.addEventListener('scroll', updateIndicator, { passive: true });
    window.addEventListener('resize', updateIndicator);
    window.requestAnimationFrame(() => {
        updateIndicator();
    });
})();

(function(){
    const box = document.querySelector('.chart-box');
    const month = box.querySelector('.chart-month');
    const year  = box.querySelector('.chart-year');
    const pills = document.querySelectorAll('.pill-switch .pill');

    pills.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;

        pills.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn); });

        const isMonth = view === 'month';
        month.classList.toggle('is-hidden', !isMonth);
        year.classList.toggle('is-hidden', isMonth);
      });
    });
  })();