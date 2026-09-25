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


