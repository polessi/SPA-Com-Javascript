function loadContent() {
    var currentURL = window.location.href;
    var parts = currentURL.split('/');
    var path = parts[parts.length - 1];

    const contentDiv = document.getElementById('root');

    if (path === '' || path === 'index.html') {
        loadHTML('pages/home/index.html', contentDiv);

    } else if (path === 'cadastro') {
        loadHTML('pages/cadastro/index.html', contentDiv);

    } else if (path === 'listagem') {
        loadHTML('pages/listagem/index.html', contentDiv);
        
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

    if (event.target.id === 'cadastrarBtn') {
        event.preventDefault();
        history.pushState({}, '', '/ip4y/web/cadastro'); // Atualiza a URL para '/cadastro'
        loadContent(); // Carrega a página de cadastro
    } 

    if (event.target.id === 'voltarBtn') {
        event.preventDefault();
        history.pushState({}, '', '/ip4y/web/'); // Atualiza a URL para '/'
        loadContent(); // Carrega a página inicial
    }

    if (event.target.id === 'listagemBtn') {
        event.preventDefault();
        history.pushState({}, '', '/ip4y/web/listagem'); // Atualiza a URL para '/listagem'
        loadContent(); // Carrega a página de listagem
    }  
});

window.addEventListener('popstate', loadContent);
window.addEventListener('load', loadContent);