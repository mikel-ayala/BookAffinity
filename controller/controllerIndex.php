<?php

include_once ("../model/libroModel.php");
$libros = new libroModel();

$response = array();

$response['libros'] = $libros->getLibrosAprobados();

echo json_encode($response); 
unset ($libros);