import {
    adicionarItemRefeicao,
    calcularTotaisDia,
    calcularTotaisRefeicao,
    getAlimentos,
    limparRefeicao,
    setMetas
} from "./state.js";
import {atualizarGraficoMetas, atualizarGraficoRefeicao, atualizarGraficoVariacao} from "./graphics.js";

export function pegarMetas() {
    const metas = {
        carboidratos: Number(document.getElementById('meta-carb').value),
        proteinas: Number(document.getElementById('meta-prot').value),
        gorduras: Number(document.getElementById('meta-gord').value)
    }

    setMetas(metas);
    atualizarGraficoMetas();
    atualizarGraficoVariacao();
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

export function adicionarRefeicao() {

    const numeroRefeicao = parseInt(document.querySelector('input[name="refeicao"]:checked').value);
    const alimentoId = document.getElementById('select-alimento').value;
    const porcoes = parseFloat(document.getElementById('input-porcoes').value);

    if (!alimentoId || porcoes <= 0) return;

    adicionarItemRefeicao(numeroRefeicao, alimentoId, porcoes);
    atualizarTabelaRefeicoes();
    atualizarGraficoRefeicao();
    atualizarGraficoVariacao();
}

export function limparTabelaRefeicao(e) {
    const numeroRefeicao = parseInt(e.target.dataset.refeicao);
    limparRefeicao(numeroRefeicao);
    atualizarTabelaRefeicoes();
    atualizarGraficoRefeicao();
    atualizarGraficoVariacao();
}


function atualizarTabelaRefeicoes() {
    const tbody = document.getElementById('tbody-refeicoes');

    [1, 2, 3, 4].forEach(numero => {
        const row = tbody.querySelector(`tr[data-refeicao="${numero}"]`);
        const totais = calcularTotaisRefeicao(numero);

        row.querySelector('.carb').textContent = totais.carboidratos.toFixed(1);
        row.querySelector('.prot').textContent = totais.proteinas.toFixed(1);
        row.querySelector('.gord').textContent = totais.gorduras.toFixed(1);
        row.querySelector('.kcal').textContent = totais.kcal.toFixed(0);
    });

    // Atualizar total
    const totaisDia = calcularTotaisDia();
    const rowTotal = tbody.querySelector('tr.table-primary');

    rowTotal.querySelector('.carb strong').textContent = totaisDia.carboidratos.toFixed(1);
    rowTotal.querySelector('.prot strong').textContent = totaisDia.proteinas.toFixed(1);
    rowTotal.querySelector('.gord strong').textContent = totaisDia.gorduras.toFixed(1);
    rowTotal.querySelector('.kcal strong').textContent = totaisDia.kcal.toFixed(0);
}