<?php
require_once '../model/respuestaModel.php';

$data = json_decode(file_get_contents("php://input"), true);

$respuesta = new respuestaModel();

$respuesta->setIdValoracion($data['idValoracion']);

$response = array();
$response['respuestas'] = $respuesta->getRespuestasByIdValoracion();

echo json_encode($response);
unset($response);