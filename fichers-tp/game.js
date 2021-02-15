
const myCanvas = document.getElementById("terrain");
const context = myCanvas.getContext("2d");

var raf = null;
var animation = null;

function init() {
    animation = new Animation(myCanvas, context);

    update();
}

function update() {
    
    context.clearRect(0,0,myCanvas.width,myCanvas.height);

    animation.moveAndDraw();
    const raf = window.requestAnimationFrame(update);
}

function animationButton() {
    button = document.getElementById("stopStartBall");
    if(button.innerText == "Start") {
        button.innerText = "Stop";
        animation.start();
    } else {
        button.innerText = "Start";
        animation.stop();
    }
    
}

init();

