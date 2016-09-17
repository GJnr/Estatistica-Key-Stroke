google.charts.load('visualization', 'current', {'packages': ['corechart', 'table'], 'callback': drawChart});

function drawChart() {//desenha os grafico dos quartis
    var dadosCarregados = JSON.parse(localStorage.getItem("tempos"));
    var data = google.visualization.arrayToDataTable([
        ['1ª vez', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
        ['2ª vez', calcMenor(dadosCarregados[1]), calcQ1(dadosCarregados[1]), calcQ3(dadosCarregados[1]), calcMaior(dadosCarregados[1])],
        ['3ª vez', calcMenor(dadosCarregados[2]), calcQ1(dadosCarregados[2]), calcQ3(dadosCarregados[2]), calcMaior(dadosCarregados[2])],
        ['4ª vez', calcMenor(dadosCarregados[3]), calcQ1(dadosCarregados[3]), calcQ3(dadosCarregados[3]), calcMaior(dadosCarregados[3])],
        ['5ª vez', calcMenor(dadosCarregados[4]), calcQ1(dadosCarregados[4]), calcQ3(dadosCarregados[4]), calcMaior(dadosCarregados[4])]
                /*['1', calcMenor(dadosCarregados[4]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[4]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[4]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[4]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
                 ['1', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])]
                 */

    ], true);

    var options = {
        chartArea: {
            left: "5%",
            top: "5%",
            width: "90%",
            height: "90%"
        },
        legend: 'none',
        bar: {groupWidth: '90%'}, // Remove space between bars.
        candlestick: {
            fallingColor: {strokeWidth: 0, fill: '#a52714'}, // red
            risingColor: {strokeWidth: 0, fill: '#0f9d58'}   // green
        }
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
    chart.draw(data, options);

}
