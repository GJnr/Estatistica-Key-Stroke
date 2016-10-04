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
var dados_prob = [];
var pass = true; // variavel para checar se já existe um email a ser cadastrado

var firebaseRef = new Firebase("https://teste-8ef28.firebaseio.com");

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
    var email = document.getElementById("email").value;
    var sexo = document.getElementById("sel1").value;

    console.log(dadosSalvos + "// " + email + "// " + sexo + "// " + senha);
    localStorage.setItem("tempos", dadosSalvos);
    localStorage.setItem("senha", senha);

    firebaseRef.ref().child('usuarios/email').on("value", function (snapshot) {
        console.log(snapshot.val().email);
        check(snapshot.val().email);
    });

    if (pass)
        inserirBanco(email, dadosSalvos, sexo);
    else
        console.log("usuario " + email + "já foi cadastrado, não foi inserido no banco os novos dados");
}

//checa se o email já foi cadastrado no banco de dados para não havar repetição
function check(id) {//id é o email do banco e nome o dado na pra salvar
    var id_bd = document.getElementById("email").value;
    if (id != nome)
        pass = false;
    return;
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

function verificarEmail() {
    var email = document.getElementById("email").value;

    if (email != "") {
        document.getElementById("validarEmail").innerHTML = "";
        return true;
    }
    document.getElementById("validarEmail").innerHTML = "Informe um email válido.";
    return false;
}


function entrar() {//Evento de clique no botao 'entrar'
    now = new Date;

    if (verificarSenha() && verificarEmail()) {
        nCliques++;
        document.getElementById("tentativas").innerHTML = "Faltam " + (15 - nCliques) + " tentativas";
    }

    if (nCliques > 3) {//Espera o usuario digitar 15 vezes
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


function inserirBanco(_email, _dados, _sexo) {
    var data = {
        email: _email,
        dados: _dados,
        sexo: _sexo,
        senha: senha
    };
    console.log(_email + " e " + _sexo + ", " + _dados);
    firebaseRef.ref().child('usuarios').push(data);
}

var sex;//sexo

function recuperar() {
    firebaseRef.database().ref().child().on('value', function (snapshot) {
        sexo(snapshot.val().sexo);
        password(snapshot.val().senha);
        id(snapshot.val().email);
        dado(snapshot.val().dados);
    });

}

function sexo(sexo) {
    sex = sexo;
}

function password(pass) { password = pass; }
function id(email) { id = email; }
function dado(conteudo) {
    for (var i = 0; i < dado.lenght; i++)
        dado[i] = conteudo[i];
}