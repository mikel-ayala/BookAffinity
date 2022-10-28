<?php

session_start(); 

$response = array();

if (isset($_SESSION['userId']) && isset($_SESSION['username']) && isset($_SESSION['userRole']) && isset($_SESSION['foto'])) {
    $response["userId"] = $_SESSION['userId'];
    $response["username"] = $_SESSION['username'];
    $response["foto"] = $_SESSION['foto'];
    if (isset($_SESSION['grupo'])) {
        $response["grupo"] = $_SESSION['grupo'];
    }
    $response["userRole"] = $_SESSION['userRole'];
    $response["error"] = "logged";
} else {
    $response["error"] = "not logged";
}

echo json_encode($response);