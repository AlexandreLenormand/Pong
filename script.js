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
    loop();
});




document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            // Déplacer vers la gauche (en évitant de sortir du canvas)
            if (xraq > 0) xraq -= vitesse;
            break;

        case "ArrowRight":
            // Déplacer vers la droite (en évitant de dépasser la largeur)
            if (xraq + largeurRaquette < canvas.width) xraq += vitesse;
            break;

        default:
            // Pour toute autre touche, on ne fait rien
            break;
    }
    raquette(); // on redessine après le déplacement
});






const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

let x = 50;                      // position de la balle (axe des abscisses X)
//const y = canvas.height / 2; 
let y = 50;    // centrage vertical dans le canvas
let xSpeed = 0.5; 
let ySpeed = 0.5;                // vitesse de la balle
let rafId; 

let x1 = 70;
let y1 = 70;

function drawBall() {
    

    ctx.fillStyle = "orange";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}


let xraq = canvas.width /2 -40;  // position au centre horizontal de la raquette
const yraq = 470; // position verticale fixe
const largeurRaquette = 80;
const hauteurRaquette = 15;
let vitesse = 10;
function raquette() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height); // efface le canvas
    ctx.fillStyle = "orange";
    ctx.fillRect(xraq, yraq, largeurRaquette, hauteurRaquette); // dessine le carré
}




document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            // Déplacer vers la gauche (en évitant de sortir du canvas)
            if (xraq > 0) xraq -= vitesse;
            break;

        case "ArrowRight":
            // Déplacer vers la droite (en évitant de dépasser la largeur)
            if (xraq + largeurRaquette < canvas.width) xraq += vitesse;
            break;

        default:
            // Pour toute autre touche, on ne fait rien
            break;
    }
    raquette(); 
    console.log(xraq, yraq);// on redessine après le déplacement
});

function startDisplay(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    drawBall();
    raquette();
}

startDisplay();


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    x += xSpeed;
    y += ySpeed;

     // rebonds sur les bords
    if (x > canvas.width - 15 || x < 15){
        xSpeed = -xSpeed;
        xSpeed = xSpeed * 1.01;
        ySpeed = ySpeed * 1.01;
        console.log(ySpeed);
        console.log(xSpeed);
    } 

    if (y > canvas.height - 15 || y < 15 ){
        ySpeed = -ySpeed;
        ySpeed = ySpeed * 1.01;
        xSpeed = xSpeed * 1.01;
        console.log(ySpeed);
        console.log(xSpeed);
    }

    //a revoir / comprendre
    if(y + 15 >= yraq && // bord inférieur de la balle atteint la raquette
        y - 15 <= yraq + hauteurRaquette && // bord supérieur de la balle est au-dessus de la raquette
        x + 15 >= xraq && // bord droit de la balle touche la raquette
        x - 15 <= xraq + largeurRaquette // bord gauche de la balle touche la raquette
        ){
        ySpeed = -ySpeed;
        ySpeed = ySpeed * 1.01;
        xSpeed = xSpeed * 1.01;
        console.log(ySpeed);
        console.log(xSpeed);
    }

    if(y > yraq -15){
        console.log("perdu");
    }
}




function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface le canvas

    update();
    drawBall();
    raquette();
    rafId = requestAnimationFrame(loop);
     // planifie la prochaine frame
}

// démarrer l'animation

//loop();









