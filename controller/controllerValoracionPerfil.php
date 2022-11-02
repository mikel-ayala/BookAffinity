<?php

require_once '../model/valoracionModel.php';
$valoraciones = new valoracionModel();
session_start();

$response = array();
$valoraciones->setIdUsuario($_SESSION['userId']);

$response['valoraciones'] = $valoraciones->getValoracionFromUserId();

echo json_encode($response); 
unset ($valoraciones);