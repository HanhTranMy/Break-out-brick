<?php

$announce = "";
include_once('submit.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log in Break Out Brick with HTML5, JS</title>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <link rel="stylesheet" href="./css/login.css">
</head>

<body>
  <div class="container card">
    <h2 class="text-center mb-4">REGISTER</h2>
    <form method="post" action="">
      <div class="form-group">
        <label for="name">Your name:</label>
        <input type="text" name="name" class="form-control" id="name" placeholder="Your name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" name="email" class="form-control" id="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" name="pass" class="form-control" id="password" placeholder="Password" required>
      </div>

      <div class="form-group">
        <button id="login" type="submit" class="btn my-3 p-2" style="width: 100%;" name="register">CREATE ACCOUNT</button>
      </div>
      <p class="text-center mb-0 mt-4">Do you have an account?</p>

      <div class="form-group">
        <!-- <button id = "register" class="btn my-3 p-2" style="width: 100%;"><a href="register.php">REGISTER</a></button> -->
        <a href="login.php" id="register" class="btn my-3 p-2" style="width: 100%;">LOG IN</a>
      </div>

      <p class="announce"><?php echo $announce;  ?></p>
    </form>
  </div>
</body>

</html>