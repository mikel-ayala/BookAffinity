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
            $this->setGrupo($row['grupo']);
            $this->setRol($row['rol']);
            $this->setFechaNacimiento($row['fechaNacimiento']);
            $this->setAprobado($row['aprobado']);
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
        $username = $this->getUsuario();

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
        
    public function getAlumnosPendientes() {
        $this->OpenConnect();
        $grupos = $this->getGrupo();
        $grupo = str_replace(", ", "','", $grupos);

        $sql = "SELECT * FROM usuario WHERE grupo IN ('$grupo') AND aprobado=0";
        $result= $this->link->query($sql);

        $pendientes = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $usuario = new usuarioModel();
            
            $usuario->setIdUsuario($row['idUsuario']);
            $usuario->setNombre($row['nombre']);
            $usuario->setApellidos($row['apellidos']);
            $usuario->setUsuario($row['usuario']);
            $usuario->setFechaNacimiento($row['fechaNacimiento']);
            $usuario->setEmail($row['email']);
            $usuario->setTelefono($row['telefono']);
            $usuario->setInstituto($row['instituto']);
            $usuario->setCurso($row['curso']);
            $usuario->setAino($row['aino']);
            $usuario->setFoto($row['foto']);
            $usuario->setGrupo($row['grupo']);

            array_push($pendientes, get_object_vars($usuario));
        }
        
        $this->CloseConnect(); 
        return $pendientes;
    }

    public function getProfesoresPendientes() {
        $this->OpenConnect();

        $sql = "SELECT * FROM usuario WHERE rol='profesor' AND aprobado=0";
        $result= $this->link->query($sql);

        $pendientes = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $usuario = new usuarioModel();
            
            $usuario->setIdUsuario($row['idUsuario']);
            $usuario->setNombre($row['nombre']);
            $usuario->setApellidos($row['apellidos']);
            $usuario->setUsuario($row['usuario']);
            $usuario->setFechaNacimiento($row['fechaNacimiento']);
            $usuario->setEmail($row['email']);
            $usuario->setTelefono($row['telefono']);
            $usuario->setInstituto($row['instituto']);
            $usuario->setCurso($row['curso']);
            $usuario->setAino($row['aino']);
            $usuario->setFoto($row['foto']);
            $usuario->setGrupo($row['grupo']);

            array_push($pendientes, get_object_vars($usuario));
        }
        
        $this->CloseConnect(); 
        return $pendientes;
    }

    public function getProfesores() {
        $this->OpenConnect();

        $sql = "SELECT * FROM usuario WHERE rol='profesor'";
        $result= $this->link->query($sql);

        $profesores = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $usuario = new usuarioModel();
            
            $usuario->setIdUsuario($row['idUsuario']);
            $usuario->setNombre($row['nombre']);
            $usuario->setApellidos($row['apellidos']);
            $usuario->setUsuario($row['usuario']);
            $usuario->setFechaNacimiento($row['fechaNacimiento']);
            $usuario->setEmail($row['email']);
            $usuario->setTelefono($row['telefono']);
            $usuario->setInstituto($row['instituto']);
            $usuario->setCurso($row['curso']);
            $usuario->setAino($row['aino']);
            $usuario->setFoto($row['foto']);
            $usuario->setGrupo($row['grupo']);

            array_push($profesores, get_object_vars($usuario));
        }
        
        $this->CloseConnect(); 
        return $profesores;
    }

    public function findUsersByGroup() {
        $this->OpenConnect();
        $grupo = $this->getGrupo();

        $sql = "SELECT * FROM usuario WHERE grupo='$grupo' AND aprobado=1";
        $result= $this->link->query($sql);

        $usuarios = array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $usuario = new usuarioModel();
            
            $usuario->setIdUsuario($row['idUsuario']);
            $usuario->setNombre($row['nombre']);
            $usuario->setApellidos($row['apellidos']);
            $usuario->setUsuario($row['usuario']);
            $usuario->setFechaNacimiento($row['fechaNacimiento']);
            $usuario->setEmail($row['email']);
            $usuario->setTelefono($row['telefono']);
            $usuario->setInstituto($row['instituto']);
            $usuario->setCurso($row['curso']);
            $usuario->setAino($row['aino']);
            $usuario->setFoto($row['foto']);
            $usuario->setGrupo($row['grupo']);

            array_push($usuarios, get_object_vars($usuario));
        }
        
        $this->CloseConnect(); 
        return $usuarios;
    }

    public function addGrupo() {
        $this->OpenConnect();
        $idUsuario = $this->getIdUsuario();
        $grupo = $this->getGrupo();
        $sql = "UPDATE usuario SET grupo='$grupo' WHERE idUsuario=$idUsuario";
        
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

    public function setUsuarioAprobado() {
        $this->OpenConnect();
        $idUsuario = $this->getIdUsuario();

        $sql = "UPDATE usuario SET aprobado=1 WHERE idUsuario=$idUsuario";
        
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

    public function deleteUsuario() {
        $this->OpenConnect();
        $idUsuario = $this->getIdUsuario();

        $sql = "DELETE FROM usuario WHERE idUsuario=$idUsuario";
        
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