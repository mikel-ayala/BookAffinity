<?php

	
{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        include_once("connectData.php");

        $titulo = $_POST["titulo"];
        $autor = $_POST["autor"];
        $foto = $_POST["foto"];
        $formato = $_POST["formato"];
        $sinopsis = $_POST["sinopsis"];
        $idioma = $_POST["idioma"];

        $añadirlibro = $miPDO->prepare("INSERT INTO libro (titulo, autor, foto,  formato, sinopsis, idioma) VALUES (:titulo, :autor, :foto,  :formato, :sinopsis, :idioma)");
        $añadirlibro->execute(
            array(

                "titulo" => $titulo,
                "autor" => $autor,
                "foto" => $foto,
                "formato" => $formato,
                "sinopsis" => $sinopsis,
                "idioma" => $idioma

            )
        );
    }
}
?>
