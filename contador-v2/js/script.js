import { criarCardAlimento } from "./cardBuilder.js";

async function carregarAlimentos() {
    const response = await fetch('./alimentos.json');
    const data = await response.json();
    return data;
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

        const col = document.createElement('div');
        col.className = 'col';

        const card = criarCardAlimento(alimento)
        col.appendChild(card)
        container.appendChild(card)

    })
}

async function inicializar() {
    const alimentos = await carregarAlimentos()
    renderizarCards(alimentos)
}

document.addEventListener('DOMContentLoaded', inicializar)
