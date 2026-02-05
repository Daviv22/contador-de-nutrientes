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
}