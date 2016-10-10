var j = 0;
var qtdErros = [];// qtd de erros de cada usuario
var aux = 0;
var prob = 0;// prob de existir erros maiores que a media
var h = 0;
var f = 0; //porcentagem de homens e mulheres
var hotmail = 0;
var gmail = 0;// probabilidade de ser hotmail, gmail
var tamanho = 0;

google.charts.load('visualization', 'current', { 'packages': ['corechart', 'table'] });

$(document).ready(function () {
    startup();
});

function startup() {
    firebase.database().ref().child('usuario').on('value', function (snapshot) {
        snapshot.forEach(function (item) {

            var quebra;
            var quebra2;

            if (item.val().sexo === "Homem") {
                h++;
            } else if (item.val().sexo === "Mulher") {
                f++;
            }

            quebra = item.val().email.split("@");
            quebra2 = quebra[1].split(".");

            if (quebra2[0] === "gmail") {
                gmail++;
            } else if (quebra2[0] === "hotmail") {
                hotmail++;
            }

            tamanho++;
        });
    });

    puxarErros();

}

// essa função vai puxar todos os dados das demais funcoes e juntar num grafico
function drawProb() {

    h = parseFloat(((h - tamanho) / tamanho + 1).toFixed(4));

    f = parseFloat(((f - tamanho) / tamanho + 1).toFixed(4));
    gmail = parseFloat(((gmail - tamanho) / tamanho + 1).toFixed(4));
    hotmail = parseFloat(((hotmail - tamanho) / tamanho + 1).toFixed(4));

    var data = new google.visualization.DataTable();

    data.addColumn('number', 'Probabilidade de ser do sexo Masculino');
    data.addColumn('number', 'Probabilidade de ser do sexo Feminino');
    //     data.addColumn('string', 'Margem de erros do simulador');
    data.addColumn('number', 'Probabilidade de ser hotmail');
    data.addColumn('number', 'Probabilidade de ser gmail');
    data.addColumn('number', 'Probabilidade de não nenhum dos dois');
    //  data.addColumn('string', 'Intervalo de confiança');



    //noinspection JSUnresolvedFunction
    data.addRows([
        [h, f, hotmail, gmail, (1 - (gmail + hotmail))]
    ]);

    var option = {
        showRowNumber: false,
    };

    var table = new google.visualization.Table(document.getElementById('prob_div'));
    table.draw(data, option);

}

//verifica qtd de tentativas erradas do simulador, puxando do banco de dados
function puxarErros() {

    firebase.database().ref().child('simulador').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            qtdErros[j] = item.val().qtdErros;
            //console.log("erros[" + j + "] = " + qtdErros[j]);
            j++;
        });
    });

    window.setTimeout(function () {

        document.getElementById("h2_carregando").innerHTML = "";

        let media = 0;
        var cont = 0;

        for (var i = 0; i < qtdErros.length; i++) {
            media = media + parseInt(qtdErros[i]);
        }

        console.log("media: "+media);
        console.log("qtdErros: " +qtdErros[0]);
        media = (media / qtdErros.length);

        console.log(media);

        for (i = 0; i < qtdErros.length; i++) {
            //console.log(qtdErros[i] + ">=" + media + "?");
            if (qtdErros[i] >= media) {
                //console.log("sim");
                cont++;
            }
        }

        prob = parseFloat(((cont - qtdErros.length) / qtdErros.length + 1).toFixed(4)); // prob de maior ou igual a media
        console.log("margem de erro = " + prob);
        drawProb();
    }, 5000);


}
