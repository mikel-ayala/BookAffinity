<?php
require_once '../model/usuarioModel.php';
$data = json_decode(file_get_contents("php://input"),true);

$user = new usuarioModel();

$response = array();

if ($user->findUserByUser()) {
    $response['error'] = 'Ya existe ese usuario';
} else if ($user->findUserByMail()) {
    $response['error'] = 'Ya existe ese email';
} else {
    $user->setIdUsuario($data['idUsuario']);
    $user->setNombre($data['nombre']);
    $user->setApellidos($data['apellidos']);
    $user->setUsuario($data['usuario']);
    $user->setEmail($data['email']);
    $user->setContraseina($data['contraseina']);
    $user->setFoto($data['foto']);
    $user->setFechaNacimiento($data['fechaNacimiento']);
    $user->setInstituto($data['instituto']);
    $user->setCurso($data['curso']);
    $user->setAino($data['aino']);
    $user->setTelefono($data['telefono']);
    $user->setGrupo($data['grupo']);
    $user->setRol($data['rol']);
}

//$usuario->contrasenia=password_hash($data['contrasenia'], PASSWORD_DEFAULT);

$response['usuario'] = $data;

echo json_encode($response);