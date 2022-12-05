<?php
    include_once('./submit.php');
    include_once('./utils.php');
    
    $ball = getPOST('ball');
    $paddle = getPOST('paddle');
    $score = getPOST('dataScore');
    $bricks = getPOST('brick');
    $username = $_SESSION['username'];
    $dataBrick = "";

    if ($ball != ""){
        $dataBall = "ball_x = ".$ball['x'].", ball_y = ". $ball['y'] .", sBall_x = " . $ball['speed']['x'] .", sBall_y = " .$ball['speed']['y'];
        $dataPaddle = "paddle_x = ".$paddle['x'].", paddle_y = " . $paddle['y'].", paddle_speed = " . $paddle['speed'];
        $dataScore = "scoreUser = ".$score['s'] . ", unit = " . $score['unit'];
    }

    updateData("ball",$dataBall,$_SESSION['username']);
    updateData("paddle",$dataPaddle,$_SESSION['username']);
    updateData("score",$dataScore,$_SESSION['username']);
    updateData("bricks","brick = '$bricks'",$_SESSION['username']);
