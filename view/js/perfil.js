$(document).ready(load)

function load() {
    mostrarInfoPersona();
    mostrarValoraciones();
    $('#navegar').on('click', scrollear);
    $('#editPerfil').on('click', editPerfil);
    $('#logout').on('click', logout);
}

let primeraVezEdit = true;

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

        $('#nombreApellidosVal').text(user['nombre'] + " " + user['apellidos']);
        
    }).catch(error => console.error("Error status:", error));
}

function formatFechaNac(fechaNacimiento){
    return fechaNacimiento.substring(8, 10) + "-" + fechaNacimiento.substring(5, 7) + "-" + fechaNacimiento.substring(0, 4);
}

function formatNumTelf(numTelf){
    return numTelf.substring(0, 3) + " " + numTelf.substring(3, 5) + " " + numTelf.substring(5, 7) + " " + numTelf.substring(7, 9);
}

function mostrarValoraciones() {
    let url1 = "controller/controllerValoracionPerfil.php";
    let url2 = "controller/controllerTituloValoracionPerfil.php";


    fetch(url1, {
        method:'GET'
    }).then(res=>res.json()).then(result=>{
        
        let valoraciones = result.valoraciones;
        let estructura = '';

        for (let i = 0; i < valoraciones.length; i++) {
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

            let data = {'idLibro' : valoraciones[i]['idLibro']}
            
            fetch(url2, {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}  
                })
                .then(res2 => res2.json()).then(result2 => {
                    estructura = '<article id="reviewPerfil">' +
                                    '<b>' + result2.titulo + '</b>' +
                                    '<div id="estrellas">' +
                                        valoraciones[i]['estrellas'] +
                                        '<b> ' + valoraciones[i]['edad'] + ' urte</b>' +
                                    '</div>' +
                                    '<p class="comentario">' + valoraciones[i]['comentario'] + '<b> ' + valoraciones[i]['idioma'] + '</b></p>' +
                                '</article>';
                    $('.listaValoraciones').append(estructura);
                }) 
                .catch(error => console.error('Error status:', error));
            
        }
        
    }).catch(error => console.error("Error status:", error));
}

function editPerfil() {
    let usuario = document.getElementsByClassName('usuario')[0];
    let email = document.getElementById('email');
    let telefono = document.getElementById('telefono');

    if(primeraVezEdit){
        $('#editPerfil').text("Gorde");
        $('#editPerfil').css("background-color", "red");

        usuario.style.display = "none";
        email.style.display = "none";
        telefono.style.display = "none";

        const editUsuario = document.createElement("input");
        editUsuario.type = "text";
        editUsuario.style.fontSize = "2em";
        editUsuario.id = "editUsuarioInput";
        editUsuario.value = $('.usuario').text();
        usuario.parentNode.appendChild(editUsuario);

        const editEmail = document.createElement("input");
        editEmail.type = "text";
        editEmail.id = "editEmailInput";
        editEmail.value = $('#email').text();
        email.parentNode.appendChild(editEmail);

        const editTelefono = document.createElement("input");
        editTelefono.type = "text";
        editTelefono.id = "editTelefonoInput";
        editTelefono.value = $('#telefono').text();
        telefono.parentNode.appendChild(editTelefono);

        primeraVezEdit = false;
    } else {
        if(compNumTelf()){
            $('#editPerfil').text("Profila Editatu");
            $('#editPerfil').css("background-color", "#3386FF"); 
            
            editarUsuarioBD();

            $(".usuario").text($('#editUsuarioInput').val());
            $("#email").text($('#editEmailInput').val());
            $("#telefono").text($('#editTelefonoInput').val());
            
            usuario.style.display = "block";
            email.style.display = "block";
            telefono.style.display = "block";

            document.getElementById('editUsuarioInput').remove();
            document.getElementById('editEmailInput').remove();
            document.getElementById('editTelefonoInput').remove();

            primeraVezEdit = true;
        } else {
            alert("Telefono zenbakia ondo idatzi mesedez");
        }
    }
    
}

function editarUsuarioBD(){
    let url = "controller/controllerEditarPerfil.php";
    let data = {'usuario' : $('#editUsuarioInput').val(), 'email' : $('#editEmailInput').val(), 'telefono' : parseInt(toNumTelf($('#editTelefonoInput').val()))}

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json'}  
        }) 
        .catch(error => console.error('Error status:', error));
}

function toNumTelf(numTelf) {
    let regexNums = /^[0-9]+$/;
    numero = numTelf.split('');
    numReturn = '';
    for(let i = 0; i < numero.length; i++){
        if(numero[i].match(regexNums))
            numReturn += numero[i];
    }
    return numReturn;
}

function compNumTelf(){
    let regexNums = /^[0-9]+$/;
    let numTelf = $('#editTelefonoInput').val().split('');
    let contnums = 0;
    for(let i = 0; i < numTelf.length; i++) {
        if(numTelf[i] == ' ' || numTelf[i].match(regexNums)) {
            if(numTelf[i].match(regexNums))
                contnums++;
        } else
            return false;
    }
    if(contnums != 9)
        return false;
    else
        return true;
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

function scrollear() {
    document.getElementById('containerPerfil').scrollTo(0, 1000, 'smooth');
}