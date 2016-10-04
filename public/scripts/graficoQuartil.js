google.charts.load('visualization', 'current', { 'packages': ['corechart', 'table'], 'callback': drawChart });

function drawChart() {//desenha os grafico dos quartis
    var dadosCarregados = JSON.parse(localStorage.getItem("tempos"));
    console.log(dadosCarregados);
    var data = google.visualization.arrayToDataTable([
        ['1ª vez', calcMenor(dadosCarregados[0]), calcQ1(dadosCarregados[0]), calcQ3(dadosCarregados[0]), calcMaior(dadosCarregados[0])],
        ['2ª vez', calcMenor(dadosCarregados[1]), calcQ1(dadosCarregados[1]), calcQ3(dadosCarregados[1]), calcMaior(dadosCarregados[1])],
        ['3ª vez', calcMenor(dadosCarregados[2]), calcQ1(dadosCarregados[2]), calcQ3(dadosCarregados[2]), calcMaior(dadosCarregados[2])],
        ['4ª vez', calcMenor(dadosCarregados[3]), calcQ1(dadosCarregados[3]), calcQ3(dadosCarregados[3]), calcMaior(dadosCarregados[3])],
        ['5ª vez', calcMenor(dadosCarregados[4]), calcQ1(dadosCarregados[4]), calcQ3(dadosCarregados[4]), calcMaior(dadosCarregados[4])],
        ['6ª vez', calcMenor(dadosCarregados[5]), calcQ1(dadosCarregados[5]), calcQ3(dadosCarregados[5]), calcMaior(dadosCarregados[5])],
        ['7ª vez', calcMenor(dadosCarregados[6]), calcQ1(dadosCarregados[6]), calcQ3(dadosCarregados[6]), calcMaior(dadosCarregados[6])],
        ['8ª vez', calcMenor(dadosCarregados[7]), calcQ1(dadosCarregados[7]), calcQ3(dadosCarregados[7]), calcMaior(dadosCarregados[7])],
        ['9ª vez', calcMenor(dadosCarregados[8]), calcQ1(dadosCarregados[8]), calcQ3(dadosCarregados[8]), calcMaior(dadosCarregados[8])],
        ['10ª vez', calcMenor(dadosCarregados[9]), calcQ1(dadosCarregados[9]), calcQ3(dadosCarregados[9]), calcMaior(dadosCarregados[9])],
        ['11ª vez', calcMenor(dadosCarregados[10]), calcQ1(dadosCarregados[10]), calcQ3(dadosCarregados[10]), calcMaior(dadosCarregados[10])],
        ['12ª vez', calcMenor(dadosCarregados[11]), calcQ1(dadosCarregados[11]), calcQ3(dadosCarregados[11]), calcMaior(dadosCarregados[11])],
        ['13ª vez', calcMenor(dadosCarregados[12]), calcQ1(dadosCarregados[12]), calcQ3(dadosCarregados[12]), calcMaior(dadosCarregados[12])],
        ['14ª vez', calcMenor(dadosCarregados[13]), calcQ1(dadosCarregados[13]), calcQ3(dadosCarregados[13]), calcMaior(dadosCarregados[13])],
        ['15ª vez', calcMenor(dadosCarregados[14]), calcQ1(dadosCarregados[14]), calcQ3(dadosCarregados[14]), calcMaior(dadosCarregados[14])]


    ], true);
    var options = {
        chartArea: {
            left: "5%",
            top: "5%",
        },
        legend: 'none',
        bar: { groupWidth: '90%' }, // Remove space between bars.
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
        }
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
    chart.draw(data, options);

}

$(window).resize(function () {
    drawChart();
});