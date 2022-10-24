<?php

require_once '../model/usuarioModel.php';

$user = new usuarioModel();

session_start();

$user->setIdUsuario($_SESSION['userId']);
//password_hash($data['contraseina'], PASSWORD_DEFAULT);

$response = array();
$user->getUser();
$response['user'] = $user->getObjectVars();
$response['foto'] = $_SESSION['foto'];


echo json_encode($response);
unset($response);
 