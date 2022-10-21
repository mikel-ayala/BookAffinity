<?php

class usuarioClass {
    protected $idUsuario;
    protected $nombre;
    protected $apellidos;
    protected $usuario;
    protected $email;
    protected $contraseina;
    protected $foto;
    protected $fechaNacimiento;
    protected $instituto;
    protected $curso;
    protected $aino;
    protected $telefono;
    protected $grupo;
    protected $rol;
    protected $aprobado;

    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getApellidos() {
        return $this->apellidos;
    }
    
    public function setApellidos($apellidos) {
        $this->apellidos = $apellidos;
    }

    public function getUsuario() {
        return $this->usuario;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getContraseina() {
        return $this->contraseina;
    }

    public function setContraseina($contraseina) {
        $this->contraseina = $contraseina;
    }

    public function getFoto() {
        return $this->foto;
    }

    public function setFoto($foto) {
        $this->foto = $foto;
    }

    public function getFechaNacimiento() {
        return $this->fechaNacimiento;
    }

    public function setFechaNacimiento($fechaNacimiento) {
        $this->fechaNacimiento = $fechaNacimiento;
    }

    public function getInstituto() {
        return $this->instituto;
    }

    public function setInstituto($instituto) {
        $this->instituto = $instituto;
    }

    public function getCurso() {
        return $this->curso;
    }

    public function setCurso($curso) {
        $this->curso = $curso;
    }

    public function getAino() {
        return $this->aino;
    }

    public function setAino($aino) {
        $this->aino = $aino;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function getGrupo() {
        return $this->grupo;
    }

    public function setGrupo($grupo) {
        $this->grupo = $grupo;
    }

    public function getRol() {
        return $this->rol;
    }

    public function setRol($rol) {
        $this->rol = $rol;
    }

    public function getAprobado() {
        return $this->aprobado;
    }

    public function setAprobado($aprobado) {
        $this->aprobado = $aprobado;
    }

    function getObjectVars(){
        return  get_object_vars($this);
    }
}