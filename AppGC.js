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

