<?php

require_once '../model/usuarioModel.php';
$data = json_decode(file_get_contents("php://input"), true);

$usuario = $data['usuario'];
$contraseina = $data['contraseina'];
//password_hash($data['contraseina'], PASSWORD_DEFAULT);


$user = new usuarioModel();

$user->setUsuario($usuario);
$user->setContraseina($contraseina);

$existe = $user->findUser();

$response = array();
$response['user'] = $user;

if ($existe) {
    session_start();
    $_SESSION['userId'] = $user->getIdUsuario();
    $_SESSION['username'] = $user->getUsuario();
    $_SESSION['foto'] = $user->getFoto();
    $_SESSION['userRole'] = $user->getRol();
    $_SESSION['fechaNac'] = $user->getFechaNacimiento();

    $response['error'] = "No error";
} else {
    $response['error'] = "Sartutako datuak ez dira zuzenak";
}

echo json_encode($response);
unset($response);
 