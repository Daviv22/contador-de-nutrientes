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

export function criarGraficoPizza(alimento, containerId) {
    const dados = [
        {
            name: 'Carboidratos',
            y: alimento.nutrientes.carboidratos,
        },
        {
            name: 'Proteínas',
            y: alimento.nutrientes.proteinas,
        },
        {
            name: 'Gorduras',
            y: alimento.nutrientes.gorduras,
        }
    ];

    Highcharts.chart(containerId, {
        chart: {
            type: 'pie',
            height: 200,
            backgroundColor: 'transparent',
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0]
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f}g</b> ({point.percentage:.1f}%)',
            style: {
                fontSize: '12px'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.y:.1f}g',
                    style: {
                        fontSize: '11px',
                        textOutline: 'none',
                        fontWeight: 'bold'
                    },
                    distance: 10
                },
                showInLegend: false,
                size: '100%',
                innerSize: '40%', // Donut chart (opcional)
                borderWidth: 2,
                borderColor: '#ffffff'
            }
        },
        series: [{
            name: 'Nutrientes',
            colorByPoint: true,
            data: dados
        }],
        credits: {
            enabled: false
        }
    });
}