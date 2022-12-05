<?php
session_start();
$conn = mysqli_connect('localhost', 'root', '', 'BREAKOUTBRICK');

if (!isset($_SESSION['username'])) {
    header('location: login.php');
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
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>

    <h1 class="text-center p-3">BREAK OUT BRICK</h1>

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
            <canvas class="col-12 p-0" id="myCanvas" width="1000" height="600">
            </canvas>
            <div class="container-btn py-3 d-flex justify-content-between">
                <div>
                    <button id="start" type="button" class="btn btn-primary">Start Game</button>
                    <button id="pause" type="button" class="btn btn-primary">Pause Game</button>
                </div>
                <button id="save" type="button" class="btn btn-primary ">Save game</button>
            </div>
        </div>
    </div>
    <script src="./js/script.js"></script>

</body>

</html>