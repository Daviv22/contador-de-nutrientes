import { criarCardAlimento } from "./cardBuilder.js";
import { criarGraficoKcal } from "./graphics.js";

async function carregarAlimentos() {
    const response = await fetch('./alimentos.json');
    return await response.json();
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
        container.appendChild(col)

    })
}

async function inicializar() {
    const alimentos = await carregarAlimentos()
    renderizarCards(alimentos)

    criarGraficoKcal()
}

document.addEventListener('DOMContentLoaded', inicializar)
