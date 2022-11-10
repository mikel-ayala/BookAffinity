<?php

class respuestaClass {
    protected $idRespuesta;
    protected $idUsuario;
    protected $idValoracion;
    protected $respuesta;
    protected $aprobado;

    public function getIdRespuesta() {
        return $this->idRespuesta;
    }
    
    public function setIdRespuesta($idRespuesta) {
        $this->idRespuesta = $idRespuesta;
    }

    public function getIdUsuario() {
        return $this->idUsuario;
    }
    
    public function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    public function getIdValoracion() {
        return $this->idValoracion;
    }
    
    public function setIdValoracion($idValoracion) {
        $this->idValoracion = $idValoracion;
    }

    public function getRespuesta() {
        return $this->respuesta;
    }
    
    public function setRespuesta($respuesta) {
        $this->respuesta = $respuesta;
    }

    public function getAprobado() {
        return $this->foto;
    }
    
    public function setAprobado($aprobado) {
        $this->aprobado = $aprobado;
    }

    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    }
}