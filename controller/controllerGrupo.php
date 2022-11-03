<?php 
include_once ("../model/UsuarioModel.php");
$data = json_decode(file_get_contents("php://input"), true);

$usuarios = new usuarioModel();

session_start();

$response = array();

if ($data['grupo'] != null) {
    $usuarios->setGrupo($data['grupo']);
    $response['usuarios'] = $usuarios->findUsersByGroup();
    $response['error'] = false;
} else {
    $response['error'] = true;
}

echo json_encode($response);
unset($usuarios);