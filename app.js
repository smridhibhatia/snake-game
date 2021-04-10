const canvas=document.getElementById('canvas');
const pen=canvas.getContext('2d');
pen.fillStyle="yellow";
const H=735;
const W=1200;
const cs=67;//size of one cell of snake
//food object empty
let food=null;
let score;
const snake={
    init_len:5,
    direction:'right',
    cells:[],
    createSnake: function(){
        for(let i=0;i<this.init_len;i++){
            this.cells.push({
            x:i,
            y:0
        })
    }
},
drawSnake: function(){
    for(let cell of this.cells){
        pen.fillRect(cell.x*cs,cell.y*cs,cs-2,cs-2);

    }
},
updateSnake:function(){
  let headX=this.cells[this.cells.length-1].x;
  let headY=this.cells[this.cells.length-1].y;
  //checking for food collision
  if(food.x==headX && food.y==headY){
      food=getRandomFood();
      score++;
  }
  else{
    this.cells.shift();
  }
//creating x and y for next cell
  let nextX,nextY;
  if(this.direction=='up'){
      nextX=headX;
      nextY=headY-1;
      if(nextY*cs<0){
        pen.font="50px sans-serif";
        pen.fillStyle="red";
          pen.fillText("Game Over",50,100)
          clearInterval(id);
      }
  }
  else if(this.direction=='down'){
      nextX=headX;
      nextY=headY+1;
      if(nextY*cs>H){
        pen.font="50px sans-serif";
        pen.fillStyle="red";
          pen.fillText("Game Over",50,100)
          clearInterval(id);
      }
  }
  else if(this.direction=='left'){
    nextX=headX-1;
    nextY=headY;
    if(nextX*cs<0){
        pen.font="50px sans-serif";
        pen.fillStyle="red";
          pen.fillText("Game Over",50,100)
          clearInterval(id);
      }
}
else{
  nextX=headX+1;
  nextY=headY;
  if(nextX*cs>W){
    pen.font="50px sans-serif";
    pen.fillStyle="red";
      pen.fillText("Game Over",50,100)
      clearInterval(id);
  }
}
 
  //pushing/adding a new cell inside cells array
  this.cells.push({
      x:nextX,
      y:nextY
  })
}
}

function init(){
    score=0;
  snake.createSnake();
  snake.drawSnake();
  food=getRandomFood();
  function keyPressed(e){
 
    // console.log(e.key);
    if(e.key=='ArrowUp'){
        snake.direction='up';

    }
    else if(e.key=='ArrowDown'){
     snake.direction='down';
    }
    else if(e.key=='ArrowLeft'){
     snake.direction='left';
    }
    else if(e.key=='ArrowRight'){
     snake.direction='right';
    }
   // console.log(snake.direction);
 }
 document.addEventListener('keydown',keyPressed);
 
}
function draw(){
    pen.clearRect(0,0,W,H);
    pen.fillStyle="darkorange";
    pen.font="40px sans-serif";
    pen.fillText(`Score: ${score}`,50,50);
    pen.fillStyle='blue';
   pen.fillRect(food.x*cs,food.y*cs,cs,cs);
   pen.fillStyle='yellow';
  snake.drawSnake();
}
function update(){
snake.updateSnake();


}
//create snake random food
function getRandomFood(){
    let foodX=Math.round(Math.random()*(W-cs)/cs)
    
    let foodY=Math.round(Math.random()*(H-cs)/cs)
    const food={
        x:foodX,
        y:foodY
    
    }
    return food;
}

function gameLoop(){
    draw();
    update();

}
init();
const id=setInterval(gameLoop,200)
 