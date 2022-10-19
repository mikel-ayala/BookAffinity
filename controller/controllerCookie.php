<?php

$data = json_decode(file_get_contents("php://input"), true);

$libro = $data['libro'];
setcookie('libro', json_encode($libro), time() + 3600);

echo "saved cookies ";

