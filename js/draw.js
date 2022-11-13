var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

function setUpGame(){
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

        drawPaddle();
        drawBall();
       // 
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(415,660,170,30);
    ctx.fillStyle = "tomato";
    ctx.fill();
    ctx.stroke();

}

function drawBall(){
    ctx.beginPath();
    ctx.rect(490,646,14,14);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.stroke();
}

setUpGame();
// di chuyển banh bằng cách thay đổi tọa độ y, 
//Nếu tọa độ y của banh bằng tọa độ y của dĩa hứng thì banh nảy lên
//Nếu tọa độ y của mép dưới cục gạch hoặc  bằng tọa độ y của dĩa, hoặc đụng hai mép khung game 
//thì banh nảy xuống. Khi chạm thì random ngẫu nhiên tọa độ x trong khoảng độ dài cục gạch 
//tạo đường đi ngẫu nhiên cho banh. 
//Nếu banh chạm tọa độ mép dưới khung game thì banh biến mất và kết thúc trò chơi.
