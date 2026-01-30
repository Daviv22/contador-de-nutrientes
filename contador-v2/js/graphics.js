export function pegarPorcao(alimento, quantidade) {
    console.log({
        alimentoId: alimento.id,
        alimentoNome: alimento.nome,
        quantidade: quantidade
    })
}

function calcularKcal(alimento, porcao) {
    const carb = alimento.nutriente.carboidratos * porcao;
    const prot = alimento.nutriente.proteinas * porcao;
    const gord = alimento.nutriente.gorduras * porcao;

    return carb * 4 + prot * 4 + gord * 9;
}