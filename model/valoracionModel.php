<?php
include_once ("connectData.php");
include_once ("valoracionClass.php");

class valoracionModel extends valoracionClass {
    private $link;

    public function OpenConnect(){
        $cd= new connectData();
        
        try{
            $this->link=new mysqli($cd->host,$cd->userbbdd,$cd->passbbdd,$cd->ddbbname);
        }catch(Exception $e){
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }

    public function closeConnect(){
        mysqli_close($this->link);
    }

    public function getValoraciones() { 
        $this->OpenConnect();
        $idLibro=$this->getIdLibro();
        $sql="SELECT * FROM valoracion WHERE `idLibro` = $idLibro AND `aprobado` = 1";
        $result= $this->link->query($sql);
        $valoracion = new valoracionModel();
        $valoraciones = array();
    
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            
            $valoracion->setIdValoracion($row['idValoracion']);
            $valoracion->setIdUsuario($row['idUsuario']);
            $valoracion->setIdLibro($row['idLibro']);
            $valoracion->setValoracion($row['valoracion']);
            $valoracion->setComentario($row['comentario']);
            $valoracion->setIdioma($row['idioma']);
            $valoracion->setEdad($row['edad']);
            $valoracion->setAprobado($row['aprobado']);

            array_push($valoraciones, get_object_vars($valoracion));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $valoraciones;
    }

    public function getValoracionFromUserId() {
        $this->OpenConnect();
        $userId=$this->getIdUsuario();
        $sql="SELECT * FROM valoracion WHERE idUsuario = $userId AND aprobado = 1";
        $result= $this->link->query($sql);
        $valoracion = new valoracionModel();
        $valoraciones = array();
    
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $valoracion->setIdValoracion($row['idValoracion']);
            $valoracion->setIdUsuario($row['idUsuario']);
            $valoracion->setIdLibro($row['idLibro']);
            $valoracion->setValoracion($row['valoracion']);
            $valoracion->setComentario($row['comentario']);
            $valoracion->setIdioma($row['idioma']);
            $valoracion->setEdad($row['edad']);
            $valoracion->setAprobado($row['aprobado']);
            $valoracion->setTituloSolicitado($row['tituloSolicitado']);

            array_push($valoraciones, get_object_vars($valoracion));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $valoraciones;
    }
        
        
    public function findValoracionesByIdUsuario() { 
        $this->OpenConnect();
        $idUsuario=$this->getIdUsuario();

        $sql="SELECT * FROM valoracion WHERE idUsuario=$idUsuario AND aprobado=0";
        $result= $this->link->query($sql);
        $valoraciones = array();
    
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $valoracion = new valoracionModel();
            $valoracion->setIdValoracion($row['idValoracion']);
            $valoracion->setIdUsuario($row['idUsuario']);
            $valoracion->setIdLibro($row['idLibro']);
            $valoracion->setValoracion($row['valoracion']);
            $valoracion->setComentario($row['comentario']);
            $valoracion->setIdioma($row['idioma']);
            $valoracion->setEdad($row['edad']);
            $valoracion->setAprobado($row['aprobado']);
            $valoracion->setTituloSolicitado($row['tituloSolicitado']);

            array_push($valoraciones, get_object_vars($valoracion));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $valoraciones;
    }
    
    public function createValoracion(){
        $this->OpenConnect();

        $sql = '';
        if($this->getTituloSolicitado() != '')
            $sql = "INSERT INTO `valoracion`(`idUsuario`, `idLibro`, `valoracion`, `comentario`, `idioma`, `edad`, `tituloSolicitado`, `aprobado`) VALUES ('" . $this->getIdUsuario() . "','" . $this->getIdLibro() . "','" . $this->getValoracion() . "','" . $this->getComentario() . "','" . $this->getIdioma() . "','" . $this->getEdad() . "','" . $this->getTituloSolicitado() . "','" . $this->getAprobado() . "')";
        else
            $sql = "INSERT INTO `valoracion`(`idUsuario`, `idLibro`, `valoracion`, `comentario`, `idioma`, `edad`, `aprobado`) VALUES ('" . $this->getIdUsuario() . "','" . $this->getIdLibro() . "','" . $this->getValoracion() . "','" . $this->getComentario() . "','" . $this->getIdioma() . "','" . $this->getEdad() . "','" . $this->getAprobado() . "')";
        $this->link->query($sql);
        if ($this->link->affected_rows > 0) {         
            return true;
        }else{
            echo $this->link->error;
        }
        $this->CloseConnect(); 
        return false;
    }

    public function setValoracionAprobado() {
        $this->OpenConnect();
        
        $sql = "UPDATE valoracion SET aprobado=1 WHERE idValoracion = " . $this->getIdValoracion();
        
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

    public function deleteValoracion() {
        $this->OpenConnect();
        
        $sql = "DELETE FROM valoracion WHERE idValoracion = " . $this->getIdValoracion();
        
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