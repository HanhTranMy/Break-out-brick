
// Ý tưởng: Game sẽ bắt đầu khi click button start. Khi đó, canvas sẽ vẽ gạch, banh, paddle.
// Các chuyển động được tạo nên bởi hiệu ứng khung hình được xóa đi và vẽ lại,
// với mỗi lần vẽ lại banh, paddle nằm ở một vị trí khác nhau nhằm tạo chuyển động.
//Để xử lí việc banh chạm gạch, gạch biến mất thì lưu vị trí mỗi cục gạch trong 1 mảng.
// Mỗi khi banh di chuyển sẽ kiểm tra xem banh có nằm trong vị trí cục gạch không.
//Nếu có thì xóa gạch trong mảng, xóa hình gạch.

let canvas = document.getElementById("myCanvas");
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let paddle = {
  x: canvas.width / 2, //paddle bắt đầu từ vị trí giữa canvas
  y: canvas.height - 30 - 4, //30 là số chiều dài của paddle, paddle cách khung dưới 4px
  speed: 10,
};
let ball = {
  x: paddle.x + 80, //80 là khoảng cách được cộng thêm để ball có vị trí ở giữa paddle
  y: paddle.y - 8,
  speed: {
    x: 3,
    y: 3,
  },
};
let bricks = [];
let moveRight = false; //đánh dấu sự kiện nhấn phím phải di chuyển paddle sang phải
let moveLeft = false; //đánh dấu sự kiện nhấn phím trái di chuyển paddle sang trái
let stop = false;
let start;
let pause = false;
let count = 1;

// Bắt sự kiện di chuyển banh
window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "ArrowRight") {
      moveRight = true;
    } else if (event.key === "ArrowLeft") {
      moveLeft = true;
    }
  },
  true
);

function addBrick() {
  // Vẽ gạch từ tọa độ x=14, y=10. Mỗi cục gạch có kích thước 90x30px;
  // Có 4 hàng gạch, vẽ mỗi cục gạch đến khi cục gạch thứ n tràn ra ngoài khung game
  let xBrick = 14;
  let yBrick = 10;
  let heightBrick = 30;
  let widthBrick = 90;
  bricks = [];
  for (number = 1; number < 5; number++) {
    while (xBrick + widthBrick < 1000) {
      bricks.push({
        x: xBrick,
        y: yBrick,
        height: heightBrick,
        width: widthBrick,
      });
      xBrick += widthBrick + 8; //mỗi cục gạch cách nhau 8px
    }
    xBrick = 14;
    yBrick += heightBrick + 8; //mỗi hàng gạch cách nhau 8px
  }
}
addBrick();

$("#pause").on("click", function (event) {
  $("#myCanvas").css({ "background-color": "rgba(0,0,0,0.4)" });
  pause = true;
  clearTimeout(start);
});

function clickBtnStart() {
  $("#myCanvas").css({ "background-color": "rgb(255,255,255)" });
  count = -count;
  startGame();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, 170, 30);
  ctx.fillStyle = "tomato";
  ctx.fill();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 8, 0, 2 * Math.PI);
  ctx.fillStyle = "gray";
  ctx.fill();
}

function drawBrick() {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.fill();
  let lenBrick = bricks.length;
  for (number = 0; number < lenBrick; number++) {
    ctx.rect(
      bricks[number].x,
      bricks[number].y,
      bricks[number].width,
      bricks[number].height
    );
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
  }
}

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBrick();
  drawBall();
  
  // sự kiện banh chạm gạch
   for (let brick = 0; brick < bricks.length; ++brick) {
     if (ball.x >= bricks[brick].x - 8
       && ball.x <= bricks[brick].x + bricks[brick].width
       && ball.y >= bricks[brick].y - 8 
       && ball.y <= bricks[brick].y + bricks[brick].height){
         ball.speed.x = -ball.speed.x;
         ball.speed.y = -ball.speed.y;
         bricks.splice(brick,1);
         console.log("hit brick " + bricks[brick].x + " "+ bricks[brick].y);
         console.log("ball "+ball.x+ " " + ball.y);
         console.log("speed "+ ball.speed.x+ " " + ball.speed.y);
       }
     }
  // đi chuyển banh bằng cách thay đổi tọa độ banh dựa theo speed.
  //speed có số càng lớn thì di chuyển càng nhanh
  if (ball.x >= canvas.width || ball.x <= 0) {
    ball.speed.x = -ball.speed.x;
  }
  if (ball.y <= 0) {
    ball.speed.y = -ball.speed.y;
  }
  // sự kiện banh chạm paddle
  if (ball.y > paddle.y && ball.x > paddle.x && ball.x < paddle.x + 170) {
    ball.speed.y = -ball.speed.y;
    console.log("hits");
  }
  // Game kết thúc khi banh chạm đất
  if (ball.y > canvas.height) {
    stop = true;
  }
  ball.x += ball.speed.x;
  ball.y -= ball.speed.y;
  
    
  // paddle di chuyển dựa vào speed tương tự như banh
  if (moveRight == true && paddle.x <= canvas.width - 170) {
    paddle.x += paddle.speed;
  } else if (moveLeft && paddle.x > 0) {
    paddle.x -= paddle.speed;
  }
  moveLeft = false;
  moveRight = false;

  start = setTimeout(startGame, 10);
  if (stop) {
    clearTimeout(start);
  }
  
  if (count >= 0) {
    clearTimeout(start);
    if (pause) {
      pause = false;
      clickBtnStart();
    } else {
      ball.x = paddle.x + 80;
      ball.y = paddle.y - 12;
      addBrick();
    }
    if (stop) {
      stop = false;
      clickBtnStart();
    }
  }
}
