<?php

include_once ("../model/UsuarioModel.php");
$data = json_decode(file_get_contents("php://input"), true);
$aceptado = new usuarioModel();

$response = array();

$response['error'] = true;

if ($data['idUsuario'] != null) {
    $aceptado->setIdUsuario($data['idUsuario']);
    if ($aceptado->deleteUsuario()) {
        $response['error'] = false;    
    }
}

echo json_encode($response);
unset($aceptado);