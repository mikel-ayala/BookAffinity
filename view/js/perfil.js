$(document).ready(load)

function load() {
    mostrarInfoPersona();
    mostrarValoraciones();
    $('#navegar').on('click', scrollear);
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
        //let estrellas;
        
        console.log(valoraciones);

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
                    console.log(i);
                    estructura = '<article id="reviewPerfil">' +
                                    '<b>' + result2.titulo + '</b>' +
                                    '<div id="estrellas">' +
                                        valoraciones[i]['estrellas'] +
                                        '<b> ' + valoraciones[i]['edad'] + ' urte</b>' +
                                    '</div>' +
                                    '<p>' + valoraciones[i]['comentario'] + '<b> ' + valoraciones[i]['idioma'] + '</b></p>' +
                                '</article>';
                    $('.listaValoraciones').append(estructura);
                }) 
                .catch(error => console.error('Error status:', error));
            
        }
        
    }).catch(error => console.error("Error status:", error));
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