function calcQ1(_array) {//retorna o Q1 do array
    _array.sort(function (a, b) { return a - b });
    var aux = (_array.length-1) * 0.25;
    return _array[Math.round(aux)];
}

function calcQ3(_array) {//retorna o Q3 do array
    _array.sort(function (a, b) { return a - b });
    var aux = (_array.length-1) * 0.75;
    return parseInt(_array[Math.round(aux)]);
    //console.log(Math.round(aux));
}

function calcMenor(_array) {//retorna o menor valor do array
    _array.sort(function (a, b) { return a - b });
    return _array[0];
}

function calcMaior(_array) {//retorna o maior valor do array
    _array.sort(function (a, b) { return a - b });
    return _array[(_array.length - 1)];
}

function calcFi(_dadosCalculados) {

    for (var i = 0; i < 15; i++) {

        for (var j = 0; j < _dadosCalculados[i].length; j++) {

            if (_dadosCalculados[i][j] < 30) {
                fi[0]++;
            } else if (_dadosCalculados[i][j] < 60) {
                fi[1]++;
            } else if (_dadosCalculados[i][j] < 90) {
                fi[2]++;
            } else if (_dadosCalculados[i][j] < 120) {
                fi[3]++;
            } else if (_dadosCalculados[i][j] < 150) {
                fi[4]++;
            } else if (_dadosCalculados[i][j] < 180) {
                fi[5]++;
            } else if (_dadosCalculados[i][j] < 210) {
                fi[6]++;
            } else if (_dadosCalculados[i][j] < 240) {
                fi[7]++;
            }

        }
    }

}
