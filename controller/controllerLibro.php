<?php

$libro = json_decode($_COOKIE['libro'], true);

$response = array();
$response['libroSeleccionado'] = $libro;

echo json_encode($response);
unset($response);