$(document).ready(function(){   // Espera o documento carregar totalmente para evitar erros

    var categorias = [];    // Guarda o nome dos alimentos
    var valores = [];       // Guarda o valor (kcal) dos alimentos
    const fundo = $("body").css("background-color")

    // Inicializar o gráfico
    var chart = Highcharts.chart('grafico-colunas', {
        chart: {
            type: 'column',
            backgroundColor: fundo
        },
        title: {
            text: 'Consumo de Calorias por Alimento (kcal)'
        },
        xAxis: {
            categories: categorias,
            title: {
                text: 'Alimentos'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Calorias (kcal)'
            }
        },
        series: [{
            name: 'Calorias',
            data: valores
        }]
    });

    // Função para calcular valores nutricionais
    function calcularValores(tipoAlimento) {   // O alimento serve de parâmetro


        // Extrai a valor dos nutrientes do html
        let txt_carb = $(`#carb_${tipoAlimento}`).text().replace(".", "");
        let txt_prot = $(`#prot_${tipoAlimento}`).text().replace(".", "");
        let txt_gord = $(`#gord_${tipoAlimento}`).text().replace(".", "");

        let quantidade = parseFloat($(`#qtd_${tipoAlimento}`).val());       // Extrai o valor da quantidade escolhida no input


        // Transforma o carboidrato em float
        let carb = parseFloat(txt_carb, 10);    
        let prot = parseFloat(txt_prot, 10);
        let gord = parseFloat(txt_gord, 10);


        // Transforma os nutrientes de mg para g e os multiplica pela quantidade selecionada
        let nova_carb = ((carb * 10 ** (-3)) * quantidade).toFixed(2);
        let nova_prot = ((prot * 10 ** (-3)) * quantidade).toFixed(2);
        let nova_gord = ((gord * 10 ** (-3)) * quantidade).toFixed(2);

        let energia = ((nova_carb * 4) + (nova_prot * 4) + (nova_gord * 9)).toFixed(2); // Calcula o valor energético

        return {
            carboidratos: parseFloat(nova_carb),
            proteinas: parseFloat(nova_prot),
            gorduras: parseFloat(nova_gord),
            calorias: parseFloat(energia)
        };
    };

    // Função para adicionar ou atualizar valores no gráfico
    function adicionarOuAtualizarFruta(fruta, kcal) {
        let index = categorias.indexOf(fruta); // Procura o index da fruta no array categorias. Se a fruta
                                               // não foi adicionada, retorna -1

        // Se a fruta não estiver no gráfico
        if (index === -1) { 
            categorias.push(fruta); // Adiciona a fruta nas categorias do gráfico de barras
            valores.push(kcal);     // Adiciona seu valor energético nas serie.data do gráfico de barras
        } else {
            valores[index] = kcal;  // Se a fruta já foi adicionada, então apenas os valores são atualizados
        }

        // Atualiza o gráfico
        chart.xAxis[0].setCategories(categorias); // Atualiza as categorias (alimentos)
        chart.series[0].setData(valores);         // Atualiza os valores energéticos (kcal)
    };

    function gerarGraficoPizza(container, titulo, nutrientes) {
            Highcharts.chart(container, {
                chart: {
                    type: 'pie',
                    backgroundColor: fundo
                },
                title: {
                    text: `Composição Nutricional de ${titulo}`
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b> ({point.y} g)'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                        }
                    }
                },
                series: [{
                    name: 'Nutrientes',
                    colorByPoint: true,
                    data: [
                        { name: 'Carboidratos', y: nutrientes.carboidratos },
                        { name: 'Proteínas', y: nutrientes.proteinas },
                        { name: 'Gorduras', y: nutrientes.gorduras }
                    ]
                }]
            });
    };


    // Função para gerar os gráficos do respectivo alimento
    $(".botao").click(function() {
        // Obtém o botão clicado
        let alimento = $(this).attr("id");          // Extrai a id do alimento    
        let nome = $(this).attr("nome")             // Extrai o nome do alimento (acentos, ç, etc)

        let nutrientes = calcularValores(alimento); // Manda calcular nos valores nutricionais (carb, prot, gord, e kcal)
        adicionarOuAtualizarFruta(nome, nutrientes.calorias);   // Manda criar ou atualizar o gráfico de colunas
        let grafico = $(`#grafico_${alimento}`)     // Transforma o nome do gráfico em uma variável

        grafico.show();     // Exibe o gráfico de pizza
        gerarGraficoPizza(grafico[0], nome, nutrientes);    // Cria o gráfico de pizza

    });

    // Array usado na tabela
    let totaisPorRef = {
        1: { carb: 0, prot: 0, gord: 0, kcal: 0 },
        2: { carb: 0, prot: 0, gord: 0, kcal: 0 },
        3: { carb: 0, prot: 0, gord: 0, kcal: 0 },
        4: { carb: 0, prot: 0, gord: 0, kcal: 0 }
    };

    // Função para calcular valores nutricionais na tabela de refeições
    function calcularNutrientes(tipoAlimento, porcao) {   // O alimento serve de parâmetro

        // Extrai a valor dos nutrientes do html
        let txt_carb = $(`#carb_${tipoAlimento}`).text().replace(".", "");
        let txt_prot = $(`#prot_${tipoAlimento}`).text().replace(".", "");
        let txt_gord = $(`#gord_${tipoAlimento}`).text().replace(".", "");

        // Transforma o carboidrato em float
        let carb = parseFloat(txt_carb, 10);    
        let prot = parseFloat(txt_prot, 10);
        let gord = parseFloat(txt_gord, 10);

        // Transforma os nutrientes de mg para g e os multiplica pela quantidade selecionada
        let nova_carb = ((carb * 10 ** (-3)) * porcao).toFixed(2);
        let nova_prot = ((prot * 10 ** (-3)) * porcao).toFixed(2);
        let nova_gord = ((gord * 10 ** (-3)) * porcao).toFixed(2);

        let energia = ((nova_carb * 4) + (nova_prot * 4) + (nova_gord * 9)).toFixed(2);

        return {
            carboidratos: parseFloat(nova_carb),
            proteinas: parseFloat(nova_prot),
            gorduras: parseFloat(nova_gord),
            calorias: parseFloat(energia)
        };
    };

    // Função que envia os dados escolhidos na tabela para análise
    $("#enviar").click(function() {

        const refSelecionada = $('input[name="ref"]:checked').val();    // Extrai qual dia foi selecionado
        const alimSelecionado = $('#alimentos').val();  // Extrai qual alimento foi selecionado
        const porcao = ($('#porcao').val());    // Extrai a porção escolhida

        parseFloat(porcao);  // Converte a porção para decimal

        const nutrientes = calcularNutrientes(alimSelecionado, porcao); // Calcula os nutrientes

        addRefeicao(refSelecionada, nutrientes);    // Adiciona a refeição na tabela

    });

    // Função que reseta a tabela
    $("#limpar").click(function() {

        // Percorre o array e tabela para zerar os valores dos mesmos
        for (let i = 1; i <= 5; i++) {
        totaisPorRef[i] = { carb: 0, prot: 0, gord: 0, kcal: 0};

        // Zera os valores na tabela
        $(`#carb_${i}`).text("0");
        $(`#prot_${i}`).text("0");
        $(`#gord_${i}`).text("0");
        $(`#kcal_${i}`).text("0");
        }

    });

    // Função que calcula os totais dos nutrientes
    function calcularTotaisGerais() {

        // Define todos os valores como zero inicialmente
        let totalCarb = 0;
        let totalProt = 0;
        let totalGord = 0;
        let totalKcal = 0;
    
        // Percorre os valores de cada refeição armazenados em totaisPorRef, somando com os totais
        for (let ref in totaisPorRef) {
            totalCarb += totaisPorRef[ref].carb;
            totalProt += totaisPorRef[ref].prot;
            totalGord += totaisPorRef[ref].gord;
            totalKcal += totaisPorRef[ref].kcal;
        }
    
        // Formata os resultados para 2 casas decimais
        totalCarb = parseFloat(totalCarb.toFixed(2));
        totalProt = parseFloat(totalProt.toFixed(2));
        totalGord = parseFloat(totalGord.toFixed(2));
        totalKcal = parseFloat(totalKcal.toFixed(2));
    
        // Adiciona o texto na tabela
        $("#carb_5").text(totalCarb.toFixed(2));
        $("#prot_5").text(totalProt.toFixed(2));
        $("#gord_5").text(totalGord.toFixed(2));
        $("#kcal_5").text(totalKcal.toFixed(2));

    
        // Retorna os totais

    }

    // Função que adiciona os valores na tabela
    function addRefeicao(ref, nutrientes) {


        totaisPorRef[ref].carb += nutrientes.carboidratos;
        totaisPorRef[ref].prot += nutrientes.proteinas;
        totaisPorRef[ref].gord += nutrientes.gorduras;
        totaisPorRef[ref].kcal += nutrientes.calorias;

        // Formata os valores para 2 casas decimais
        totaisPorRef[ref].carb = parseFloat(totaisPorRef[ref].carb.toFixed(2));
        totaisPorRef[ref].prot = parseFloat(totaisPorRef[ref].prot.toFixed(2));
        totaisPorRef[ref].gord = parseFloat(totaisPorRef[ref].gord.toFixed(2));
        totaisPorRef[ref].kcal = parseFloat(totaisPorRef[ref].kcal.toFixed(2));

        // Atualiza os valores no DOM
        $(`#carb_${ref}`).text(totaisPorRef[ref].carb.toFixed(2));
        $(`#prot_${ref}`).text(totaisPorRef[ref].prot.toFixed(2));
        $(`#gord_${ref}`).text(totaisPorRef[ref].gord.toFixed(2));
        $(`#kcal_${ref}`).text(totaisPorRef[ref].kcal.toFixed(2));

        calcularTotaisGerais()
    };

    // Função que cria o gráfico de linhas
    function criarGrafico(id, titulo, categorias, series, isPercent = false) {
        return Highcharts.chart(id, {
            chart: { type: 'line', backgroundColor: fundo }, // Define como grafico de linha e usa a cor de fundo da página
            title: { text: titulo }, // 
            xAxis: { title: { text: 'Dias' }, categories: categorias },
            yAxis: { 
                title: { text: isPercent ? 'Variação (%)' : 'Valores Nutricionais' },
                labels: { formatter: function () { return isPercent ? `${this.value}%` : this.value; } } // Define uma função para
            },                                                                                           // verificar qual deve ser o
            tooltip: {                                                                                   // título do eixo y
                shared: true,
                valueSuffix: isPercent ? ' %' : ' g',
                pointFormatter: function () {
                    return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y.toFixed(2)}${isPercent ? '%' : ' g'}</b><br>`;
                }
            },
            legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' },
            series: series
        });
    }

    // Função para adicionar dados no gráfico
    function adicionarPonto(grafico, dia, carb, prot, gord) {

        grafico.xAxis[0].categories.push(`Dia ${dia}`); // Adiciona um dia
        grafico.series[0].addPoint(carb); // Adiciona carboidratos
        grafico.series[1].addPoint(prot); // Adiciona proteínas
        grafico.series[2].addPoint(gord); // Adiciona gorduras
    }

    // Função para calcular a variação percentual (se os valores das refeições cresceram ou diminuiram em relação a meta)
    function calcularVariacao(chart1, chart2) {
        const categorias = chart2.xAxis[0].categories; // Extrai as categorias (dias)
        const variacao = [[], [], []]; // Cria um array para guardar as variações de cada nutriente (de cada serie)

        // Percorre cada categoria
        for (let i = 0; i < categorias.length; i++) {
            const [c1, p1, g1] = [chart1.series[0].data[i], chart1.series[1].data[i], chart1.series[2].data[i]]; // Extrai os nutrientes do gráfico de refeições
            const [c2, p2, g2] = [chart2.series[0].data[i], chart2.series[1].data[i], chart2.series[2].data[i]]; // Extrai os nutrientes do gráfico da meta diária

            // Cria uma função interna para calcular a variação percentual junto com um teste para evitar divisão por zero
            const calcVariacao = (meta, atual) => meta !== 0 ? ((atual - meta) / meta) * 100 : 0;

            // Calcula a diferença percentual entre os nutrientes da meta e os da refeição e os adiciona no array de variações
            variacao[0].push(parseFloat(calcVariacao(c2.y, c1.y).toFixed(2)));
            variacao[1].push(parseFloat(calcVariacao(p2.y, p1.y).toFixed(2)));
            variacao[2].push(parseFloat(calcVariacao(g2.y, g1.y).toFixed(2)));
        }

        return { categorias, variacao }; // Retorna as categorias (dias) e a diferença percentual
    }

    // Os gráficos com os seguintes parâmetros: (onde vai ficar, Título, categorias, séries)

    // Gráfico da refeição
    const chart1 = criarGrafico('ref_grafico', 'Valores da Refeição', [], [
        { name: 'Carboidratos', data: [], color: '#ffcc00' },
        { name: 'Proteínas', data: [], color: '#00cc66' },
        { name: 'Gorduras', data: [], color: '#ff3333' }
    ]); 

    // Gráfico da meta diária
    const chart2 = criarGrafico('meta_grafico', 'Valores da Meta', [], [
        { name: 'Carboidratos', data: [], color: '#ffcc00' },
        { name: 'Proteínas', data: [], color: '#00cc66' },
        { name: 'Gorduras', data: [], color: '#ff3333' }
    ]);

    // Gráfico da variação percentual
    const chart3 = criarGrafico('porcent_grafico', 'Variação Percentual entre Metas e Refeições', [], [
        { name: 'Carboidratos', data: [], color: '#ffcc00' },
        { name: 'Proteínas', data: [], color: '#00cc66' },
        { name: 'Gorduras', data: [], color: '#ff3333' }
    ], true); 

    // Função que atualiza o gráfico de variação
    function atualizarGraficoComparacao() {
        const { categorias, variacao } = calcularVariacao(chart1, chart2); // 
        chart3.xAxis[0].categories = categorias; // Atualiza os dias
        chart3.series[0].setData(variacao[0]);  // Atualiza os nutrienetes
        chart3.series[1].setData(variacao[1]);
        chart3.series[2].setData(variacao[2]);
    }

    // Função que adiciona um dia no gráfico de refeições
    $("#add_dia").click(function() {
        const [carb, prot, gord] = [parseFloat($("#carb_5").text()), parseFloat($("#prot_5").text()), parseFloat($("#gord_5").text())]; // Extrai os dados da tabela
        adicionarPonto(chart1, chart1.xAxis[0].categories.length + 1, carb, prot, gord); // Chama a função para atualizar o gráfico de refeição
        atualizarGraficoComparacao(); // Atualiza o gráfico de comparação
    });

    // Função que adiciona um dia no gráfico de meta diária
    $("#add_meta").click(function() {
        const [carb, prot, gord] = [parseFloat($("#meta_carb").val()), parseFloat($("#meta_prot").val()), parseFloat($("#meta_gord").val())]; // Extrai os dados do input
        adicionarPonto(chart2, chart2.xAxis[0].categories.length + 1, carb, prot, gord); // Chama a função para atualizar o gráfico de metas
        atualizarGraficoComparacao(); // Atualiza o gráfico de comparação
    });

    // Função que reseta o gráfico
    $("#reset").click(function () {
        // Reseta Chart1 (Refeições)
        chart1.xAxis[0].setCategories([]); // Limpa o array das categorias (dias)
        chart1.series.forEach(series => series.setData([])); // Percorre as séries de dados do gráfico e limpa seus arrays
    
        // Reseta Chart2 (Metas)
        chart2.xAxis[0].setCategories([]);
        chart2.series.forEach(series => series.setData([]));
    
        // Reseta Chart3 (Variações)
        chart3.xAxis[0].setCategories([]);
        chart3.series.forEach(series => series.setData([]));
    });

});
