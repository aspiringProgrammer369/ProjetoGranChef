const imagens = document.querySelectorAll('.carousel img');
let index = 0;

function trocarImagem() {
  // remove classe active de todas
  imagens.forEach(img => img.classList.remove('active'));
  
  // adiciona active na próxima
  imagens[index].classList.add('active');
  
  // atualiza índice
  index = (index + 1) % imagens.length;
}

// inicia mostrando a primeira
trocarImagem();

// troca a cada 8 segundos (8000 ms)
setInterval(trocarImagem, 5000);
