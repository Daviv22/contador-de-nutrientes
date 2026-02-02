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
        subtitle: {
            text: 'kcal por alimento'
        },
        xAxis: {
            type: 'category',
            title: {
                text: 'Alimentos'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quilocalorias (kcal)'
            }
        },
        tooltip: {
            headerFormat: '<b>{point.name}</b><br>',
            pointFormat:
                'Porções: <b>{point.porcoes}</b><br>' +
                'Energia: <b>{point.y} kcal</b>'
        },
        series: [{
            name: 'kcal',
            colorByPoint: true,
            data: []
        }],
        credits: {
            enabled: false
        }
    });
}

function atualizarTotalKcal() {
    const serie = chartKcal.series[0];

    const total = serie.data.reduce((soma, point) => soma + point.y, 0);

    document.getElementById('total-kcal').textContent = total;
}

export function atualizarGraficoKcal(alimento, porcao) {
    const kcal = calcularKcal(alimento, porcao);
    const serie = chartKcal.series[0];
    const categorias = chartKcal.xAxis[0].categories;

    const point = serie.data.find(p => p.id === alimento.nome);

    if (point) {
        point.update({y: kcal, porcoes: porcao});
    } else {
        categorias.push(alimento.nome);

        serie.addPoint({
            id: alimento.nome,
            y: kcal,
            porcoes: porcao
        });
    }

    atualizarTotalKcal();
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
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 8,
            margin: [5, 5, 5, 5],
            spacing: [5, 5, 5, 5]
        },
        title: {
            text: 'Composição',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333'
            },
            margin: 5
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f}g</b><br>({point.percentage:.1f}%)',
            style: {
                fontSize: '12px'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.y:.1f}g',
                    style: {
                        fontSize: '10px',
                        textOutline: '2px white',
                        fontWeight: 'bold',
                        color: '#333'
                    },
                    distance: 5
                },
                showInLegend: false,
                size: '50%',
                innerSize: '50%',
                borderWidth: 3,
                borderColor: '#ffffff',
                states: {
                    hover: {
                        brightness: 0.1
                    }
                }
            }
        },
        series: [{
            name: 'Nutrientes',
            colorByPoint: true,
            data: dados,
            animation: {
                duration: 600
            }
        }],
        credits: {
            enabled: false
        }
    });
}