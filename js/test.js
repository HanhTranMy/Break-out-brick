let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let canvas=document.getElementById("myCanvas");
let spaceMovePaddle = 10;
let spaceMoveBall  = {
    x: 10,
    y: -2,
};
let flagStart = false;
let positionPaddle = {
    x: 415,
    y: 660
};
let positionBall = {
    x: 490,
    y: 645
};

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(positionPaddle.x,positionPaddle.y,170,30);
    ctx.fillStyle = "tomato";
    ctx.fill();
    ctx.stroke();

}

function drawBall(){
    ctx.beginPath();
    ctx.rect(positionBall.x,positionBall.y,14,14);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
}

function moveBall(){
    // kiểm tra điều kiện khi banh đụng
    if (positionBall.x <= 14 || positionBall.x > (canvas.width-14)){ //bóng đụng hai biên
        spaceMoveBall.x = - Math.floor(Math.random() * 11);
    }
    else {
        
    }
    ctx.clearRect(0,0,canvas.width,canvas.height - 41);
    drawBrick();
    drawBall();
    positionBall.x += spaceMoveBall.x;
    positionBall.y += spaceMoveBall.y;
    setTimeout(function() {
        requestAnimationFrame(moveBall);
   }, 1000 / 30);


}

function drawBrick(){
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fill();

    // Vẽ gạch từ tọa độ x=14, y=10. Mỗi cục gạch có kích thước 90x30px;
        // Có 4 hàng gạch, vẽ mỗi cục gạch đến khi cục gạch thứ n tràn ra ngoài khung game
        x = 14; y = 10; 
        heightBrick = 30; widthBrick = 90;
        for (number = 1; number < 5; number++){
            while (x + widthBrick<1000){
                ctx.rect(x,y,widthBrick,heightBrick);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.stroke();
                x += widthBrick + 8; //mỗi cục gạch cách nhau 8px
            } 
            x = 14;
            y += heightBrick + 8; //mỗi hàng gạch cách nhau 8px
    }
}

function draw(){
    ctx.clearRect(0,658,canvas.width,canvas.height);
    drawBrick();
    drawPaddle();
}


// set up game

// Update vị trí đểm tạo hiệu ứng chuyển động
function updateX(objectMove,distance){
    objectMove += distance;

    if (objectMove < 0)
    objectMove = 0;
    if (objectMove > 830){
        objectMove = 830;
    }

    return objectMove;
}

function updateY(objectMove,distance){
    objectMove.y += distance;

    if (objectMove.y < 0)
        objectMove.y = 0;
    if (objectMove.y > 700){
        objectMove.y = 700;
    }
}

function startGame(){
    draw();
    drawBall();
    moveBall();
}

//Xử lí dự kiện bóng
// di chuyển banh bằng cách thay đổi tọa độ y, 
//Nếu tọa độ y của banh bằng tọa độ y của dĩa hứng thì banh nảy lên
//Nếu tọa độ y của mép dưới cục gạch hoặc  bằng tọa độ y của dĩa, hoặc đụng hai mép khung game 
//thì banh nảy xuống. Khi chạm thì random ngẫu nhiên tọa độ x trong khoảng độ dài cục gạch 
//tạo đường đi ngẫu nhiên cho banh. 
//Nếu banh chạm tọa độ mép dưới khung game thì banh biến mất và kết thúc trò chơi.
function randomBall(){
    spaceMoveBall =  Math.floor(Math.random() * 22) - 11;
}

// Bắt sự kiện di chuyển dĩa
window.addEventListener("keydown", function(event){
    if (event.defaultPrevented){
        return;
    }
    if (event.code === "ArrowLeft"){
        positionPaddle.x = updateX(positionPaddle.x,-spaceMovePaddle);
        console.log("left", positionPaddle.x);
    }
    else if (event.code === "ArrowRight"){
        positionPaddle.x = updateX(positionPaddle.x,spaceMovePaddle);
        console.log("right",positionPaddle.x);
    }

    // để tạo hiệu ứng chuyển động khi bấm phím thì 
    // update lại vị trí mới của dĩa và vẽ lại khung game 
    // gồm gạch, banh, dĩa ở vị trí mới
    requestAnimationFrame(draw); 
}, true);

let start = $("#start");
start.on( "click", function( event ) {
    startGame();
});
