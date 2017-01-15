/**
 * Created by dima on 12.01.2017.
 */
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    count = 10,
    arrCircles = [];





canvas.addEventListener("click", getCircle);


function getCircle(e) {
    if (count <= 0 ) return; // можем рисовать столько окружностей сколько задано в count
    arrCircles.push(getCursorPosition(e));
    drawCircle();
    count--;

}
function moveCircle(obj) {
    canvas.width = canvas.width;

}

function drawCircle(){
    for (var i = 0; i < arrCircles.length; i++) {
        ctx.beginPath();
        ctx.arc(arrCircles[i].x, arrCircles[i].y, 30, 0, Math.PI * 2);
        ctx.fillStyle = "#69cc27";
        ctx.fill();
    }
}

// получаем координаты клика в элементе canvas

function getCursorPosition(e) {
    var obj ={};

    if (e.pageX != undefined && e.pageY != undefined) {
        obj.x = e.pageX;
        obj.y = e.pageY;
    }
    else {
        obj.x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        obj.y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    obj.x -= canvas.offsetLeft;
    obj.y -= canvas.offsetTop;
    return obj;
}