$(document).ready(load);

function load(){
    $("#modalitosupare").load("index.html", () => {
        $('#cerrarModal').on('click', cerrarModal);
    });
    $('#iniciador').on('click', addLibro);
}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

function abrirModal(event) {
    preventClick(event)

    $('.modal').css('opacity', '1');
    $('.modal').css('visibility', 'visible');
    $(".contenedor").css('transform', 'translateY(7%)');
}

function cerrarModal(event) {
    preventClick(event)

    $('.modal').css('opacity', '0');
    $('.modal').css('visibility', 'hidden');
    $(".contenedor").css('transform', 'translateY(0%)');
}



document.getElementById("boton").addEventListener("click",validar);

function validar(){

    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var foto = document.getElementById("foto").value;
    var formato = document.getElementById("formato").value;
    var sinopsis = document.getElementById("sinopsis").value;
    var idioma = document.getElementById("idioma").value;
    
    

    var booll = true;

    if(titulo ==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(autor==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(foto==""){
        adocument.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(formato==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    }
    if(sinopsis ==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
    if(idioma==""){
        document.getElementById("errorlbl").innerHTML = "Datu guztiak bete"
        booll = false;
    } 
   return booll;
}

