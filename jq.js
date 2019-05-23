//jquery.js
var playing = false;
var score;
var trialsLeft;
var step;
var gameSize; //for the balloon container
var action; //used for setInterval
//var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var balloons = ['black', 'blue', 'green', 'orange', 'pink', 'red', 'darkred', 'yellow', 'purple']
$(function(){
    
//click on start reset button
    
$("#startreset").click(function(){

    //we are playing
    if(playing == true){

        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; //game initiated

        //set score to 0
        score = 0; //set score to 0
        $("#scorevalue").html(score);

        //show trials left 
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#gameOver").hide();
        
        //hidehowToPop
        $("#howToPop").hide();

        //change button text to reset game
        $("#startreset").html("Reset Game");

        //start sending fruits
        startAction();
    }
});

    
//pop the balloon
    
$("#balloon1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//play sound
    
    //stop balloon
    clearInterval(action);
    
    //hide balloon
    $("#balloon1").hide("explode", {pieces: 100}, 500); //slice fruit
    
    //send new balloon
    setTimeout(startAction, 500);
});
 
//functions

//fill trialLeft box with hearts
    
function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending balloons

function startAction(){
    
    
    var gameSize = $("#balloonsContainer").width();
    
    //generate a balloon
    $("#balloon1").show();
    chooseBalloon(); //choose a random balloon
    
    if (gameSize >= "650") {
        $("#balloon1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    }
     else if (gameSize >= "310") {
        $("#balloon1").css({'left' : Math.round(245*Math.random()), 'top' : -50}); //random position    
    }
    else { 
        $("#balloon1").css({'left' : Math.round(135*Math.random()), 'top' : -50}); //random position        
    }
                
    
    //generate a random step
    step = 1+ Math.round(5*Math.random()); // change step
    
    // Move fruit down by one step every 10ms
    action = setInterval(function(){
        
        
       var gameSize = $("#balloonsContainer").width();
        
        //move balloon by one step
        $("#balloon1").css('top', $("#balloon1").position().top + step);                              
    
        //check if the balloon is too low
        if($("#balloon1").position().top > $("#balloonsContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#balloon1").show();
                chooseBalloon(); //choose a random fruit
                
                if (gameSize >= "650") {
                 $("#balloon1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
                }
                else if (gameSize >= "310") {
                $("#balloon1").css({'left' : Math.round(245*Math.random()), 'top' : -50}); //random position    
                }
                else {
                $("#balloon1").css({'left' : Math.round(135*Math.random()), 'top' : -50}); //random position        
                }

                
                
                //$("#balloon1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random balloon

function chooseBalloon(){
    $("#balloon1").attr('src' , 'images/' + balloons[Math.round(8*Math.random())] +'.png');   
}

//Stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#balloon1").hide();
}
});