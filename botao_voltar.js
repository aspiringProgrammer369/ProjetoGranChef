
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

btnSeta.addEventListener("click", function() {
    painelAcessibilidade.classList.toggle("aberto");

    const aberto = painelAcessibilidade.classList.contains("aberto");

    btnSeta.setAttribute("aria-expanded", aberto);
});