function loadContent() {
    var currentURL = window.location.href;
    var parts = currentURL.split('/');
    var path = parts[parts.length - 1];

    const contentDiv = document.getElementById('root');

    if (path === '' || path === 'index.html') {
        console.log('login');
        loadHTML('pages/login/index.html', contentDiv);
    } else if (path === 'cadastro') {
        console.log('cadastro');
        loadHTML('pages/cadastro/index.html', contentDiv);
    } else {
        contentDiv.innerHTML = '<h1>Página não encontrada</h1>';
    }
}

async function loadHTML(filePath, targetElement) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const text = await response.text();
            targetElement.innerHTML = text;
        } else {
            throw new Error("Erro ao carregar a página");
        }
    } catch (error) {
        console.error("Erro ao carregar a página:", error);
        targetElement.innerHTML = '<h1>Erro ao carregar a página</h1>';
    }
}

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        history.pushState({}, '', href);
        loadContent();
    }

    if (event.target.id === 'voltarBtn') {
        event.preventDefault();
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            history.pushState({}, '', '/'); // Atualiza a URL
            loadContent(); // Carrega a página inicial
        } else {
            history.back(); // Use history.back() para voltar uma página
        }
    }
});



window.addEventListener('popstate', loadContent);
window.addEventListener('load', loadContent);