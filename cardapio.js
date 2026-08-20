function iniciarCarrossel(seletor) {
  const container = document.querySelector(seletor);
  const slides = container.querySelectorAll('picture.promocao');
  let indiceAtual = 0;
  let emTransicao = false;
  const duracao = 500;

  // Bolinhas
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
  });
  container.appendChild(dotsContainer);
  const dots = dotsContainer.querySelectorAll('.dot');

  // Setas
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
    if (!emTransicao) proximoSlide();
  });

  container.appendChild(setaEsquerda);
  container.appendChild(setaDireita);

  // Transição
  function exibirSlide(novoIndice, direcao) {
    if (emTransicao || novoIndice === indiceAtual) return;
    emTransicao = true;

    const slideAtual = slides[indiceAtual];
    const novoSlide = slides[novoIndice];

    slideAtual.style.transition = `left ${duracao}ms ease`;
    slideAtual.style.left = direcao === 'direita' ? '-100%' : '100%';

    novoSlide.style.transition = 'none';
    novoSlide.style.left = direcao === 'direita' ? '100%' : '-100%';
    void novoSlide.offsetWidth;

    novoSlide.style.transition = `left ${duracao}ms ease`;
    novoSlide.style.left = '0';

    setTimeout(() => {
      slideAtual.style.transition = 'none';
      slideAtual.style.left = '100%';
      indiceAtual = novoIndice;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[novoIndice].classList.add('active');
      emTransicao = false;
    }, duracao);
  }

  function proximoSlide() {
    const novo = (indiceAtual + 1) % slides.length;
    exibirSlide(novo, 'direita');
  }

  function anteriorSlide() {
    const novo = (indiceAtual - 1 + slides.length) % slides.length;
    exibirSlide(novo, 'esquerda');
  }

  function irPara(indice) {
    if (indice === indiceAtual || emTransicao) return;
    const direcao = indice > indiceAtual ? 'direita' : 'esquerda';
    exibirSlide(indice, direcao);
  }

  // Inicialização
  slides.forEach(slide => {
    slide.style.position = 'absolute';
    slide.style.top = '0';
    slide.style.left = '100%';
    slide.style.width = '100%';
  });
  slides[0].style.left = '0';
}

// Inicia o carrossel do cardápio
iniciarCarrossel('.cardapio-carrosel');
