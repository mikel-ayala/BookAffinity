$(document).ready(load)

function load() {

    $("#header").load("./view/html/header.html", () => {
        loggedVerify();
        $('#logo').on('click', goToMain);
        $('#buscador').on('click', bookSearcher);
        $('#ventanaGrupos').on('click', goToGrupos);
        $('#foto').attr('src', foto);
        $('#perfil').on('click', perfil);
        // $("#addLibro").on('click', () => {
        //     $('.modal').css('opacity', '1');
        //     $('.modal').css('visibility', 'visible');
        // })
        // $("#cerrarModal").on('click', () => {
        //     $('.modal').css('opacity', '0');
        //     $('.modal').css('visibility', 'none');
        // })
    });
    $("#footer").load("./view/html/footer.html");
}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

function bookSearcher(event) {
    preventClick(event);

    if(!window.location.href.includes('index')) {
        localStorage.setItem('busqueda', $('#titlePiece').val());
        window.location.href = "index.html";
    } else {
        var index = 0;

        if (localStorage.getItem('busqueda') != null) {
            $('#titlePiece').val(localStorage.getItem('busqueda'));
            localStorage.removeItem('busqueda');
        }


       $(".checkboxFormato").map((i, checkbox)=>{
            $('#'+checkbox.id).prop('checked', false)
            $('#'+checkbox.id).next().next().removeClass('grey');
        });

        $(".tituloLibro").map((i, libro)=>{
            if(libro.textContent.toUpperCase().indexOf($('#titlePiece').val().toUpperCase())>-1){
                $('#libro'+i).show();
                $('#libro'+i).attr( "display-searcher", true)
                index++;
            } else {
                $('#libro'+i).attr( "display-searcher", false)
                $('#libro'+i).hide()
            }
        });

        $('.numeroLibros').text(index);
    }
}
function filtro(element) {
    
}

function goToMain(event) {
    preventClick(event)
    window.location.href="index.html"
}

function perfil(event) {
    preventClick(event)
    window.location.href="perfil.html"
}

function goToGrupos(event) {
    preventClick(event)
    window.location.href="grupo.html"
}

var admin;
var profe;
var grupo;

function loggedVerify() {
    let url = "controller/controllerLoggedVerify.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=>{
        admin = result.userRole=="admin"?true:false;
        profe = result.userRole=="profesor"?true:false;
        grupo = result.grupo;
        localStorage.setItem('grupo', grupo);
        checkRol();
        if(result.error!="logged" && !window.location.href.includes('login') ){ 
            window.location.href = "login.html";
        }else if(result.error=="logged" && window.location.href.includes('login')){
            window.location.href = "index.html";
        }
        $('#foto').attr('src', result.foto);
    });
}

function checkRol() {
    if (admin == false && profe == false) {
        $('#ventanaGrupos').hide();
    }
}