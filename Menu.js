document.addEventListener('DOMContentLoaded', () => {
    // 1. Cria o overlay escuro e o drawer
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.id = 'menu-overlay';

    const drawer = document.createElement('aside');
    drawer.className = 'side-menu';
    drawer.id = 'side-menu';

    document.body.append(overlay, drawer);

    // 2. Carrega o conteúdo do Menu.html para dentro do drawer
    fetch('Menu.html')
        .then(r => r.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const main = doc.querySelector('main');
            if (main) drawer.innerHTML = main.innerHTML;
        })
        .catch(err => console.warn('Não foi possível carregar Menu.html:', err));

    // 3. Abre/fecha ao clicar no botão "Menu"
    function toggleMenu(e) {
        if (e) e.preventDefault();
        drawer.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    document.querySelectorAll('.menu-toggle').forEach(btn => {
        btn.addEventListener('click', toggleMenu);
    });
    overlay.addEventListener('click', toggleMenu);
});