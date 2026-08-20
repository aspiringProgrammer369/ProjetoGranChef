


function iniciarCarrossel(seletor) {
  const container = document.querySelector(seletor);
  const imagens = container.querySelectorAll('img');
  let slideAtual = 0;
  let anterior = null;
  const duracao = 500; // 0.5s
  let emTransicao = false; // bloqueio para evitar múltiplos cliques

  // ---------- Bolinhas ----------
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');

  imagens.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
  });
  container.appendChild(dotsContainer);
  const dots = dotsContainer.querySelectorAll('.dot');

  // ---------- Setas ----------
  const setaEsquerda = document.createElement('button');
  setaEsquerda.classList.add('seta', 'seta-esquerda');
  setaEsquerda.innerHTML = '&#10094;';
  setaEsquerda.addEventListener('click', () => {
    if (!emTransicao) anteriorSlide();
  });

  const setaDireita = document.createElement('button');
  setaDireita.classList.add('seta', 'seta-direita');
  setaDireita.innerHTML = '&#10095;';
  setaDireita.addEventListener('click', () => {
    if (!emTransicao) proximo();
  });

  container.appendChild(setaEsquerda);
  container.appendChild(setaDireita);

  // ---------- Transição ----------
  function exibirSlide(novoIndex, direcao) {
    if (emTransicao || novoIndex === slideAtual) return;
    emTransicao = true;

    // 1. Move a imagem atual para fora
    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.style.transition = `left ${duracao}ms ease`;
      imgAnterior.style.left = direcao === 'direita' ? '-100%' : '100%';
    }

    // 2. Prepara a nova imagem
    const novaImg = imagens[novoIndex];
    novaImg.style.transition = 'none';
    novaImg.style.left = direcao === 'direita' ? '100%' : '-100%';
    void novaImg.offsetWidth; // força reflow

    // 3. Anima a nova imagem para o centro
    novaImg.style.transition = `left ${duracao}ms ease`;
    novaImg.style.left = '0';

    // 4. Após a transição, reposiciona a antiga (sem transição) e limpa o bloqueio
    const imgAntiga = anterior !== null ? imagens[anterior] : null;
    setTimeout(() => {
      // A nova imagem mantém left:0 (não mexa!)
      // A imagem antiga é colocada na direita (left:100%) sem animação
      if (imgAntiga && imgAntiga !== novaImg) {
        imgAntiga.style.transition = 'none';
        imgAntiga.style.left = '100%';
        // Não removemos o left inline, ele ficará assim até ser usada novamente
      }
      // Não removemos os estilos inline da nova imagem! Ela fica com left:0.
      // Atualiza estado
      anterior = novoIndex;
      slideAtual = novoIndex;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[novoIndex].classList.add('active');
      emTransicao = false;
    }, duracao);
  }

  

  // ---------- Navegação ----------
  function proximo() {
    const novo = (slideAtual + 1) % imagens.length;
    exibirSlide(novo, 'direita');
  }

  function anteriorSlide() {
    const novo = (slideAtual - 1 + imagens.length) % imagens.length;
    exibirSlide(novo, 'esquerda');
  }

  function irPara(indice) {
    if (indice === slideAtual || emTransicao) return;
    const direcao = indice > slideAtual ? 'direita' : 'esquerda';
    exibirSlide(indice, direcao);
  }

  // ---------- Inicialização ----------
  // Posiciona a primeira imagem no centro, sem transição, e deixa as demais em left:100% (padrão CSS)
  imagens[0].style.transition = 'none';
  imagens[0].style.left = '0';
  // As demais já estão com left:100% via CSS
  anterior = 0;
  slideAtual = 0;
  dots[0].classList.add('active');

  // ---------- Swipe ----------
  let touchStartX = 0, touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (emTransicao) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        anteriorSlide();
      } else {
        proximo();
      }
    }
  });

  return { proximo, anterior: anteriorSlide, irPara };
}

// Inicia os carrosséis
iniciarCarrossel('.lanches');
iniciarCarrossel('.sobremesas');

