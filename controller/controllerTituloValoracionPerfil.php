<?php

require_once '../model/libroModel.php';
$libro = new libroModel();
$data = json_decode(file_get_contents("php://input"), true);

$libro->setIdLibro($data['idLibro']);

$response = array();
$response['titulo'] = $libro->getTituloById();

echo json_encode($response); 
unset ($libro);