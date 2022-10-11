<html>
    <head>
        
    </head>

    <body>
        <?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include_once("iniciarbd.php");
    function login(){
    $user = ["usuario"];
    $pass = ["pasahitza"];
    $consultaLogin = $miPDO->prepare("SELECT id_usuario FROM usuarios WHERE   ");
    $consultaLogin -> execute();
    }

    function register(){

    }
}
        
        ?>
        <form action="loginRegistro.php" method="post">
            <p>Erabiltzailea:<input type="text" name="usuario"></p>
            <br>
            <p>Pasahitza: <input type="text" name="pasahitza"></p>
            <br>
            <input type="submit" name="login" value="Saioa Hasi" onsubmit="login()">
            <input type="submit" name="registro" value="Erregistratu" onsubmit="registro()">
        </form>
    </body>
</html>