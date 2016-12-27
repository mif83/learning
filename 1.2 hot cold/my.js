/**
 * Created by dima on 26.12.2016.
 */
var digit = getRandomInt(0, 100),
    last,
    try1 = 10,
    win = false;

document.getElementById("run").addEventListener("click", run);
document.getElementById("reset").addEventListener("click", reset);

function chekResult(userValue){
    var str = "";
    if (userValue == digit) {
        str =  "вы угадали";
        win = true;
    } else if (!last){
        str =  userValue + " первый промах";
    } else if (last > Math.abs(userValue - digit) ){
        str =  userValue + " теплее";
    } else{
        str =  userValue + " холоднее";
    };
    last = Math.abs(userValue - digit);
    try1--;
    return str;

};
function showResult(str){
    var ul = document.getElementById("result"),
        li = document.createElement("li"),
        text = document.createTextNode(str);
    li.appendChild(text);
    ul.appendChild(li);
    document.querySelector("h1 span").innerHTML = try1;
};
function clear(){
    try1 = 10;
    win = false;
    last = undefined;
    document.querySelector("h1 span").innerHTML = try1;
    document.getElementById("result").innerHTML = "";
};
function run(){
    var value = +document.getElementById("input-digit").value,
        str;
    if (win){
        return;
    }
    if ( try1 > 0){
        str = chekResult(value);
    } else {
        str = "попытки закончились"
        return;
    };
    showResult(str);
};
function reset(){
    digit = getRandomInt(0, 100);
    clear();
};

