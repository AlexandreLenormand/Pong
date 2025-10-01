const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

let score = {
    secondes : 0,
    timerElement : document.getElementById("score"), 
    chrono : null
}

let scoreMaxElement = document.getElementById("scoreMax");
let balle = {
    x : canvas.width / 2,
    y : 450,
    ySpeed : 2,
    xSpeed : 2
}

const maxYSpeed = 5;
const maxXSpeed = 5;

let racket = {
    xraq : canvas.width /2 -40,
    yraq : 470,
    largeurRaquette : 80,
    hauteurRaquette : 15,
    vitesse : 20
}

let rafId; 


function tictictic(){
    score.secondes++;
    score.timerElement.innerHTML = "Score : " + score.secondes ;
}

let startButton = document.getElementById("start");
startButton.addEventListener("click", function(){
    if (score.chrono !== null) {
        clearInterval(score.chrono);
        score.secondes = 0; 
        score.timerElement.innerHTML = "Score : " + score.secondes ;
    }
    score.chrono = window.setInterval(tictictic, 1000);
        gameOver = false;

    loop();
});

let rightButton = document.getElementById("right");
rightButton.addEventListener("click", function(){
    if(racket.xraq + racket.largeurRaquette < canvas.width) racket.xraq += racket.vitesse;
});

let leftButton = document.getElementById("left");
leftButton.addEventListener("click", function(){
    if(racket.xraq > 0) racket.xraq -= racket.vitesse;
});

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            
            if (racket.xraq > 0) racket.xraq -= racket.vitesse;
            break;

        case "ArrowRight":
            
            if (racket.xraq + racket.largeurRaquette < canvas.width) racket.xraq += racket.vitesse;
            break;

        default:
            
            break;
    }
    drawRacket();
    
});





function drawBall() {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(balle.x, balle.y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawRacket() {
    ctx.fillStyle = "orange";
    ctx.fillRect(racket.xraq, racket.yraq, racket.largeurRaquette, racket.hauteurRaquette);
}

function startDisplay(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRacket();
}

startDisplay();



function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    balle.x += balle.xSpeed;
    balle.y += balle.ySpeed;
    const maxXSpeed = 5;
    const maxYSpeed = 5;

    if(balle.xSpeed > maxXSpeed) balle.xSpeed = 5;
    if(balle.ySpeed > maxYSpeed) balle.ySpeed = 5;
    if(balle.xSpeed < -maxXSpeed) balle.xSpeed = -5;
    if(balle.ySpeed < -maxYSpeed) balle.ySpeed = -5;
    if (balle.x > canvas.width - 15 || balle.x < 15){
        balle.xSpeed = -balle.xSpeed;
        balle.xSpeed = balle.xSpeed * 1.03;
        balle.ySpeed = balle.ySpeed * 1.03;
        console.log(balle.ySpeed);
        console.log(balle.xSpeed);
    } 

    if (balle.y > canvas.height - 15 || balle.y < 15 ){
        balle.ySpeed = -balle.ySpeed;
        balle.ySpeed = balle.ySpeed * 1.03;
        balle.xSpeed = balle.xSpeed * 1.03;
        console.log(balle.ySpeed);
        console.log(balle.xSpeed);
    }

    if(balle.y + 15 >= racket.yraq && 
        balle.y - 15 <= racket.yraq + racket.hauteurRaquette &&
        balle.x + 15 >= racket.xraq && 
        balle.x - 15 <= racket.xraq + racket.largeurRaquette 
        ){
        balle.ySpeed = -balle.ySpeed;
        balle.ySpeed = balle.ySpeed * 1.03;
        balle.xSpeed = balle.xSpeed * 1.03;
        console.log(balle.ySpeed);
        console.log(balle.xSpeed);
    }

  

if (balle.y > canvas.height - 15) {
    console.log("perdu");
    alert("Vous avez perdu ! Votre score est de " + score.secondes + " secondes.");

    scoreMaxLocal();
    cancelAnimationFrame(rafId);

    clearInterval(score.chrono);
    score.chrono = null;

    resetGame();
    score.timerElement.innerHTML = "Score : " + score.secondes;

    startDisplay(); 
    gameOver = true; 
}
}

function resetGame() {
    balle.x = canvas.width / 2;
    balle.y = 450;
    randomizeBallSpeed();
    racket.xraq = canvas.width / 2 - 40;
    racket.yraq = 470;
    score.secondes = 0;

}


function angleAleatoire() {
    let angle = Math.random() * (Math.PI / 2) + Math.PI / 4;
    
    let speed = 3;  
    
    balle.xSpeed = speed * Math.cos(angle);
    balle.ySpeed = -Math.abs(speed * Math.sin(angle)); 
}

function scoreMaxLocal() {
    let savedMax = localStorage.getItem("scoreMax");
    if (savedMax === null || score.secondes > parseInt(savedMax)) {
        scoreMax = score.secondes;
        localStorage.setItem("scoreMax", scoreMax);
    } else {
        scoreMax = parseInt(savedMax);
    }
    scoreMaxElement.innerHTML = "Score max : " + scoreMax;
}

gameOver = false;
function loop() {
    if (gameOver) return; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    drawBall();
    drawRacket();
    rafId = requestAnimationFrame(loop);
}