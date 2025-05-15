let snake = document.getElementById("snake");
let positionDeMonSnake = 0;

setInterval(mouveSnake, 100); 

function mouveSnake() {
    positionDeMonSnake += 10;
    snake.style.left = positionDeMonSnake + "px";
}