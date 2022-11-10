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

    function getTituloById(){

        $this->OpenConnect();

        $idLibro = $this->getIdLibro();
        $sql="SELECT titulo FROM libro WHERE idLibro = $idLibro";
        $result= $this->link->query($sql);
        $titulo = '';

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $titulo = $row['titulo'];
        }
        mysqli_free_result($result);

        $this->CloseConnect();
        return $titulo;
    }
    public function addLibro()
    {
        $this->OpenConnect(); 

        $sql="INSERT INTO `libro` (`idUsuario`, `titulo`, `autor`, `foto`, `formato`, `sinopsis`, `idioma`, `aprobado`) VALUES ( '".$this->getIdUsuario()."', '".$this->getTitulo()."', '".$this->getAutor()."', '".$this->getFoto()."', '".$this->getFormato()."', '".$this->getSinopsis()."', '".$this->getIdioma()."','".$this->getAprobado()."');";
        $this->link->query($sql);

        if ($this->link->affected_rows >= 1){
            return true;
        }else{
            return false;
        }
        
        $this->CloseConnect();
    }
    public function findLibrosByIdUsuario() {
        $this->OpenConnect();
        $idUsuario = $this->getIdUsuario();

        $sql="SELECT * FROM libro WHERE idUsuario=$idUsuario AND aprobado=0";
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

            array_push($libros, get_object_vars($libro));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $libros;
    }

    public function setLibroAprobado() {
        $this->OpenConnect();
        
        $sql = "UPDATE libro SET aprobado=1 WHERE idLibro = " . $this->getIdLibro();
        
        $this->link->query($sql);
        if ($this->link->affected_rows > 0) {     
            return true;
        }else{ 
            error_log($this->link->error);
            echo $this->link->error;
        }
        $this->CloseConnect(); 
        return false;
    }

    public function updateMediaLibro() {
        $this->OpenConnect();
        $id = $this->getIdLibro();
        
        $sql = "UPDATE libro SET `valoracion` = (SELECT IFNULL(ROUND(AVG(valoracion), 0), 0) FROM valoracion WHERE idLibro=$id AND aprobado=1), `numeroLectores` = (SELECT COUNT(idLibro) FROM valoracion WHERE idLibro=$id AND aprobado=1), `edadMedia` = (SELECT IFNULL(ROUND(AVG(edad), 0), 0) FROM valoracion WHERE idLibro=$id AND aprobado=1) WHERE idLibro=$id";
        
        $this->link->query($sql);
        if ($this->link->affected_rows > 0) {     
            return true;
        }else{ 
            error_log($this->link->error);
            echo $this->link->error;
        }
        $this->CloseConnect(); 
        return false;
    }

    public function deleteLibro() {
        $this->OpenConnect();
        
        $sql = "DELETE FROM libro WHERE idLibro = " . $this->getIdLibro();
        
        $this->link->query($sql);
        if ($this->link->affected_rows > 0) {     
            return true;
        }else{ 
            error_log($this->link->error);
            echo $this->link->error;
        }
        $this->CloseConnect(); 
        return false;
    }
}