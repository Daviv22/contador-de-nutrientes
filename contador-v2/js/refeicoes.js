import {getAlimentos, setMetas} from "./state.js";
import {atualizarGraficoMetas} from "./graphics.js";

export function pegarMetas() {
    const metas = {
        carboidratos: Number(document.getElementById('meta-carb').value),
        proteinas: Number(document.getElementById('meta-prot').value),
        gorduras: Number(document.getElementById('meta-gord').value)
    }

    setMetas(metas);
    atualizarGraficoMetas();
}

export function preencherSelectAlimentos() {
    const alimentos = getAlimentos();
    const select = document.getElementById('select-alimento')

    const categorias = {
        frutas: 'Frutas',
        graos: 'Grãos',
        animais: 'Animais',
        tuberculos: 'Tubérculos'
    };

    Object.keys(categorias).forEach(categoria => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = categorias[categoria];

        alimentos.filter(a => a.categoria === categoria).forEach(alimento => {
                const option = document.createElement('option');
                option.value = alimento.id;
                option.textContent = alimento.nome;
                optgroup.appendChild(option);
            });

        select.appendChild(optgroup);
    });
}