<html>
    <head>
    </head>
    <body>
        <?php
$hostDB = '127.0.0.1';
$nombreDB = 'cjl';
$usuarioDB = 'root';

$hostPDO = "mysql:host=$hostDB;dbname=$nombreDB;";
$miPDO = new PDO($hostPDO, $usuarioDB);
        ?>
    </body>
</html>