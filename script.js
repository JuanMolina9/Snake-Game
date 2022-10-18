let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = []; //Snake em forma de lista, pois será varias coordenadas
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    //Fundo do Jogo
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);  //Desenha um retangulo usando x e y

}

function criarSnake() {

    for(i=0; i< snake.length; i++ ) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//função para controle da snake
document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    
    //função para atravessa a parede "loop"
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //função para acabar o jogo ao se chocar no proprio corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :( ');
        }
    }

    criarBG();
    criarSnake();
    drawFood();

    //Cordenadas Iniciais
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Condição para direção da snake 
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //condição para aumentar o tamanho da snake
    if(snakeX != food.x || snakeY != food.y) {
        //função pop = retirar o ultimo elemento da array
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }




    

    //função unshift adicionar mais um a frente
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);



}

let jogo = setInterval(iniciarJogo, 100);

