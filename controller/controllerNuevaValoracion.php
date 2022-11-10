<?php
require_once '../model/valoracionModel.php';
$data = json_decode(file_get_contents("php://input"), true);
$libro = json_decode($_COOKIE['libro'], true);

session_start();
$edad = $data['edad'];
$userId = $_SESSION['userId'];
$valoracion = $data['valoracion'];
$idioma = $data['idioma'];
$comentario = $data['comentario'];
$libroId = $libro['idLibro'];
$tituloAlt = $data['tituloAlt'];


$valoracionNueva = new valoracionModel();
$valoracionNueva->setEdad($edad);
$valoracionNueva->setIdUsuario($userId);
$valoracionNueva->setValoracion($valoracion);
$valoracionNueva->setIdioma($idioma);
$valoracionNueva->setComentario($comentario);
$valoracionNueva->setIdLibro($libroId);
$valoracionNueva->setTituloSolicitado($tituloAlt);

$_SESSION['userRole']=="alumno"?$valoracionNueva->setAprobado(0):$valoracionNueva->setAprobado(1);

$response = array();
$response['error'] = 0;
if(!$valoracionNueva->createValoracion())
    $response['error'] = 1;

echo json_encode($response);
unset($response);
 