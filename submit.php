<?php
session_start();
require_once('./utils.php');

$action = getPOST('action');

switch ($action) {
    case 'login':
        login();
        break;
    case 'register':
        register();
        break;
}

function register()
{
    $email = getPOST('email');
    $pass = getPOST('pass');
    $name = getPOST('name');

    $pass = md5($pass);

    $values = "'$email','$pass','$name'";
    $valuedefault = "'$email'";

    if (checkAccountRegis($email)) {
        addData('user', 'username,pass,name', $values);
        addData('ball', 'username', "'$email'");
        addData('paddle', 'username', "'$email'");
        addData('score', 'username', "'$email'");

        $xBrick = 14;
        $yBrick = 50;
        $widthBrick = 90;
        $heightBrick = 30;
        $value = "";
        for ($number = 1; $number < 5; $number++) {
            while ($xBrick + $widthBrick < 1000) {
                $value = $value . "$xBrick  $yBrick ";
                $xBrick += $widthBrick + 8; //mỗi cục gạch cách nhau 8px
            }

            $xBrick = 14;
            $yBrick += $heightBrick + 8; //mỗi hàng gạch cách nhau 8px
        }
        addData("bricks", "brick,username", "'$value','$email'");
        return "You have successfully registered.<br/> Please login to start game.";
    }
    return "The account has been created.";
}
if (isset($_POST['register'])) {
    $announce = register();
}
function login()
{
    $email = getPOST('email');
    $pass = getPOST('pass');
    $pass = md5($pass);

    if (checkAccountLogin($email, $pass)) {
        $_SESSION['username'] = $email;
        return "";
    }
    return "Email or Password is incorrect.";
}
if (isset($_POST['login'])) {

    $announce = login();
}
