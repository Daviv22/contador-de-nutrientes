import {calcularTotaisDia, getMetas} from "./state.js";

let chartKcal;
let chartMetas;
let chartRefeicao;
let chartVariacao;

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

    document.getElementById('total-kcal').textContent = serie.data.reduce((soma, point) => soma + point.y, 0);
}

export function limparGraficoKcal() {
    if (!chartKcal) return;

    const serie = chartKcal.series[0];

    while (serie.data.length) {
        serie.data[0].remove(false);
    }

    chartKcal.redraw();
    document.getElementById('total-kcal').textContent = 0;
}

export function atualizarGraficoKcal(alimento, porcao) {
    const kcal = calcularKcal(alimento, porcao);
    const serie = chartKcal.series[0];
    const categorias = chartKcal.xAxis[0].categories;

    const point = serie.data.find(p => p.id === alimento.nome);

    if (point) {
        if (porcao === 0) {
            point.remove();
            atualizarTotalKcal();
            return;
        }
        point.update({y: kcal, porcoes: porcao});
    } else {

        if (porcao === 0) {
            return;
        }
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

export function criarGraficoMetas() {
    chartMetas = Highcharts.chart('grafico-metas', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Suas Metas Diárias'
        },
        xAxis: {
            categories: ['Carboidratos', 'Proteínas', 'Gorduras']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Gramas (g)'
            }
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f}g</b>'
        },
        series: [{
            name: 'Meta',
            data: [0, 0, 0],
            color: '#0d6efd'
        }],
        credits: {
            enabled: false
        }
    });
}

export function atualizarGraficoMetas() {
    const metas = getMetas();

    chartMetas.series[0].setData([
        metas.carboidratos,
        metas.proteinas,
        metas.gorduras
    ]);
}

export function criarGraficoRefeicao() {
    chartRefeicao = Highcharts.chart('grafico-refeicoes', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Consumo Total do Dia'
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f}g</b> ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.y:.1f}g'
                },
                innerSize: '50%'
            }
        },
        series: [{
            name: 'Nutrientes',
            colorByPoint: true,
            data: [
                { name: 'Carboidratos', y: 0, color: '#0d6efd' },
                { name: 'Proteínas', y: 0, color: '#198754' },
                { name: 'Gorduras', y: 0, color: '#ffc107' }
            ]
        }],
        credits: {
            enabled: false
        }
    });
}

export function atualizarGraficoRefeicao() {
    const totais = calcularTotaisDia();

    chartRefeicao.series[0].setData([
        { name: 'Carboidratos', y: totais.carboidratos, color: '#0d6efd' },
        { name: 'Proteínas', y: totais.proteinas, color: '#198754' },
        { name: 'Gorduras', y: totais.gorduras, color: '#ffc107' }
    ]);
}

export function criarGraficoVariacao() {
    chartVariacao = Highcharts.chart('grafico-variacao', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Variação: Meta vs Consumo'
        },
        xAxis: {
            categories: ['Carboidratos', 'Proteínas', 'Gorduras']
        },
        yAxis: {
            title: {
                text: 'Variação (%)'
            },
            plotLines: [{
                value: 0,
                color: '#666',
                width: 2,
                zIndex: 4
            }]
        },
        tooltip: {
            pointFormat: '<b>{point.y:.1f}%</b>'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },
        series: [{
            name: 'Variação',
            data: [0, 0, 0],
            colorByPoint: false,
            color: '#0d6efd'
        }],
        credits: {
            enabled: false
        }
    });
}