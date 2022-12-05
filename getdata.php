<?php
// session_start();
include_once('./submit.php');
include_once('./utils.php');
$username = $_SESSION['username'];
// echo json_encode($_SESSION);

$conn = connectData();
$statement = "SELECT *
FROM user 
    LEFT JOIN ball 
    ON ball.username = user.username 
    LEFT JOIN paddle 
    ON paddle.username = user.username
    LEFT JOIN score 
    ON score.username = user.username
    LEFT JOIN bricks
    ON bricks.username = user.username
    WHERE user.username = '$username'";
$query = mysqli_query($conn, $statement);
$data = mysqli_fetch_array($query);

die(json_encode($data));

    // die(json_encode($data));
