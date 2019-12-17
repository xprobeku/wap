"use strict";
$(function() {
    let isStarted = false;

    function lost(){
        if(isStarted==true) {
            isStarted=false;
            $(".boundary").addClass("youlose");
            $("#status").text("You Lost!!!");
            alert("You Lost!!! :[");
        }
    }

    $("#end").mouseover(function(){
        if(isStarted==true && $(".boundary").hasClass("youlose")==false) {
            isStarted = false;
            $("#status").text("You Won!!!");
            alert("You Won!!! :]");
        }
    });

    $("#start").click(function(){
        isStarted=true;
        $("#status").text("Game Started!!!");
        if($(".boundary").hasClass("youlose")) {
            $(".boundary").removeClass("youlose");
        }
    });

    $("#maze").mouseleave(function(){
        if(isStarted==true){
            isStarted=false;
            $(".boundary").addClass("youlose");
            $("#status").text("Don't Cheat!!!");
            alert("Cheating is prohibited!!! :]");
        }
    });

    $(".boundary").mouseover(lost);
});