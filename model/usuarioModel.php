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
            $this->setFechaNacimiento($row['fechaNacimiento']);
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
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { 
            $this->setIdUsuario($row['idUsuario']);        
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
        
        $sql = "INSERT INTO `usuario`(`nombre`, `apellidos`, `usuario`, `email`, `contraseina`, `foto`, `fechaNacimiento`, `instituto`, `curso`, `aino`, `telefono`, `grupo`, `rol`) VALUES ('" . $this->getNombre() . "','" . $this->getApellidos() . "','" . $this->getUsuario() . "','" . $this->getEmail() . "','" . $this->getContraseina() . "','" . $this->getFoto() . "','" . $this->getFechaNacimiento() . "','" . $this->getInstituto() . "','" . $this->getCurso() . "','" . $this->getAino() . "','" . $this->getTelefono() . "','" . $this->getGrupo() . "','" . $this->getRol() . "')";
        
        $this->link->query($sql);
        if ($this->link->affected_rows > 0) {         
            return true;
        }else{
            echo $this->link->error;
        }
        $this->CloseConnect(); 
        return false;
    }

    public function editUser() {
        $this->OpenConnect();
        
        $sql = "UPDATE usuario SET usuario = '" . $this->getUsuario() . "', email = '" . $this->getEmail() . "', telefono = '" . $this->getTelefono() . "' WHERE idUsuario = " . $this->getIdUsuario();
        
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

    public function getUser() {
        $this->OpenConnect();
        $id = $this->getIdUsuario();

        $valor = false;
        
        $sql = "SELECT * FROM usuario WHERE idUsuario='$id'";
        
        $result= $this->link->query($sql);
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {         
            $this->setUsuario($row['usuario']);
            $this->setNombre($row['nombre']);
            $this->setApellidos($row['apellidos']);
            $this->setEmail($row['email']);
            $this->setFechaNacimiento($row['fechaNacimiento']);
            $this->setTelefono($row['telefono']);
            $this->setInstituto($row['instituto']);
            $this->setCurso($row['curso']);
            $this->setGrupo($row['grupo']);
        }

        $result= $this->link->query($sql);
        $this->CloseConnect();
    }
}