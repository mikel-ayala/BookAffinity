<?php
require_once '../model/respuestaModel.php';

$data = json_decode(file_get_contents("php://input"), true);

$respuesta = new respuestaModel();

session_start();
$respuesta->setIdUsuario($_SESSION['userId']);
$respuesta->setRespuesta($data['respuesta']);
$respuesta->setIdValoracion($data['idValoracion']);


$response = array();

if(!$respuesta->addRespuesta())
    $response['error'] = 1;


echo json_encode($response);
unset($response);