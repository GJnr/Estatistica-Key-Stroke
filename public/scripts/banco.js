/**
 * @author Givaldo Marques 201420029045
 * @author Pedro Henrique
 *
 * Ciência da Computação - UFS em 10/10/2016
 * 
 * Esse arquivo faz a conexão com o banco de dados e possui as funções necessárias para a aplicação.
 */


//Referencia ao banco de dados
var firebaseRef = new Firebase("//keystroke-df93c.firebaseio.com/");

//var firebaseRef = new Firebase("//keystroke-38de5.firebaseio.com/");

/*
insere um usuario no banco de dados, retorna se foi inserido;
 */
function inserirBanco(email, senha, dados, sexo) {
    // var _dados = JSON.stringify(dados);
    var data = {
        email: email,
        senha: senha,
        dados: dados,
        sexo: sexo
    };

    firebaseRef.child('usuario').push(data);
    return true;
}

/*
Esse função busca o email no banco de dados
Se o email não esteja cadastrado, a função retorna 0.
Se o email estiver cadastrado e senha estiver correta, a função returna 1.
Se o email estiver cadastrado e senha não estiver correta, a função returna 2.
Use-a com sabedoria! 
 */
function estaCadastrado(email, senha) {
    firebaseRef.child('usuario').on('value', function (snapshot) {

        snapshot.forEach(function (item) {
            if (statusUsuario <= 0) {
                if (email == item.val().email) {
                    console.log("Usuário já cadastrado no banco");
                    if (senha == item.val().senha) {
                        console.log("O usuário tem permissão para entrar");
                        statusUsuario = 1;

                    } else {
                        console.log("Senha incorreta");
                        statusUsuario = 2;

                    }

                } else {
                    statusUsuario = 0;
                }
            }

        });

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

/*
Essa função retorna os tempos de um determinado usuário a partir de seu email
 */
function getDados(email) {
    var ret=-1;
    firebaseRef.child('usuario').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            if (email == item.val().email) {
                ret = item.val().dados;
            }
        });

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    return ret;
}