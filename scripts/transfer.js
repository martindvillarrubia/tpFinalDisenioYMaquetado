(function () {
    const input = document.getElementById('amount');
    if (!input) return;

    const computed = getComputedStyle(input);
    const baseSize = parseFloat(input.dataset.baseSize) || parseFloat(computed.fontSize) || 96;
    const minSize = 12;

    input.style.fontSize = baseSize + 'px';
    input.style.lineHeight = Math.ceil(baseSize) + 'px';
    input.style.height = Math.ceil(baseSize) + 'px';
    input.style.display = input.style.display || 'inline-block';
    input.style.overflow = 'hidden';
    input.style.whiteSpace = 'nowrap';
    input.style.textOverflow = 'ellipsis';
    input.style.boxSizing = 'border-box';
    input.style.padding = input.style.padding || computed.padding || '0';

    const measurer = document.createElement('span');
    document.body.appendChild(measurer);
    const mStyle = measurer.style;
    mStyle.position = 'absolute';
    mStyle.visibility = 'hidden';
    mStyle.whiteSpace = 'nowrap';
    mStyle.fontFamily = computed.fontFamily;
    mStyle.fontWeight = computed.fontWeight;
    mStyle.letterSpacing = computed.letterSpacing;
    mStyle.padding = '0';
    mStyle.margin = '0';
    mStyle.boxSizing = 'border-box';

    function availableWidth() {
        const cs = getComputedStyle(input);
        const padLeft = parseFloat(cs.paddingLeft) || 0;
        const padRight = parseFloat(cs.paddingRight) || 0;
        return Math.max(8, input.clientWidth - padLeft - padRight - 2);
    }

    function measureAtSize(text, size) {
        mStyle.fontSize = size + 'px';
        measurer.textContent = text || input.placeholder || '$0,00';
        return measurer.getBoundingClientRect().width || 0;
    }

    function fit() {
        const text = input.value || input.placeholder || '$0,00';
        const avail = availableWidth();

        if (measureAtSize(text, baseSize) <= avail) {
            input.style.fontSize = baseSize + 'px';
            input.style.lineHeight = Math.ceil(baseSize) + 'px';
            return;
        }
        let low = minSize;
        let high = baseSize;
        let best = minSize;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const w = measureAtSize(text, mid);
            if (w <= avail) {
                best = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        input.style.fontSize = best + 'px';
        input.style.lineHeight = Math.ceil(baseSize) + 'px';
    }

    input.addEventListener('input', fit, { passive: true });
    input.addEventListener('change', fit, { passive: true });
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit);
})();