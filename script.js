const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dir = 'RIGHT';
let score = 0;
const grid = 20;

function gameLoop() {
    let head = {...snake[0]};
    
    if(dir === 'RIGHT') head.x++;
    if(dir === 'LEFT') head.x--;
    if(dir === 'UP') head.y--;
    if(dir === 'DOWN') head.y++;

    // Wall se takraye to game over
    if(head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20) {
        alert('Game Over! Score: ' + score);
        snake = [{x: 10, y: 10}];
        score = 0;
        dir = 'RIGHT';
    }

    // Food khaya
    if(head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.innerText = score;
        food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
    } else {
        snake.pop();
    }

    snake.unshift(head);

    // Draw
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, 400, 400);

    // Snake - gol wala
    ctx.fillStyle = 'limegreen';
    snake.forEach((part, i) => {
        ctx.beginPath();
        ctx.arc(part.x*grid + 10, part.y*grid + 10, 9, 0, Math.PI*2);
        ctx.fill();
        // Aankh
        if(i === 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(part.x*grid + 13, part.y*grid + 7, 2, 2);
        }
    });

    // Food - laal gol
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x*grid + 10, food.y*grid + 10, 8, 0, Math.PI*2);
    ctx.fill();
}

document.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight' && dir!== 'LEFT') dir = 'RIGHT';
    if(e.key === 'ArrowLeft' && dir!== 'RIGHT') dir = 'LEFT';
    if(e.key === 'ArrowUp' && dir!== 'DOWN') dir = 'UP';
    if(e.key === 'ArrowDown' && dir!== 'UP') dir = 'DOWN';
});

setInterval(gameLoop, 120); // Speed
