// ===== ATIVA A ANIMAÇÃO NO SCROLL =====
(function() {
  // Seleciona todos os elementos que têm a classe 'reveal'
  const elementos = document.querySelectorAll('.reveal');

  // Cria o observador
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('active');
        // Se quiser que a animação ocorra apenas uma vez, descomente a linha abaixo:
        // observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.2 // 20% do elemento visível para disparar
  });

  // Observa cada elemento
  elementos.forEach(el => observador.observe(el));
  
})();



(function() {
    const container = document.querySelector('.carrossel-container');
    if (!container) return;

    const track = container.querySelector('.carrossel-track');
    const trackInner = track.querySelector('.opcoes-de-lanche'); // a div que será movida
    const items = trackInner.querySelectorAll('a'); // os itens
    const btnEsquerdo = container.querySelector('.carrossel-btn-esquerdo');
    const btnDireito = container.querySelector('.carrossel-btn-direito');
    const indicadoresContainer = document.querySelector('.carrossel-indicadores');

    if (!items.length) return;

    // Função que calcula quantos itens cabem na largura do palco
    function getItemsPerView() {
        const palcoWidth = container.querySelector('.carrossel-palco').offsetWidth;
        const itemWidth = items[0].offsetWidth + 20; // 20 = gap (ajuste se seu gap for diferente)
        const total = Math.floor(palcoWidth / itemWidth);
        return Math.max(1, total);
    }

    let itemsPerView = getItemsPerView();
    let totalSlides = Math.ceil(items.length / itemsPerView);
    let currentSlide = 0;

    // Cria as bolinhas
    function criarIndicadores() {
        indicadoresContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const bolinha = document.createElement('button');
            bolinha.classList.add('carrossel-indicador');
            if (i === 0) bolinha.classList.add('ativo');
            bolinha.dataset.index = i;
            bolinha.addEventListener('click', () => {
                goToSlide(i);
            });
            indicadoresContainer.appendChild(bolinha);
        }
    }

    // Move o carrossel
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        currentSlide = index;

        const itemWidth = items[0].offsetWidth + 20; // mesmo gap
        const offset = index * itemsPerView * itemWidth;
        trackInner.style.transform = `translateX(-${offset}px)`;

        // Atualiza bolinhas
        document.querySelectorAll('.carrossel-indicador').forEach((el, i) => {
            el.classList.toggle('ativo', i === index);
        });
    }

    // Eventos das setas
    btnEsquerdo.addEventListener('click', () => goToSlide(currentSlide - 1));
    btnDireito.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Recalcula ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            itemsPerView = getItemsPerView();
            totalSlides = Math.ceil(items.length / itemsPerView);
            criarIndicadores();
            goToSlide(0);
        }, 200);
    });

    // Inicializa
    criarIndicadores();
    goToSlide(0);
})();