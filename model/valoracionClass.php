<?php

class valoracionClass {
    protected $idValoracion;
    protected $idUsuario;
    protected $idLibro;
    protected $valoracion;
    protected $comentario;
    protected $idioma;
    protected $edad;
    protected $aprobado;
    protected $tituloSolicitado;

    public function getIdValoracion() {
        return $this->idValoracion;
    }

    public function setIdValoracion($idValoracion) {
        $this->idValoracion = $idValoracion;
    }

    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    public function getIdLibro() {
        return $this->idLibro;
    }

    public function setIdLibro($idLibro) {
        $this->idLibro = $idLibro;
    }

    public function getValoracion() {
        return $this->valoracion;
    }

    public function setValoracion($valoracion) {
        $this->valoracion = $valoracion;
    }

    public function getComentario() {
        return $this->comentario;
    }

    public function setComentario($comentario) {
        $this->comentario = $comentario;
    }

    public function getIdioma() {
        return $this->idioma;
    }

    public function setIdioma($idioma) {
        $this->idioma = $idioma;
    }

    public function getEdad() {
        return $this->edad;
    }

    public function setEdad($edad) {
        $this->edad = $edad;
    }

    public function getAprobado() {
        return $this->aprobado;
    }

    public function setAprobado($aprobado) {
        $this->aprobado = $aprobado;
    }

    public function getTituloSolicitado() {
        return $this->tituloSolicitado;
    }

    public function setTituloSolicitado($tituloSolicitado) {
        $this->tituloSolicitado = $tituloSolicitado;
    }

    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    }
}