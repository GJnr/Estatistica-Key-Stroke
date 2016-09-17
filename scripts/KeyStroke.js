/*
 *  @author Givaldo Marques dos Santos
 */

var now;
var i = 0;
var j = 0;
var nCliques = 0;
var botoes = [];//Lista (Matriz) de botoes que o usuario digitar
var tempos = [];//Lista (Matriz) de tempos entre cada botao digitado
var cBotoes = 0;// número de botoes digitados
var senha = "";

var firebaseRef = new Firebase("https://keystroke-38de5.firebaseio.com/");



window.onload = function () {
    for (var i = 0; i < 15; i++) {
        botoes[i] = [];
        tempos[i] = [];
        document.getElementById("tentativas").innerHTML = "Faltam " + (15 - nCliques) + " tentativas";
    }
};


//salva os valores capturados para serem analisados
function salvaValores() {
    var dadosSalvos = JSON.stringify(tempos);
    localStorage.setItem("tempos", dadosSalvos);

    var email = document.getElementById("email").value;
    var sexo = document.getElementById("sel1").value;
    inserirBanco(email, dadosSalvos, sexo);
}

//verificica se as senhas sao iguais. Para isso toma a primeira senha digitada como a correta.
function verificarSenha() {
    if (nCliques < 1) {
        senha = document.getElementById("txt_senha").value;
        return true;
    }

    var _senha = document.getElementById("txt_senha").value;
    
    if (senha !== _senha) {
        document.getElementById("validarSenha").innerHTML = "Senha incorreta";
        j = 0;
        cBotoes = 0;
        document.getElementById("txt_senha").value = "";
        return false;
    } else {
        document.getElementById("validarSenha").innerHTML = "";
        return true;
    }

}

function verificarEmail(){
    var email = document.getElementById("email").value;

    if(email != ""){
        document.getElementById("validarEmail").innerHTML = "";
        return true;
    }
    document.getElementById("validarEmail").innerHTML = "Informe um email válido.";
    return false;
}


function entrar() {//Evento de clique no botao 'entrar'
    now = new Date;

    if(verificarSenha() && verificarEmail()){
        nCliques++;
        document.getElementById("tentativas").innerHTML = "Faltam " + (15 - nCliques) + " tentativas";
    }

    if (nCliques > /*13*/ 3) {//Espera o usuario digitar 15 vezes
        document.getElementById("frm_botao").submit();

        nCliques = 0;
        salvaValores();

    } else {
        i++;
        document.getElementById("txt_senha").value = '';//limpa caixa de texto
    }

    cBotoes = 0;
    j = 0;

}

function key_stroke() {//Evento acionado ao usuario apertar qualquer tecla
    now = new Date;

    botoes[nCliques][cBotoes] = parseFloat(now.getTime());

    if (cBotoes > 0) {//obtendo o tempo entre cada tecla

        tempos[nCliques][j] = parseFloat(botoes[nCliques][cBotoes] - botoes[nCliques][cBotoes - 1]);

        //console.log("tempos[" + nCliques + "][" + j + "] = " + tempos[nCliques][j]);
        j++;
        //console.log(botoes[nCliques][cBotoes] - botoes[nCliques][cBotoes-1]);   
    }

    cBotoes++;
}
/*
function inserirBanco(email, valores, sexo){
    console.log("Salvando valores");

    firebaseRef.set(
        {
        "usuarios":{
            "email": email,
            "dados": valores,
            "sexo": sexo
            }
        }
    );
}
*/
function inserirBanco(_email, _dados, _sexo) {
    var childRef = firebaseRef.child("usuarios");
    childRef.push({email:_email, dados:_dados, sexo:_sexo});
}

