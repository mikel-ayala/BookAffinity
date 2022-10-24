$(document).ready(load)

function load() {
    mostrarInfoPersona();

    $('#logout').on('click', logout);
}

function mostrarInfoPersona() {

    let url = "controller/controllerPerfil.php"

    fetch(url, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{

        let user = result.user;

        document.title = user['usuario'] + ' | JLCLUB';
        $(".nombreApellidos").text(user['nombre'] + " " + user['apellidos']);
        $(".usuario").text(user['usuario']);
        $("#email").text(user['email']);
        $("#fechaNacimiento").text(formatFechaNac(user['fechaNacimiento']));
        $("#telefono").text(formatNumTelf(user['telefono']));
        $("#instituto").text(user['instituto']);
        $("#curso").text(user['curso']);
        $("#grupo").text(user['grupo']);
        $('#fotoPersona').attr('src', result.foto);
        
    }).catch(error => console.error("Error status:", error));
}

function formatFechaNac(fechaNacimiento){
    return fechaNacimiento.substring(8, 10) + "-" + fechaNacimiento.substring(5, 7) + "-" + fechaNacimiento.substring(0, 4);
}

function formatNumTelf(numTelf){
    return numTelf.substring(0, 3) + " " + numTelf.substring(3, 5) + " " + numTelf.substring(5, 7) + " " + numTelf.substring(7, 9);
}

function logout(event) {
    preventClick(event);
    let url = "controller/controllerLogout.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=>{
        window.location.href = "login.html";
    });
}