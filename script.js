let secondes = 0;
let timerElement = document.getElementById("score"); 
let chrono = null

function tictictic(){
    secondes++;
    timerElement.innerHTML = "Score : " + secondes ;
}

let startButton = document.getElementById("start");
startButton.addEventListener("click", function(){
    if (chrono !== null) {
        clearInterval(chrono);
        secondes = 0; 
        timerElement.innerHTML = "Score : " + secondes ;
    }
    chrono = window.setInterval(tictictic, 1000);
});



const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

let x = 20;                      // position de la balle (axe des abscisses X)
const y = canvas.height / 2;     // centrage vertical dans le canvas
const speed = 2;                 // vitesse de la balle
let rafId; 

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    ctx.fillStyle = "orange";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}


function update() {
    x += speed;
    if (x > canvas.width - 15) x = 50; // reset quand la balle sort du cadre du canvas
}


function loop() {
    update();
    drawBall();
    rafId = requestAnimationFrame(loop); // planifie la prochaine frame
}

// démarrer l'animation
loop();









