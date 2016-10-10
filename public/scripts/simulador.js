/**
 * @author: Givaldo Marques dos Santos - 201420029045
 * Ciência da Computação - UFS em 01/09/2016
 *
 * Simula o funcionamento do Keystroke.
 * Segue o exemplo do artigo 'Biometrics for fool proof security'
 * Utiliza dos quartis 1 e 3 como limite superior e limite inferior.
 */

google.charts.load('current', { 'packages': ['line'], 'callback': desenhaCurva });

var botoes2 = [];
var tempos2 = [];
var i = 0, j = 0;
var dados = JSON.parse(localStorage.getItem("tempos"));//dados do usuario logado
var usuarioErros = 0;
var usuario = localStorage.getItem("email");
var q1 = calcQ1_2(dados);
var q3 = calcQ3_2(dados);

var margemDeErro = 100  ;

//noinspection JSUnresolvedFunction
var firebaseRef = new Firebase("//keystroke-df93c.firebaseio.com/");

/**
 * Limpa os campos e zera os contadores
 */
function limparDados() {
    document.getElementById("txt_simulador").value = '';
    desenhaCurva();

    //zera os contadores dos arrays
    i = 0;
    j = 0;
}

function tentativa() {
    var senha = localStorage.getItem("senha");//senha do usuario logado
    var senha_simulacao = document.getElementById("txt_simulador").value;//senha do usuario logado

    if (senha_simulacao !== senha) {//se a senha da simulacao for diferente da senha da tentativa
        document.getElementById("tentativa_div").innerHTML = "Senha Errada.";
        limparDados();
        usuarioErros++;
        return;
    }

    //se o numero de tempos capturados for menor que o tamanho da senha
    if (senha_simulacao.length > (tempos2.length + 1)) {
        document.getElementById("tentativa_div").innerHTML = "Senha Correta, mas você usou 'ctrl+v'";
        limparDados();
        usuarioErros++;
        return;
    }

    /*
     Keystroke
     Verificação se ha algum valor fora dos limites aceitados.
     Para que a Identidade seja confirmada é necessário que não tenha valores fora dos limites
     */
    for (var i = 0; i < senha.length; i++) {
        if (tempos2[i] < q1[i] - margemDeErro || tempos2[i] > q3[i] + margemDeErro) {
            document.getElementById("tentativa_div").innerHTML = "Você não é quem diz ser. Tente Novamente!";
            limparDados();
            usuarioErros++;
            return;
        }
    }
    document.getElementById("tentativa_div").innerHTML = "Identidade confirmada.";
    limparDados();
}


/**
 * Evento acionado ao usuario apertar qualquer tecla.
 * Essa função calcula o tempo entre cada tecla digitada.
 */
function keyStroke_simulador() {
    now = new Date;

    botoes2[i] = parseFloat(now.getTime());

    if (i > 0) {//se for pelo menos a segunda tecla a ser digitada
        tempos2[j] = parseFloat(botoes2[i] - botoes2[j]);
        //console.log(tempos2[j]);
        j++;
    }

    i++;
}


// criar um nó no banco de dados com o nome simulador, nele irá inserir a quantidade de nós que existem
function armazenarTentativas(){// do simulador
    var exist = false;

    firebaseRef.child('simulador').on('value', function(snapshot){
        snapshot.forEach(function(item){

            if(usuario === item.val().email && !exist){
                exist = true;
            }
        });

    });
    if(exist) {
        return;
    }

    var data = {
        email : usuario,
        qtdErros : usuarioErros
    };

    firebaseRef.child('simulador').push(data);
    usuarioErros = 0;
}

/**
 * plota o gráfico
 */
function desenhaCurva() {

    var matriz = [];
    var data = new google.visualization.DataTable();

    data.addColumn('number', 'Caractere');
    data.addColumn('number', 'Limite Mínino');
    data.addColumn('number', 'Limite Máximo');
    data.addColumn('number', 'Sua tentativa');

    for (var i = 0; i < q1.length; i++) {
        matriz[i] = [];
        matriz[i][0] = i;
        matriz[i][1] = q1[i] - margemDeErro;
        matriz[i][2] = q3[i] + margemDeErro;
        matriz[i][3] = tempos2[i];
    }

    data.addRows(matriz);

    var options = {
        chart: {
            title: 'Analise de tempos',
            subtitle: 'Motivo do acesso ser ou não permitido'
        }

    };


    //noinspection JSUnresolvedFunction
    var chart = new google.charts.Line(document.getElementById('linechart_tentativa'));

    chart.draw(data, options);
}

/**
 * Calcular os quartils 1 de cada tempo entre as teclas
 */
function calcQ1_2(_dadosCalculados) {
    var soma = [];
    var ret = [];
    for (var i = 0; i < _dadosCalculados[0].length; i++) {
        for (var j = 0; j < 15; j++) {//mudar para 15
            soma[j] = _dadosCalculados[j][i];
        }
        ret[i] = calcQ1(soma);
    }
    return ret;
}

/**
 *  Calcula os quartils 3 de cada tempo entre as teclas
 */
function calcQ3_2(_dadosCalculados) {
    var soma = [];
    var ret = [];
    for (var i = 0; i < _dadosCalculados[0].length; i++) {
        for (var j = 0; j < 15; j++) {
            soma[j] = _dadosCalculados[j][i];
        }
        ret[i] = calcQ3(soma);
    }
    return ret;
}

$(window).resize(function () {
    desenhaCurva();
});
