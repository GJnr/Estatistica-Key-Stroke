google.charts.load('visualization', 'current', { 'packages': ['corechart', 'table'], 'callback': drawCurve, drawCurveQ });

var fi = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var fac = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var fad = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var dadosCalculados = JSON.parse(localStorage.getItem("tempos"));

function drawCurve() {
  drawCurveQ();
  calcFi(dadosCalculados);
  calcFac();
  var total = fi[0] + fi[1] + fi[2] + fi[3] + fi[4] + fi[5] + fi[6] + fi[7];
  calcFad(total);

  var data = google.visualization.arrayToDataTable([
    ['number', 'fi', 'fac', 'fad'],
    [1, fi[0], fac[0], fad[0]],
    [2, fi[1], fac[1], fad[1]],
    [3, fi[2], fac[2], fad[2]],
    [4, fi[3], fac[3], fad[3]],
    [5, fi[4], fac[4], fad[4]],
    [6, fi[5], fac[5], fad[5]],
    [7, fi[6], fac[6], fad[6]],
    [8, fi[7], fac[7], fad[7]],
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'none',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById("line_div"));

  chart.draw(data, options);
}


function drawCurveQ() {
  var data = google.visualization.arrayToDataTable([
    ['number', 'Q3', 'Q1'],
    [1, calcQ3(dadosCalculados[0]), calcQ1(dadosCalculados[0])],
    [2, calcQ3(dadosCalculados[1]), calcQ1(dadosCalculados[1])],
    [3, calcQ3(dadosCalculados[2]), calcQ1(dadosCalculados[2])],
    [4, calcQ3(dadosCalculados[3]), calcQ1(dadosCalculados[3])],
    [5, calcQ3(dadosCalculados[4]), calcQ1(dadosCalculados[4])]
  ]);

  var options = {
    title: 'Dados de Acessos',
    curveType: 'none',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById("lineQ_div"));

  chart.draw(data, options);
}

$(window).resize(function () {
  drawCurve();
  drawCurveQ();
});

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
    }
    else {
      aux = aux - fi[i - 1];
      fad[i] = aux;
    }
  }
}

