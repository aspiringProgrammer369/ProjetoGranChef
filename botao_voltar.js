
window.addEventListener("scroll", function() {
    const botao = document.querySelector(".voltar-topo");

    const metadePagina =
        (document.documentElement.scrollHeight - window.innerHeight) / 2;

    if (window.scrollY >= metadePagina) {
        botao.classList.add("visivel");
    } else {
        botao.classList.remove("visivel");
    }
});



const btnSeta = document.querySelector("#btnSeta");
const painelAcessibilidade = document.querySelector("#painelAcessibilidade");


// Abrir e fechar o painel
btnSeta.addEventListener("click", function() {
    painelAcessibilidade.classList.toggle("aberto");

    const aberto = painelAcessibilidade.classList.contains("aberto");

    btnSeta.setAttribute("aria-expanded", aberto);
});


// Mostrar o painel somente a partir da metade da página
window.addEventListener("scroll", function() {

    const metadePagina =
        (document.documentElement.scrollHeight - window.innerHeight) / 2;

    if (window.scrollY >= metadePagina) {

        painelAcessibilidade.classList.add("visivel");

    } else {

        painelAcessibilidade.classList.remove("visivel");
        painelAcessibilidade.classList.remove("aberto");

        btnSeta.setAttribute("aria-expanded", "false");
    }

});


document.getElementById("btn-voltar").addEventListener("click", () => {
    history.back();
  });