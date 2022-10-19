<?php
include_once ("usuarioClass.php");
include_once ("connectData.php");

class usuarioModel extends usuarioClass {
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

    public function findUser() {
        $this->OpenConnect();
        $username = $this->getUsuario();

        $sql = "SELECT * FROM usuario WHERE usuario='$username'";
        $valor = false;

        $result = $this->link->query($sql);
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {         
            $this->setIdUsuario($row['idUsuario']);
            $this->setFoto($row['foto']);
            $this->setRol($row['rol']);
            $passwordEncripted = $row['contraseina'];
            if (password_verify($this->getContraseina(), $passwordEncripted)){
                $valor = true;
            }
        }
        $this->CloseConnect(); 
        return $valor;
    }

    public function findUserById() {
        $this->OpenConnect();
        $idUser = $this->getIdUsuario();

        $sql = "SELECT * FROM usuario WHERE `idUsuario`=$idUser";
        
        $result= $this->link->query($sql);
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {         
            $this->setUsuario($row['usuario']);
            $this->setFoto($row['foto']);
        }
        $this->CloseConnect();
    }

    public function findUserByUser() {
        $this->OpenConnect();
        $username = $this->getEmail();

        $sql = "SELECT * FROM usuario WHERE usuario='$username'";
        $valor = false;

        $result= $this->link->query($sql);
        if (mysqli_fetch_array($result, MYSQLI_ASSOC)) {         
            $valor = true;
        }
        $this->CloseConnect(); 
        return $valor;
    }

    public function findUserByMail() {
        $this->OpenConnect();
        $email = $this->getEmail();

        $sql = "SELECT * FROM usuario WHERE email='$email'";
        $valor = false;

        $result= $this->link->query($sql);
        if (mysqli_fetch_array($result, MYSQLI_ASSOC)) {         
            $valor = true;
        }
        $this->CloseConnect(); 
        return $valor;
    }

    public function addUser() {
        $this->OpenConnect();
    }
}