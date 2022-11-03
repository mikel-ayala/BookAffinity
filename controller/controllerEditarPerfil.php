<?php
require_once '../model/usuarioModel.php';
$data = json_decode(file_get_contents("php://input"), true);

session_start();
$usuario = new usuarioModel;

$usuario->setIdUsuario($_SESSION['userId']);
$usuario->setUsuario($data['usuario']);
$usuario->setEmail($data['email']);
$usuario->setTelefono($data['telefono']);

error_log($data['telefono']);

$response = array();
$response['error'] = 0;
if(!$usuario->editUser())
    $response['error'] = 1;

echo json_encode($response);
unset($response);
 