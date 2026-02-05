const state = {
    alimentos: [],
    metas: {
        carboidratos: 0,
        proteinas: 0,
        gorduras: 0,
    },
    refeicoes: {
        1: [],
        2: [],
        3: [],
        4: []
    }
};

export function setAlimentos(listaAlimentos) {
    state.alimentos = listaAlimentos;
}

export function getAlimentos() {
    return state.alimentos;
}

export function getAlimentoPorId(id) {
    return state.alimentos.find(alimento => alimento.id === id);
}

export function setMetas(metas) {
    state.metas = {
        carboidratos: metas.carboidratos,
        proteinas: metas.proteinas,
        gorduras: metas.gorduras,
    }
}

export function getMetas() {
    return state.metas;
}

export function adicionarItemRefeicao(numeroRefeicao, alimentoId, porcoes) {

    const alimento = getAlimentoPorId(alimentoId)

    if (!alimento) {
        return false;
    }

    const refeicao = state.refeicoes[numeroRefeicao];

    const itemExistente = refeicao.find( item => item.alimentoId === alimentoId);

    if (itemExistente) {
        itemExistente.porcoes = porcoes;
    } else {
        refeicao.push({alimentoId, porcoes: porcoes});
    }
    return true;
}

export function removerItemRefeicao(numeroRefeicao, alimentoId) {
    const refeicao = state.refeicoes[numeroRefeicao];
    const index = refeicao.findIndex(item => item.alimentoId === alimentoId);

    if (index !== -1) {
        refeicao.splice(index, 1);
        return true;
    }

    return false;
}

export function calcularTotaisRefeicao(numeroRefeicao) {
    const refeicao = state.refeicoes[numeroRefeicao];

    const totais = {
        carboidratos: 0,
        proteinas: 0,
        gorduras: 0,
        kcal: 0
    };

    refeicao.forEach(item => {
        const alimento = getAlimentoPorId(item.alimentoId);

        if (!alimento) return;

        const carb = alimento.nutrientes.carboidratos * item.porcoes;
        const prot = alimento.nutrientes.proteinas * item.porcoes;
        const gord = alimento.nutrientes.gorduras * item.porcoes;

        totais.carboidratos += carb;
        totais.proteinas += prot;
        totais.gorduras += gord;
        totais.kcal += (carb * 4) + (prot * 4) + (gord * 9);
    });

    return totais;
}

export function calcularTotaisDia() {
    const totais = {
        carboidratos: 0,
        proteinas: 0,
        gorduras: 0,
        kcal: 0
    };

    [1, 2, 3, 4].forEach(numero => {
        const totaisRefeicao = calcularTotaisRefeicao(numero);
        totais.carboidratos += totaisRefeicao.carboidratos;
        totais.proteinas += totaisRefeicao.proteinas;
        totais.gorduras += totaisRefeicao.gorduras;
        totais.kcal += totaisRefeicao.kcal;
    });

    return totais;
}

export function calcularVariacaoPercentual() {
    const metas = getMetas();
    const totais = calcularTotaisDia();

    const variacao = {
        carboidratos: 0,
        proteinas: 0,
        gorduras: 0
    };

    Object.keys(variacao).forEach(nutriente => {
        if (metas[nutriente] === 0) {
            variacao[nutriente] = 0;
        } else {
            variacao[nutriente] = ((totais[nutriente] - metas[nutriente]) / metas[nutriente]) * 100;
            variacao[nutriente] = Math.round(variacao[nutriente] * 10) / 10;
        }
    });

    return variacao;
}