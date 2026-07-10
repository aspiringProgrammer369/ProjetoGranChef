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