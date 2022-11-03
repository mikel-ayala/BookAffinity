$(document).ready(load)

function load() {
    loggedVerify();
    mostrarGrupos();
    mostrarPendientes();
    $('#grupos button').on('click', animacion);
}

function mostrarGrupos() {
    let grupo = localStorage.getItem('grupo').split(',');

    if (grupo != undefined){

        let htmlNav = "";
        let htmlBody = "";

        for (let i = 0; i < grupo.length; i++) {
            htmlNav += '<button value="' + grupo[i].replace(' ', '') + '">' + grupo[i].replace(' ', '') + '</button>';
            htmlBody += '<section id="' + grupo[i].replace(' ', '') + '" class="list" data-index="' + i+1 + '" data-status="left"></section>';
            mostrarUsuariosGrupo(grupo[i].replace(' ', ''));
        }

        htmlNav += '<button class="add"><i class="fa-solid fa-plus"></i></button>';

        $('#grupos').append(htmlNav);
        $('body').append(htmlBody);
    }

}

function mostrarPendientes() {
    let url = "controller/controllerPendientes.php";

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
                                        '<h4 class="apellidos">' + pendientes[i]['apellidos'] + '</h4>' +
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

            }
        });
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
                                    '<h4 class="apellidos">' + usuarios[i]['apellidos'] + '</h4>' +
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
                                    '<button id="eliminar' + usuarios[i]['idUsuario'] + '" class="rechazar"><i class="fa-solid fa-xmark fa-xl"></i></button>' +
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
                                '<button id="' + libros[i]['idLibro'] + '" class="aceptar"><i class="fa-solid fa-check"></i></button>' +
                                '<button id="' + libros[i]['idLibro'] + '" class="rechazar"><i class="fa-solid fa-xmark"></i></button>' +
                            '</article>' +
                        '</article>';
            }

            $('#registro' + idUsuario).append(html);
        }
    })
    .catch(error => console.error('Error status:', error));

}

function animacion() {

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

function mostrarRegistro() {

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