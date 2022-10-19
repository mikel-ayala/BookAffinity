<?php
require_once '../model/usuarioModel.php';
$data = json_decode(file_get_contents("php://input"),true);

$user = new usuarioModel();
$contraseina=password_hash($data['contraseina'], PASSWORD_DEFAULT);
$user->setNombre($data['nombre']);
$user->setApellidos($data['apellidos']);
$user->setUsuario($data['usuario']);
$user->setEmail($data['email']);
$user->setContraseina($contraseina);
$user->setFoto($data['foto']);
$user->setFechaNacimiento($data['fechaNacimiento']);
$user->setInstituto($data['instituto']);
$user->setCurso($data['curso']);
$user->setAino($data['aino']);
$user->setTelefono($data['telefono']);
$user->setGrupo($data['grupo']);
$user->setRol($data['rol']);

$response = array();

$response['error'] = 0;

if ($user->findUserByUser()) {
    $response['error'] = 1;
} else if ($user->findUserByMail()) {
    $response['error'] = 2;
} else {

    if ($user->addUser()) {
        session_start();

        $user->findUser();
        $_SESSION['userId'] = $user->getIdUsuario();
        $_SESSION['username'] = $user->getUsuario();
        $_SESSION['foto'] = $user->getFoto();
        $_SESSION['userRole'] = $user->getRol();
    
        $response['error'] = 3;
    } else {
        $response['error'] = 4;
    }
}

echo json_encode($response);
unset($response);