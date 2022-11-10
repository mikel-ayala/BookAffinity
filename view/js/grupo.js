$(document).ready(load)

function load() {
    loggedVerify();
    if (localStorage.getItem('rol') == "admin") {
        $('#grupos').append('<button value="profesores">Irakasleak</button>');
        $('body').append('<section id="profesores" class="list" data-index="1" data-status="left"></section>');
        mostrarProfesoresPendientes();
        mostrarProfesores();
    } else if (localStorage.getItem('rol') == "profesor") {
        mostrarGrupos();
        mostrarAlumnosPendientes();
    }

    $('#grupos button').on('click', animacion);
}

function mostrarGrupos() {
    let grupo = localStorage.getItem('grupo').split(',');

    if (grupo != undefined){

        let htmlNav = '';
        let htmlBody = '';

        for (let i = 0; i < grupo.length; i++) {
            htmlNav += '<button value="' + grupo[i].replace(' ', '') + '">' + grupo[i].replace(' ', '') + '</button>';
            htmlBody += '<section id="' + grupo[i].replace(' ', '') + '" class="list" data-index="' + i + '" data-status="left"></section>';
            mostrarUsuariosGrupo(grupo[i].replace(' ', ''));
        }

        htmlNav += '<button id="addGrupo" class="add"><i class="fa-solid fa-plus"></i></button>';
        $('body').append(htmlBody);
        $('#grupos').append(htmlNav);
        $('#addGrupo').on('click', addGrupo);
    }

}

function addGrupo(event) {
    preventClick(event);

    $('<button id="editableGroup" contentEditable></button>').insertBefore('#addGrupo');
    $('#editableGroup').focus();
    $('#editableGroup').on('focusout', guardarGrupo);
}

function guardarGrupo() {

    if ($(this).text().length > 0) {
        $(this).off('click');
        $(this).off('focusout');
        $(this).on('click', animacion);
        $(this).removeAttr('id');
        $(this).attr('value', $(this).text());
        $(this).attr('contentEditable', false);
        $('body').append('<section id="' + $(this).text() + '" class="list" data-status="left"></section>');
        $('#' + $(this).text()).attr("data-index", parseInt($('#' + $(this).text()).prev().attr("data-index"))+1)
    
        var url = "controller/controllerAddGrupo.php";
        let data = {'grupo':$(this).text().replace(" ", "").toUpperCase()};
    
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{'Content-Type': 'application/json'}  
        })
        .then(res => res.json()).then(result => {
    
            if (result.error) {
                $(this).remove();
                $('#' + $(this).text()).remove();
            }
        })
        .catch(error => console.error('Error status:', error));        
    } else {
        $(this).remove();
    }
}

function mostrarProfesoresPendientes() {
    let url = "controller/controllerProfesoresPendientes.php";

	fetch(url, {method: 'GET'})
        .then(res => res.json()).then(result => {

            let pendientes = result.pendientes;

            let html = "";

            for (let i = 0; i < pendientes.length; i++) {
                html += '<article id="' + pendientes[i]['idUsuario'] + '" class="alumnoContainer">' +
                            '<article class="alumno">' +
                                '<img src="' + pendientes[i]['foto'] + '" alt="">' +
                                '<article class="info">' +
                                    '<h3 class="nombre">' + pendientes[i]['nombre'] + '</h3>' +
                                    '<h4 class="usuario">' + pendientes[i]['usuario'] + '</h4>' +
                                    '<h5 class="fechaNacimiento">' + pendientes[i]['fechaNacimiento'] + '</h5>' +
                                '</article>' +
                                '<article class="moreInfo">' +
                                    '<h4 class="email">' + pendientes[i]['email'] + '</h4>' +
                                    '<h4 class="telefono">' + pendientes[i]['telefono'] + '</h4>' +
                                    '<article class="clase">' +
                                        '<h4 class="instituto">' + pendientes[i]['instituto'] + '</h4>' +
                                        '<h4 class="curso">' + pendientes[i]['grupo'] + '</h4>' +
                                        '<h4 class="aino">' + pendientes[i]['aino'] + '</h4>' +
                                    '</article>' +
                                '</article>' +
                                '<article class="control">' +
                                    '<button id="aceptar' + pendientes[i]['idUsuario'] + '" class="aceptar"><i class="fa-solid fa-check fa-xl"></i></button>' +
                                    '<button id="rechazar' + pendientes[i]['idUsuario'] + '" class="rechazar"><i class="fa-solid fa-xmark fa-xl"></i></button>' +
                                '</article>' +
                            '</article>' +
                        '</article>';
            }

            $('#waitingList').append(html)
            $('.aceptar').on('click', aceptarPendiente);
            $('.rechazar').on('click', rechazarPendiente);
        });
}

function mostrarAlumnosPendientes() {
    let url = "controller/controllerAlumnosPendientes.php";

	fetch(url, {method: 'GET'})
        .then(res => res.json()).then(result => {
            if (!result.error) {

                let pendientes = result.pendientes;

                let html = "";

                for (let i = 0; i < pendientes.length; i++) {
                    html += '<article id="' + pendientes[i]['idUsuario'] + '" class="alumnoContainer">' +
                                '<article class="alumno">' +
                                    '<img src="' + pendientes[i]['foto'] + '" alt="">' +
                                    '<article class="info">' +
                                        '<h3 class="nombre">' + pendientes[i]['nombre'] + '</h3>' +
                                        '<h4 class="usuario">' + pendientes[i]['usuario'] + '</h4>' +
                                        '<h5 class="fechaNacimiento">' + pendientes[i]['fechaNacimiento'] + '</h5>' +
                                    '</article>' +
                                    '<article class="moreInfo">' +
                                        '<h4 class="email">' + pendientes[i]['email'] + '</h4>' +
                                        '<h4 class="telefono">' + pendientes[i]['telefono'] + '</h4>' +
                                        '<article class="clase">' +
                                            '<h4 class="instituto">' + pendientes[i]['instituto'] + '</h4>' +
                                            '<h4 class="curso">' + pendientes[i]['grupo'] + '</h4>' +
                                            '<h4 class="aino">' + pendientes[i]['aino'] + '</h4>' +
                                        '</article>' +
                                    '</article>' +
                                    '<article class="control">' +
                                        '<button id="aceptar' + pendientes[i]['idUsuario'] + '" class="aceptar"><i class="fa-solid fa-check fa-xl"></i></button>' +
                                        '<button id="rechazar' + pendientes[i]['idUsuario'] + '" class="rechazar"><i class="fa-solid fa-xmark fa-xl"></i></button>' +
                                    '</article>' +
                                '</article>' +
                            '</article>';
                }

                $('#waitingList').append(html)
                $('.aceptar').on('click', aceptarPendiente);
                $('.rechazar').on('click', rechazarPendiente);
            }
        });
}

function mostrarProfesores() {
    var url = "controller/controllerProfesoresAceptados.php";

    fetch(url, {method: 'GET'})
    .then(res => res.json()).then(result => {

        let profesores = result.profesores;
        let html = "";

        for (let i = 0; i < profesores.length; i++) {
            
            html += '<article id="' + profesores[i]['idUsuario'] + '" class="alumnoContainer">' +
                        '<article class="alumno">' +
                            '<img src="' + profesores[i]['foto'] + '" alt="">' +
                            '<article class="info">' +
                                '<h3 class="nombre">' + profesores[i]['nombre'] + '</h3>' +
                                '<h4 class="usuario">' + profesores[i]['usuario'] + '</h4>' +
                                '<h5 class="fechaNacimiento">' + profesores[i]['fechaNacimiento'] + '</h5>' +
                            '</article>' +
                            '<article class="moreInfo">' +
                                '<h4 class="email">' + profesores[i]['email'] + '</h4>' +
                                '<h4 class="telefono">' + profesores[i]['telefono'] + '</h4>' +
                                '<article class="clase">' +
                                    '<h4 class="instituto">' + profesores[i]['instituto'] + '</h4>' +
                                    '<h4 class="curso">' + profesores[i]['grupo'] + '</h4>' +
                                    '<h4 class="aino">' + profesores[i]['aino'] + '</h4>' +
                                '</article>' +
                            '</article>' +
                            '<article class="control">' +
                                '<button id="rechazar' + profesores[i]['idUsuario'] + '" class="rechazar"><i class="fa-solid fa-xmark fa-xl"></i></button>' +
                            '</article>' +
                        '</article>' +
                    '</article>';

            $('#profesores').empty();
            $('#profesores').append(html);
            $('.rechazar').on('click', rechazarPendiente);
        }
    })
    .catch(error => console.error('Error status:', error));
}

function mostrarUsuariosGrupo(grupo) {
    var url = "controller/controllerGrupo.php";
    let data = {'grupo':grupo};

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json'}  
    })
    .then(res => res.json()).then(result => {

        if (!result.error) {
            usuarios = result.usuarios;
            let html = "";

            for (let i = 0; i < usuarios.length; i++) {
                
                mostrarActividadPendiente(usuarios[i]['idUsuario'])

                html += '<article id="' + usuarios[i]['idUsuario'] + '" class="alumnoContainer">' +
                            '<article class="alumno">' +
                                '<img src="' + usuarios[i]['foto'] + '" alt="">' +
                                '<article class="info">' +
                                    '<h3 class="nombre">' + usuarios[i]['nombre'] + '</h3>' +
                                    '<h4 class="usuario">' + usuarios[i]['usuario'] + '</h4>' +
                                    '<h5 class="fechaNacimiento">' + usuarios[i]['fechaNacimiento'] + '</h5>' +
                                '</article>' +
                                '<article class="moreInfo">' +
                                    '<h4 class="email">' + usuarios[i]['email'] + '</h4>' +
                                    '<h4 class="telefono">' + usuarios[i]['telefono'] + '</h4>' +
                                    '<article class="clase">' +
                                        '<h4 class="instituto">' + usuarios[i]['instituto'] + '</h4>' +
                                        '<h4 class="curso">' + usuarios[i]['grupo'] + '</h4>' +
                                        '<h4 class="aino">' + usuarios[i]['aino'] + '</h4>' +
                                    '</article>' +
                                '</article>' +
                                '<article class="control">' +
                                    '<button class="more"><i class="fa-solid fa-plus fa-xl"></i></button>' +
                                    '<button id="rechazar' + usuarios[i]['idUsuario'] + '" class="rechazar"><i class="fa-solid fa-xmark fa-xl"></i></button>' +
                                '</article>' +
                            '</article>' +
                            '<article id="registro' + usuarios[i]['idUsuario'] + '" class="registros">' +
                            '</article>' +
                        '</article>';

            }

            $('#' + grupo).empty();
            $('#' + grupo).append(html);
            $('#' + grupo).find('.registros').slideToggle("fast");
            $('#' + grupo).find('.more').on('click', mostrarRegistro);
            $('.rechazar').on('click', rechazarPendiente);
        }
    })
    .catch(error => console.error('Error status:', error));
}

function mostrarActividadPendiente(idUsuario) {
    var url = "controller/controllerActividadPendiente.php";
    let data = {'idUsuario':idUsuario};
    let html = "";

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json'}  
    })
    .then(res => res.json()).then(result => {

        if (!result.error) {
            let libros = result.libros;
            let valoraciones = result.valoraciones;

            for (let i = 0; i < libros.length; i++) {
                html += '<article id="' + libros[i]['idLibro'] + '" class="registro">' +
                            '<img src="./view/content/portadas/' + libros[i]['foto'] + '" alt="">' +
                            '<article class="info">' +
                                '<h4 class="titulo">' + libros[i]['titulo'] + '</h4>' +
                                '<h5 class="autor">' + libros[i]['autor'] + '</h5>' +
                                '<p class="formato">' + libros[i]['formato'] + '</p>' +
                                '<h5 class="idioma">' + libros[i]['idioma'] + '</h5>' +
                            '</article>' +
                                '<p class="sinopsis">' + libros[i]['sinopsis'] + '</p>' +
                            '<article class="control">' +
                                '<button id="libro' + libros[i]['idLibro'] + '" class="aceptar"><i class="fa-solid fa-check"></i></button>' +
                                '<button id="libro' + libros[i]['idLibro'] + '" class="rechazar"><i class="fa-solid fa-xmark"></i></button>' +
                            '</article>' +
                        '</article>';
            }

            for (let i = 0; i < valoraciones.length; i++) {
                html += '<article id="' + valoraciones[i]['idValoracion'] + '" class="registro">' +
                            '<article class="infoValoracion">' +
                                '<h4 class="titulo">' + valoraciones[i]['idioma'] + '</h4>' +
                                '<h5 class="autor">Nota: ' + valoraciones[i]['valoracion'] + '/5</h5>' +
                                '<p class="formato">' + valoraciones[i]['edad'] + ' urte</p>' +
                                '<h5 class="idioma">' + valoraciones[i]['tituloSolicitado'] + '</h5>' +
                            '</article>' +
                                '<p class="sinopsis">' + valoraciones[i]['comentario'] + '</p>' +
                            '<article class="control">' +
                                '<button value="' + valoraciones[i]['idLibro'] + '" id="valoracion' + valoraciones[i]['idValoracion'] + '" class="aceptar"><i class="fa-solid fa-check"></i></button>' +
                                '<button id="valoracion' + valoraciones[i]['idValoracion'] + '" class="rechazar"><i class="fa-solid fa-xmark"></i></button>' +
                            '</article>' +
                        '</article>';
            }

            $('#registro' + idUsuario).append(html);
            $('.aceptar').on('click', aceptarPendiente);
            $('.rechazar').on('click', rechazarPendiente);
        }
    })
    .catch(error => console.error('Error status:', error));

}

function animacion(event) {

    preventClick(event)

    if (!$(this).hasClass('add')) {
        let oldbutton = $('button.active');

        oldbutton.removeClass('active')
        $(this).addClass('active')

        let nuevo = $('#' + this.value);
        let actual = $('section[data-status="center"]');
        let anterior = $('section[data-status="right"]');

        if (nuevo.attr("data-status") != "center") {

            if (nuevo.attr("data-status", "right")) {
                nuevo.attr("data-status", "left");
            }

            if (anterior.length > 0) {
                anterior.attr("data-status", "left");
            }

            setTimeout(() => {
                actual.attr("data-status", "right");
                nuevo.attr("data-status", "center");
            });
        }
    }
}

function mostrarRegistro(event) {

    preventClick(event)

    let registros = $(this).parent().parent().next();
    let icono = $(this).children();
    
    registros.slideToggle( "slow", function() {
        if (icono.hasClass('fa-plus')) {
            icono.removeClass('fa-plus').addClass('fa-minus');
        } else {
            icono.removeClass('fa-minus').addClass('fa-plus');
        }
      });
}

function aceptarPendiente(event) {

    preventClick(event)

    let url;
    let data;
    let aceptado;

    if (this.id.includes("aceptar")) {
        url = "controller/controllerAceptarPendiente.php";
        data = {'idUsuario':this.id.replace("aceptar", "")};
        aceptado = $(this).parent().parent().parent();
    } else if (this.id.includes("libro")) {
        url = "controller/controllerAceptarLibro.php";
        data = {'idLibro':this.id.replace("libro", "")};
        aceptado = $(this).parent().parent();
    } else if (this.id.includes("valoracion")) {
        url = "controller/controllerAceptarValoracion.php";
        data = {'idValoracion':this.id.replace("valoracion", ""), 'idLibro':this.value};
        aceptado = $(this).parent().parent();
    }

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json'}  
    })
    .then(res => res.json()).then(result => {

        if (!result.error) {
            aceptado.remove();
        }
    })
    .catch(error => console.error('Error status:', error));
}

function rechazarPendiente(event) {

    preventClick(event)

    let url;
    let data;
    let eliminado;

    if (this.id.includes("rechazar")) {
        url = "controller/controllerRechazarPendiente.php";
        data = {'idUsuario':this.id.replace("rechazar", "")};
        eliminado = $(this).parent().parent().parent();
    } else if (this.id.includes("libro")) {
        url = "controller/controllerRechazarLibro.php";
        data = {'idLibro':this.id.replace("libro", "")};
        eliminado = $(this).parent().parent();
    } else if (this.id.includes("valoracion")) {
        url = "controller/controllerRechazarValoracion.php";
        data = {'idValoracion':this.id.replace("valoracion", "")};
        eliminado = $(this).parent().parent();
    }

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json'}  
    })
    .then(res => res.json()).then(result => {

        if (!result.error) {
            eliminado.remove();
        }
    })
    .catch(error => console.error('Error status:', error));
}