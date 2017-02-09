/**
 * Created by dima on 09.02.2017.
 */
document.body.addEventListener("change", changeState);
document.body.addEventListener("click", changeScale);

function changeState(e){
    var sys = document.getElementsByClassName("system")[0];
    if (e.target.id== "3d"){
        sys.classList.toggle("body-3d");
    }else{
        sys.classList.toggle("orbit-on");
    }
}
function changeScale(e){
    var html = document.documentElement,
        fontSize = parseInt( getComputedStyle(html).fontSize);
    console.log(fontSize);
    if(e.target.id == "plus")fontSize++;
    if(e.target.id == "minus")fontSize--;
    if (fontSize == 1 || fontSize == 30 || e.target.id != "plus" && e.target.id != "minus") return;

    html.style.fontSize = fontSize + "px";
}