$(document).ready(load)

function load() {
    $('#login').click(loggin);

	$('#signUp').on('click',() => {		
		preventClick(event)
		$('#container').addClass("right-panel-active")
	})

	$('#signIn').on('click',() => {
		preventClick(event)
		$('#container').removeClass("right-panel-active")})

	$('#typeIkaslea').on('click', showForm);
	$('#typeIrakaslea').on('click', showForm);

	$('#btnIrakaslea').on('click', validateIrakaslea);
	$('#btnIkaslea').on('click', validateIkaslea);

}

function preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
}
function validateIkaslea(event) {
	preventClick(event);

	let contraseina2 = $('#contraseina2Ikaslea').val()
	verifyPhoto($('#fotoIkaslea').val())
	
	let usuario = { 'nombre':$('#nombreIkaslea').val() , 
			'apellidos':$('#apellidosIkaslea').val(),
			'usuario':$('#usuarioIkaslea').val(), 
			'contraseina':$('#contraseinaIkaslea').val(),
			'telefono' : $('#telefonoIkaslea').val(),
			'email' : $('#emailIkaslea').val(),
			'foto' : savedFileBase64,
			'fechaNacimiento' : $('#nacimientoIkaslea').val(),
			'instituto' : $('#institutoIkaslea').val(),
			'curso' : $('#cursoIkaslea').val(),
			'aino' : $('#ainoIkaslea').val(),
			'grupo' : $('#codigoIkaslea').val(),
			'rol' : "alumno"
		}

	if(usuario['nombre'] && usuario['apellidos'] && usuario['usuario'] && usuario['contraseina']
	&& usuario['telefono'] && usuario['email'] && usuario['fechaNacimiento'] && usuario['instituto']
	&& usuario['curso'] && usuario['aino'] && usuario['grupo']) {
		register(usuario, contraseina2, 'Ikaslea');
	} else {
		$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Sartu datu guztiak mesedez');
	}

}
var savedFileBase64='';

function verifyPhoto(foto) {

	var reader  = new FileReader();
	if (!new RegExp("(.*?).(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$").test(foto)) {
	  alert("Solo se aceptan imágenes JPG, PNG y GIF");
	} else{
		reader.onloadend = function () {
			savedFileBase64 = reader.result;    
			console.log(savedFileBase64);
		}
	}
}
function validateIrakaslea(event) {
	preventClick(event);

	verifyPhoto($('#fotoIrakaslea').val())
	let contraseina2 = $('#contraseina2Irakaslea').val();
	
	let usuario = { 'nombre':$('#nombreIrakaslea').val() , 
			'apellidos':$('#apellidosIrakaslea').val(),
			'usuario':$('#usuarioIrakaslea').val(), 
			'contraseina':$('#contraseinaIrakaslea').val(),
			'telefono' : $('#telefonoIrakaslea').val(),
			'email' : $('#emailIrakaslea').val(),
			'foto' : savedFileBase64,
			'fechaNacimiento' : $('#nacimientoIrakaslea').val(),
			'instituto' : $('#institutoIrakaslea').val(),
			'rol' : "profesor"
	}

	if (usuario['nombre'] && usuario['apellidos'] && usuario['usuario'] && usuario['contraseina']
	&& usuario['email'] && usuario['instituto']) {
		register(usuario, contraseina2, 'Irakaslea');
	} else {
		$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Sartu datu guztiak mesedez');
	}
}

function register(data, contra2, rol) {
	var url = "controller/controllerRegister.php";

	$('#msgErrorRegister').html();

	if ($('#terminos' + rol).is(':checked')) {
		if (data['contraseina']==contra2) {

			fetch(url, {
				method: 'POST', 
				body: JSON.stringify(data), 
				headers:{'Content-Type': 'application/json'}  
				})
				.then(res => res.json()).then(result => {

					switch (result.error) {
						case 0:
							$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Arazo bat gertatu da, saiatu berriro geroago.');
							break;
						case 1:
							$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Badago kontu bat izen horrekin.');
							break;
						case 2:
							$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Badago kontu bat helbide elektroniko horrekin.');
							break;
						case 3:
							location.reload();
							break;
						case 4:
							$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Ezin izan da kontua sortu.');
							break;
						default:
							break;
					}
				})
				.catch(error => console.error('Error status:', error));	
		} else {
			$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Pasahitzak ez dira berdinak');
		}
	} else {
		$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Erantzunkisuna sinatu mesedez');
	}
}

function loggin(event) {
    preventClick(event);

	if($('#usuarioLogin').val()!='' && $('#contraseinaLogin').val()!=''){	
		var url = "controller/controllerLogin.php";
		var data = {'usuario':$('#usuarioLogin').val(), 'contraseina':$('#contraseinaLogin').val()};
		fetch(url, {
		method: 'POST', 
		body: JSON.stringify(data), 
		headers:{'Content-Type': 'application/json'}  
		})
		.then(res => res.json()).then(result => {            
				if (result.error=="No error"){
					window.location.href = "index.html";
				} else {
					$('#msgError').html('<i class="fa-solid fa-triangle-exclamation"></i> '+result.error)
				}
		})
		.catch(error => console.error('Error status:', error));	
	}else{
		$('#msgError').html('<i class="fa-solid fa-triangle-exclamation"></i> Sartu datu guztiak')

	}
}

function showForm(event) {
	preventClick(event)
	$('#msgErrorRegister').html('')
	$('.signUpForm').hide();
	$('#'+this.value).show();
}
