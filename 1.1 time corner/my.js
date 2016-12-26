/**
 * Created by user on 25.12.16.
 */


function calcCorner(str){
    console.log("calcCorner");
    if (str.length == 0) return;
    var time = str.split(":"),
        minuteArrowCorner,
        hourArrowCorner,
        diffCorner;
    if (time[0] >= 24 || time[0] <= 0 || time[1]>= 59 || time[1] <= 0 ) return;
    if (time[0]>=12) time[0] = time[0]/12;
    minuteArrowCorner = time[1]*6;

    hourArrowCorner = (+time[0] + Math.round(time[1]*5/60))*6;
    diffCorner = Math.abs(minuteArrowCorner - hourArrowCorner);
    return diffCorner;
};
function showCorner(str){
    document.getElementById("result").innerHTML = "Результат = " + str;
};
function run(){
    console.log("run");
    timeStr = document.getElementById("input-time").value;
    showCorner(calcCorner(timeStr));
};
document.getElementById("run").addEventListener("click", run);
