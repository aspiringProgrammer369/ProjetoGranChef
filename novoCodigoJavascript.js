function iniciarCarrossel(seletor) {
  const container = document.querySelector(seletor);
  const imagens = container.querySelectorAll('img');
  let slideAtual = 0;
  let anterior = null;
  const duracao = 500; // 0.5s
  let emTransicao = false;

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

    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.style.transition = `left ${duracao}ms ease`;
      imgAnterior.style.left = direcao === 'direita' ? '-100%' : '100%';
    }

    const novaImg = imagens[novoIndex];
    novaImg.style.transition = 'none';
    novaImg.style.left = direcao === 'direita' ? '100%' : '-100%';
    void novaImg.offsetWidth;

    novaImg.style.transition = `left ${duracao}ms ease`;
    novaImg.style.left = '0';

    const imgAntiga = anterior !== null ? imagens[anterior] : null;
    setTimeout(() => {
      if (imgAntiga && imgAntiga !== novaImg) {
        imgAntiga.style.transition = 'none';
        imgAntiga.style.left = '100%';
      }
      anterior = novoIndex;
      slideAtual = novoIndex;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[novoIndex].classList.add('active');
      emTransicao = false;
    }, duracao);
  }

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
  imagens[0].style.transition = 'none';
  imagens[0].style.left = '0';
  anterior = 0;
  slideAtual = 0;

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

// Inicia o carrossel na seção de cupons
iniciarCarrossel('.carrossel-cupons');

const links = document.querySelectorAll('.troca-imagem');
const imagemSecundaria = document.getElementById('imagem-secundaria');

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    imagemSecundaria.style.display = 'flex'; // mostra overlay
  });
});

// fecha ao clicar no overlay
imagemSecundaria.addEventListener('click', () => {
  imagemSecundaria.style.display = 'none';
});
