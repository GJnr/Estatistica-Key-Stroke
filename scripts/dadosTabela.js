var dadosCarregados;

//google.charts.load('visualization', 'current', {'packages':['corechart', 'table'], 'callback':drawCharts});

window.onload = function(){
  dadosCarregados = JSON.parse(localStorage.getItem("tempos"));
};

$(function(){
  $("#li_quartis").click(function(e){
    e.preventDefault();
    location.href = "quartis.html";
  });
});

$(function(){
  $("#li_frequencia").click(function(e){
    e.preventDefault();
    location.href = "frequencia.html";
  });
});


$(function(){
  $("#li_curva").click(function(e){
    e.preventDefault();
    location.href = "curvas.html";
  });
});


$(function(){
  $("#li_inicio").click(function(e){
    e.preventDefault();
    location.href = "keyStroke.html";
  });
});

$(function(){
  $("#li_estatistica").click(function(e){
    e.preventDefault();
    location.href = "estatistica.html";
  });
});


var needToConfirm = false;
window.onbeforeunload = function() {
  if (needToConfirm) {
    return "Minha mensagem de confirmação.";
  }
};

$(function(){
  $("#li_sair").click(function(e){
    e.preventDefault();
    needToConfirm = true;
    location.href = "index.html";
  });
});