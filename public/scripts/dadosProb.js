var j = 0;
var qtdErros = [];// qtd de erros de cada usuario
var aux = 0;
var prob = 0;// prob de existir erros maiores que a media
var h = 0;
var f = 0; //porcentagem de homens e mulheres
var hotmail = 0;
var gmail = 0;// probabilidade de ser hotmail, gmail
var tamanho = 0;
var parametro;
var desvio;
var margemErro;
var Amostral;

google.charts.load('visualization', 'current', { 'packages': ['corechart', 'table'] });

$(document).ready(function () {
    startup();
});

function startup() {
    firebaseRef.child('usuario').on('value', function (snapshot) {
        snapshot.forEach(function (item) {

            var quebra = [];
            var quebra2 = [];

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
//    console.log("tamanho total = " + tamanho);
    puxarErros();

}

// essa função vai puxar todos os dados das demais funcoes e juntar numa tabela
function drawProb() {

    h = parseFloat(((h - tamanho) / tamanho + 1));

    f = parseFloat(((f - tamanho) / tamanho + 1));
    gmail = parseFloat(((gmail - tamanho) / tamanho + 1));
    hotmail = parseFloat(((hotmail - tamanho) / tamanho + 1));
    parametro = Math.round(parametro);

    var nenhum1 = parseFloat(100 - (f*100) - h*100);
    var nenhum2 = parseFloat((1 - (gmail + hotmail)));

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Probabilidades');
    data.addColumn('string', 'Valores (%)');

    //noinspection JSUnresolvedFunction
    data.addRows([
        ['Ser do sexo Masculino', (h*100).toFixed(2) + ""],
        ['Ser do sexo Feminino', (f*100).toFixed(2) + ""],
        ['Nenhum dos dois sexos', (nenhum1).toFixed(2) + ""],
        ['De ser hotmail', (hotmail*100).toFixed(2) + ""],
        ['De ser gmail', (gmail*100).toFixed(2) + ""],
        ['De ser outro tipo de email', (nenhum2*100).toFixed(2) + ""],
    	['Dos erros do simulador serem maiores que a media (' + parametro +")" , (prob*100).toFixed(2) + ""]
    ]);

    var option = {
        left: "5%",
        top: "5%",
        showRowNumber: false
    };

    var table = new google.visualization.Table(document.getElementById('prob_div'));
    table.draw(data, option);
    var width = "250px" ;
    $(".google-visualization-table-td").css("min-width", width);
}


function drawAmostral(){
	var data = new google.visualization.DataTable();
	data.addColumn('string','Amostragem');
	data.addColumn('string','');
	data.addRows([
		['Tamanho da Amostra', Math.round(0.65*(qtdErros.length)) + ""],
		['Media amostral', Amostral.toFixed(2) + ""],
		['Variância amostral', parseFloat(Math.pow(desvio,2)).toFixed(2) + ""],
		['Desvio Amostral', parseFloat(desvio).toFixed(2) + ""]
		]);

    var option = {
        left: "5%",
        top: "5%",
        showRowNumber: false
    };

	var table = new google.visualization.Table(document.getElementById('amostra_div'));
	table.draw(data,option);
    var width = "150px";
    $(".google-visualization-table-td").css("width", width);
}


//verifica qtd de tentativas erradas do simulador, puxando do banco de dados
function puxarErros() {

    firebaseRef.child('simulador').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            qtdErros[j] = item.val().qtdErros;
            j++;
        });
    });

    window.setTimeout(function () {

        document.getElementById("h2_carregando").innerHTML = "";

        let mediaAmostral = 0;
        let mediaTotal = 0;
        var cont = 0;

        //tamanho da amostra 65% do total
        for (var i = 0; i < Math.round(0.65*qtdErros.length); i++) {
            var aux = Math.floor(Math.random()* (qtdErros.length - 1));
     
            mediaAmostral = mediaAmostral + parseInt(qtdErros[aux]);//de 0 até qtdErrosTotal -1
        }

        for(var i = 0 ; i < qtdErros.length ; i++){
        	mediaTotal = mediaTotal + parseInt(qtdErros[i]);
        }

        mediaAmostral = (mediaAmostral / Math.round(qtdErros.length*0.65));
        mediaTotal = (mediaTotal / qtdErros.length);
        parametro = mediaTotal;
        desvio = 0;//desvio amostral
        for(var i = 0 ; i < qtdErros.length ; i++){
        	desvio = desvio + Math.pow((qtdErros[i] - mediaAmostral),2) ;
        }
        desvio = desvio/((qtdErros.length*0.65) -1);
        desvio = parseFloat(Math.sqrt(desvio)).toFixed(4);

        margemErro = Math.sqrt();
        Amostral = mediaAmostral

        for (i = 0; i < qtdErros.length; i++) {
            if (qtdErros[i] >= mediaTotal) {
                cont++;
            }
        }

        prob = parseFloat(((cont - qtdErros.length) / qtdErros.length + 1).toFixed(4)); // prob de maior ou igual a media

        drawProb();
        drawAmostral();
    }, 5000);
}

$(window).resize(function () {
    drawProb();
    drawAmostral();
});
