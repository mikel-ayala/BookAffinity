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

	let usuario = { 'nombre':$('#nombreIkaslea').val() , 
			'apellidos':$('#apellidosIkaslea').val(),
			'usuario':$('#usuarioIkaslea').val(), 
			'contraseina':$('#contraseinaIkaslea').val(),
			'telefono' : $('#telefonoIkaslea').val(),
			'email' : $('#emailIkaslea').val(),
			'foto' : $('#fotoIkaslea').val(),
			'fechaNacimiento' : $('#nacimientoIkaslea').val(),
			'instituto' : $('#institutoIkaslea').val(),
			'curso' : $('#cursoIkaslea').val(),
			'aino' : $('#ainoIkaslea').val(),
			'grupo' : $('#codigoIkaslea').val(),
			'rol' : "alumno"
		}
	if(usuario['nombre'] && usuario['apellidos'] && usuario['usuario'] && usuario['contraseina']
	&& usuario['telefono'] && usuario['email'] && usuario['fechaNacimiento'] && usuario['instituto']
	&& usuario['curso'] && usuario['aino'] && usuario['grupo']){
		(usuario['contraseina']==contraseina2)?register(usuario):$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Sartu datu guztiak mesedez')

	}else{
		$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i> Sartu datu guztiak mesedez')

	}

}
function validateIrakaslea(event) {
	preventClick(event);
	$('#msgErrorRegister').html('<i class="fa-solid fa-triangle-exclamation"></i>')


}
function register(data) {
	var url = "controller/controllerRegister.php";
	fetch(url, {
		method: 'POST', 
		body: JSON.stringify(data), 
		headers:{'Content-Type': 'application/json'}  
		})
		.then(res => res.json()).then(result => {            
				console.log(result.usuario);
		})
		.catch(error => console.error('Error status:', error));	
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
