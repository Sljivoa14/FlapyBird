const canvasBoard = document.getElementById('canvas');
const ctx = canvasBoard.getContext('2d');
const resetBtn = document.getElementById('reset')

const width = canvasBoard.width;
const height = canvasBoard.height;

const gravity = 0.5;
const flapStrenhgth = -10;
const moveSpeed = 2;
const pipeWidth = 40;
const pipeHeight = Math.floor(Math.random() * 200) + 50;
const pipeGame = 150;
const pipeInterval = 150;
const pipeSpeed = 2;

let bird = {
    x: 120,
    y: height / 2,
    radius: 16,
    velocity: 0,

};

let pipes = [];
let score = 0;
let gameOver = false;
let bestScore = 0;

function drawBird(x, y){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(50, y, birdSize, birdSize);
}

function addPipe(){
    const topHight = Math.random()* (height - pipeHeight - 120) + 40;

    pipesPush({
        x: width,
        top: topHight,
        bottom: topHight + pipeGap,
        passed: false,
});
}

function resetGame() {
  bird = {
    x: 120,
    y: height / 2,
    radius: 16,
    velocity: 0,
  };
  pipes = [];
  frame = 0;
  score = 0;
  gameOver = false;
  loop();
}

document.addEventListener('keydown', event =>{
    if(event.key.toLowerCase() === 'w'){
        bird.velocity = flapStrenhgth;
    }else{
        bird.velocity = 0;
    }
})