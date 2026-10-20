
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