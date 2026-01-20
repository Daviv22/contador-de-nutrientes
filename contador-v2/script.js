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

function criarCardAlimento(alimento) {
    const img = document.createElement('img')
    img.src = alimento.imagem
    img.alt = alimento.nome
    img.classList.add('alimento-img')
    return img

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
