import { criarCardAlimento } from "./js/cardBuilder";

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
