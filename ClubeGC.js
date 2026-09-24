document.addEventListener('DOMContentLoaded', () => {
 
const opcoes = document.querySelectorAll('.opcao_de_pontos a');
 
opcoes.forEach(opcao => {
 
opcao.addEventListener('click', (e) => {
 
e.preventDefault();
 
// Remove a seleção de todos os itens
opcoes.forEach(item => {
item.classList.remove('active');
});
 
// Adiciona a seleção ao item clicado
opcao.classList.add('active');
 
});
 
});
 
});

document.addEventListener('DOMContentLoaded', () => {
    const trilha = document.querySelector('.trecho_da_frente');
    const btnEsq = document.querySelector('.seta-esquerda');
    const btnDir = document.querySelector('.seta-direita');

    // Largura de um card + gap (para avançar um por vez)
    function passoScroll() {
        const card = trilha.querySelector('.formato_hamburguer');
        if (!card) return 200;
        const estilo = getComputedStyle(trilha);
        const gap = parseInt(estilo.columnGap || estilo.gap || 0, 10);
        return card.offsetWidth + gap;
    }

    btnDir.addEventListener('click', () => {
        trilha.scrollBy({ left: passoScroll(), behavior: 'smooth' });
    });

    btnEsq.addEventListener('click', () => {
        trilha.scrollBy({ left: -passoScroll(), behavior: 'smooth' });
    });

    // Habilita/desabilita setas conforme a posição do scroll
    function atualizarSetas() {
        const maxScroll = trilha.scrollWidth - trilha.clientWidth;
        btnEsq.disabled = trilha.scrollLeft <= 2;
        btnDir.disabled = trilha.scrollLeft >= maxScroll - 2;
    }

    trilha.addEventListener('scroll', atualizarSetas);
    window.addEventListener('resize', atualizarSetas);
    atualizarSetas(); // estado inicial
});

