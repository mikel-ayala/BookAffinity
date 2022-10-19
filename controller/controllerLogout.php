<?php

if (!session_start()){
    session_start();
} 

session_destroy();

$response = array();
$response['error'] = "no error";  

echo json_encode($response);
unset($response);

