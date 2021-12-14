// HTML elements
const output         = document.getElementById("output");
const h1             = document.getElementById("h1");

const startBtn       = document.getElementById('startBtn');
const stopBtn        = document.getElementById('stopBtn');
const bikeFrame      = document.getElementById('frame');

const popup         = document.getElementById('pop-up');    
const closeButton   = document.getElementById("close-btn");


let animationFrameHandler;
let timeoutHandler;


h1.innerHTML += `Bike Product: LTD Race`;

//POP-UP---------------------

displayPopup();
function displayPopup(){
    timeoutHandler = setTimeout(function(){
        $('#pop-up').fadeIn('slow');
    }, 3000);
    console.log('showing popup');
}

//close popup

closeButton.addEventListener('click', function (){
    popup.style.display = "none";
    console.log('popup closed');
});


//PRODUCT SPIN---------------

//animate bike on start button click

let counter = 1;
const limit = 34;


startBtn.addEventListener('click', bikeAnimation);

function bikeAnimation(){
    console.log(`spinning the bicycle`);
    const delay = 100;
    clearTimeout(timeoutHandler);

    timeoutHandler = setTimeout(function(){
        counter++;
        if( counter > limit){
            counter = 1;
        }
        updateFrames();
    }, delay);
}

function updateFrames(){
    const pathToImage = `images/bike-${counter}.jpg`;    
    $("#frame").attr("src", pathToImage);
    animationFrameHandler = requestAnimationFrame(bikeAnimation);

}

//STOP animation on stop button click

stopBtn.addEventListener('click', function(){
    console.log('not spinning the bicycle');
    cancelAnimationFrame(animationFrameHandler);
    clearTimeout(timeoutHandler);
});





