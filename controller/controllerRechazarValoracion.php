<?php

include_once ("../model/ValoracionModel.php");
$data = json_decode(file_get_contents("php://input"), true);
$aceptado = new valoracionModel();

$response = array();

$response['error'] = true;

if ($data['idValoracion'] != null) {
    $aceptado->setIdValoracion($data['idValoracion']);
    if ($aceptado->deleteValoracion()) {
        $response['error'] = false;    
    }
}

echo json_encode($response);
unset($aceptado);