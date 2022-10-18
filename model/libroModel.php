<?php
include_once ("connectData.php");
include_once ("libroClass.php");

class libroModel extends libroClass {
    private $link;

    public function OpenConnect() {
        $cd= new connectData();
        
        try{
            $this->link=new mysqli($cd->host,$cd->userbbdd,$cd->passbbdd,$cd->ddbbname);
        }catch(Exception $e){
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }

    public function closeConnect() {
        mysqli_close($this->link);
    }

    public function getLibrosAprobados() {
        $this->OpenConnect();

        $sql="SELECT * FROM libro WHERE `aprobado` = 1";
        $result= $this->link->query($sql);
        $libros = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $libro = new libroModel();
            
            $libro->setIdLibro($row['idLibro']);
            $libro->setTitulo($row['titulo']);
            $libro->setAutor($row['autor']);
            $libro->setFoto($row['foto']);
            $libro->setFormato($row['formato']);
            $libro->setSinopsis($row['sinopsis']);
            $libro->setIdioma($row['idioma']);
            $libro->setTituloIdiomas($row['tituloIdiomas']);
            $libro->setValoracion($row['valoracion']);
            $libro->setNumeroLectores($row['numeroLectores']);
            $libro->setEdadMedia($row['edadMedia']);
            $libro->setAprobado($row['aprobado']);

            array_push($libros, get_object_vars($libro));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $libros;
    }

    public function getAutores() {
        $this->OpenConnect();

        $sql="SELECT DISTINCT `autor` FROM libro";
        $result= $this->link->query($sql);
        $autores = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            array_push($autores, $row['autor']);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $autores;
    }

}