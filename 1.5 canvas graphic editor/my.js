/**
 * Created by dima on 30.01.2017.
 */
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    w = canvas.width,
    h = canvas.height,
    menu = [],
    obj = {
        buttoWidth : 80,
        buttonHeight: 30
    },
    line = {
        lineColor :  "#000000",
        lineWidth: 1
    },
    elems = ["color", "clear", "save", "line", "restore"],
    imgData;


var ElemMenu = function(text){
    if (menu.length !== 0) {
        var height = menu[menu.length-1].yEnd +10
    } else {
        height = 10;
    }
    this.text = text;
    this.click = false; // индликатор нажали ли на элемент меню
    this.xStart = w - obj.buttoWidth - 10;
    this.yStart = height;
    this.xEnd = this.xStart + obj.buttoWidth;
    this.yEnd = this.yStart + obj.buttonHeight;

    this.draw = function(colorBorder){
        var colorBorder = colorBorder || '#000000';
        ctx.clearRect(this.xStart-1, this.yStart-1, obj.buttoWidth+2, obj.buttonHeight+2);
        ctx.beginPath();
        ctx.strokeStyle=colorBorder;
        ctx.lineWidth = 1;
        ctx.strokeRect(this.xStart, this.yStart, obj.buttoWidth, obj.buttonHeight);

        ctx.font='15px Verdana';
        ctx.fillStyle='#F92608';
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.xStart + obj.buttoWidth/2, this.yStart + 15 + 5); //15 это размер шрифта
        ctx.closePath();
        if (this.text =="line"){
            ctx.fillStyle='#000000';
            ctx.textAlign = "left";
            ctx.fillText(line.lineWidth + "px", this.xEnd - 22, this.yStart + 15 + 5, 19, 15);
        }
    }
    this.draw();
}
function mouseDown(e){
    var obj = getCursorPosition(e);
    for (var i = 0; i < menu.length; i++){
        if (obj.x >= menu[i].xStart && obj.x <= menu[i].xEnd && obj.y >= menu[i].yStart && obj.y <= menu[i].yEnd) {
            menu[i].draw("red");
            menu[i].click = true;
        }
    }
    if (obj.x <= menu[0].xStart -10 ){
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        document.documentElement.addEventListener("mousemove", mouseMove);
    }
}
function mouseUp(e){
    var obj = getCursorPosition(e);
    for (var i = 0; i < menu.length; i++){
            menu[i].draw();
            if (menu[i].click) {
                if (menu[i].text == "clear") {
                    ctx.clearRect(0, 0, menu[0].xStart -9 , h);
                    menu[i].click = false;
                };
                if (menu[i].text == "color"){
                    document.getElementById("color").click();
                    menu[i].click = false;
                };
                if (menu[i].text == "line"){
                    line.lineWidth = parseInt(prompt("Введите толщину линий", 1));
                    menu[i].draw();
                    menu[i].click = false;
                };
                if (menu[i].text == "save"){
                    imgData = ctx.getImageData(0,0, menu[0].xStart -9 , h );
                    menu[i].click = false;
                };
                if (menu[i].text == "restore"){
                    ctx.putImageData(imgData, 0,0);
                    menu[i].click = false;
                }
            }
    }
    drawColor();
    document.documentElement.removeEventListener("mousemove",mouseMove);
}
function mouseMove(e){
    if (e.offsetX >= menu[0].xStart -10) {
        ctx.moveTo( menu[0].xStart -10, e.offsetY); //когда выходим за пределы рисовательного холста чтобы разрыв линии был, а то линия соединяется с точкой входа и выхода
        return;
    }
    ctx.strokeStyle = line.lineColor;
    ctx.lineWidth = line.lineWidth;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
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

function drawColor(){
    line.lineColor = document.getElementById("color").value;
    ctx.beginPath();
    ctx.fillStyle = line.lineColor;
    ctx.fillRect(menu[0].xEnd - 15, menu[0].yStart + 10, 10, 10);
}

document.getElementById("color").addEventListener("input", drawColor);
document.documentElement.addEventListener("mouseup", mouseUp);
document.documentElement.addEventListener("mousedown", mouseDown);

for (var i = 0; i < elems.length; i++){
    menu.push(new ElemMenu(elems[i]));
}
drawColor();
