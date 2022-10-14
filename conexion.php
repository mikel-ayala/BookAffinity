<?php
    $hostDB = '127.0.0.1';
    $nombreDB = 'cjl';
    $usuarioDB = 'root';
    $constrasenyaDB = '';

    $hostPDO = "mysql:host=$hostDB;dbname=$nombreDB;";
    $miPDO = new PDO($hostPDO, $usuarioDB);
?>