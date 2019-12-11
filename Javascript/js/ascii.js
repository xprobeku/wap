"use strict";
var count = 0
var intervalHandle = null;
var started = false;
var delay = 250;

// animation function
function anime(myArray){
    let textarea = document.getElementById("textarea")
    if(myArray.length != count){
        let size = document.getElementById("size");
        textarea.innerHTML = myArray[count]
        textarea.style.fontSize = size.options[size.selectedIndex].value + "pt"
        count++;
    }
    else{
        count = 0;
    }
}

// interval caller
function f(myArray){
    if(document.getElementById("turboCheck").checked){
        delay = 50;
    }
    else{
        delay = 250;
    }

    intervalHandle = setInterval(anime,delay,myArray);
}

//It trigger when click start button
document.getElementById("btnStart").onclick = function(){
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnStop").disabled = false;
    document.getElementById("animation").disabled = false;
    started = true;
    let myChosenAnimation = document.getElementById("animation")
    let a = ANIMATIONS[myChosenAnimation.options[myChosenAnimation.selectedIndex].value]
    let myArray = a.split("=====\n");
    count = 0;
    f(myArray);
}

// it trigger when click stop button
document.getElementById("btnStop").onclick = function(){
    document.getElementById("btnStop").disabled = true;
    document.getElementById("btnStart").disabled = false;
    document.getElementById("animation").disabled = true;
    started = false;
    clearInterval(intervalHandle);
    count = 0;
}

// onchange animation
document.getElementById("animation").onchange = function(){
    if(started){
        clearInterval(intervalHandle);
        let myChosenAnimation = document.getElementById("animation")
        let a = ANIMATIONS[myChosenAnimation.options[myChosenAnimation.selectedIndex].value]
        var myArray = a.split("=====\n");
        count = 0;
        f(myArray);
    }
}
// onchange size
document.getElementById("size").onchange = function(){
    let size = document.getElementById("size");
    textarea.style.fontSize = size.options[size.selectedIndex].value + "pt";
}

//onchange turbo
document.getElementById("turboCheck").onchange = function(){
    if(started){
        let myChosenAnimation = document.getElementById("animation")
        let a = ANIMATIONS[myChosenAnimation.options[myChosenAnimation.selectedIndex].value]
        let myArray = a.split("=====\n");
    
        if(document.getElementById("turboCheck").checked){
            clearInterval(intervalHandle)
            intervalHandle = setInterval(anime,50,myArray)
        }
        else{
            clearInterval(intervalHandle)
            intervalHandle = setInterval(anime,250,myArray)
        }
    }
}