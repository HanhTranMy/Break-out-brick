<?php
session_start();
require_once ('./getdata.php');

$action = getPOST('action');

switch ($action) {
	case 'login':
		login();
		break;
	case 'register':
		register();
		break;
}

function register(){
    if (isset($_POST['register'])) {
        $email = getPOST('email');
        $pass = getPOST('pass');
        $name = getPOST('name');

        $pass = md5($pass);

        $values = "'$email','$pass','$name'";
        echo $values;

        if (checkAccountRegis($email)){
            $announce = "You have successfully registered.<br/> Please login to start game.";
            addData('user','username,pass,name',$values);
        }
        else{
            $announce = "The account has been created.";
        }
    }
}

function login(){
    if (isset($_POST['login'])){
        $email = getPOST('email');
        $pass = getPOST('pass');
        $pass = md5($pass);

        if (checkAccountLogin($email,$pass)){
            $_SESSION['username'] = $email;
            //load tất cả dữ liệu lên
            return "";
        }
        return "Email or Password is incorrect.";
    }
}

$announce = login();
