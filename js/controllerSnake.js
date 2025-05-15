let snake = document.getElementById("snake");
let positionDeMonSnake = 0;


function mouveSnakeDown() {
    positionDeMonSnake += 10;
    snake.style.top = positionDeMonSnake + "px";
}

function mouveSnakeUp() {
    positionDeMonSnake -= 10;
    snake.style.top = positionDeMonSnake + "px";
}

function mouveSnakeLeft() {
    positionDeMonSnake -= 10;
    snake.style.left = positionDeMonSnake + "px";
}

function mouveSnakeRight() {
    positionDeMonSnake += 10;
    snake.style.left = positionDeMonSnake + "px";
}

let keydownSave = "";

document.addEventListener('keydown', function (event) {
    keydownSave = event.key
});

setInterval(mouveSnake(keydownSave), 100);

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
    
}