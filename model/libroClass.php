<?php

class libroClass {
    protected $idLibro;
    protected $idUsuario;
    protected $titulo;
    protected $autor;
    protected $foto;
    protected $formato;
    protected $sinopsis;
    protected $idioma;
    protected $tituloIdiomas;
    protected $valoracion;
    protected $numeroLectores;
    protected $edadMedia;
    protected $aprobado;

    public function getIdLibro() {
        return $this->idLibro;
    }
    
    public function setIdLibro($idLibro) {
        $this->idLibro = $idLibro;
    }

    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    public function getTitulo() {
        return $this->titulo;
    }
    
    public function setTitulo($titulo) {
        $this->titulo = $titulo;
    }

    public function getAutor() {
        return $this->autor;
    }
    
    public function setAutor($autor) {
        $this->autor = $autor;
    }

    public function getFoto() {
        return $this->foto;
    }
    
    public function setFoto($foto) {
        $this->foto = $foto;
    }

    public function getFormato() {
        return $this->formato;
    }
    
    public function setFormato($formato) {
        $this->formato = $formato;
    }

    public function getSinopsis() {
        return $this->sinopsis;
    }
    
    public function setSinopsis($sinopsis) {
        $this->sinopsis = $sinopsis;
    }

    public function getIdioma() {
        return $this->idioma;
    }
    
    public function setIdioma($idioma) {
        $this->idioma = $idioma;
    }

    public function getTituloIdiomas() {
        return $this->tituloIdiomas;
    }
    
    public function setTituloIdiomas($tituloIdiomas) {
        $this->tituloIdiomas = $tituloIdiomas;
    }

    public function getValoracion() {
        return $this->valoracion;
    }
    
    public function setValoracion($valoracion) {
        $this->valoracion = $valoracion;
    }

    public function getNumeroLectores() {
        return $this->numeroLectores;
    }
    
    public function setNumeroLectores($numeroLectores) {
        $this->numeroLectores = $numeroLectores;
    }

    public function getEdadMedia() {
        return $this->edadMedia;
    }
    
    public function setEdadMedia($edadMedia) {
        $this->edadMedia = $edadMedia;
    }

    public function getAprobado() {
        return $this->aprobado;
    }
    
    public function setAprobado($aprobado) {
        $this->aprobado = $aprobado;
    }
    
    function getObjectVars(){
        $vars = get_object_vars($this);
        return  $vars;
    }
}