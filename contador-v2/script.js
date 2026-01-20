const alimentos = [banana, laranja]

function criarCardAlimentoHeader (alimento) {

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

function criarCardAlimentoBody (alimento) {

    const body = document.createElement('div')
    body.classList.add('card-body')

    const dl = document.createElement('dl')
    dl.classList.add('info-nutricional')

    const nutrientes = [
        ['Carboidratos', alimento.nutrientes.carboidratos, 'carboidratos'],
        ['Proteínas', alimento.nutrientes.proteinas, 'proteinas'],
        ['Gorduras', alimento.nutrientes.gorduras, 'gorduras']
    ]

    nutrientes.forEach(([label, valor, dataAttr]) => {
        const item = document.createElement('div')
        item.classList.add('nutriente-item')

        const dt = document.createElement('dt')
        dt.classList.add('nutriente-label')
        dt.textContent = label

        const dd = document.createElement('dd')
        dd.classList.add('nutriente-valor')

        const span = document.createElement('span')
        span.dataset.nutriente = dataAttr
        span.textContent = valor

        dd.append(span, 'g')
        item.append(dt, dd)
        dl.appendChild(item)
    })

    body.appendChild(dl)

    return body

}

function criarCardAlimentoFooter (alimento) {
    const footer = document.createElement('div')
    footer.classList.add('card-footer')

    const form = document.createElement('form')
    form.classList.add('alimento-form')

    const input = document.createElement('input')
    input.type = 'number'
    input.classList.add('input-porcao')
    input.placeholder = 'Porções'
    input.min = '0'
    input.step = '1'
    input.setAttribute(
        'aria-label',
        `Quantidade de porções de ${alimento.nome}`
    )

    const button = document.createElement('button')
    button.type = 'submit'
    button.classList.add('btn-adicionar')
    button.textContent = 'Adicionar'

    form.append(input, button)
    footer.appendChild(form)

    return footer
}

function criarCardAlimento(alimento) {

    const article = document.createElement('article');
    article.classList.add('alimento-card')
    article.dataset.alimentoId = alimento.id
    article.dataset.categoria = alimento.categoria

    const header = criarCardAlimentoHeader(alimento)
    const body = criarCardAlimentoBody(alimento)
    const footer = criarCardAlimentoFooter(alimento)

    // Montando o card
    article.append(header, body, footer)
    return article

}

const grids = {
    frutas: document.getElementById('grid-frutas'),
    animais: document.getElementById('grid-animais'),
    graos: document.getElementById('grid-graos'),
    tuberculos: document.getElementById('grid-tuberculos'),
}

function renderizarCards(listaAlimentos) {
    listaAlimentos.forEach(alimento => {
        const categoria = alimento.categoria
        const container = grids[categoria]

        if (!container) {
            console.error(`Container não encontrado para categoria: ${categoria}`)
            return
        }

        const card = criarCardAlimento(alimento)
        container.appendChild(card)

    })

}

renderizarCards(alimentos)
