// HTML Elements
const output        = document.getElementById("output");
const outputP       = document.getElementById("outputP");
const outputC       = document.getElementById("outputC");
const h1            = document.getElementById("h1");
const rollBtn       = document.getElementById('rollBtn');
const resetBtn      = document.getElementById('resetBtn');
const playerAviBtn  = document.getElementById('playerAviBtn');
const cpuAviBtn  = document.getElementById('cpuAviBtn');

const playerDie1Img = document.getElementById('playerDie1Img');
const playerDie2Img = document.getElementById('playerDie2Img');

const cpuDie1Img    = document.getElementById('cpuDie1Img');
const cpuDie2Img    = document.getElementById('cpuDie2Img');

let playerAvi   = 'han';
let cpuAvi      = 'greedo';

let playerRound     = 0;
let cpuRound        = 0;

let playerScore     = 0;
let cpuScore        = 0;

let playerDie1      = 0;
let playerDie2      = 0;
let cpuDie1         = 0;
let cpuDie2         = 0;

let roundCounter = 1;

let timeoutHandler;

// POWER ON
powerOn();
function powerOn(){
    timeoutHandler = setTimeout(function(){
        openGame();
        $('.aviBtn').removeClass('off');
        timeoutHandler = setTimeout(function(){
            $('.hide').show().fadeOut(100).fadeIn(30);
        }, 700);
        lightsOn()
        timeoutHandler = setTimeout(function(){
            $('.hide2').show().fadeOut(80).fadeIn(50);
            resetGame();
        },1800);
    }, 1400);
}

// ROLL DICE
outputP.innerHTML = `<p> Round: 0 </p>`;
outputP.innerHTML += `<h2 class="aurebesh">${playerScore} </h2>`;
outputC.innerHTML = `<p> Round: 0</p>`;
outputC.innerHTML += `<h2 class="aurebesh"> ${cpuScore} </h2>`;

output.innerHTML = `<h3>Round: <span class="aurebesh">${roundCounter}</span> </h3>`;

rollBtn.addEventListener('click', rollDice);

function rollDice(){

    console.log('rolling the dice');
    roundCounter++;
    outputP.innerHTML = ``;
    outputC.innerHTML = ``;
    updateScore();
    playerDie1 = Math.floor(Math.random() * 6) + 1;
    playerDie2 = Math.floor(Math.random() * 6) + 1;
    cpuDie1 = Math.floor(Math.random() * 6) + 1;
    cpuDie2 = Math.floor(Math.random() * 6) + 1;
    
    $('#rollBtn').removeClass("rollBtn").addClass('off');
    if(roundCounter > 4){
        resetGame();
    }else{
        openDiceBox();
        timeoutHandler = setTimeout(function(){
            updateDice();
            scorePlayer();
            scoreCpu();

            timeoutHandler = setTimeout(function(){
                updateScore();
                updateLights();
                flashLights();

                if(roundCounter == 4){
                    displayWinner();
                    $('#rollBtn').removeClass("rollBtn").addClass('off');
                    timeoutHandler = setTimeout(function(){
                        $('#resetBtn').removeClass("off").addClass('rollBtn');
                    }, 1500);

                }else{
                    timeoutHandler = setTimeout(function(){
                        output.innerHTML = `<h3>Round: <span class="aurebesh">${roundCounter}</span> </h3>`;
                        $('#rollBtn').removeClass("off").addClass('rollBtn');
                    }, 1000);
    
                } 

            }, 1400);
            
        }, 700);
    }
}

// ENVIRONMENTAL EFFECTS
function updateLights(){
    if(roundCounter == 4){
        if(playerScore > cpuScore){
            $('.player-lights').removeClass('blue red');
            $('.player-lights').addClass('green');
            $('.cpu-lights').removeClass('blue green');
            $('.cpu-lights').addClass('red');
        }else if(playerScore < cpuScore){
            $('.cpu-lights').removeClass('blue red');
            $('.cpu-lights').addClass('green');
            $('.player-lights').removeClass('blue green');
            $('.player-lights').addClass('red');
        }else if (playerScore == cpuScore){
            $('.cpu-lights').removeClass('green red');
            $('.cpu-lights').addClass('blue');
            $('.player-lights').removeClass('red green');
            $('.player-lights').addClass('blue');
        }
    }else{
        if(playerRound > cpuRound){
            $('.player-lights').removeClass('blue red');
            $('.player-lights').addClass('green');
            $('.cpu-lights').removeClass('blue green');
            $('.cpu-lights').addClass('red');
        }else if(playerRound < cpuRound){
            $('.cpu-lights').removeClass('blue red');
            $('.cpu-lights').addClass('green');
            $('.player-lights').removeClass('blue green');
            $('.player-lights').addClass('red');
        }else if (playerScore == cpuScore){
            $('.cpu-lights').removeClass('green red');
            $('.cpu-lights').addClass('blue');
            $('.player-lights').removeClass('red green');
            $('.player-lights').addClass('blue');
        }
    }
}

function flashLights(){
    $('.player-lights').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $('.cpu-lights').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function lightsOn(){
    $('.cpu-lights').addClass('blue').fadeOut(130).fadeIn(150);
    $('.player-lights').addClass('blue').fadeOut(100).fadeIn(120).fadeOut(20).fadeIn(120);
}

function openGame(){
    $('#wrapper').animate({
        'max-width': "1200"
    }, 2000);
}

function closeGame(){
    $('#wrapper').animate({
        'max-width': "502"
    });
}


// SCORING
function scorePlayer(){
    if(playerDie1 == 1 || playerDie2 == 1){
        playerRound = 0;
    }
    else if(playerDie1 == playerDie2){
        playerRound = ((playerDie1+playerDie2) * 2);
    }
    else{
    playerRound = playerDie1+playerDie2;
    }
    playerScore += playerRound;
}

function scoreCpu(){
    if(cpuDie1 == 1 || cpuDie2 == 1){
        cpuRound = 0;
    }
    else if(cpuDie1 == cpuDie2){
        cpuRound = ((cpuDie1+cpuDie2) * 2);
    }
    else{
    cpuRound = cpuDie1+cpuDie2;
    }
    cpuScore += cpuRound;
}

function updateScore(){
    outputP.innerHTML = `<p> Round: ${playerRound} </p>`;
    outputP.innerHTML += `<h2 class="aurebesh">${playerScore} </h2>`;
    outputC.innerHTML = `<p> Round: ${cpuRound} </p>`;
    outputC.innerHTML += `<h2 class="aurebesh"> ${cpuScore} </h2>`;
}

function displayWinner(){
    output.innerHTML = `<h3>GAME OVER</h3>`;
    if(playerScore > cpuScore){
        outputP.innerHTML += `<h4>${playerAvi}</h4><h3>wins!</h3>`;
        outputC.innerHTML += `<h4>${cpuAvi}</h4><h3>loses!</h3>`;
    }
    if(playerScore < cpuScore){
        outputP.innerHTML += `<h4>${playerAvi}</h4><h3>loses!</h3>`;
        outputC.innerHTML += `<h4>${cpuAvi}</h4><h3>wins!</h3>`;
    }else if (playerScore == cpuScore){
    outputP.innerHTML += `<h3>Draw</h3>`;
    outputC.innerHTML += `<h3>Draw</h3>`;
    }
    flashLights();
}

// DICE
function updateDice(){
    updatePlayerDice();
    updateCpuDice();
}

function updatePlayerDice(){
    console.log('updating player dice');
    if (playerDie1 == playerDie2){
        const pathToDie1 = `images/dice-${playerDie1}.png`;    
        $('#playerDie1Img').attr("src", pathToDie1).hide().fadeOut(300).fadeIn(100).fadeOut(200).fadeIn(200);
    
        const pathToDie2 = `images/dice-${playerDie2}.png`;    
        $('#playerDie2Img').attr("src", pathToDie2).hide().fadeOut(300).fadeIn(100).fadeOut(100).fadeIn(120);
    }
    else{
        const pathToDie1 = `images/dice-blue-${playerDie1}.png`;    
        $('#playerDie1Img').attr("src", pathToDie1).hide().fadeOut(300).fadeIn(100).fadeOut(100).fadeIn(180);
        
        const pathToDie2 = `images/dice-blue-${playerDie2}.png`;    
        $('#playerDie2Img').attr("src", pathToDie2).hide().fadeOut(240).fadeIn(100).fadeOut(130).fadeIn(100);
    }

}

function updateCpuDice(){
    console.log('updating cpu dice');
    if(cpuDie1 == cpuDie2){
        const pathToDie3 = `images/dice-${cpuDie1}.png`;    
        $("#cpuDie1Img").attr("src", pathToDie3).hide().fadeOut(300).fadeIn(100).fadeOut(100).fadeIn(100);
    
        const pathToDie4 = `images/dice-${cpuDie2}.png`;    
        $('#cpuDie2Img').attr("src", pathToDie4).hide().fadeOut(300).fadeIn(230).fadeOut(100).fadeIn(120);
    
    }
    else{
        const pathToDie3 = `images/dice-blue-${cpuDie1}.png`;    
        $("#cpuDie1Img").attr("src", pathToDie3).hide().fadeOut(320).fadeIn(120).fadeOut(100).fadeIn(100);
    

        const pathToDie4 = `images/dice-blue-${cpuDie2}.png`;    
        $('#cpuDie2Img').attr("src", pathToDie4).hide().fadeOut(300).fadeIn(100).fadeOut(180).fadeIn(200);
        }
}


//RESET BUTTON
resetBtn.addEventListener('click', resetGame);

function resetGame(){
    console.log('Reset Game')
    playerRound     = 0;
    cpuRound        = 0;
    playerScore     = 0;
    cpuScore        = 0;

    roundCounter    = 1;

    playerDie1      = 0;
    playerDie2      = 0;
    cpuDie1         = 0;
    cpuDie2         = 0;

    $('#resetBtn').addClass("off").removeClass('resetBtn');
    updateDice();
    updateLights();
    closeDiceBox();
    output.innerHTML = `<h3>NEW GAME<h3>`;
    outputP.innerHTML = `<p> Round: 0 </p>`;
    outputP.innerHTML += `<h2 class="aurebesh">${playerScore} </h2>`;
    outputC.innerHTML = `<p> Round: 0</p>`;
    outputC.innerHTML += `<h2 class="aurebesh"> ${cpuScore} </h2>`;
    timeoutHandler = setTimeout(function(){
        output.innerHTML = `<h3>Round: <span class="aurebesh">${roundCounter}</span> </h3>`;
        $('#rollBtn').addClass("rollBtn").removeClass('off');
    }, 1500);
}

function openDiceBox(){
    $('.dice-container').animate({
        width: "500"
    });
}
function closeDiceBox(){
    $('.dice-container').animate({
        width: "0"
    });
}


// CHANGE CHARACTERS
const imgs = ['han','leia','luke','chewie','ackbar','lando','greedo','boba', 'bossk','vader','palpatine'];

playerAviBtn.addEventListener('click', newAvatar);
cpuAviBtn.addEventListener('click', newOpponent);
let a = 0;
let i = 6;

function newAvatar(){
    if( a == imgs.length - 1){
        a = 0;
    }else{
    a ++;
    }
    console.log(`changing character ${a} ${imgs[a]}`)
    const pathToAvi = 'images/';
    playerAvi = `${imgs[a]}`;

    $('#playerAvi').attr("src", `${pathToAvi+playerAvi}.png`).hide().hide().fadeOut(200).fadeIn(80).fadeOut(20).fadeIn(50);
    $('#player-dice').removeClass('leia palpatine luke greedo han lando vader chewie ackbar bossk boba');
    $('#player-dice').addClass(`${playerAvi}`).hide().hide().fadeOut(200).fadeIn(80).fadeOut(20).fadeIn(50);; 
}

function newOpponent(){
    if( i == imgs.length - 1){
        i = 0;
    }else{
    i ++;
    }
    console.log(`changing character ${i} ${imgs[i]}`)
    const pathToAvi = 'images/';
    cpuAvi = `${imgs[i]}`;
    
    $('#cpuAvi').attr("src", `${pathToAvi+cpuAvi}.png`).hide().hide().fadeOut(200).fadeIn(80).fadeOut(20).fadeIn(50);
    $('#cpu-dice').removeClass('leia palpatine luke greedo han lando vader chewie ackbar bossk boba');
    $('#cpu-dice').addClass(`${cpuAvi}`).hide().hide().fadeOut(200).fadeIn(80).fadeOut(20).fadeIn(50);;
}
