/**
 * Created by Givaldo Marques on 12/10/2016.
 */

window.onload = function(){
    var nomeUsuario = localStorage.getItem("email").split("@");
    document.getElementById("email").innerHTML = nomeUsuario[0];
}