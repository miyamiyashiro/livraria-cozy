

function carregarLivros() {
    const livrosJSON = localStorage.getItem('livros');
    return livrosJSON ? JSON.parse(livrosJSON) : [];
}

const catalogoContainer = document.querySelector('.catalog-grid');

function renderizarLivros() {
    
    const livros = carregarLivros();

   
    catalogoContainer.innerHTML = '';

    
    if (livros.length === 0) {
        catalogoContainer.innerHTML = '<p style="text-align: center;">Nenhum livro cadastrado.</p>';
        return;
    }

   
    livros.forEach(livro => {
        const cardHTML = `
            <div class="book-card">
                <img class="book-image" src="${livro.imagem}" alt="Capa do Livro: ${livro.titulo}">
                <div class="book-info">
                    <h3 class="book-title">${livro.titulo}</h3>
                    <p class="book-author">${livro.autor}</p>
                    <p class="book-price">R$ ${livro.preco.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        `;
        catalogoContainer.innerHTML += cardHTML;
    });
}



renderizarLivros();
