/**
 * Created by dima on 26.12.2016.
 */
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};
function chekNumber(num){
    if (!last && num !== last) return num + " не угадали"
    if ( Math.abs(digit - last ) >= Math.abs(digit - num) ){
        showResult(true, num);
    } else {
        showResult(false, num);
    }

}
function showResult(hot, num){
    var result = document.getElementById("result"),
        li = document.createElement("li"),
        text;

    if (hot) {
        text = document.createTextNode(num + " горячо");
    } else {
        text = document.createTextNode(num + " холодно");
    };
    li.appendChild(text);
    result.appendChild(li);
}
var digit = getRandomInt(0, 100),
    last;

// document.getElementById("input-digit").value