$(document).ready(load)

function load() {
    mostrarInfoLibro(), mostrarValoraciones();
    $('#navegar').on('click', scrollear);
    $('#gehitu').on('click', abrirModal);
    $('.closeModal').on('click', cerrarModal);
    $('#valorar').on('click', crearValoracion);
    $('.estrella').on('click', notaStars);
}

let estrellasNuevaValoracion = 0;

function mostrarInfoLibro() {

    let url = "controller/controllerLibro.php"

    fetch(url, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{

        let libroSeleccionado = result.libroSeleccionado;

        document.title = libroSeleccionado['titulo'] + ' | JLCLUB';
        $(".titulo").text(libroSeleccionado['titulo']);
        $(".autor").text(libroSeleccionado['autor']);
        $("#fotoLibro").attr('src', "./view/content/portadas/" + libroSeleccionado['foto']);
        $("#valoracion").text(libroSeleccionado['valoracion']);
        switch (parseInt(libroSeleccionado['valoracion'])) {
            case 1:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');
                break;
            case 2:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');               
                break;
            case 3:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');                
                break;
            case 4:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span>');                
                break;
            case 5:
                $(".estrellas").html('<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span>');                
                break;
            default:
                $(".estrellas").html('<span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>');                
                break;
        };
        $("#formato").text(libroSeleccionado['formato'].toUpperCase());
        $("#sinopsis").text(libroSeleccionado['sinopsis']);
        $(".numeroLectores").text(libroSeleccionado['numeroLectores']);
        $("#edadMedia").text(libroSeleccionado['edadMedia']);
        $("#tituloIdiomas").text(libroSeleccionado['tituloIdiomas']);
        
    }).catch(error => console.error("Error status:", error));
}

function mostrarValoraciones() {
    let url1 = "controller/controllerValoracion.php"
    let url2 = "controller/controllerUsuarioValoracion.php";


    fetch(url1, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{
        
        let valoraciones = result.valoraciones;
        let estructura = '';
        let estrellas;
        
        for (let i = 0; i < valoraciones.length; i++) {
            switch (parseInt(valoraciones[i]['valoracion'])) {
                case 1:
                    estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';
                    break;
                case 2:
                    estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';               
                    break;
                case 3:
                    estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';                
                    break;
                case 4:
                    estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span>';                
                    break;
                case 5:
                    estrellas = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span>';                
                    break;
                default:
                    estrellas = '<span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';                
                    break;
            };

            let data = {'idUsuario' : valoraciones[i]['idUsuario']}
            
            fetch(url2, {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}  
                })
                .then(res2 => res2.json()).then(result2 => {
                    estructura = '<article class="review">' +
                                '<img class="perfil" src="' + result2.foto + '" alt="">' +
                                '<article class="info">' +
                                    '<b>' + result2.usuario + '</b>' +
                                    '<div id="estrellas">' +
                                        estrellas +
                                        '<b> ' + valoraciones[i]['edad'] + ' urte</b>' +
                                    '</div>' +
                                    '<p>' + valoraciones[i]['comentario'] + '<b> ' + valoraciones[i]['idioma'] + '</b></p>' +
                                    '<button class="erantzuna"><b>Erantzuna eman</b></button>' +
                                '</article>' +
                            '</article>';

                    $('#list').append(estructura);

                }) 
                .catch(error => console.error('Error status:', error));
            
        }
        
    }).catch(error => console.error("Error status:", error));
}

function abrirModal(event){
    preventClick(event);

    var modalBack = document.getElementById("modalBackground");
    var body = document.getElementsByTagName("body")[0];

    modalBack.style.display = "block";
    $('#myModal').slideToggle("slow");

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
}

function cerrarModal(event){
    preventClick(event);

    var body = document.getElementsByTagName("body")[0];

    $('#myModal').slideToggle("slow");
    setTimeout(fondoCerrarModal, 650);

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
}

function fondoCerrarModal(modalBack){
    var modalBack = document.getElementById("modalBackground");
    modalBack.style.display = "none";
}

function crearValoracion(event){
    preventClick(event);

    if(estrellasNuevaValoracion != 0 && $('#edadVal').val() != '' && $('#comentarioVal').val() != '' && $('#idiomaVal').val() != ''){
        if(!isNaN($('#edadVal').val())){
            document.getElementById("mensajeErrorComentario").style.display = "none";

            var url = "controller/controllerNuevaValoracion.php";
            var data = {'valoracion':estrellasNuevaValoracion, 'edad':$('#edadVal').val(), 'idioma':$('#idiomaVal').val(), 'comentario':$('#comentarioVal').val(), 'tituloAlt':$('#tituloAltVal').val(), 'titulo':$('.titulo')[0].textContent};
            fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{'Content-Type': 'application/json'}  
            })
            .then(res => res.json()).then(result => {         
                    if (result.error == 0){
                        window.location.reload();
                    } else {
                        $('#mensajeErrorComentario').text("Se ha producido un error");
                        document.getElementById("mensajeErrorComentario").style.display = "block";
                    }
            })
            .catch(error => console.error('Error status:', error));	
        } else {
            $('#mensajeErrorComentario').text("Adina zenbaki bat izan behar da");
            document.getElementById("mensajeErrorComentario").style.display = "block";
        }
    } else {
        $('#mensajeErrorComentario').text("Datu guztiak sartu");
        document.getElementById("mensajeErrorComentario").style.display = "block";
    }


}

function notaStars(event) {
    //preventClick(event);

    estrellasNuevaValoracion = this.previousSibling.previousSibling.value;
}

function scrollear() {
    document.getElementById('containerSnap').scrollTo(0, 1000, 'smooth');
}