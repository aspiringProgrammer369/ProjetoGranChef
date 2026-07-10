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