const canvasBoard = document.getElementById("canvas");
const ctx = canvasBoard.getContext('2d');
const resetBtn = document.getElementById('reset');


//width and height of the canvas
const width = canvasBoard.width;
const height = canvasBoard.height;

//create the objects in the game (variables)

const gravity = 0.2;
const flapStregnth = -10;
const moveSpeed = 3;
const pipeWidth = 70;
//const pipeHeight = Math.floor(Math.random() * 10);
const pipeGap = 140;
const pipeInterval = 120;
const pipeSpeed = 2;

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;
let highestScore = 0;

//create the bird
let bird = {
    x: 120,
    y: height/2,
    radius: 16,
    velocity: 0,
};

function drawBird(){
    ctx.save();
    ctx.fillStyle = '#ffd500';
    ctx.strokeStyle = '#bf6900';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ff4d4d';
    ctx.beginPath();
    ctx.arc(bird.x - 6, bird.y - 6, 6, 0,  Math.PI * 2);
    ctx.fill();

    ctx.restore();
}
// fly with the bird fucntion

//spawn pipes at random
function addPipe(){
    const pipeHeight = Math.random() * (height - pipeGap) + 40;
    pipes.push({
        x: width,
        top: pipeHeight,
        bottom: pipeHeight + pipeGap,
        passed: false,
    });
}

function drawPipes(){
    ctx.fillStyle = '#1ce0ff';
    ctx.strokeStyle = '#06b7d';

    pipes.forEach(pipe =>{
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, height - pipe.bottom);
        ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.strokeRect(pipe.x, pipe.bottom, pipeWidth, height - pipe.bottom);

    });
}

//draw HUD
function drawHUD(){
    ctx.fillStyle= '#ffffff';
    ctx.font = '18px monospace';
    ctx.fillText(`Score: ${score}`, 18, 30);
    ctx.fillText(`Best: ${bestScore}`, 18, 56);

    if(gameOver){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, height / 2 - 52, width, 104);

        ctx.fillStyle = '#f8f8f8';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', width / 2, height / 2 - 6);
        ctx.font = '16px monospace';
        ctx.fillText('Press reset or W to play again', width / 2, height / 2 + 24);
        ctx.textAlign = 'left';
    }
}

//hit
function checkColsion(pipe){
    const withinX = bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipeWidth;
    const withinTop = bird.y - bird.radius < pipe.top;
    const withinBottom = bird.y + bird.radius > pipe.bottom;
    return withinX && (withinTop || withinBottom);
}

function update() {
    if (gameOver) return;

  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.radius >= height) {
    bird.y = height - bird.radius;
    gameOver = true;
  }

  if (bird.y - bird.radius <= 0) {
    bird.y = bird.radius;
    bird.velocity = 0;
  }

  frame += 1;
  if (frame % pipeInterval === 0) {
    addPipe();
  }

 pipes.forEach(pipe => {
    pipe.x -= pipeSpeed;

    if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
      pipe.passed = true;
      score += 1;
      bestScore = Math.max(bestScore, score);
    }

    if (checkCollision(pipe)) {
      gameOver = true;
    }
  });

  pipes = pipes.filter(pipe => pipe.x + pipeWidth > -20);
}

function drawBackground(){
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#09001e');
    gradient.addColorStop(1, '#13033c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    for (let y = 0; y < height; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function loop (){
    ctx.clearRect(0, 0, width, length);
    drawBackground();
    drawPipes();
    drawBird();
    drawHUD();
    update();
    if(gameOver){
        requestAnimationFrame(loop);
    }
}

//reset game
function resetGame(){
    bird={
        x: 120,
        y: height/2,
        radius: 16,
        velocity: 0,
    }

    pipes = [];
    frame = 0;
    score = 0;
    gameOver = false;
    loop();
}


//score

//

//event listeners


resetGame();