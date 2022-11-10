<?php 

include_once ("../model/LibroModel.php");
$data = json_decode(file_get_contents("php://input"), true);

session_start();

$idUsuario = $_SESSION['userId'];
$titulo = $data['libro']['titulo'];
$autor = $data['libro']['autor'];
$formato = $data['libro']['formato'];
$sinopsis = $data['libro']['sinopsis'];
$foto = $data['libro']['foto'];
$idioma = $data['libro']['idioma'];

$libro = new libroModel();

$libro->setIdUsuario($idUsuario);
$libro->setTitulo($titulo);
$libro->setAutor($autor);
$libro->setFormato($formato);
$libro->setSinopsis($sinopsis);
$libro->setFoto($foto);
$libro->setIdioma($idioma);

$response = array();

$response['error'] = true;

if ($libro->addLibro()) {
    $response['error'] = false;
}

echo json_encode($response);
unset($libro);