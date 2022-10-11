<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/index.css">
    <title>LIBURUAK</title>
</head>

<body>
    <header><?php include './html/header.html'; ?></header>
    <div class="listaLibros">
        <div class="filtro">
            <form class="buscarAutor">
                <label>Autorea:</label><br>
                <input type="text" name="buscarAut" id="buscarAut">
            </form>
            <hr>
            <form class="buscarEstrellas">
                <p class="clasificacion">
                    <!--
                    --><input id="radio1" type="radio" name="estrellas" value="5">
                    <!--
                    --><label for="radio1">★</label>
                    <!--
                    --><input id="radio2" type="radio" name="estrellas" value="4">
                    <!--
                    --><label for="radio2">★</label>
                    <!--
                    --><input id="radio3" type="radio" name="estrellas" value="3">
                    <!--
                    --><label for="radio3">★</label>
                    <!--
                    --><input id="radio4" type="radio" name="estrellas" value="2">
                    <!--
                    --><label for="radio4">★</label>
                    <!--
                    --><input id="radio5" type="radio" name="estrellas" value="1">
                    <!--
                    --><label for="radio5">★</label>
                </p>
            </form>
            <hr>
            <form class="buscarEdad">
                <label>Adina:</label><br>
                <input type="text" name="buscarEdadMin" id="buscarEdadMin">
                <label>tik</label>
                <input type="text" name="buscarEdadMax" id="buscarEdadMax">
                <label>era</label>
            </form>
            <hr>
            <form class="buscarGenero">
                <label>Generoa:</label><br>
                <input type="checkbox" name="buscarGen" id="buscarGen">
                <label>Comedia</label><br>
                <input type="checkbox" name="buscarGen" id="buscarGen">
                <label>Accion</label><br>
            </form>
            <hr>
            <form class="buscarFormato">
                <label>Formatua:</label><br>
                <input type="checkbox" name="buscarForm" id="buscarForm">
                <label>Manga</label><br>
                <input type="checkbox" name="buscarForm" id="buscarForm">
                <label>Libro</label><br>
            </form>
        </div>
        <div class="libros">
            <table>
                <?php
                include 'conexion.php';
                $liburuak = $miPDO->prepare('SELECT * FROM liburuak');
                $liburuak->execute();

                $contLibros = 0;
                foreach($liburuak as $clave => $valor){
                    $contLibros++;
                    if($contLibros % 4 == 1)
                        echo("<tr>");
                ?>
                <td>
                    <div class="card">
                        <img src="./img/<?= $valor["portada"] ?>">
                        <div class="container">
                            <h4><b><?= $valor["titulua"]?></b></h4>
                            <p><?= $valor["autorea"] ?></p>
                        </div>
                    </div>
                </td>
                <?php
                    if($contLibros % 4 == 0)
                        echo("</tr>");
                }
                if($contLibros % 4 != 0)
                        echo("</tr>");
                ?>  
            </table>
        </div>
    </div>
</body>

</html>