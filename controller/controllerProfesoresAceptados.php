<?php 
include_once ("../model/UsuarioModel.php");
$profesores = new usuarioModel();

$response = array();

$response['profesores'] = $profesores->getProfesores();

echo json_encode($response);
unset($profesores);