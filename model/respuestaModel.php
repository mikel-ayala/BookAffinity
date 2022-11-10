<?php
include_once ("connectData.php");
include_once ("respuestaClass.php");

class respuestaModel extends respuestaClass {
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

    public function addRespuesta() {
        $this->OpenConnect();
        
        $sql = "INSERT INTO `respuesta`(`respuesta`, `idUsuario`, `idValoracion`) VALUES ('" . $this->getRespuesta() . "', '" . $this->getIdUsuario() . "' ,'" . $this->getIdValoracion() . "')";
        
        $this->link->query($sql);
        if ($this->link->affected_rows > 0) {         
            return true;
        }else{
            echo $this->link->error;
            error_log($this->link->error);
        }
        $this->CloseConnect(); 
        return false;
    }

    public function getRespuestasByIdValoracion() {
        $this->OpenConnect();

        $sql="SELECT * FROM respuesta WHERE `aprobado` = 1 AND `idValoracion` = " . $this->getIdValoracion() . "";
        $result= $this->link->query($sql);
        $respuestas = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $respuesta = new respuestaModel();
            
            $respuesta->setIdRespuesta($row['idRespuesta']);
            $respuesta->setIdUsuario($row['idUsuario']);
            $respuesta->setIdValoracion($this->getIdValoracion());
            $respuesta->setRespuesta($row['respuesta']);
            $respuesta->setAprobado($row['aprobado']);

            array_push($respuestas, get_object_vars($respuesta));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $respuestas;
    }
}