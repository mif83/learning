/**
 * Created by dima on 09.02.2017.
 */
document.body.addEventListener("change", changeState);

function changeState(e){
    console.dir(e.target);
    var sys = document.getElementsByClassName("system")[0];
    if (e.target.id== "3d"){
        sys.classList.toggle("body-3d");
    }else{
        sys.classList.toggle("orbit-on");
    }
}