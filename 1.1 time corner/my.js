/**
 * Created by user on 25.12.16.
 */


function calcCorner(str){
    if (str.length == 0) return;
    var time = str.split(":"),
        minuteArrowCorner,
        hourArrowCorner,
        diffCorner;
    if (time[0] > 24 || time[0] < 0 || time[1]>= 59 || time[1] < 0 ) return;
    if (time[0] == 24){
        time[0] = 0;
    };
    if (time[0]>=12) {
        time[0] = time[0]-12;
    } ;
    //одна минута это 360/60 = 6 градусов
    minuteArrowCorner = time[1]*6;
    // учитываем отклонение часовой стрелки, 5 делений минут между каждым часом
    hourArrowCorner = time[0]*6*5 + Math.round(time[1]*5/60);
    diffCorner = Math.abs(minuteArrowCorner - hourArrowCorner);

    return diffCorner > 180 ? Math.abs(360- diffCorner) : diffCorner ;
};
function showCorner(str){
    document.getElementById("result").innerHTML = "Результат = " + str + "&deg;";
};
function run(){
    timeStr = document.getElementById("input-time").value;
    showCorner(calcCorner(timeStr));
};
document.getElementById("run").addEventListener("click", run);
