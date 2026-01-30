export function pegarPorcao(alimento, quantidade) {
    calcularKcal(alimento, quantidade)
}

function calcularKcal(alimento, porcao) {
    const carb = alimento.nutrientes.carboidratos * porcao;
    const prot = alimento.nutrientes.proteinas * porcao;
    const gord = alimento.nutrientes.gorduras * porcao;

    return carb * 4 + prot * 4 + gord * 9;
}

function atualizarGraficoKcal() {

}