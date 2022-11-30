
function drawLine(){
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(700,700);
ctx.stroke();
}

