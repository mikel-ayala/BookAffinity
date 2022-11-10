<?php 
include_once ("../model/UsuarioModel.php");
$pendientes = new usuarioModel();

session_start();

$response = array();

if (isset($_SESSION['grupo'])) {
    $pendientes->setGrupo($_SESSION['grupo']);
    $response['pendientes'] = $pendientes->getAlumnosPendientes();
    $response['error'] = false;
} else {
    $response['error'] = true;
}

echo json_encode($response);
unset($pendientes);