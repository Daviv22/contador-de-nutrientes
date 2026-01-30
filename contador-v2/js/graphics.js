let chartKcal;

function calcularKcal(alimento, porcao) {
    const carb = alimento.nutrientes.carboidratos * porcao;
    const prot = alimento.nutrientes.proteinas * porcao;
    const gord = alimento.nutrientes.gorduras * porcao;

    return carb * 4 + prot * 4 + gord * 9;
}

export function criarGraficoKcal() {
    chartKcal = Highcharts.chart('grafico-colunas', {
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

export function atualizarGraficoKcal(alimento, porcao) {
    const kcal = calcularKcal(alimento, porcao);

    chartKcal.xAxis[0].categories.push(alimento.nome)
    chartKcal.series[0].addPoint(kcal)
}