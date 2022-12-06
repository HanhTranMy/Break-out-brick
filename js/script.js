// Ý tưởng: Game sẽ bắt đầu khi click button start. Khi đó, canvas sẽ vẽ gạch, banh, paddle.
// Các chuyển động được tạo nên bởi hiệu ứng khung hình được xóa đi và vẽ lại,
// với mỗi lần vẽ lại banh, paddle nằm ở một vị trí khác nhau nhằm tạo chuyển động.
//Để xử lí việc banh chạm gạch, gạch biến mất thì lưu vị trí mỗi cục gạch trong 1 mảng.
// Mỗi khi banh di chuyển sẽ kiểm tra xem banh có nằm trong vị trí cục gạch không.
//Nếu có thì xóa gạch trong mảng, xóa hình gạch.

const canvas = document.getElementById("myCanvas");
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const WIDTHPADDLE = 180;
const HEIGHTPADDLE = 30;
const RADIUSBALL = 8;
const UNITSCORE = 3;
const SPEEDBALLDAFAULT = 4;
let statusGame = {
  start: true,
  pause: false,
  end: false,
};
let paddle;
let ball;
let bricks = [];
let score = 0;
let moveRight = false; //đánh dấu sự kiện nhấn phím phải di chuyển paddle sang phải
let moveLeft = false; //đánh dấu sự kiện nhấn phím trái di chuyển paddle sang trái

async function setUpData() {
  let bricksdatabase = [];
  let res = await fetch("./getData.php", { method: "POST" });
  let data = await res.json();
  
  resetPaddle();
  resetBall();
  setupBricks();
    //xử lí gạch: gạch là một chuỗi số
    //lấy ra và cộng dồn đến khi nào gặp dấu /t thì chuyển sang num, đánh dấu chuyển x - y
    // nếu là x thì add vào x ngược lại add vào y
  function setupBricks(){
    let lenBrickDatabase = data.brick.length;
    let j = 0; let flag = 1;
    while (j < lenBrickDatabase) {
      let num = ""; 
      while (data.brick[j] != " "){
        num += data.brick[j];
        j++;
      } 
      if (data.brick[j] == " ") {
        if (flag >0) { // tọa độ của x
          bricksdatabase.push({
            x : Number(num),
            y : 0,
            width : 90,
            height : 30
          });
        }
        else{ //tọa độ y
          bricksdatabase[bricksdatabase.length-1].y = Number(num);
        }
        j++;
        flag = -flag;
      }
    }
    console.log("bricks database: "+ bricksdatabase.length);
  }

    
  score = Number(data.scoreUser);

  function resetBall() {
    ball = {
      x: Number(data.ball_x),
      y: Number(data.ball_y),
      speed: {
        x: Number(data.sBall_x),
        y: Number(data.sBall_y),
      },
    };

    if (data.ball_x == "0") {
      //check first play
      paddle = {
        x: canvas.width / 2,
        y: canvas.height - HEIGHTPADDLE - 4,
        speed: Number(data.paddle_speed),
      };
      ball.x = paddle.x + WIDTHPADDLE / 2;
      ball.y = paddle.y;
    }
  }

  function resetPaddle() {
    paddle = {
      x: Number(data.paddle_x),
      y: Number(data.paddle_y),
      speed: Number(data.paddle_speed),
    };
  }


  // Xử lí trạng thái game

  $("#pause").on("click", function (event) {
    statusGame.start = false;
    statusGame.pause = true;
    $("#myCanvas").addClass("pause");
    clearTimeout(start);
  });

  $("#start").on("click", function (event) {
    if ($("#myCanvas").hasClass("pause")) {
      $("#myCanvas").removeClass("pause");
    }
    if ($("#myCanvas").hasClass("endgame")) {
      $("#myCanvas").removeClass("endgame");
    }
    if (!statusGame.pause && !statusGame.end) {
      clearTimeout(start);
      resetGame();
        }
    statusGame.pause = false;
    startGame();
  });

  function resetGame() {
    resetBall();
    addBrick();
    score = Number(data.scoreUser);
  }

  // Bắt sự kiện di chuyển paddle
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

  // Vẽ các phần tử trong game
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, WIDTHPADDLE, HEIGHTPADDLE);
    ctx.fillStyle = "#761322";
    ctx.fill();
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, RADIUSBALL, 0, 2 * Math.PI);
    ctx.fillStyle = "#FEA4B0";
    ctx.fill();
  }

  function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "1.5rem Montserrat";
    ctx.fillText("Score:" + score, 25, 35);
  }

  function drawBrick() {
    ctx.beginPath();

    let lenBrick = bricks.length;
    for (number = 0; number < lenBrick; number++) {
      ctx.rect(
        bricks[number].x,
        bricks[number].y,
        bricks[number].width,
        bricks[number].height
      );
      ctx.fillStyle = "#7EAD96";
      ctx.fill();
      ctx.stroke();
    }

  }

  function movePaddle() {
    if (moveRight == true && paddle.x <= canvas.width - WIDTHPADDLE) {
      paddle.x += paddle.speed;
    } else if (moveLeft && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    moveLeft = false;
    moveRight = false;
  }

  function ballCollisionWithWall() {
    if (ball.x >= canvas.width - RADIUSBALL || ball.x <= 0) {
      ball.speed.x = -ball.speed.x;
    }
    if (ball.y <= 0) {
      ball.speed.y = -ball.speed.y;
    }
    if (ball.y >= canvas.height - RADIUSBALL) {
      statusGame.end = true;
    }
  }

  // ball chạm càng xa vị trí ở giữa paddle thì càng nảy xa
  // tại vị trí hai bên paddle ball nảy đi với góc 60 độ,
  // ở vị trí trung tâm thì nảy với góc 0 độ
  // chuyển khoảng cách giữa x ball với trung tâm paddle thành miền giá trị từ -1 tới 1
  // Áp dụng tỷ số lượng giác của góc nhọn trong tam giác vuông
  // ta tính được khoảng cách cần cộng thêm cho ball
  function ballCollisionWithPaddle() {
    if (
      ball.y + RADIUSBALL > paddle.y &&
      ball.y - RADIUSBALL < paddle.y + HEIGHTPADDLE &&
      ball.x + RADIUSBALL > paddle.x &&
      ball.x - RADIUSBALL < paddle.x + WIDTHPADDLE
    ) {
      ball.speed.y = -ball.speed.y;
      ball.y = paddle.y - RADIUSBALL;
    }
  }

  function ballCollisionWithBrick() {
    for (let b = 0; b < bricks.length; b++) {
      if (
        ball.x + RADIUSBALL > bricks[b].x &&
        ball.x - RADIUSBALL < bricks[b].x + bricks[b].width &&
        ball.y + RADIUSBALL > bricks[b].y &&
        ball.y - RADIUSBALL < bricks[b].y + bricks[b].height
      ) {
        let numRan = Math.floor(Math.random() * 4) - 2;
        ball.speed.x = -(SPEEDBALLDAFAULT + numRan);
        ball.speed.y = -(SPEEDBALLDAFAULT - numRan);
        bricks.splice(b, 1);
        score += UNITSCORE;
      }
    }
  }

  function addBrick(){
    
  console.log("bricks database before: "+ bricksdatabase.length);
  bricks = bricksdatabase.slice(0, bricksdatabase.length);
  console.log("bricks : "+ bricks.length);
  console.log("bricks database after: "+ bricksdatabase.length);

    if (bricks.length == 0){
      // Vẽ gạch từ tọa độ x=14, y=10. Mỗi cục gạch có kích thước 90x30px;
      // Có 4 hàng gạch, vẽ mỗi cục gạch đến khi cục gạch thứ n tràn ra ngoài khung game
      let xBrick = 14;
      let yBrick = 50;
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

  }}
}
    // Vẽ và xử lí các sự kiện khi game bắt đầu
    function startGame() {
      if (statusGame.end && !statusGame.pause) {
        statusGame.end = false;
        resetGame();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScore();
      drawPaddle();
      drawBall();
      movePaddle();

      ballCollisionWithPaddle();
      ballCollisionWithWall();
      ballCollisionWithBrick();
      ball.x += ball.speed.x;
      ball.y -= ball.speed.y;

      drawBrick();
      // Xử lí pause và start game
      start = setTimeout(startGame, 10);

      // Dừng game
      if (statusGame.end) {
        $("#myCanvas").addClass("endgame");
        statusGame.start = false;
        clearTimeout(start);
        resetGame();
      }
    }

    //Save game
    $("#save").on("click", function (event) {
      dataScore = {
        s: score,
        unit: UNITSCORE,
      };
      let brick = "";
      for (let i = 0; i < bricks.length; i++) {
        brick += bricks[i].x.toString() + " " + bricks[i].y.toString() + " ";
      }

      $.ajax({
        type: "POST",
        url: "./uploaddata.php",
        data: { ball, paddle, dataScore, brick },
        success: function (data) {},
      });
    });
  }
setUpData();
