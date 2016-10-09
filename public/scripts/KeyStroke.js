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

var email = document.getElementById("email");//email
var sexo = document.getElementById("sel1");//sexo
var senha;

var statusUsuario = -1;

/** 
 *    Instancia as 'matrizes' 
 */
window.onload = function () {
    for (var i = 0; i < 15; i++) {
        botoes[i] = [];
        tempos[i] = [];
        document.getElementById("tentativas").innerHTML = "Faltam " + (15 - nCliques) + " tentativas";
    }
};

/**
 * Salva os valores capturados para serem analisados e avança para a próxima página
 */
function proxPagina(condicao) {
    if (condicao) {//se a pessoa já tinha cadastro
        senha = document.getElementById("txt_senha").value;
        var dadosSalvos = getDados(email);
    } else {//se a pessoa não tinha cadastro
        var dadosSalvos = JSON.stringify(tempos);
        inserirBanco(email, senha, dadosSalvos, sexo);
    }
    console.log(senha);
    localStorage.setItem("tempos", dadosSalvos);
    localStorage.setItem("senha", senha);
    nCliques = 0;
    document.getElementById("frm_botao").submit();
}

/**
* Verificica se as senhas sao iguais. Para isso toma a primeira senha digitada como a correta.
*/
function verificaSenha() {
    if (nCliques == 0) {
        senha = document.getElementById("txt_senha").value;
        return true;
    }

    var _senha = document.getElementById("txt_senha").value;

    if (senha !== _senha) {
        document.getElementById("validarSenha").innerHTML = "Senha incorreta. Você deve digitar a mesma senha as 15 vezes.";
        j = 0;
        cBotoes = 0;
        document.getElementById("txt_senha").value = "";
        return false;
    } else {
        document.getElementById("validarSenha").innerHTML = "";
        return true;
    }

}

/**
 * Verifica se o usuário informou um email válido.
 */
function verificaEmail() {
    var email = document.getElementById("email").value;

    if (email != "") {
        document.getElementById("validarEmail").innerHTML = "";
        return true;
    }
    document.getElementById("validarEmail").innerHTML = "Informe um email válido.";
    return false;
}

/**
 * Analisa o status do usuário que está tentando entrar
 */
function analisaStatus() {

    if (statusUsuario == 1) {
        proxPagina(true);
    } else if (statusUsuario == 2) {
        document.getElementById("validarEmail").innerHTML = "Este email já está cadastrado, mas a senha está incorreta. Verifique e tente novamente.";//senha do banco 
        statusUsuario = -1;
    } else if (verificaSenha() && verificaEmail()) {
        document.getElementById("email").disabled = true;//email
        document.getElementById("sel1").disabled= true;//sexo

        nCliques++;
        document.getElementById("tentativas").innerHTML = "Faltam " + (15 - nCliques) + " tentativas";

        if (nCliques > 14) {//Espera o usuario digitar 15 vezes
            proxPagina(false);
        } else {
            i++;
            document.getElementById("txt_senha").value = '';//limpa caixa de texto
        }
    }
    cBotoes = 0;
    j = 0;

}
/** 
 *  Clique no botão
 */
$(function () {
    $("#btn_entrar").click(function () {
        email = document.getElementById("email").value;//email
        sexo = document.getElementById("sel1").value;//sexo
        let senha = document.getElementById("txt_senha").value;

        estaCadastrado(email, senha);
        window.setTimeout(analisaStatus, 1000);//Espera a resposta do Bando de dados
    });
});

/**
 * Salva o tempo entre cada tecla digitada pelo usuário
 */
function key_stroke() {
    now = new Date;
    botoes[nCliques][cBotoes] = parseFloat(now.getTime());//Tempo desde a virada do século

    if (cBotoes > 0) {//Se não for o primeiro botão digitado

        /*
         * Tempo entre as teclas: tempo da tecla anterior - o tempo da tecla atual 
         */
        tempos[nCliques][j] = parseFloat(botoes[nCliques][cBotoes] - botoes[nCliques][cBotoes - 1]);
        //console.log("tempos[" + nCliques + "][" + j + "] = " + tempos[nCliques][j]);
        j++;
        //console.log(botoes[nCliques][cBotoes] - botoes[nCliques][cBotoes-1]);   
    }

    cBotoes++;
}
