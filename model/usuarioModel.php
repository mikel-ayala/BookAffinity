<?php
include_once ("usuarioClass.php");
include_once ("connectData.php");

class usuarioModel extends usuarioClass{
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

    public function findUser(){
        $this->OpenConnect();
        $username=$this->getUsuario();

        $sql="SELECT * FROM usuario WHERE usuario='$username'";
        $valor=false;

        $result= $this->link->query($sql);
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){         
            $this->setIdUsuario($row['idUsuario']);
            $this->setFoto($row['foto']);
            $this->setRol($row['rol']);
            $passwordEncripted=$row['contraseina'];
            if (password_verify($this->getContraseina(), $passwordEncripted)){
                $valor=true;
            }
        }
        $this->CloseConnect(); 
        return $valor;
    }
}