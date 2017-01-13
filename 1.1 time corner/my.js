/**
 * Created by user on 25.12.16.
 */
var angularObj = {
    minuteArrowCorner: 0,
    hourArrowCorner: 0
};

function calcCorner(str){
    if (str.length == 0) return;
    var time = str.split(":"),
        diffCorner;
    if (time[0] > 24 || time[0] < 0 || time[1]>= 60 || time[1] < 0 ) return;
    if (time[0] == 24){
        time[0] = 0;
    };
    if (time[0]>=12) {
        time[0] = time[0]-12;
    } ;
    //одна минута это 360/60 = 6 градусов
    angularObj.minuteArrowCorner = time[1]*6;
    // учитываем отклонение часовой стрелки, 5 делений минут между каждым часом
    angularObj.hourArrowCorner = time[0]*6*5 + Math.round(time[1]*5*6/60);
    diffCorner = Math.abs(angularObj.minuteArrowCorner - angularObj.hourArrowCorner);

    return diffCorner > 180 ? Math.abs(360 - diffCorner) : diffCorner ;
};
function showCorner(str){
    document.getElementById("result").innerHTML = "Результат = " + str + "&deg;";
};
function showClok(){
    console.log("showClok");

    var hour = document.getElementById("hour"),
        minute = document.getElementById("minute");
    hour.style.transform = "rotate("+ (180 + angularObj.hourArrowCorner) +"deg)";
    minute.style.transform = "rotate("+ (180 + angularObj.minuteArrowCorner) +"deg)";
    hour.style.visibility = "visible";
    minute.style.visibility = "visible";
    console.log(angularObj.hourArrowCorner);
    console.log(angularObj.minuteArrowCorner);

};
function run(){
    timeStr = document.getElementById("input-time").value;
    showCorner(calcCorner(timeStr));
    showClok();
};
document.getElementById("run").addEventListener("click", run);
