
const form = document.querySelector('#book-form');

const booksList = document.querySelector('#books-list');

const bookIdInput = document.querySelector('#book-id');
const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookPriceInput = document.querySelector('#book-price');
const bookImageInput = document.querySelector('#book-image');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    salvarLivro();
});


function carregarLivros() {
    const livrosJSON = localStorage.getItem('livros');
    return livrosJSON ? JSON.parse(livrosJSON) : [];
}


function salvarLivros(livros) {
    localStorage.setItem('livros', JSON.stringify(livros));
}


function editarLivro(id) {
    const livros = carregarLivros();
    const livroParaEditar = livros.find(livro => livro.id === id);

    if (livroParaEditar) {
        bookIdInput.value = livroParaEditar.id;
        bookTitleInput.value = livroParaEditar.titulo;
        bookAuthorInput.value = livroParaEditar.autor;
        bookPriceInput.value = livroParaEditar.preco;
        bookImageInput.value = livroParaEditar.imagem;
    }
}

function deletarLivro(id) {
    let livros = carregarLivros();
    livros = livros.filter(livro => livro.id !== id);
    salvarLivros(livros);
    renderizarLivrosAdmin();
}


function salvarLivro() {
    const id = bookIdInput.value;
    const titulo = bookTitleInput.value;
    const autor = bookAuthorInput.value;
    const preco = parseFloat(bookPriceInput.value);
    const imagem = bookImageInput.value;

    const novoLivro = {
        id: id ? parseInt(id) : Date.now(), 
        titulo,
        autor,
        preco,
        imagem
    };

   let livros = carregarLivros();

    if (id) {
        const index = livros.findIndex(livro => livro.id === parseInt(id));
        livros[index] = novoLivro;
    } else {
        livros.push(novoLivro);
    }

    salvarLivros(livros);
    form.reset();
    bookIdInput.value = ''; 
    renderizarLivrosAdmin();
}


function renderizarLivrosAdmin() {
    const livros = carregarLivros();
    
    booksList.innerHTML = '';

    livros.forEach(livro => {
        const itemHTML = `
            <div class="book-item">
                <div>
                    <strong>${livro.titulo}</strong> por ${livro.autor}
                    <br>
                    Preço: R$ ${livro.preco.toFixed(2).replace('.', ',')}
                </div>
                <div>
                    <button onclick="editarLivro(${livro.id})">Editar</button>
                    <button onclick="deletarLivro(${livro.id})">Excluir</button>
                </div>
            </div>
        `;
        booksList.innerHTML += itemHTML;
    });
}

renderizarLivrosAdmin();