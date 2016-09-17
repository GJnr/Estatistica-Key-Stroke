var fi = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var fac = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var fad = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var pfi = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var pfac = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var pfad = [0, 0, 0, 0, 0, 0, 0, 0, 0];

google.charts.load('visualization', 'current', {'packages': ['corechart', 'table'], 'callback': drawFrequence});

function drawFrequence() {

    var dadosCalculados = JSON.parse(localStorage.getItem("tempos"));

    calcFi(dadosCalculados);
    calcFac();
    var total = fi[0] + fi[1] + fi[2] + fi[3] + fi[4] + fi[5] + fi[6] + fi[7];
    calcFad(total);
    perFi(total);
    perFac();
    perFad();

    var data = new google.visualization.DataTable();

    data.addColumn('number', 'tempo (ms)');
    data.addColumn('number', 'fi');
    data.addColumn('number', 'fac');
    data.addColumn('number', 'fad');
    data.addColumn('number', 'fi (%)');
    data.addColumn('number', 'fac (%)');
    data.addColumn('number', 'fad (%)');

    data.addRows([
        [{v: 1, f: '0 - 30'}, fi[0], fac[0], fad[0], pfi[0], pfac[0], pfad[0]],
        [{v: 2, f: '30 - 60'}, fi[1], fac[1], fad[1], pfi[1], pfac[1], pfad[1]],
        [{v: 3, f: '60 - 90'}, fi[2], fac[2], fad[2], pfi[2], pfac[2], pfad[2]],
        [{v: 4, f: '90 - 120'}, fi[3], fac[3], fad[3], pfi[3], pfac[3], pfad[3]],
        [{v: 5, f: '120 - 150'}, fi[4], fac[4], fad[4], pfi[4], pfac[4], pfad[4]],
        [{v: 6, f: '150 - 180'}, fi[5], fac[5], fad[5], pfi[5], pfac[5], pfad[5]],
        [{v: 7, f: '180 - 210'}, fi[6], fac[6], fad[6], pfi[6], pfac[6], pfad[6]],
        [{v: 8, f: '210 - 240'}, fi[7], fac[7], fad[7], pfi[7], pfac[7], pfad[7]],
    ]);

    var table = new google.visualization.Table(document.getElementById('frequencia_div'));

    var option = {
        left: "5%",
        top: "5%",
        width: "90%",
        height: "100%",
        showRowNumber: false
    };

    table.draw(data, option);
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

function calcFac() {
    var aux = 0;
    for (var i = 0; i < 8; i++) {
        aux = aux + fi[i];
        fac[i] = aux;
    }
}

function calcFad(_total) {
    var aux = _total;
    for (var i = 0; i < 8; i++) {
        if (i == 0) {
            fad[i] = _total;
        } else {
            aux = aux - fi[i - 1];
            fad[i] = aux;
        }
    }
}

function perFi(_total) {
    for (var i = 0; i < 8; i++) {
        pfi[i] = (fi[i] / _total) * 100;
    }
}

function perFac() {
    var aux = 0;
    for (var i = 0; i < 8; i++) {
        aux = aux + pfi[i];
        pfac[i] = aux;
    }
}

function perFad() {
    aux = 100;
    for (var i = 0; i < 8; i++) {
        if (i === 0) {
            pfad[i] = 100;
        } else {
            aux = aux - pfi[i - 1];
            pfad[i] = aux;
        }
    }

}