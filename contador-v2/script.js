const banana = {
    id: 'banana',
    nome: 'Banana',
    categoria: 'frutas',
    imagem: './img/banana.jpg',
    nutrientes: {
        carb: 22.84,
        gord: 0.33,
        prot: 1.09
    }
}

const laranja = {
    id: 'laranja',
    nome: 'Laranja',
    categoria: 'frutas',
    imagem: './img/laranja.jpg',
    nutrientes: {
        carb: 11.750,
        gord: 120,
        prot: 940
    }
}

const alimentos = [banana, laranja]

function criarCardAlimentoHeader () {

    const header = document.createElement('div');
    header.classList.add('card-header');

    const figure = document.createElement('figure');
    figure.classList.add('alimento-figura');

    const img = document.createElement('img')
    img.src = alimento.imagem
    img.alt = alimento.nome
    img.classList.add('alimento-img')

    const nome = document.createElement('h4');
    nome.classList.add('alimento-nome');
    nome.textContent = alimento.nome

    figure.appendChild(img)
    header.append(figure, nome)

    return header
}

function criarCardAlimentoBody () {

}

function criarCardAlimentoFooter () {

}

function criarCardAlimento(alimento) {

    const article = document.createElement('article');
    article.classList.add('alimento-card')
    article.dataset.alimentoId = alimento.id
    article.dataset.categoria = alimento.categoria

    const header = criarCardAlimentoHeader(alimento)
    const body = criarCardAlimentoBody(alimento)
    const footer = criarCardAlimentoFooter(alimento)



}

const grid = {
    frutas: document.getElementById('grid-frutas'),
}

function renderizarCards(listaAlimentos) {
    listaAlimentos.forEach(alimento => {
        const categoria = alimento.categoria
        const container = grid[categoria]

        const card = criarCardAlimento(alimento)
        container.appendChild(card)

    })

}

renderizarCards(alimentos)
