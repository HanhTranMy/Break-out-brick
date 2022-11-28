<?php
session_start();

if (isset($_SESSION['counter'])) {
    $_SESSION['counter'] += 1;
} else {
    $_SESSION['counter'] = 1;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Break Out Brick with HTML5, JS</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
    <style>
        .pause {
            background-image: url("./img/pause.png");
            background-size: cover;
        }

        .endgame {
            background-image: url("./img/endgame.png");
            background-size: cover;
        }
    </style>
</head>

<body>

    <h1 class="text-center p-3">Break Out Brick with HTML5, CSS, JS</h1>


    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-block d-md-none">
                    <h3 class="px-3 text-center text-danger">Kích thước màn hình quá nhỏ để chơi game</h3>
                </div>
            </div>
        </div>

        <div class="row d-none d-md-block">
            <!-- <div class="row d-none d-md-block mx-auto"> -->
            <canvas class="col-12 border border-dark p-0" id="myCanvas" width="1000" height="600">
            </canvas>
            <div class="container-btn py-3 ">
                <button id="start" type="button" class="btn btn-primary">Start Game</button>
                <button id="pause" type="button" class="btn btn-primary">Pause Game</button>
            </div>
        </div>
    </div>
    <script src="./js/script.js"></script>

</body>

</html>
