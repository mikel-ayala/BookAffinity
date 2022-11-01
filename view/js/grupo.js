$(document).ready(load)

function load() {
    loggedVerify();
    mostrarGrupos();
    mostrarPendientes();
    $('#grupos button').on('click', animacion);
    $('.more').on('click', mostrarRegistro);
    $('.more').click();
}

function mostrarGrupos() {
    let grupo = localStorage.getItem('grupo').split(',');

    if (grupo != undefined){

        let htmlNav = "";
        let htmlBody = "";

        for (let i = 0; i < grupo.length; i++) {
            htmlNav += '<button value="' + grupo[i] + '">' + grupo[i] + '</button>';
            htmlBody += '<section id="' + grupo[i] + '" class="list" data-index="' + i+1 + '" data-status="left"></section>';
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
                                        '<button class="aceptar"><i class="fa-solid fa-check fa-xl"></i></button>' +
                                        '<button class="rechazar"><i class="fa-solid fa-xmark fa-xl"></i></button>' +
                                    '</article>' +
                                '</article>' +
                            '</article>';
                }

                $('#waitingList').append(html)

            }
        });
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