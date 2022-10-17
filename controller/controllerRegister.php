<?php
require_once '../model/usuarioModel.php';

$data=json_decode(file_get_contents("php://input"),true);
$response=array();
$usuario = new usuarioModel();

$usuario->contrasenia=password_hash($data['contrasenia'], PASSWORD_DEFAULT);

$response['usuario']=$usuario;

echo json_encode($response);