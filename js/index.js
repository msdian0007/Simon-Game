const colorList = ["green", "red", "yellow", "blue"];
var systemOutput = [];
var userInput = [];

var level = 0;
var gameStart = false;

$(document).keypress(function(){
    setTimeout(function(){
        if(!gameStart){
            nextSequence();
            gameStart=true;
        }
    },400);
});

$(".btn").click(function(){
    const getId = $(this).attr("id");
    userInput.push(getId);

    playSound(getId);
    keyAnimation(getId);
    checkAns(userInput.length-1);
});

function nextSequence(){
    userInput=[];
    level++;

    $(".big_title").html("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    const getColor = colorList[randomNumber];
    systemOutput.push(getColor);

    $("#"+ getColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(getColor);
}



function checkAns(userInpLength){
    if(userInput[userInpLength] === systemOutput[userInpLength]){
        if(userInput.length === systemOutput.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("wrongInput");
        $(".big_title").html("Game over, press any key to Restart")
        setTimeout(function(){
            $("body").removeClass("wrongInput");
        },500)
        startAgain();
    }
}

function startAgain(){
    level=0;
    systemOutput=[];
    gameStart=false;
}

function playSound(songName){
    const getAudio = new Audio("audio/" + songName + ".mp3");
    getAudio.play();
}

function keyAnimation(takeAnimKey){
    $("#"+ takeAnimKey).addClass("pressed");
    setTimeout(function(){
        $("#"+ takeAnimKey).removeClass("pressed");
    },200);
}




