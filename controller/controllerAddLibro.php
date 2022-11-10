<?php 
include_once ("../model/LibroModel.php");

$data = json_decode(file_get_contents("php://input"),true);
session_start();

$savedFileBase64Book=$data['savedFileBase64Book'];
$fileBase64 = explode(',', $savedFileBase64Book)[1];
$file = base64_decode($fileBase64);

$libro = new libroModel();

$libro->setIdUsuario($_SESSION['userId']);
$libro->setTitulo($data['titulo']);
$libro->setAutor($data['autor']);
$libro->setFormato($data['formato']);
$libro->setSinopsis($data['sinopsis']);
$libro->setFoto($data['foto']);
$libro->setIdioma($data['idioma']);

$_SESSION['userRole']=="alumno"?$libro->setAprobado(0):$libro->setAprobado(1);

$writable_dir = '../view/content/portadas/';

if(!is_dir($writable_dir)){mkdir($writable_dir);}
file_put_contents($writable_dir.$libro->getFoto(), $file,  LOCK_EX);

$response = array();
$response['error'] = true;

if ($libro->addLibro()) {
    $response['error'] = false;
}

echo json_encode($response);
unset($libro);