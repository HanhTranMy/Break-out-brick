<?php

function getPOST($key)
{

    if (isset($_POST[$key])) {
        $result = $_POST[$key];
    } else {
        $result = '';
    }
    return $result;
}

function connectData()
{
    $conn = mysqli_connect("localhost", "root", "", "breakoutbrick");
    mysqli_set_charset($conn, 'utf8');
    return $conn;
}

function getAllData($user)
{

    $conn = connectData();

    $data = [];

    $dbBall = "SELECT * FROM ball WHERE username = '$user'";
    $qBall = mysqli_query($conn, $dbBall);
    array_push($data, mysqli_fetch_array($qBall, MYSQLI_ASSOC));

    $dbPaddle = "SELECT * FROM paddle WHERE username = '$user'";
    $qPaddle = mysqli_query($conn, $dbPaddle);
    array_push($data, mysqli_fetch_array($qPaddle, MYSQLI_ASSOC));

    $dbScore = "SELECT * FROM score WHERE username = '$user'";
    $qScore = mysqli_query($conn, $dbScore);
    array_push($data, mysqli_fetch_array($qScore, MYSQLI_ASSOC));

    mysqli_close($conn);

    return $data;
}

function getData($statement, $getData)
{

    $conn = connectData();
    $data = "";

    $query = mysqli_query($conn, $statement);
    if ($getData == 1) {
        $data = mysqli_fetch_array($query, MYSQLI_ASSOC);
    }
    mysqli_close($conn);
    return $data;
}

function selectData($user, $table, $id,)
{
    $statement = "SELECT * FROM $table WHERE $id = '$user'";
    return getData($statement, 1);
}


function addData($table, $key, $values)
{
    $statement  = "INSERT INTO $table ($key) VALUES ($values)";
    getData($statement, 0);
}

function updateData($table, $values, $user)
{
    $statement  = "UPDATE $table SET " . $values . " WHERE username = '$user'";
    getData($statement, 0);
}

function checkAccountRegis($user)
{

    $data =  selectData($user, 'user', 'username');
    if ($data == "") {
        return true;
    }

    return false;
}

function checkAccountLogin($user, $pass)
{
    $data =  selectData($user, 'user', 'username');

    if ($data == null) {
        return false;
    } else {
        if ($data['pass'] == $pass) {
            header('location: index.php');
            return true;
        } else {
            return false;
        }
    }
}
