$(document).ready(load)

function load() {

    loggedVerify();
    $('#grupos button').on('click', animacion);
}

function animacion() {

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