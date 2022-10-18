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

}