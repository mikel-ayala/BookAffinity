<?php 
include_once ("../model/UsuarioModel.php");
$pendientes = new usuarioModel();

$response = array();

$response['pendientes'] = $pendientes->getProfesoresPendientes();

echo json_encode($response);
unset($pendientes);