function iniciarCarrossel(seletor, intervalo) {
  const container = document.querySelector(seletor);
  const imagens = container.querySelectorAll('img');
  let index = 0;
  let anterior = null;
  let timer = null;

  // ---------- Cria as bolinhas ----------
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');

  imagens.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // primeira começa ativa
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
  });
container.appendChild(dotsContainer);

  const dots = dotsContainer.querySelectorAll('.dot');

  // ---------- Função de troca ----------
  function trocarImagem(direction = 'next', targetIndex = null) {
    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.classList.remove('active');
      imgAnterior.classList.add('exit');

      setTimeout(() => {
        imgAnterior.style.transition = 'none';
        imgAnterior.style.left = '100%';
        imgAnterior.classList.remove('exit');
        void imgAnterior.offsetWidth;
        imgAnterior.style.transition = '';
        imgAnterior.style.left = '';
      }, 1000);
    }

    // Se foi especificado um índice alvo (clique na bolinha)
    if (targetIndex !== null) {
      index = targetIndex;
    } else if (direction === 'prev') {
      index = (index - 1 + imagens.length) % imagens.length;
    }
    // Se direction === 'next', o index já está na próxima

    imagens[index].classList.add('active');
    anterior = index;

    // Atualiza as bolinhas
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // Avança o índice para a próxima (usado apenas no loop automático)
    index = (index + 1) % imagens.length;
  }

  // ---------- Função para ir a um slide específico ----------
  function irPara(i) {
    // Para o automático
    clearInterval(timer);
    timer = null;

    // Precisamos ajustar o índice de "próximo" para que a troca funcione corretamente
    // Vou chamar trocarImagem com targetIndex
    trocarImagem(null, i);
  }

  // Funções para swipe
  function nextManual() {
    trocarImagem('next');
  }

  function prevManual() {
    trocarImagem('prev');
  }

  // ---------- Timer automático ----------
  function iniciarTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => trocarImagem('next'), intervalo);
  }

  // Inicia
  trocarImagem('next'); // mostra a primeira (já com dot ativo)
  iniciarTimer();

  // ---------- Swipe ----------
  let touchStartX = 0, touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      clearInterval(timer);
      timer = null;
      if (diffX > 0) prevManual();
      else nextManual();
    }
  });

  return { next: nextManual, prev: prevManual, irPara };
}

// Inicia os carrosséis
iniciarCarrossel('.carousel', 5000);
iniciarCarrossel('.segundo-carousel', 5000);

/* 
function iniciarCarrossel(seletor, intervalo) {
  const container = document.querySelector(seletor);
  const imagens = container.querySelectorAll('img');
  let index = 0;
  let anterior = null;
  let timer = null; // guarda o setInterval

  // ---------- Função de troca (mesma lógica corrigida) ----------
  function trocarImagem(direction = 'next') {
    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.classList.remove('active');
      imgAnterior.classList.add('exit');

      setTimeout(() => {
        imgAnterior.style.transition = 'none';
        imgAnterior.style.left = '100%';
        imgAnterior.classList.remove('exit');
        void imgAnterior.offsetWidth;
        imgAnterior.style.transition = '';
        imgAnterior.style.left = '';
      }, 1000);
    }

    // Se for 'prev', voltamos no índice; senão, avançamos
    if (direction === 'prev') {
      index = (index - 1 + imagens.length) % imagens.length;
    }

    imagens[index].classList.add('active');
    anterior = index;
    index = (index + 1) % imagens.length; // avança para a próxima (padrão)
  }

  // ---------- Funções públicas de navegação ----------
  function next() {
    trocarImagem('next');
    reiniciarTimer();
  }

  function prev() {
    // Ajusta índice para que trocarImagem('prev') funcione corretamente
    // Vamos "voltar" o index atual para o anterior manualmente
    // Precisamos desfazer o avanço automático do index dentro de trocarImagem
    // Melhor refatorar: ao chamar prev, passamos direção e tratamos o índice.
    // Vou reescrever trocarImagem com parâmetro de direção.
    trocarImagem('prev');
    reiniciarTimer();
  }

  function reiniciarTimer() {
    clearInterval(timer);
    timer = setInterval(next, intervalo);
  }

  // ---------- Inicia o carrossel automático ----------
  trocarImagem('next'); // mostra a primeira
  timer = setInterval(next, intervalo);

  // ---------- Suporte a toque (swipe) ----------
  let touchStartX = 0;
  let touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Só considera swipe se o movimento horizontal for maior que o vertical
    // e ultrapassar um limiar (50px)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Deslizou da esquerda para a direita -> imagem anterior
        prev();
      } else {
        // Deslizou da direita para a esquerda -> próxima imagem
        next();
      }
    }
  });

  // Retorna controles (opcional, se quiser botões depois)
  return { next, prev };
}

// Inicia os carrosséis
iniciarCarrossel('.carousel', 5000);
iniciarCarrossel('.segundo-carousel', 5000);
*/

/*
function iniciarCarrossel(seletor, intervalo) {
  const imagens = document.querySelectorAll(`${seletor} img`);
  let index = 0;
  let anterior = null;

  function trocarImagem() {
    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.classList.remove('active');
      imgAnterior.classList.add('exit');

      setTimeout(() => {
        // 1. Desliga a transição
        imgAnterior.style.transition = 'none';
        // 2. Coloca a imagem à direita instantaneamente
        imgAnterior.style.left = '100%';
        // 3. Remove a classe de saída
        imgAnterior.classList.remove('exit');

        // Força o navegador a aplicar o novo left
        void imgAnterior.offsetWidth;

        // 4. Reativa a transição
        imgAnterior.style.transition = '';
        // 5. Remove o left inline para voltar a usar apenas as classes CSS
        imgAnterior.style.left = '';
      }, 1000);
    }

    imagens[index].classList.add('active');
    anterior = index;
    index = (index + 1) % imagens.length;
  }

  trocarImagem();
  setInterval(trocarImagem, intervalo);
}

iniciarCarrossel('.carousel', 5000);
iniciarCarrossel('.segundo-carousel', 5000);
*/

/*
function iniciarCarrossel(seletor, intervalo) {
  const container = document.querySelector(seletor);
  const imagens = container.querySelectorAll('img');
  let index = 0;
  let anterior = null;
  let timer = null;

  // Função de troca de imagem (com direção)
  function trocarImagem(direction = 'next') {
    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.classList.remove('active');
      imgAnterior.classList.add('exit');

      setTimeout(() => {
        imgAnterior.style.transition = 'none';
        imgAnterior.style.left = '100%';
        imgAnterior.classList.remove('exit');
        void imgAnterior.offsetWidth;
        imgAnterior.style.transition = '';
        imgAnterior.style.left = '';
      }, 1000);
    }

    if (direction === 'prev') {
      index = (index - 1 + imagens.length) % imagens.length;
    }

    imagens[index].classList.add('active');
    anterior = index;
    index = (index + 1) % imagens.length;
  }

  // Funções de navegação manual (NÃO reiniciam o timer)
  function nextManual() {
    trocarImagem('next');
  }

  function prevManual() {
    trocarImagem('prev');
  }

  // Função para iniciar o timer automático
  function iniciarTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => trocarImagem('next'), intervalo);
  }

  // Inicia mostrando a primeira imagem e depois o loop automático
  trocarImagem('next');
  iniciarTimer();

  // ---------- Suporte a swipe ----------
  let touchStartX = 0;
  let touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Se o movimento for horizontal e maior que 50px, considera swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      // Para o carrossel automático definitivamente
      clearInterval(timer);
      timer = null;

      if (diffX > 0) {
        prevManual(); // deslizou da esquerda para a direita
      } else {
        nextManual(); // deslizou da direita para a esquerda
      }
    }
    // Se não atingir o limiar, não faz nada e o timer continua
  });

  // Retorna controles (se quiser usar com botões depois)
  return { next: nextManual, prev: prevManual };
}

// Inicia os carrosséis
iniciarCarrossel('.carousel', 5000);
iniciarCarrossel('.segundo-carousel', 5000);
*/

/*
function iniciarCarrossel(seletor, intervalo) {
  const container = document.querySelector(seletor);
  const imagens = container.querySelectorAll('img');
  let index = 0;
  let anterior = null;
  let timer = null;

  // ---------- Cria as bolinhas ----------
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('dots');

  imagens.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // primeira começa ativa
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
  });
  container.parentNode.insertBefore(dotsContainer, container.nextSibling);

  const dots = dotsContainer.querySelectorAll('.dot');

  // ---------- Função de troca ----------
  function trocarImagem(direction = 'next', targetIndex = null) {
    if (anterior !== null) {
      const imgAnterior = imagens[anterior];
      imgAnterior.classList.remove('active');
      imgAnterior.classList.add('exit');

      setTimeout(() => {
        imgAnterior.style.transition = 'none';
        imgAnterior.style.left = '100%';
        imgAnterior.classList.remove('exit');
        void imgAnterior.offsetWidth;
        imgAnterior.style.transition = '';
        imgAnterior.style.left = '';
      }, 1000);
    }

    // Se foi especificado um índice alvo (clique na bolinha)
    if (targetIndex !== null) {
      index = targetIndex;
    } else if (direction === 'prev') {
      index = (index - 1 + imagens.length) % imagens.length;
    }
    // Se direction === 'next', o index já está na próxima

    imagens[index].classList.add('active');
    anterior = index;

    // Atualiza as bolinhas
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // Avança o índice para a próxima (usado apenas no loop automático)
    index = (index + 1) % imagens.length;
  }

  // ---------- Função para ir a um slide específico ----------
  function irPara(i) {
    // Para o automático
    clearInterval(timer);
    timer = null;

    // Precisamos ajustar o índice de "próximo" para que a troca funcione corretamente
    // Vou chamar trocarImagem com targetIndex
    trocarImagem(null, i);
  }

  // Funções para swipe
  function nextManual() {
    trocarImagem('next');
  }

  function prevManual() {
    trocarImagem('prev');
  }

  // ---------- Timer automático ----------
  function iniciarTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => trocarImagem('next'), intervalo);
  }

  // Inicia
  trocarImagem('next'); // mostra a primeira (já com dot ativo)
  iniciarTimer();

  // ---------- Swipe ----------
  let touchStartX = 0, touchStartY = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      clearInterval(timer);
      timer = null;
      if (diffX > 0) prevManual();
      else nextManual();
    }
  });

  return { next: nextManual, prev: prevManual, irPara };
}

// Inicia os carrosséis
iniciarCarrossel('.carousel', 5000);
iniciarCarrossel('.segundo-carousel', 5000);
*/