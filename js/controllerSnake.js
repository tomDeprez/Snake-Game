let snake = document.getElementById("snake");
let apple = document.getElementById("apple");
let score = document.getElementById("score");
let scoreValue = 0;
let positionDeMonSnakeX = parseInt(snake.style.left);
let positionDeMonSnakeY = parseInt(snake.style.top);
let snakeSizePosition = []
let snakeLastPosition = [];
let modelLearning = createModel();

function mouveSnakeDown() {
    positionDeMonSnakeY += 10;
    console.log(positionDeMonSnakeY);
    if (positionDeMonSnakeY == 300) {
        positionDeMonSnakeY = 0;
        snake.style.top = positionDeMonSnakeY + "px";
    } else {
        snake.style.top = positionDeMonSnakeY + "px";
    }
}

function mouveSnakeUp() {
    positionDeMonSnakeY -= 10;
    console.log(positionDeMonSnakeY);
    if (positionDeMonSnakeY == -10) {
        positionDeMonSnakeY = 290;
        snake.style.top = positionDeMonSnakeY + "px";
    } else {
        snake.style.top = positionDeMonSnakeY + "px";
    }
}

function mouveSnakeLeft() {
    positionDeMonSnakeX -= 10;
    console.log(positionDeMonSnakeX);
    if (positionDeMonSnakeX == -10) {
        positionDeMonSnakeX = 340;
        snake.style.left = positionDeMonSnakeX + "px";
    } else {
        snake.style.left = positionDeMonSnakeX + "px";
    }
}

function mouveSnakeRight() {
    positionDeMonSnakeX += 10;
    console.log(positionDeMonSnakeX); // 350
    if (positionDeMonSnakeX == 350) {
        positionDeMonSnakeX = 0;
        snake.style.left = positionDeMonSnakeX + "px";
    } else {
        snake.style.left = positionDeMonSnakeX + "px";
    }
}

let keydownSave = "";

document.addEventListener('keydown', function (event) {
    keydownSave = event.key
    mouveSnake(keydownSave);
});

// setInterval(mouveSnake(keydownSave), 100);

function mouveSnake(keydown) {
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
    snakeLastPosition[0] = [snake.style.top, snake.style.left];
    gameOver();
}

function snakeEatApple() {
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
        score.innerHTML = "Score : " + scoreValue;
        apple.style.top = positionLegitY[parseInt(Math.random() * 35)] + "px";
        apple.style.left = positionLegitX[parseInt(Math.random() * 30)] + "px";
        addSnakeSize();
    }
}

function addSnakeSize() {
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
        if (index == snakeLastPosition.length - 1) {
            snakeLastPosition.push([element.style.top, element.style.left]);
        } else {
            snakeLastPosition[index + 1] = [element.style.top, element.style.left];
        }
        element.style.top = snakeLastPosition[index][0];
        element.style.left = snakeLastPosition[index][1];
    }
}

function gameOver() {
    snakeSizePosition.forEach(element => {
        if (element.style.top == snake.style.top && element.style.left == snake.style.left) {
            // Supprimer tous les éléments HTML de snakeSizePosition
            snakeSizePosition.forEach(segment => {
                segment.remove(); // Supprime l'élément du DOM
            });

            // Réinitialiser les positions et autres variables
            snake.style.top = "40px";
            snake.style.left = "150px";
            apple.style.top = "20px";
            apple.style.left = "150px";
            scoreValue = 0;
            score.innerHTML = "Score : " + scoreValue;
            positionDeMonSnakeX = parseInt(snake.style.left);
            positionDeMonSnakeY = parseInt(snake.style.top);
            snakeSizePosition = [];
            snakeLastPosition = [];
        }
    });
}


function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [13], units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));

    model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    return model;
}

function getDataForLearning() {
    let learningData = [];
    let dataSnake = [];

    // Collecter les positions du corps
    for (let i = 0; i < snakeLastPosition.length; i++) {
        let left = 0, top = 0;
        if (snakeLastPosition[i]) {
            left = parseFloat(snakeLastPosition[i][1]) / 350;
            top = parseFloat(snakeLastPosition[i][0]) / 300;
        }
        dataSnake.push(left, top);
    }

    // Moyenne des positions du corps
    let total = dataSnake.reduce((sum, val) => sum + val, 0);
    total = dataSnake.length > 0 ? total / dataSnake.length : 0;
    learningData.push(total);

    // Taille du serpent (ajustée pour une taille max de 100, à adapter si nécessaire)
    learningData.push(snakeSizePosition.length / 1050);

    // Position de la pomme
    let appleLeft = parseFloat(apple.style.left || 0) / 350;
    let appleTop = parseFloat(apple.style.top || 0) / 300;
    learningData.push(appleLeft, appleTop);

    // Position de la tête
    let headLeft = parseFloat(snake.style.left || 0) / 350;
    let headTop = parseFloat(snake.style.top || 0) / 300;
    learningData.push(headLeft, headTop);

    // Danger score : segments proches de la tête
    let dangerCount = 0;
    const threshold = 0.1; // Ajustez selon la grille
    for (let i = 1; i < snakeLastPosition.length; i++) {
        if (snakeLastPosition[i]) {
            let left = parseFloat(snakeLastPosition[i][1]) / 350;
            let top = parseFloat(snakeLastPosition[i][0]) / 300;
            let distance = Math.sqrt((left - headLeft) ** 2 + (top - headTop) ** 2);
            if (distance < threshold) dangerCount++;
        }
    }
    let dangerScore = snakeLastPosition.length > 1 ? dangerCount / (snakeLastPosition.length - 1) : 0;
    learningData.push(dangerScore);

    // Distance euclidienne tête-pomme
    let distanceToApple = Math.sqrt((headLeft - appleLeft) ** 2 + (headTop - appleTop) ** 2);
    distanceToApple = distanceToApple / Math.sqrt(2); // Normalisé (distance max = √2)
    learningData.push(distanceToApple);

    // Direction actuelle (one-hot encoding)
    let direction = [0, 0, 0, 0]; // Par défaut : aucune direction
    if (typeof keydown !== 'undefined') {
        if (keydown === "ArrowUp") direction = [1, 0, 0, 0]; // Haut
        else if (keydown === "ArrowRight") direction = [0, 1, 0, 0]; // Droite
        else if (keydown === "ArrowDown") direction = [0, 0, 1, 0]; // Bas
        else if (keydown === "ArrowLeft") direction = [0, 0, 0, 1]; // Gauche
    }
    learningData.push(...direction); // Ajoute 4 valeurs
    learningData.push(scoreValue / 1050); // Ajoute 4 valeurs

    return learningData; // 13 entrées : [total, taille, pomme_x, pomme_y, tête_x, tête_y, danger, distance_pomme, dir_haut, dir_droite, dir_bas, dir_gauche, scoreValue]
}

function getActionFromPrediction(prediction) {
    const actionIndex = prediction.argMax(1).dataSync()[0]; // 0 = haut, 1 = droite, 2 = bas, 3 = gauche
    return actionIndex;
}

function applyAction(index) {
    if (index === 0) mouveSnakeUp();
    if (index === 1) mouveSnakeRight();
    if (index === 2) mouveSnakeDown();
    if (index === 3) mouveSnakeLeft();
}

// Boucle d'IA (remplace le clavier)
setInterval(() => {
    const input = getDataForLearning(); // ton tableau de 10 floats
    const tensorInput = tf.tensor2d([input]); // batch de 1

    const prediction = modelLearning.predict(tensorInput);
    const actionIndex = getActionFromPrediction(prediction);

    applyAction(actionIndex);

    snakeEatApple();
    snakeMouveSize();
    snakeLastPosition[0] = [snake.style.top, snake.style.left];

}, 100); // 100ms