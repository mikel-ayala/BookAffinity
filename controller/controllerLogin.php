<?php
include_once '../model/usuarioModel.php';

$data=json_decode(file_get_contents("php://input"),true);

$usuario=$data['usuario'];
$contraseina=$data['contraseina'];
//password_hash($data['contraseina'], PASSWORD_DEFAULT);

$user = new usuarioModel();
$user->setUsuario($usuario);
$user->setContraseina($contraseina);
 
if ($usuario!=null) {
    $existe = $user->findUser();

    if ($existe) {
        session_start();
        $_SESSION['userId']=$user->getIdUsuario();
        $_SESSION['username']=$user->getUsuario();
        $_SESSION['userRole']=$user->getRol();
        $response['error']="No error";
    } else {
        $response['error']="No es correcto";
    }

}else {
    $response['error']="Introduce todos los datos";
}

echo json_encode($response);
unset($response);
 