<?php 

function getPOST($key){

	if (isset($_POST[$key])) {
		$result = $_POST[$key];
	}else{
        $result = '';
    }
    return $result;
}

function getAllData($user){

    $conn = mysqli_connect("localhost","root","","breakoutbrick");
    mysqli_set_charset($conn, 'utf8');

    $data = [];
    
    $dbBall = "SELECT * FROM ball WHERE username = '$user'";
    $qBall = mysqli_query($conn, $dbBall);
    array_push($data, mysqli_fetch_array($qBall,MYSQLI_ASSOC));

    $dbPaddle = "SELECT * FROM paddle WHERE username = '$user'";
    $qPaddle = mysqli_query($conn, $dbPaddle);
    array_push($data, mysqli_fetch_array($qPaddle,MYSQLI_ASSOC));

    $dbScore = "SELECT * FROM score WHERE username = '$user'";
    $qScore = mysqli_query($conn, $dbScore);
    array_push($data, mysqli_fetch_array($qScore,MYSQLI_ASSOC));
    
    mysqli_close($conn);
    
    return $data;
}

function getDataToArray($user,$table,$id){

    $conn = mysqli_connect("localhost","root","","breakoutbrick");
    mysqli_set_charset($conn, 'utf8');
    
    $db = "SELECT * FROM $table WHERE $id = '$user'";
    $query = mysqli_query($conn, $db);
    
    $data = mysqli_fetch_array($query,MYSQLI_ASSOC);
    
    mysqli_close($conn);
    
    return $data;
}

function addData($table,$key,$values){
    $conn = mysqli_connect("localhost","root","","breakoutbrick");
    mysqli_set_charset($conn, 'utf8');

    $db = "INSERT INTO $table ($key) VALUES ($values)";
    $query = mysqli_query($conn, $db);

    mysqli_close($conn);

}

function checkAccountRegis($user){

    $data = getDataToArray($user,'user','username');
    if ($data == ""){
        return true;
    }

    return false;
}

function checkAccountLogin($user, $pass){
    $data = getDataToArray($user,'user','username');

    if ($data == null){
        return false;
    }
    else {
        if ($data['pass'] == $pass){
            header('location: index.php');
            return true;
        }
        else{
            return false;
        }
    }

}

?>