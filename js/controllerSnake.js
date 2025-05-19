let snake = document.getElementById("snake");
let apple = document.getElementById("apple");
let score = document.getElementById("score");
let scoreValue = 0;
let positionDeMonSnakeX = parseInt(snake.style.left);
let positionDeMonSnakeY = parseInt(snake.style.top);
let snakeSizePosition = []
let snakeLastPosition = [positionDeMonSnakeX, positionDeMonSnakeY];
function mouveSnakeDown() {
    positionDeMonSnakeY += 10;
    console.log(positionDeMonSnakeY);
    if (positionDeMonSnakeY == 300) {
        positionDeMonSnakeY = 0;
        snake.style.top = positionDeMonSnakeY + "px";
    }else{
        snake.style.top = positionDeMonSnakeY + "px";
    }
}

function mouveSnakeUp() {
    positionDeMonSnakeY -= 10;
    console.log(positionDeMonSnakeY);
    if (positionDeMonSnakeY == -10) {
        positionDeMonSnakeY = 290;
        snake.style.top = positionDeMonSnakeY + "px";
    }else{
        snake.style.top = positionDeMonSnakeY + "px";
    }
}

function mouveSnakeLeft() {
    positionDeMonSnakeX -= 10;
    console.log(positionDeMonSnakeX);
    if (positionDeMonSnakeX == -10) {
        positionDeMonSnakeX = 340;
        snake.style.left = positionDeMonSnakeX + "px";
    }else{
        snake.style.left = positionDeMonSnakeX + "px";
    }
}

function mouveSnakeRight() {
    positionDeMonSnakeX += 10;
    console.log(positionDeMonSnakeX); // 350
    if (positionDeMonSnakeX == 350) {
        positionDeMonSnakeX = 0;
        snake.style.left = positionDeMonSnakeX + "px";
    }else{
        snake.style.left = positionDeMonSnakeX + "px";
    }
}

let keydownSave = "";

document.addEventListener('keydown', function (event) {
    keydownSave = event.key
    mouveSnake(keydownSave);
});

// setInterval(mouveSnake(keydownSave), 100);

function mouveSnake(keydown){
    if (keydown == "ArrowRight") {
        mouveSnakeRight();
        
    }
    if (keydown == "ArrowLeft") {
        mouveSnakeLeft();
        
    }
    if (keydown == "ArrowUp") {
        mouveSnakeUp();
        
    }
    if (keydown == "ArrowDown") {
        mouveSnakeDown();
    }
    snakeEatApple();
    snakeMouveSize();
    snakeLastPosition = [positionDeMonSnakeX, positionDeMonSnakeY];
}

function snakeEatApple(){
    let positionLegitX = []
    let counter = 0;
    for (let index = 0; index < 35; index++) {
        positionLegitX.push(counter);
        counter += 10;
    }
    let positionLegitY = []
    counter = 0;
    for (let index = 0; index < 30; index++) {
        positionLegitY.push(counter);
        counter += 10;
    }
    if (snake.style.top == apple.style.top && snake.style.left == apple.style.left) {
        scoreValue = scoreValue + 1;
        score.innerHTML = "Score : " +scoreValue;
        apple.style.top = positionLegitY[parseInt(Math.random() * 35)] + "px";
        apple.style.left = positionLegitX[parseInt(Math.random() * 30)] + "px";
        addSnakeSize();
    }
}

function addSnakeSize(){
    let snakeSize = document.createElement("div");
    snakeSizePosition.push(snakeSize);
    snakeSize.className = "snakeSize";
    snakeSize.style.top = positionDeMonSnakeY + "px";
    snakeSize.style.left = positionDeMonSnakeX + "px";
    snakeSize.style.width = "10px";
    snakeSize.style.height = "10px";
    snakeSize.style.backgroundColor = "green";
    snakeSize.style.position = "absolute";
    document.getElementById("game").appendChild(snakeSize);
}

function snakeMouveSize() {
    for (let index = 0; index < snakeSizePosition.length; index++) {
        const element = snakeSizePosition[index];
        if (index == 0) {
            element.style.top = snakeLastPosition[1] + "px";
            element.style.left = snakeLastPosition[0] + "px";
            
        }else{
            element.style.top = snakeSizePosition[index - 1].style.top;
            element.style.left = snakeSizePosition[index - 1].style.left;
        }
        
    }
}