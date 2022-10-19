<?php

require_once '../model/valoracionModel.php';
$valoraciones = new valoracionModel();

$libro = json_decode($_COOKIE['libro'], true);

$response = array();
$valoraciones->setIdLibro($libro['idLibro']);

$response['valoraciones'] = $valoraciones->getValoraciones();

echo json_encode($response); 
unset ($valoraciones);