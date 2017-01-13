/**
 * Created by dima on 12.01.2017.
 */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = '#00FF00'; // меняем цвет рамки
ctx.strokeRect(125, 15, 100, 100);
ctx.fillStyle = '#5500FF'; // меняем цвет прямоугольника
ctx.fillRect(130, 20, 90, 90);