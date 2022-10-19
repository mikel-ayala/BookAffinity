<?php

include_once ("../model/libroModel.php");
$autores = new libroModel();

$response = array();

$response['autores'] = $autores->getAutores();

echo json_encode($response); 
unset ($autores);