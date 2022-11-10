<?php

include_once ("../model/ValoracionModel.php");
include_once ("../model/LibroModel.php");
$data = json_decode(file_get_contents("php://input"), true);
$aceptado = new valoracionModel();
$libro = new libroModel();

$response = array();

$response['error'] = true;

if ($data['idValoracion'] != null && $data['idLibro'] != null) {
    $aceptado->setIdValoracion($data['idValoracion']);
    $libro->setIdLibro($data['idLibro']);
    if ($aceptado->setValoracionAprobado() && $libro->updateMediaLibro()) {
        $response['error'] = false;    
    }
}

echo json_encode($response);
unset($aceptado);
unset($libro);