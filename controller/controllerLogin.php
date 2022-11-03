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
    if ($user->getAprobado() == 1) {
        session_start();
        $_SESSION['userId'] = $user->getIdUsuario();
        $_SESSION['username'] = $user->getUsuario();
        $_SESSION['foto'] = $user->getFoto();
        $_SESSION['grupo'] = $user->getGrupo();
        $_SESSION['userRole'] = $user->getRol();
    } else {
        $response['error'] = "0";
    }
    $response['error'] = "1";
} else {
    $response['error'] = "2";
}

echo json_encode($response);
unset($response);
 