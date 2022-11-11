$(document).ready(load)

function load() {
    mostrarInfoLibro(), setTimeout(mostrarValoraciones, 10);
    $('#navegar').on('click', scrollear);
    $('#gehitu').on('click', abrirModal);
    $('.closeModal').on('click', cerrarModal);
    $('#valorar').on('click', crearValoracion);
    $('.estrella').on('click', notaStars);
    $('#responder').on('click', crearRespuesta);
}

let estrellasNuevaValoracion = 0;
let idValoracion;

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
        $(".reviewLectores").text(libroSeleccionado['numeroLectores'] + " Iritzi");
        $("#edadMedia").text(libroSeleccionado['edadMedia']);
        $("#tituloIdiomas").text(libroSeleccionado['tituloIdiomas']);
        
    }).catch(error => console.error("Error status:", error));
}

function mostrarValoraciones() {
    let url1 = "controller/controllerValoracion.php"
    let url2 = "controller/controllerUsuarioValoracion.php"
    let url3 = "controller/controllerBuscarRespuestas.php"
    let url4 = "controller/controllerUsuarioValoracion.php"


    fetch(url1, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{
        
        let valoraciones = result.valoraciones;
        let estructura = '';
        
        for (let i = 0; i < valoraciones.length; i++) {
            if(valoraciones[i]['idUsuario'] == userId) {
                $('#gehitu').prop('disabled', true);
                $('#gehitu').css('background-color', 'grey');
                $('#gehitu').css('border-color', 'grey');
            }
            switch (parseInt(valoraciones[i]['valoracion'])) {
                case 1:
                    valoraciones[i]['estrellas'] = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';
                    break;
                case 2:
                    valoraciones[i]['estrellas'] = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';               
                    break;
                case 3:
                    valoraciones[i]['estrellas'] = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';                
                    break;
                case 4:
                    valoraciones[i]['estrellas'] = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star"></span>';                
                    break;
                case 5:
                    valoraciones[i]['estrellas'] = '<span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span><span class="fa-solid fa-star checked"></span>';                
                    break;
                default:
                    valoraciones[i]['estrellas'] = '<span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span><span class="fa-solid fa-star"></span>';                
                    break;
            };

            let data = {'idUsuario' : valoraciones[i]['idUsuario']}
            
            fetch(url2, {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}  
                })
                .then(res2 => res2.json()).then(result2 => {
                    let data2 = {'idValoracion':valoraciones[i]['idValoracion']}
                    fetch(url3, {
                        method: 'POST', 
                        body: JSON.stringify(data2), 
                        headers:{'Content-Type': 'application/json'}  
                        })
                        .then(res3 => res3.json()).then(result3 => {
                            let respuestas = result3.respuestas;
                            let respuestasHTML = '';
                            if(respuestas.length > 0){
                                respuestasHTML = '<div class="buttonMostrarRespuestas" id="buttonMostrarRespuestas' + valoraciones[i]['idValoracion'] + '"><i class="fa-solid fa-sort-down"></i> <b>' + respuestas.length + ' erantzun</b> </div>' +
                                '<div class="cajaRespuestas" id="cajaRespuestas' + valoraciones[i]['idValoracion'] + '"></div>';
                                for(let i = 0; i < respuestas.length ; i++){
                                    data3 = {'idUsuario':respuestas[i]['idUsuario']}
                                    fetch(url4, {
                                        method: 'POST', 
                                        body: JSON.stringify(data3), 
                                        headers:{'Content-Type': 'application/json'}  
                                        })
                                        .then(res4 => res4.json()).then(result4 => {
                                            let respuesta = '<div class="cajaRespuesta">' +
                                                                '<img class="perfil" src="' + result4.foto + '" alt="">' +
                                                                '<article class="respuestaTexto">' + 
                                                                    '<b>' + result4.usuario + '</b>' + 
                                                                    '<p class="respuesta" id=' + respuestas[i]['idRespuesta'] + '>' + respuestas[i]['respuesta'] + '</p>' +
                                                                '</article>' +
                                                            '</div>';
                                            $('#cajaRespuestas' + respuestas[i]['idValoracion']).append(respuesta);
                                        }) 
                                        .catch(error => console.error('Error status:', error));
                                }
                            }
                            
                            estructura = '<article class="review">' +
                                        '<img class="perfil" src="' + result2.foto + '" alt="">' +
                                        '<article class="info">' +
                                            '<b>' + result2.usuario + '</b>' +
                                            '<div id="estrellas">' +
                                                valoraciones[i]['estrellas'] +
                                                '<b> ' + valoraciones[i]['edad'] + ' urte</b>' +
                                            '</div>' +
                                            '<p class="comentario" id="comentario' + valoraciones[i]['idValoracion'] + '">' + valoraciones[i]['comentario'] + '</p><b> ' + valoraciones[i]['idioma'] + '</b>' +
                                            '<button id="respuesta' + valoraciones[i]['idValoracion'] + '" class="erantzuna"><b>Erantzun</b></button>' +
                                            respuestasHTML +
                                        '</article>' +
                                    '</article>';
        
                            $('#list').append(estructura);
                            $('#respuesta' + valoraciones[i]['idValoracion']).on('click', abrirModal);
                            $('#buttonMostrarRespuestas' + valoraciones[i]['idValoracion']).on('click', mostrarComentarios);
                        }) 
                        .catch(error => console.error('Error status:', error));
                }) 
                .catch(error => console.error('Error status:', error));
            
        }
        
    }).catch(error => console.error("Error status:", error));
}

function abrirModal(event){
    preventClick(event);

    if((this.id).includes('gehitu'))
        $('#modalComentario').css("display", "block");
    else{
        $('#modalRespuesta').css("display", "block");
        $('#comentarioRespuesta').text($('#comentario' + this.id.substring(9)).text());
        idValoracion = this.id.substring(9);
    }
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
    document.getElementById('modalComentario').style.display = "none";
    document.getElementById('modalRespuesta').style.display = "none";
}

function mostrarComentarios(event) {
    preventClick(event);
    $('#cajaRespuestas' + this.id.substring(23)).css("display", "block");
    $(this).children('i').attr("class", $(this).children(0).attr("class").substring(0, 17) + "up");
    $(this).off('click');
    $(this).on('click', ocultarComentarios);
}

function ocultarComentarios(event) {
    preventClick(event);
    $('#cajaRespuestas' + this.id.substring(23)).css("display", "none");
    $(this).children('i').attr("class", $(this).children(0).attr("class").substring(0, 17) + "down");
    $(this).off('click');
    $(this).on('click', mostrarComentarios);
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

function crearRespuesta(event) {
    preventClick(event);

    if($('#respuestaVal').val().trim() != '') {
        if($('#respuestaVal').val().trim().length < 141){
            console.log("Entro");
        document.getElementById("mensajeErrorRespuesta").style.display = "none";

        var url = "controller/controllerNuevaRespuesta.php";
            var data = {'idValoracion':idValoracion, 'respuesta':$('#respuestaVal').val().trim()};
            fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{'Content-Type': 'application/json'}  
            })
            .then(res => res.json()).then(result => {
                window.location.reload();
            })
            .catch(error => console.error('Error status:', error));
        } else {
            document.getElementById("mensajeErrorRespuestaP").style.display = "none";
            $("#mensajeErrorRespuesta").text("Erantzuna luzeegia da");
            setTimeout(() => {
                document.getElementById("mensajeErrorRespuestaP").style.display = "block";
            }, 1);
        }
    } else {
        document.getElementById("mensajeErrorRespuestaP").style.display = "none";
        $("#mensajeErrorRespuesta").text("Erantzuna sartu");
        setTimeout(() => {
            document.getElementById("mensajeErrorRespuestaP").style.display = "block";
        }, 1);
    }
}

function notaStars(event) {
    estrellasNuevaValoracion = this.previousSibling.previousSibling.value;
}

function scrollear() {
    document.getElementById('containerSnap').scrollTo(0, 1000, 'smooth');
}