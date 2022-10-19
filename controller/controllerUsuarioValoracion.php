<?php
require_once '../model/usuarioModel.php';

$data = json_decode(file_get_contents("php://input"), true);


$idUsuario = $data['idUsuario'];

$user = new usuarioModel();
$user->setIdUsuario($idUsuario);


$user->findUserById();

$response = array();
$response['usuario'] = $user->getUsuario();
$response['foto'] = $user->getFoto();


echo json_encode($response);
unset($response);