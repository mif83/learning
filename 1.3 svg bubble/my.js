/**
 * Created by dima on 12.01.2017.
 */
var svg = document.getElementById("svg"),
    w = parseInt (window.getComputedStyle(svg).width),
    h = parseInt (window.getComputedStyle(svg).height),
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
    this.k = -0.2; // на 20% замедляем смотри changeSpeed()
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
            this.updateGradient();
        }
        if (this.y >= h - this.radius || this.y <= this.radius) {
            this.color = getRandomColor();
            this.direction.y *= -1;
            this.changeSpeed();
            this.updateGradient();
        }
        if (this.x > w - this.radius) this.x = w - this.radius;
        if (this.y > h - this.radius) this.y = h - this.radius;
        if (this.x < this.radius) this.x = this.radius;
        if (this.y < this.radius) this.y = this.radius;
    };
    this.mySelf = false;
    this.myGradient = 0;
    this.id = Math.floor(Math.random() * 100000000000); //id для градиента
    this.draw = function(){
        if (!this.mySelf){
            this.mySelf = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this.mySelf.setAttribute("cx", this.x);
            this.mySelf.setAttribute("cy", this.y);
            this.mySelf.setAttribute("fill", this.color);
            this.mySelf.setAttribute("r", this.radius);
            svg.appendChild(this.mySelf);
            this.myGradien = this.createGradient();

        } else {
            this.mySelf.setAttribute("cx", this.x);
            this.mySelf.setAttribute("cy", this.y);
            this.mySelf.setAttribute("fill", "url(#"+ this.id+")");
        }
    };
    this.createGradient = function(){
        var defs = svg.getElementsByTagName("defs")[0];
        radialGrad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
        radialGrad.setAttribute("id", this.id);
        radialGrad.setAttribute("cx", "40%");
        radialGrad.setAttribute("cy", "40%");
        radialGrad.setAttribute("fx", "30%");
        radialGrad.setAttribute("fy", "30%");
        radialGrad.setAttribute("r", "65%");
        stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "10%");
        stop1.setAttribute("stop-color", lighterColor(this.color));
        stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "60%");
        stop2.setAttribute("stop-color", this.color);
        stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop3.setAttribute("offset", "100%");
        stop3.setAttribute("stop-color", darkerColor(this.color));
        radialGrad.appendChild(stop1);
        radialGrad.appendChild(stop2);
        radialGrad.appendChild(stop3);
        defs.appendChild(radialGrad);

        return radialGrad;

    };
    this.updateGradient = function (){
        var stops = this.myGradien.getElementsByTagName("stop");

        stops[0].setAttribute("stop-color", lighterColor(this.color));
        stops[1].setAttribute("stop-color", this.color);
        stops[2].setAttribute("stop-color", darkerColor(this.color));
    };
};
// отрисовка при кадре
function loop(){
    window.requestAnimationFrame(loop);

    for (var i = 0; i < arrCircles.length; i++){
        arrCircles[i].update();
        arrCircles[i].draw();
    }
}
// рисуем кружочек по клику
function getCircle(e) {
    if (count <= 0 ) return; // можем рисовать столько окружностей сколько задано в count
    arrCircles.push( new Circle( {x: e.offsetX, y: e.offsetY} ) );
    if ( count === 10) window.requestAnimationFrame(loop); // анимацию запускаем по первому клику чтобы небыло ускорения движения
    count--;
}

// получаем координаты клика в элементе svg
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
    obj.x -= svg.offsetLeft;
    obj.y -= svg.offsetTop;
    return obj;
}
function getRandomColor(){
    return "rgb("+ Math.floor(Math.random() * (225-25+1)+25)+","+ Math.floor(Math.random() * (225-25+1)+25) +","+ Math.floor(Math.random() * (225-25+1)+25)+")";
}
function lighterColor(str){
    var arr = str.match(/\d+/g);
    return "rgb("+ (+arr[0]+40)+","+ (+arr[1]+40) +","+ (+arr[2]+40) +")";
}
function darkerColor(str){
    var arr = str.match(/\d+/g);
    return "rgb("+ (arr[0]-30)+","+ (arr[1]-30) +","+ (arr[2]-30) +")";
}

svg.addEventListener("click", getCircle);