const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};
let dir;
let score = 0;

document.addEventListener('keydown', direction);

function direction(event){
  if(event.keyCode == 37 && dir!= 'RIGHT') dir = 'LEFT';
  else if(event.keyCode == 38 && dir!= 'DOWN') dir = 'UP';
  else if(event.keyCode == 39 && dir!= 'LEFT') dir = 'RIGHT';
  else if(event.keyCode == 40 && dir!= 'UP') dir = 'DOWN';
}

function changeDir(newDir){
  if(newDir == 'left' && dir!= 'RIGHT') dir = 'LEFT';
  if(newDir == 'up' && dir!= 'DOWN') dir = 'UP';
  if(newDir == 'right' && dir!= 'LEFT') dir = 'RIGHT';
  if(newDir == 'down' && dir!= 'UP') dir = 'DOWN';
}

function draw(){
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 400, 400);
  
  for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = (i == 0)? '#4CAF50' : '#90EE90';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#1a1a1a';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  
  if(dir == 'LEFT') snakeX -= box;
  if(dir == 'UP') snakeY -= box;
  if(dir == 'RIGHT') snakeX += box;
  if(dir == 'DOWN') snakeY += box;
  
  if(snakeX == food.x && snakeY == food.y){
    score++;
    scoreEl.innerHTML = score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }
  
  let newHead = {x: snakeX, y: snakeY};
  
  if(snakeX < 0 || snakeY < 0 || snakeX >= 400 || snakeY >= 400 || collision(newHead, snake)){
    clearInterval(game);
    alert('Game Over! Score: ' + score);
  }
  
  snake.unshift(newHead);
}

function collision(head, array){
  for(let i = 0; i < array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y) return true;
  }
  return false;
}

let game = setInterval(draw, 100);
