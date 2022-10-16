<?php
session_start(); 

$response=array();

if (isset($_SESSION['id']) && isset($_SESSION['userName']) && isset($_SESSION['userRole']))
{
    $response["userId"]=$_SESSION['userId'];
    $response["username"]=$_SESSION['username'];
    $response["userRole"]=$_SESSION['userRole'];
    $response["error"]="logged";
}else{
    $response["error"]="not logged";
}
echo json_encode($response);