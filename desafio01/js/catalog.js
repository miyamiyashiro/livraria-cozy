// Remove o array 'const livros' que você tinha antes.
// A função a seguir vai carregar os dados do localStorage
function carregarLivros() {
    const livrosJSON = localStorage.getItem('livros');
    return livrosJSON ? JSON.parse(livrosJSON) : [];
}

const catalogoContainer = document.querySelector('.catalog-grid');

function renderizarLivros() {
    // Agora, a função carrega os livros do localStorage
    const livros = carregarLivros();

    // Limpa o conteúdo atual da grade para evitar duplicações
    catalogoContainer.innerHTML = '';

    // Se não houver livros, exibe uma mensagem
    if (livros.length === 0) {
        catalogoContainer.innerHTML = '<p style="text-align: center;">Nenhum livro cadastrado.</p>';
        return;
    }

    // Itera sobre cada livro e cria o HTML do card
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

// Chama a função para renderizar a lista quando a página carregar
renderizarLivros();