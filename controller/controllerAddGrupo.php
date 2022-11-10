<?php

include_once ("../model/UsuarioModel.php");
$data = json_decode(file_get_contents("php://input"), true);
$usuario = new usuarioModel();

$response = array();
session_start();

$response['error'] = true;

if ($data['grupo'] != null) {
    $usuario->setIdUsuario($_SESSION['userId']);
    $usuario->setGrupo($_SESSION['grupo'] . ', ' . $data['grupo']);
    $_SESSION['grupo'] = $usuario->getGrupo();
    if ($usuario->addGrupo()) {
        $response['error'] = false;    
    }
}

echo json_encode($response);
unset($usuario);