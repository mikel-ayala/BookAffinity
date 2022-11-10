$(document).ready(load)

function load() {

    $("#header").load("./view/html/header.html", () => {
        loggedVerify();
        $('#logo').on('click', goToMain);
        $('#buscador').on('click', bookSearcher);
        $('#ventanaGrupos').on('click', goToGrupos);
        $('#perfil').on('click', perfil);
        $("#addLibroModal").load("./view/html/addLibro.html", () => {
            $('#cerrarModal').on('click', cerrarModal);
            $("#confirmarLibroModal").on("click", validar);
            $('#fotoModal').on('change', verifyBookPhoto);

        });
        $('#addLibro').on('click', abrirModal);
    });
    $("#footer").load("./view/html/footer.html");
}

let userId = -1;

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

function loggedVerify() {
    let url = "controller/controllerLoggedVerify.php";
    fetch(url, {
        method: 'GET'
    })
    .then(res=>res.json()).then(result=> {
        userId = result['userId']
        result.userRole=="admin"?localStorage.setItem('rol', result.userRole):false;
        result.userRole=="profesor"?localStorage.setItem('rol', result.userRole):false;

        if (result.userRole == "admin" || result.userRole == "profesor") {
            localStorage.setItem('rol', result.userRole);
        } else {
            localStorage.setItem('rol', 'alumno');
        }

        localStorage.setItem('grupo', result.grupo);
        checkRol();
        if(result.error!="logged" && !window.location.href.includes('login') ){ 
            window.location.href = "login.html";
        }else if(result.error=="logged" && window.location.href.includes('login')){
            window.location.href = "index.html";
        }
        $('#foto').attr('src', result.foto);
    });
}
var savedFileBase64Book='';
var nombreFoto='';

function verifyBookPhoto(event) {
	preventClick(event);

	var file= this.files[0];
	var reader  = new FileReader();

	nombreFoto = file.name;
	filesize= file.size;

	if((file.size/ 1024/1024) > 512 ){
		alert("Argazkia gehiegi okupatzen du");
		this.value = "";
	} else{
		reader.onloadend = function () {
			savedFileBase64Book = reader.result;   
		}
		if (file) {reader.readAsDataURL(file)} 
	}
}

function checkRol() {
    if (localStorage.getItem('rol') != "admin" && localStorage.getItem('rol') != "profesor") {
        $('#ventanaGrupos').hide();
    }
}

function abrirModal(event) {
    preventClick(event)

    $('body').css('overflow', 'hidden');
    $('#addLibroModal').css('display', 'flex');
    delay(50).then(() => $("#libroForm").css('transform', 'translateY(0%)'));
}

function cerrarModal(event) {
    preventClick(event)

    $('body').css('overflow', 'scroll');
    $('#addLibroModal').css('display', 'none');
    $("#libroForm").css('transform', 'translateY(-30%)');
}

function validar() {

    let libro = {
        'titulo':$('#tituloModal').val(),
        'autor':$('#autorModal').val(),
        'foto':nombreFoto,
        'formato':$('#formatoModal').val(),
        'sinopsis':$('#sinopsisModal').val(),
        'idioma':$('#idiomaModal').val(),
        'savedFileBase64Book':savedFileBase64Book
    }

    if (libro['titulo'] && libro['autor'] && libro['foto'] && libro['formato'] && libro['sinopsis'] && libro['idioma']) {

        defaultValues()
        url = "controller/controllerAddLibro.php";
        fetch(url, {
            method: 'POST', 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(libro), 
            })
        .then(res => res.json()).then(result => {
            $('#cerrarModal').click();
        })
        .catch(error => console.error('Error status:', error));
    
    } else {
        $('#msgError').html('<i class="fa-solid fa-triangle-exclamation"></i> Datu guztiak bete');
    }
}
function defaultValues() {
    $('#msgError').html('');
    $('#tituloModal').val('');
    $('#autorModal').val('');
    $('#fotoModal').val('');
    $('#formatoModal').val('');
    $('#sinopsisModal').val('');
    $('#idiomaModal').val('Euskera');
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
