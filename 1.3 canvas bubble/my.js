/**
 * Created by dima on 12.01.2017.
 */
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    w = canvas.width,
    h = canvas.height,
    count = 10,
    arrCircles = [],
    opts = {
        radius: 20,
        defaultSpeed: 2
    };

var Circle = function(objCoords){
    this.x = objCoords.x;
    this.y = objCoords.y;
    this.speed = opts.defaultSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = getRandomColor();
    this.radius = opts.radius;
    this.direction = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
    };
    this.k = -0.2; // на 20% замедляем смотри changeSpeed() , если его поставить положительным то вначале будет ускорение потом замедление
    this.changeSpeed = function(){
        if (Math.abs (this.direction.x) > 15 || Math.abs (this.direction.y) > 15) {
            this.k *= -1;
        }
        this.direction.x += this.direction.x * this.k;
        this.direction.y += this.direction.y * this.k;
    };
    this.update = function(){
        this.border();
        this.x += this.direction.x;
        this.y += this.direction.y;
    };
    this.border = function(){
        if (this.x >= w - this.radius || this.x <= this.radius) {
            this.color = getRandomColor();
            this.direction.x *= -1;
            this.changeSpeed();
        }
        if (this.y >= h - this.radius || this.y <= this.radius) {
            this.color = getRandomColor();
            this.direction.y *= -1;
            this.changeSpeed();
        }
        if (this.x > w - this.radius) this.x = w - this.radius;
        if (this.y > h - this.radius) this.y = h - this.radius;
        if (this.x < this.radius) this.x = this.radius;
        if (this.y < this.radius) this.y = this.radius;
    };
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        var grad = ctx.createRadialGradient(this.x-5, this.y-5, 0, this.x, this.y, this.radius);
        grad.addColorStop(0.5,this.color);
        grad.addColorStop(0,lighterColor(this.color));
        grad.addColorStop(1,darkerColor(this.color));
        ctx.fillStyle =grad;
        ctx.shadowColor = "#000000";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 3;
        ctx.fill();
    };
};
// отрисовка при кадре
function loop(){
    window.requestAnimationFrame(loop);
    ctx.clearRect(0,0,w,h);
    for (var i = 0; i < arrCircles.length; i++){
        arrCircles[i].update();
        arrCircles[i].draw();
    }
}
// рисуем кружочек по клику
function getCircle(e) {
    if (count <= 0 ) return; // можем рисовать столько окружностей сколько задано в count
    arrCircles.push( new Circle( getCursorPosition(e) ) );
    if ( count === 10) window.requestAnimationFrame(loop); // анимацию запускаем по первому клику чтобы небыло ускорения движения
    count--;
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
function getRandomColor(){
    return "rgb("+ Math.floor(Math.random() * (225-25+1)+25)+","+ Math.floor(Math.random() * (225-25+1)+25) +","+ Math.floor(Math.random() * (225-25+1)+25)+")";
}
function lighterColor(str){
    var arr = str.match(/\d+/g);
    return "rgb("+ (+arr[0]+30)+","+ (+arr[1]+30) +","+ (+arr[2]+30) +")";
}
function darkerColor(str){
    var arr = str.match(/\d+/g);
    return "rgb("+ (arr[0]-30)+","+ (arr[1]-30) +","+ (arr[2]-30) +")";
}

canvas.addEventListener("click", getCircle);