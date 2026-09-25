document.addEventListener('DOMContentLoaded', () => {

    const opcoes = document.querySelectorAll('.opcao_de_pontos a');

    // 👇 NOVA LINHA: marca o primeiro item como ativo ao carregar a página
    if (opcoes.length > 0) {
        opcoes[0].classList.add('active');
    }

    opcoes.forEach(opcao => {

        opcao.addEventListener('click', (e) => {

            e.preventDefault();

            // Remove a seleção de todos os itens
            opcoes.forEach(item => {
                item.classList.remove('active');
            });

            // Adiciona a seleção ao item clicado
            opcao.classList.add('active');

        });

    });

});


(function () {
    'use strict';

    const raiz = document.querySelector('.carrossel_hamburguer');
    if (!raiz) return;

    const viewport = raiz.querySelector('.carrossel_viewport');
    const trilho   = raiz.querySelector('.trecho_da_frente');
    const prevBtn  = raiz.querySelector('.carrossel_prev');
    const nextBtn  = raiz.querySelector('.carrossel_next');
    const dotsWrap = raiz.querySelector('.carrossel_dots');
    const itens    = Array.from(trilho.querySelectorAll('.formato_hamburguer'));

    let passo    = 0;
    let porVez   = 1;
    let maxIndex = 0;
    let index    = 0;
    let dots     = [];

    function medir() {
        if (!itens.length) return;

        passo = itens.length > 1
            ? itens[1].offsetLeft - itens[0].offsetLeft
            : itens[0].offsetWidth;
        if (passo <= 0) passo = itens[0].offsetWidth || 1;

        porVez   = Math.max(1, Math.floor((viewport.clientWidth + 1) / passo));
        maxIndex = Math.max(0, itens.length - porVez);
        index    = Math.min(index, maxIndex);

        raiz.classList.toggle('sem_scroll', maxIndex === 0);
        criarDots();
        render();
    }

    function criarDots() {
        dotsWrap.innerHTML = '';
        dots = [];
        for (let i = 0; i <= maxIndex; i++) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'carrossel_dot';
            b.setAttribute('aria-label', 'Ir para a posição ' + (i + 1));
            b.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(b);
            dots.push(b);
        }
    }

    function render() {
        trilho.style.transform = 'translate3d(' + (-index * passo) + 'px, 0, 0)';
        prevBtn.disabled = index <= 0;
        nextBtn.disabled = index >= maxIndex;
        dots.forEach((d, i) => d.classList.toggle('ativo', i === index));
    }

    function goTo(i) {
        index = Math.max(0, Math.min(i, maxIndex));
        render();
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    });

    /* ---------- arrastar ---------- */
    let arrastando = false;
    let arrastou   = false;
    let xInicial   = 0;
    let tInicial   = 0;

    viewport.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (maxIndex === 0) return;
        arrastando = true;
        arrastou   = false;
        xInicial   = e.clientX;
        tInicial   = -index * passo;
        trilho.style.transition = 'none';
        viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', (e) => {
        if (!arrastando) return;
        const dx = e.clientX - xInicial;
        if (Math.abs(dx) > 4) arrastou = true;

        let t = tInicial + dx;
        const min = -maxIndex * passo;
        if (t > 0)        t = t * 0.35;
        else if (t < min) t = min + (t - min) * 0.35;

        trilho.style.transform = 'translate3d(' + t + 'px, 0, 0)';
    });

    function soltar(e) {
        if (!arrastando) return;
        arrastando = false;
        trilho.style.transition = '';

        const dx = e.clientX - xInicial;
        if (Math.abs(dx) > passo * 0.15) {
            const passos = Math.max(1, Math.round(Math.abs(dx) / passo));
            goTo(index - Math.sign(dx) * passos);
        } else {
            render();
        }

        if (viewport.hasPointerCapture && viewport.hasPointerCapture(e.pointerId)) {
            viewport.releasePointerCapture(e.pointerId);
        }
    }

    viewport.addEventListener('pointerup', soltar);
    viewport.addEventListener('pointercancel', soltar);

    viewport.addEventListener('click', (e) => {
        if (arrastou) {
            e.preventDefault();
            e.stopPropagation();
            arrastou = false;
        }
    }, true);

    let rafId = null;
    function agendarMedir() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => { rafId = null; medir(); });
    }
    window.addEventListener('resize', agendarMedir);
    window.addEventListener('load', agendarMedir);
    if (window.ResizeObserver) new ResizeObserver(agendarMedir).observe(viewport);

    medir();
})();