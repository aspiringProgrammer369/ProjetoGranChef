

function iniciarCarrossel(seletor, intervalo) {
  const imagens = document.querySelectorAll(`${seletor} img`);
  let index = 0;

  function trocarImagem() {
    imagens.forEach(img => img.classList.remove('active'));
    imagens[index].classList.add('active');
    index = (index + 1) % imagens.length;
  }

  trocarImagem();
  setInterval(trocarImagem, intervalo);
}

// Chamando para cada carrossel
iniciarCarrossel('.carousel', 5000);
iniciarCarrossel('.segundo-carousel', 5000);


