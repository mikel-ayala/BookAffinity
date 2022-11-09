<?php

include_once ("../model/LibroModel.php");
$data = json_decode(file_get_contents("php://input"), true);
$aceptado = new libroModel();

$response = array();

$response['error'] = true;

if ($data['idLibro'] != null) {
    $aceptado->setIdLibro($data['idLibro']);
    if ($aceptado->deleteLibro()) {
        $response['error'] = false;    
    }
}

echo json_encode($response);
unset($aceptado);