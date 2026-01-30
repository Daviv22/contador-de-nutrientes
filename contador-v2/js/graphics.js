function calcularKcal(alimento, porcao) {
    const carb = alimento.nutrientes.carboidratos * porcao;
    const prot = alimento.nutrientes.proteinas * porcao;
    const gord = alimento.nutrientes.gorduras * porcao;

    return carb * 4 + prot * 4 + gord * 9;
}

export function atualizarGraficoKcal(alimento, porcao) {
    const kcal = calcularKcal(alimento, porcao);

    let chart = Highcharts.chart('grafico-colunas', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Consumo de kcal'
        },
        xAxis: {
            categories: []
        },
        series: [{
            name: 'kcal',
            data: []
        }]
    });

}