$(document).ready(load)

function load() {

    loggedVerify();
    $('#grupos button').on('click', animacion);
    $('.more').on('click', mostrarRegistro);
    $('.more').click();
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