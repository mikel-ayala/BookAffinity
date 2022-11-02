<?php 
include_once ("../model/LibroModel.php");
include_once ("../model/ValoracionModel.php");

$data = json_decode(file_get_contents("php://input"), true);

$libros = new libroModel();
$valoraciones = new valoracionModel();

$response = array();

if ($data['idUsuario'] != null) {
    $libros->setIdUsuario($data['idUsuario']);
    $valoraciones->setIdUsuario($data['idUsuario']);
    $response['libros'] = $libros->findLibrosByIdUsuario();
    $response['valoraciones'] = $valoraciones->findValoracionesByIdUsuario();
    $response['error'] = false;
} else {
    $response['error'] = true;
}

echo json_encode($response);
unset($usuarios);