<?php
session_start(); 

$response=array();

if (isset($_SESSION['userId']) && isset($_SESSION['username']) && isset($_SESSION['userRole']))
{
    $response["userId"]=$_SESSION['userId'];
    $response["username"]=$_SESSION['username'];
    $response["foto"]=$_SESSION['foto'];
    $response["userRole"]=$_SESSION['userRole'];
    $response["error"]="logged";
}else{
    $response["error"]="not logged";
}
echo json_encode($response);