google.charts.load("visualization", "current", { "packages": ["corechart", "table"], "callback": drawFrequence });

var dados = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function drawFrequence() {

    var dadosCalculados = JSON.parse(localStorage.getItem("tempos"));

    var arrayTotal = vetTotal(dadosCalculados);
    var x = average(arrayTotal);

    for (var i = 0; i < 15; i++) { // necessario para a chamar a função que calcula a media, variancia e desvio padrao para todas as tentativas.
        dados[i] = average(dadosCalculados[i]);
    }


    var data = new google.visualization.DataTable();

    data.addColumn("string", "Tentativas");
    data.addColumn("number", "Tempo médio (ms)");
    data.addColumn("number", "Mediana (ms)");
    data.addColumn("number", "Variância (ms)");
    data.addColumn("number", "Desvio Padrão (ms)");
    data.addColumn("string", "Coeficiente de Varição (%)");

    //criação da tabela com seus respectivos campos
    data.addRows([
        ["1ª Tentativa", dados[0].mean, calcMediana(dadosCalculados[0]), dados[0].variance, dados[0].deviation, CV(dados[0])],
        ["2ª Tentativa", dados[1].mean, calcMediana(dadosCalculados[1]), dados[1].variance, dados[1].deviation, CV(dados[1])],
        ["3ª Tentativa", dados[2].mean, calcMediana(dadosCalculados[2]), dados[2].variance, dados[2].deviation, CV(dados[2])],
        ["4ª Tentativa", dados[3].mean, calcMediana(dadosCalculados[3]), dados[3].variance, dados[3].deviation, CV(dados[3])],
        ["5ª Tentativa", dados[4].mean, calcMediana(dadosCalculados[4]), dados[4].variance, dados[4].deviation, CV(dados[4])],
        ["6ª Tentativa", dados[5].mean, calcMediana(dadosCalculados[5]), dados[5].variance, dados[5].deviation, CV(dados[5])],
        ["7ª Tentativa", dados[6].mean, calcMediana(dadosCalculados[6]), dados[6].variance, dados[6].deviation, CV(dados[6])],
        ["8ª Tentativa", dados[7].mean, calcMediana(dadosCalculados[7]), dados[7].variance, dados[7].deviation, CV(dados[7])],
        ["9ª Tentativa", dados[8].mean, calcMediana(dadosCalculados[8]), dados[8].variance, dados[8].deviation, CV(dados[8])],
        ["10ª Tentativa", dados[9].mean, calcMediana(dadosCalculados[9]), dados[9].variance, dados[9].deviation, CV(dados[9])],
        ["11ª Tentativa", dados[10].mean, calcMediana(dadosCalculados[10]), dados[10].variance, dados[10].deviation, CV(dados[10])],
        ["12ª Tentativa", dados[11].mean, calcMediana(dadosCalculados[11]), dados[11].variance, dados[11].deviation, CV(dados[11])],
        ["13ª Tentativa", dados[12].mean, calcMediana(dadosCalculados[12]), dados[12].variance, dados[12].deviation, CV(dados[12])],
        ["14ª Tentativa", dados[13].mean, calcMediana(dadosCalculados[13]), dados[13].variance, dados[13].deviation, CV(dados[13])],
        ["15ª Tentativa", dados[14].mean, calcMediana(dadosCalculados[14]), dados[14].variance, dados[14].deviation, CV(dados[14])],
        ["Total", x.mean, calcMediana(arrayTotal), x.variance, x.deviation, CV(x)],
    ]);


    var table = new google.visualization.Table(document.getElementById("frequencia_div"));

    var option = {
        left: "5%",
        top: "5%",
        showRowNumber: false
    };

    table.draw(data, option);
    var width = "150px";
    $(".google-visualization-table-th").css("width", width);
};

//função que concatena todos os valores em apenas um vetor
function vetTotal(_dadosCalculados) {
    var total = _dadosCalculados[0].concat(_dadosCalculados[1],
        _dadosCalculados[2],
        _dadosCalculados[3],
        _dadosCalculados[4],
        _dadosCalculados[5],
        _dadosCalculados[6],
        _dadosCalculados[7],
        _dadosCalculados[8],
        _dadosCalculados[9],
        _dadosCalculados[10],
        _dadosCalculados[11],
        _dadosCalculados[12],
        _dadosCalculados[13],
        _dadosCalculados[14]);
    return total;

}

// função que realiza o calculo da variancia, media e desvio padrão
average = function (a) {
    var r = {
        mean: 0,
        variance: 0,
        deviation: 0
    };
    var t = a.length;

    for (var m, s = 0, l = t; l--; s += a[l]);
    for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));

    return r.deviation = Math.sqrt(r.variance = s / t), r;
};

//função que realiza o calculo da mediana
function calcMediana(vet) {
    var mediana = 0;

    vet.sort(function (a, b) {      //ordena o vetor
        return a - b
    });

    if (vet.length % 2 == 0)        // se o indice central do vetor for par, entao o resultado da mediana será a soma dos 2 elementos centrais divididos por 2.
        return mediana = ((vet[((vet.length) / 2) - 1]) + (vet[((vet.length) / 2)])) / 2;

    else
        return mediana = vet[Math.floor(vet.length / 2) - 1]; //se for impar, este valor sera a mediana.

}

//função que retorna ao coeficiente de variação
function CV(x) {
    var string = "";
    var cv = (x.deviation / x.mean) * 100; //calculo do C.V.
    cv = cv.toFixed(3);             // arredonda o C.V. em 3 casas decimais
    if (cv <= 15) {     
        string = cv + " (Baixa Dispersão)";
    } else if (cv > 15 && cv < 30) {
        string = cv + " (Média Dispersão)";
    } else if (cv >= 30) {
        string = cv + " (Alta Dispersão)";
    }
    return string;
}
