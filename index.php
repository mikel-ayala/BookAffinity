<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/generalStyles.css">
    <link rel="stylesheet" type="text/css" href="css/header.css">
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="stylesheet" type="text/css" href="css/footer.css">
    <title>Liburuak | JLCLUB</title>
</head>
<body>
    <?php include './html/header.html'; ?>
    <div id="containerListaFiltro">
        <aside id="filtroLibros">

        </aside>
        <section id="listaLibros">
            <?php
                include 'conexion.php';
                $libros = $miPDO->prepare('SELECT * FROM libros WHERE `aprobado` = 1');
                $libros->execute();

                $listaL = $libros->fetchAll();
            ?>

            <script>

                let libros = [];
                libros = <?php echo json_encode($listaL); ?>;
                let containerLibros = document.getElementById('listaLibros');
                let htmlList = "";
                let estrellas = "";
                
                for (let i = 0; i < libros.length; i++) {

                    switch (libros[i]["valoracion"]) {
                        case 1:
                            estrellas = '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
                            break;
                        case 2:
                            estrellas = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
                            break;
                        case 3:
                            estrellas = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
                            break;
                        case 4:
                            estrellas = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>';
                            break;
                        case 5:
                            estrellas = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>';
                            break;
                        default:
                            estrellas = '<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>';
                            break;
                    };

                    htmlList += '<article class="libro">' +
                        '<img src="' + libros[i]["foto"] + '" alt="">' +
                        '<div class="infoLibro">' + 
                            '<h2>' + libros[i]["titulo"] + '</h2>' +
                            '<b>' + libros[i]["autor"] + '</b>' + 
                            '<p>' + libros[i]["formato"].toUpperCase() + '</p>' +
                            '<div class="estrellas">' 
                                + estrellas +
                                '<p>(' + libros[i]["numero_de_lectores"] + ')</p>' +
                            '</div>' + 
                        '</div>' +
                    '</article>';
                };

                containerLibros.innerHTML = htmlList;

            </script>
        </section>
    </div>
    <!-- <?php include('html/footer.html');?> -->
    <script src="js/index.js"></script>
</body>

</html>